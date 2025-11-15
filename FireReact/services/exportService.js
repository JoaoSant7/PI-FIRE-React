// services/exportService.js
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

// Função auxiliar para obter informações formatadas conforme Detalhes da Ocorrência
const getOcorrenciaInfo = (ocorrencia) => {
  // Função melhorada para formatar hora
  const formatarHora = (horaString) => {
    if (!horaString) return "Não informado";
    
    // Se já for uma string de hora no formato HH:MM
    if (typeof horaString === 'string' && horaString.match(/^\d{1,2}:\d{2}$/)) {
      return horaString;
    }
    
    // Se for uma data ISO ou timestamp
    try {
      const data = new Date(horaString);
      if (isNaN(data.getTime())) {
        return "Não informado";
      }
      return data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    } catch (error) {
      return "Não informado";
    }
  };

  // Função para formatar data e hora completa
  const formatarDataHora = (dataHoraString) => {
    if (!dataHoraString) return "Não informado";
    try {
      const data = new Date(dataHoraString);
      if (isNaN(data.getTime())) {
        return "Não informado";
      }
      return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    } catch (error) {
      return "Não informado";
    }
  };

  // Mapeamento mais flexível dos campos
  return {
    // Dados Internos
    dataHora: formatarDataHora(ocorrencia.dataHora || ocorrencia.data || ocorrencia.dataCriacao),
    numeroAviso: ocorrencia.numeroAviso || ocorrencia.numero || ocorrencia.aviso || "Não informado",
    diretoria: ocorrencia.diretoria || ocorrencia.diretoriaRegiao || "Não informado",
    grupamento: ocorrencia.grupamento || ocorrencia.unidade || ocorrencia.equipe || "Não informado",
    pontoBase: ocorrencia.pontoBase || ocorrencia.base || "Não informado",

    // Ocorrência
    natureza: ocorrencia.natureza || ocorrencia.tipo || "Não informado",
    grupoOcorrencia: ocorrencia.grupoOcorrencia || ocorrencia.grupo || "Não informado",
    subgrupoOcorrencia: ocorrencia.subgrupoOcorrencia || ocorrencia.subgrupo || "Não informado",
    situacao: ocorrencia.situacao || ocorrencia.status || "Não informado",
    horaSaidaQuartel: formatarHora(ocorrencia.horaSaidaQuartel || ocorrencia.saidaQuartel || ocorrencia.horaSaida),
    horaChegadaLocal: formatarHora(ocorrencia.horaChegadaLocal || ocorrencia.chegadaLocal || ocorrencia.horaChegada),
    horaSaidaLocal: formatarHora(ocorrencia.horaSaidaLocal || ocorrencia.saidaLocal || ocorrencia.horaFinalizacao),
    vitimaSocorridaSamu: ocorrencia.vitimaSocorridaSamu || ocorrencia.samu || ocorrencia.vitimaSamu || "Não",

    // Informações da Vítima
    vitimaEnvolvida: ocorrencia.vitimaEnvolvida || ocorrencia.vitima || "Não",
    sexo: ocorrencia.sexo || ocorrencia.genero || "Não informado",
    idade: ocorrencia.idade || "Não informado",
    classificacao: ocorrencia.classificacao || ocorrencia.tipoVitima || "Não informado",
    destino: ocorrencia.destino || ocorrencia.localDestino || "Não informado",

    // Viatura e Acionamento
    viaturaEmpregada: ocorrencia.viaturaEmpregada || ocorrencia.viatura || ocorrencia.veiculo || "Não informado",
    numeroViatura: ocorrencia.numeroViatura || ocorrencia.numeroViatura || ocorrencia.viaturaNumero || "Não informado",
    formaAcionamento: ocorrencia.formaAcionamento || ocorrencia.acionamento || ocorrencia.tipoAcionamento || "Não informado",
    localAcionamento: ocorrencia.localAcionamento || ocorrencia.origemAcionamento || "Não informado",

    // Endereço da Ocorrência
    municipio: ocorrencia.municipio || ocorrencia.cidade || "Não informado",
    regiao: ocorrencia.regiao || ocorrencia.zona || "Não informado",
    bairro: ocorrencia.bairro || "Não informado",
    tipoLogradouro: ocorrencia.tipoLogradouro || ocorrencia.tipoVia || "Não informado",
    ais: ocorrencia.ais || ocorrencia.area || "Não informado",
    logradouro: ocorrencia.logradouro || ocorrencia.endereco || ocorrencia.rua || "Não informado",
    latitude: ocorrencia.latitude || ocorrencia.lat || "Não informado",
    longitude: ocorrencia.longitude || ocorrencia.lng || ocorrencia.lon || "Não informado",

    // Informações adicionais para identificação
    id: ocorrencia.id || ocorrencia._id || "N/A",
    descricao: ocorrencia.descricao || ocorrencia.observacao || "Sem descrição",
  };
};

