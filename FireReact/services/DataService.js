// services/DataService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const OCORRENCIAS_STORAGE_KEY = '@ocorrencias_data';
const LAST_SYNC_KEY = '@last_sync';

class DataService {
  // ===== ARMAZENAMENTO LOCAL =====
  async salvarOcorrenciasLocal(ocorrencias) {
    try {
      const data = {
        ocorrencias,
        timestamp: new Date().toISOString()
      };
      await AsyncStorage.setItem(OCORRENCIAS_STORAGE_KEY, JSON.stringify(data));
      console.log('Dados salvos localmente:', ocorrencias.length, 'ocorrências');
    } catch (error) {
      console.error('Erro ao salvar dados localmente:', error);
      throw error;
    }
  }

  async carregarOcorrenciasLocal() {
    try {
      const dataString = await AsyncStorage.getItem(OCORRENCIAS_STORAGE_KEY);
      if (dataString) {
        const data = JSON.parse(dataString);
        console.log('Dados carregados localmente:', data.ocorrencias.length, 'ocorrências');
        return data.ocorrencias;
      }
      return [];
    } catch (error) {
      console.error('Erro ao carregar dados locais:', error);
      return [];
    }
  }

  // ===== SINCRONIZAÇÃO COM FONTE EXTERNA =====
  async buscarOcorrenciasExternas() {
    try {
      console.log('Buscando dados da fonte externa...');
      
      // Simulação de API - substitua pela sua URL real
      const response = await fetch(`${API_BASE_URL}/ocorrencias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer seu-token-aqui' // se necessário
        },
        timeout: 10000 // 10 segundos
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados recebidos da fonte externa:', data.length, 'ocorrências');
      
      // Salvar timestamp da última sincronização
      await AsyncStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados externos:', error);
      throw error;
    }
  }

  // ===== SINCRONIZAÇÃO INTELIGENTE =====
  async sincronizarDados() {
    try {
      console.log('Iniciando sincronização...');
      
      // Tentar buscar dados externos primeiro
      const ocorrenciasExternas = await this.buscarOcorrenciasExternas();
      
      // Se conseguiu dados externos, salvar localmente
      await this.salvarOcorrenciasLocal(ocorrenciasExternas);
      
      console.log('Sincronização concluída com sucesso');
      return {
        success: true,
        data: ocorrenciasExternas,
        source: 'external'
      };
    } catch (error) {
      console.log('Falha na sincronização externa, usando dados locais...');
      
      // Se falhar, usar dados locais
      const ocorrenciasLocais = await this.carregarOcorrenciasLocal();
      
      return {
        success: false,
        data: ocorrenciasLocais,
        source: 'local',
        error: error.message
      };
    }
  }

  // ===== ADICIONAR NOVA OCORRÊNCIA =====
  async adicionarOcorrencia(novaOcorrencia) {
    try {
      // Gerar ID único e timestamp
      const ocorrenciaCompleta = {
        ...novaOcorrencia,
        id: this.gerarIdUnico(),
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        sincronizado: false // Marcar como não sincronizado
      };

      // Carregar dados atuais
      const ocorrenciasAtuais = await this.carregarOcorrenciasLocal();
      
      // Adicionar nova ocorrência
      const novasOcorrencias = [...ocorrenciasAtuais, ocorrenciaCompleta];
      
      // Salvar localmente
      await this.salvarOcorrenciasLocal(novasOcorrencias);

      // Tentar sincronizar com servidor em background
      this.sincronizarOcorrenciaPendente(ocorrenciaCompleta);

      return ocorrenciaCompleta;
    } catch (error) {
      console.error('Erro ao adicionar ocorrência:', error);
      throw error;
    }
  }

  // ===== SINCRONIZAÇÃO EM BACKGROUND =====
  async sincronizarOcorrenciaPendente(ocorrencia) {
    try {
      // Substitua pela sua lógica de POST para a API
      const response = await fetch(`${API_BASE_URL}/ocorrencias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ocorrencia)
      });

      if (response.ok) {
        // Atualizar ocorrência como sincronizada
        const ocorrenciasAtuais = await this.carregarOcorrenciasLocal();
        const ocorrenciasAtualizadas = ocorrenciasAtuais.map(oc => 
          oc.id === ocorrencia.id ? { ...oc, sincronizado: true } : oc
        );
        
        await this.salvarOcorrenciasLocal(ocorrenciasAtualizadas);
        console.log('Ocorrência sincronizada com sucesso:', ocorrencia.id);
      }
    } catch (error) {
      console.error('Erro na sincronização em background:', error);
    }
  }

  // ===== UTILITÁRIOS =====
  gerarIdUnico() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async getUltimaSincronizacao() {
    try {
      const timestamp = await AsyncStorage.getItem(LAST_SYNC_KEY);
      return timestamp;
    } catch (error) {
      return null;
    }
  }

  async limparDados() {
    try {
      await AsyncStorage.removeItem(OCORRENCIAS_STORAGE_KEY);
      await AsyncStorage.removeItem(LAST_SYNC_KEY);
      console.log('Dados locais limpos');
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  }
}

export default new DataService();