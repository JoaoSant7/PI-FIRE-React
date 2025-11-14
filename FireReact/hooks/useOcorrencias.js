// hooks/useOcorrencias.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OCORRENCIAS_STORAGE_KEY = '@ocorrencias_data';

export const useOcorrencias = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Carregar dados do AsyncStorage
  const carregarDadosLocais = useCallback(async () => {
    try {
      const dataString = await AsyncStorage.getItem(OCORRENCIAS_STORAGE_KEY);
      if (dataString) {
        const data = JSON.parse(dataString);
        setOcorrencias(data.ocorrencias || []);
        setLastSync(data.timestamp);
        console.log('Dados carregados localmente:', data.ocorrencias.length);
      } else {
        // Dados iniciais mockados se não existir nada
        const dadosIniciais = {
          ocorrencias: [],
          timestamp: new Date().toISOString()
        };
        await AsyncStorage.setItem(OCORRENCIAS_STORAGE_KEY, JSON.stringify(dadosIniciais));
        setOcorrencias([]);
      }
    } catch (err) {
      console.error('Erro ao carregar dados locais:', err);
      setError('Erro ao carregar dados');
      setOcorrencias([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar nova ocorrência
  const adicionarOcorrencia = useCallback(async (novaOcorrencia) => {
    try {
      const ocorrenciaCompleta = {
        ...novaOcorrencia,
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        sincronizado: false
      };

      // Carregar dados atuais
      const dataString = await AsyncStorage.getItem(OCORRENCIAS_STORAGE_KEY);
      const dataAtual = dataString ? JSON.parse(dataString) : { ocorrencias: [] };
      
      // Adicionar nova ocorrência
      const novasOcorrencias = [...dataAtual.ocorrencias, ocorrenciaCompleta];
      const novoData = {
        ocorrencias: novasOcorrencias,
        timestamp: new Date().toISOString()
      };
      
      // Salvar localmente
      await AsyncStorage.setItem(OCORRENCIAS_STORAGE_KEY, JSON.stringify(novoData));
      
      // Atualizar estado
      setOcorrencias(novasOcorrencias);
      setLastSync(novoData.timestamp);
      
      console.log('Ocorrência adicionada:', ocorrenciaCompleta.id);
      return ocorrenciaCompleta;
    } catch (err) {
      console.error('Erro ao adicionar ocorrência:', err);
      setError('Erro ao salvar ocorrência');
      throw err;
    }
  }, []);

  // Atualizar dados
  const atualizarDados = useCallback(async () => {
    setRefreshing(true);
    try {
      await carregarDadosLocais();
      setError(null);
    } catch (err) {
      setError('Erro ao atualizar dados');
    } finally {
      setRefreshing(false);
    }
  }, [carregarDadosLocais]);

  // Recarregar dados
  const recarregarDados = useCallback(async () => {
    setLoading(true);
    await carregarDadosLocais();
  }, [carregarDadosLocais]);

  // Carregar dados iniciais
  useEffect(() => {
    carregarDadosLocais();
  }, [carregarDadosLocais]);

  return {
    ocorrencias,
    loading,
    error,
    lastSync,
    refreshing,
    atualizarDados,
    recarregarDados,
    adicionarOcorrencia
  };
};