// Serviço para exportar CSV
export const exportToCSV = async (occurrences) => {
  try {
    // Cabeçalhos completos do CSV baseados na estrutura de detalhes
    const headers = 'ID,DataHora,Numero Aviso,Diretoria,Grupamento,Ponto Base,Natureza,Grupo Ocorrencia,Subgrupo Ocorrencia,Situacao,Hora Saida Quartel,Hora Chegada Local,Hora Saida Local,Vitima Socorrida Samu,Vitima Envolvida,Sexo,Idade,Classificacao,Destino,Viatura Empregada,Numero Viatura,Forma Acionamento,Local Acionamento,Municipio,Regiao,Bairro,Tipo Logradouro,AIS,Logradouro,Latitude,Longitude,Descricao\n';
    
    // Dados completos das ocorrências
    const rows = occurrences.map(occ => {
      const info = getOcorrenciaInfo(occ);
      return `"${info.id}","${info.dataHora}","${info.numeroAviso}","${info.diretoria}","${info.grupamento}","${info.pontoBase}","${info.natureza}","${info.grupoOcorrencia}","${info.subgrupoOcorrencia}","${info.situacao}","${info.horaSaidaQuartel}","${info.horaChegadaLocal}","${info.horaSaidaLocal}","${info.vitimaSocorridaSamu}","${info.vitimaEnvolvida}","${info.sexo}","${info.idade}","${info.classificacao}","${info.destino}","${info.viaturaEmpregada}","${info.numeroViatura}","${info.formaAcionamento}","${info.localAcionamento}","${info.municipio}","${info.regiao}","${info.bairro}","${info.tipoLogradouro}","${info.ais}","${info.logradouro}","${info.latitude}","${info.longitude}","${info.descricao}"`;
    }).join('\n');
    
    const csvContent = headers + rows;
    
    // Nome do arquivo
    const fileName = `ocorrencias_bombeiros_${Date.now()}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
    // Salvar arquivo
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8
    });
    
    // Compartilhar arquivo
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    }
    
    return fileUri;
  } catch (error) {
    console.error('Erro ao exportar CSV:', error);
    throw error;
  }
};

// Serviço para exportar PDF
export const exportToPDF = async (occurrences) => {
  try {
    // HTML para o PDF seguindo a estrutura de Detalhes da Ocorrência
    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 15px; 
              line-height: 1.4;
              color: #333;
              font-size: 12px;
            }
            .header { 
              text-align: center; 
              margin-bottom: 20px;
              border-bottom: 2px solid #bc010c;
              padding-bottom: 10px;
            }
            .header h1 { 
              color: #bc010c; 
              margin: 0;
              font-size: 16px;
            }
            .header .subtitle {
              color: #666;
              font-size: 11px;
              margin-top: 3px;
            }
            .occurrence { 
              margin: 15px 0;
              page-break-inside: avoid;
            }
            .occurrence-header {
              background-color: #bc010c;
              color: white;
              padding: 8px 12px;
              font-weight: bold;
              border-radius: 4px 4px 0 0;
              font-size: 13px;
            }
            .section {
              margin: 12px 0;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
            .section-title {
              background-color: #f5f5f5;
              padding: 8px 12px;
              font-weight: bold;
              border-bottom: 1px solid #ddd;
              font-size: 13px;
            }
            .section-content {
              padding: 10px 12px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
            }
            .info-item {
              margin: 4px 0;
            }
            .info-label {
              font-weight: bold;
              color: #555;
              font-size: 11px;
            }
            .info-value {
              color: #333;
              font-size: 11px;
            }
            .full-width {
              grid-column: 1 / -1;
            }
            .description-box {
              background-color: #f9f9f9;
              padding: 8px;
              border-radius: 4px;
              border-left: 3px solid #bc010c;
              margin: 8px 0;
              font-size: 11px;
              white-space: pre-line;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 10px;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
            .page-break {
              page-break-before: always;
            }
            @media print {
              body { margin: 10px; }
              .occurrence { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>RELATÓRIO DE OCORRÊNCIAS - CORPO DE BOMBEIROS</h1>
            <div class="subtitle">
              Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')} | 
              Total: ${occurrences.length} ocorrência(s)
            </div>
          </div>

          ${occurrences.map((occ, index) => {
            const info = getOcorrenciaInfo(occ);
            
            return `
              <div class="occurrence">
                <div class="occurrence-header">
                  OCORRÊNCIA #${info.id} - ${info.natureza}
                </div>

                <!-- Dados Internos -->
                <div class="section">
                  <div class="section-title">DADOS INTERNOS</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Data e Hora:</div>
                        <div class="info-value">${info.dataHora}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Número do Aviso:</div>
                        <div class="info-value">${info.numeroAviso}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Diretoria:</div>
                        <div class="info-value">${info.diretoria}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Grupamento:</div>
                        <div class="info-value">${info.grupamento}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Ponto Base:</div>
                        <div class="info-value">${info.pontoBase}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Ocorrência -->
                <div class="section">
                  <div class="section-title">OCORRÊNCIA</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Natureza:</div>
                        <div class="info-value">${info.natureza}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Grupo da Ocorrência:</div>
                        <div class="info-value">${info.grupoOcorrencia}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Subgrupo da Ocorrência:</div>
                        <div class="info-value">${info.subgrupoOcorrencia}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Situação:</div>
                        <div class="info-value">${info.situacao}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Hora Saída do Quartel:</div>
                        <div class="info-value">${info.horaSaidaQuartel}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Hora Chegada Local:</div>
                        <div class="info-value">${info.horaChegadaLocal}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Hora Saída Local:</div>
                        <div class="info-value">${info.horaSaidaLocal}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Vítima Socorrida pelo Samu:</div>
                        <div class="info-value">${info.vitimaSocorridaSamu}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Informações da Vítima -->
                <div class="section">
                  <div class="section-title">INFORMAÇÕES DA VÍTIMA</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Vítima Envolvida:</div>
                        <div class="info-value">${info.vitimaEnvolvida}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Sexo:</div>
                        <div class="info-value">${info.sexo}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Idade:</div>
                        <div class="info-value">${info.idade}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Classificação:</div>
                        <div class="info-value">${info.classificacao}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Destino:</div>
                        <div class="info-value">${info.destino}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Viatura e Acionamento -->
                <div class="section">
                  <div class="section-title">VIATURA E ACIONAMENTO</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Viatura Empregada:</div>
                        <div class="info-value">${info.viaturaEmpregada}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Número da Viatura:</div>
                        <div class="info-value">${info.numeroViatura}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Forma de Acionamento:</div>
                        <div class="info-value">${info.formaAcionamento}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Local do Acionamento:</div>
                        <div class="info-value">${info.localAcionamento}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Endereço da Ocorrência -->
                <div class="section">
                  <div class="section-title">ENDEREÇO DA OCORRÊNCIA</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Município:</div>
                        <div class="info-value">${info.municipio}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Região:</div>
                        <div class="info-value">${info.regiao}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Bairro:</div>
                        <div class="info-value">${info.bairro}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Tipo de Logradouro:</div>
                        <div class="info-value">${info.tipoLogradouro}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">AIS:</div>
                        <div class="info-value">${info.ais}</div>
                      </div>
                      <div class="info-item full-width">
                        <div class="info-label">Logradouro:</div>
                        <div class="info-value">${info.logradouro}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Latitude:</div>
                        <div class="info-value">${info.latitude}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Longitude:</div>
                        <div class="info-value">${info.longitude}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Descrição -->
                <div class="section">
                  <div class="section-title">DESCRIÇÃO</div>
                  <div class="section-content">
                    <div class="description-box">
                      ${info.descricao}
                    </div>
                  </div>
                </div>

                ${index < occurrences.length - 1 ? '<div class="page-break"></div>' : ''}
              </div>
            `;
          }).join('')}

          <div class="footer">
            Documento gerado automaticamente pelo Sistema de Ocorrências do Corpo de Bombeiros
          </div>
        </body>
      </html>
    `;
    
    // Gerar PDF
    const { uri } = await Print.printToFileAsync({ 
      html,
      base64: false
    });
    
    // Compartilhar PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Relatório de Ocorrências - Bombeiros'
      });
    }
    
    return uri;
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    throw error;
  }
};