// screens/NovaOcorrenciaScreen.js
import React, { useState, useEffect } from "react";
import { REGIOES } from "../constants/pickerData";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Keyboard,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

// Import dos componentes
import Section from "../components/Section";
import InputGroup from "../components/InputGroup";
import DateTimePickerInput from "../components/DateTimePickerInput";
import DatePickerInput from "../components/DatePickerInput";
import TextInput from "../components/TextInput";
import SearchablePicker from "../components/SearchablePicker";

// Import do ícone de câmera SVG
import CameraIcon from "../components/CameraIcon";

// Import do contexto de Ocorrências
import { useOcorrenciasContext } from "../contexts/OcorrenciasContext";

// Import do contexto de Localização
import { useLocation } from "../contexts/LocationContext";

// Import dos dados dos pickers
import {
  GRUPAMENTOS,
  NATUREZAS,
  GRUPOS_OCORRENCIA,
  SUBGRUPOS_OCORRENCIA,
  SITUACOES,
  SEXOS,
  CLASSIFICACOES,
  DESTINOS,
  ACIONAMENTOS,
  TIPOS_LOGRADOURO,
} from "../constants/pickerData";

// Import dos Municípios
import { MUNICIPIOS_PERNAMBUCO } from "../constants/pickerData";

// Import dos estilos
import styles, { createNovaOcorrenciaStyles } from "../styles/NovaOcorrenciaStyles";
import { useFontScale } from "../hooks/useFontScale";

// Constantes para os motivos de não atendimento/sem atuação
const MOTIVOS_NAO_ATENDIMENTO = [
  { label: "Selecione o motivo de não atendimento", value: "" },
  { label: "Vítima Socorrida pelo Samu", value: "Vítima Socorrida pelo Samu" },
  {
    label: "Vítima Socorrida pelos Populares",
    value: "Vítima Socorrida pelos Populares",
  },
  { label: "Recusou Atendimento", value: "Recusou Atendimento" },
  { label: "Outro", value: "Outro" },
];

// Função para gerar o número do aviso no formato YYYYMMDDHHMMSS + sufixo
const gerarNumeroAviso = () => {
  const agora = new Date();

  // Formata cada componente da data/hora para 2 dígitos
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  // Gera um sufixo aleatório de 4 dígitos (entre 1000 e 9999)
  const sufixo = Math.floor(1000 + Math.random() * 9000);

  // Retorna no formato: YYYYMMDDHHMMSS + sufixo (18 dígitos)
  return `${ano}${mes}${dia}${horas}${minutos}${segundos}${sufixo}`;
};

// Função de validação separada para melhor organização - ATUALIZADA
const validateRequiredFields = (
  formData,
  dataHora,
  horaSaidaQuartel,
  horaLocal,
  horaSaidaLocal
) => {
  const camposObrigatorios = [
    { campo: "Data e Hora", preenchido: dataHora !== null, valor: dataHora },
    {
      campo: "Diretoria",
      preenchido: !!formData.diretoria?.trim(),
      valor: formData.diretoria,
    },
    {
      campo: "Grupamento",
      preenchido: !!formData.grupamento?.trim(),
      valor: formData.grupamento,
    },
    {
      campo: "Ponto Base",
      preenchido: !!formData.pontoBase?.trim(),
      valor: formData.pontoBase,
    },
    {
      campo: "Natureza da Ocorrência",
      preenchido: !!formData.natureza?.trim(),
      valor: formData.natureza,
    },
    {
      campo: "Grupo da Ocorrência",
      preenchido: !!formData.grupoOcorrencia?.trim(),
      valor: formData.grupoOcorrencia,
    },
    {
      campo: "Subgrupo da Ocorrência",
      preenchido: !!formData.subgrupoOcorrencia?.trim(),
      valor: formData.subgrupoOcorrencia,
    },
    {
      campo: "Situação da Ocorrência",
      preenchido: !!formData.situacao?.trim(),
      valor: formData.situacao,
    },
    {
      campo: "Saída do Quartel",
      preenchido: horaSaidaQuartel !== null,
      valor: horaSaidaQuartel,
    },
    {
      campo: "Chegada no Local",
      preenchido: horaLocal !== null,
      valor: horaLocal,
    },
    {
      campo: "Saída do Local",
      preenchido: horaSaidaLocal !== null,
      valor: horaSaidaLocal,
    },
    {
      campo: "Município",
      preenchido: !!formData.municipio?.trim(),
      valor: formData.municipio,
    },
    {
      campo: "Região",
      preenchido: !!formData.regiao?.trim(),
      valor: formData.regiao,
    },
    {
      campo: "Tipo de Logradouro",
      preenchido: !!formData.tipoLogradouro?.trim(),
      valor: formData.tipoLogradouro,
    },
    {
      campo: "Logradouro",
      preenchido: !!formData.logradouro?.trim(),
      valor: formData.logradouro,
    },
  ];

  return camposObrigatorios.filter((campo) => !campo.preenchido);
};

const NovaOcorrenciaScreen = ({ navigation }) => {
  // Hook para escala de fonte
  const { scaleFont } = useFontScale();
  const dynamicStyles = React.useMemo(() => createNovaOcorrenciaStyles(scaleFont), [scaleFont]);

  // Hook do contexto de Ocorrência
  const { adicionarOcorrencia } = useOcorrenciasContext();

  // Hook do contexto de Localização
  const { currentLocation, getCurrentLocation } = useLocation();

  // Estado principal do formulário
  const [formData, setFormData] = useState({
    // Dados Internos - númeroAviso será gerado automaticamente
    numeroAviso: gerarNumeroAviso(),
    diretoria: "DIM",
    grupamento: "",
    pontoBase: "",

    // Ocorrência
    natureza: "",
    grupoOcorrencia: "",
    subgrupoOcorrencia: "",
    situacao: "",
    motivoNaoAtendida: "",
    motivoOutro: "",
    vitimaSamu: false,

    // Vítima
    envolvida: false,
    sexo: "",
    idade: "",
    classificacao: "",
    destino: "",

    // Viatura
    viatura: "",
    numeroViatura: "",
    acionamento: "",
    localAcionamento: "",

    // Endereço
    municipio: "",
    regiao: "",
    bairro: "",
    tipoLogradouro: "",
    ais: "",
    logradouro: "",
    latitude: "",
    longitude: "",
  });

  // Estados separados para datas e horários
  const [dataHora, setDataHora] = useState(new Date());
  const [horaSaidaQuartel, setHoraSaidaQuartel] = useState(null);
  const [horaLocal, setHoraLocal] = useState(null);
  const [horaSaidaLocal, setHoraSaidaLocal] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [fotoOcorrencia, setFotoOcorrencia] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  // Efeito para atualizar o número do aviso quando a data/hora mudar
  useEffect(() => {
    // Atualiza o número do aviso quando a data/hora principal for alterada
    setFormData((prev) => ({
      ...prev,
      numeroAviso: gerarNumeroAviso(),
    }));
  }, [dataHora]);

  useEffect(() => {
    if (
      currentLocation.municipio ||
      currentLocation.latitude ||
      currentLocation.longitude
    ) {
      console.log(
        "Localização recebida para preenchimento:",
        currentLocation
      );

      let municipioValue = currentLocation.municipio;

      if (currentLocation.municipio) {
        // Função para normalizar strings (remover acentos e tornar minúsculo)
        const normalizarTexto = (texto) => {
          if (!texto) return "";
          return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
        };

        const municipioNormalizado = normalizarTexto(currentLocation.municipio);

        // Busca exata primeiro
        const municipioEncontrado = MUNICIPIOS_PERNAMBUCO.find(
          (item) =>
            normalizarTexto(item.label) === municipioNormalizado ||
            normalizarTexto(item.value) === municipioNormalizado
        );

        if (municipioEncontrado) {
          municipioValue = municipioEncontrado.value;
          console.log("Município encontrado (exato):", municipioValue);
        } else {
          // Busca por correspondência parcial
          const municipioParcial = MUNICIPIOS_PERNAMBUCO.find(
            (item) =>
              normalizarTexto(item.label).includes(municipioNormalizado) ||
              normalizarTexto(item.value).includes(municipioNormalizado) ||
              municipioNormalizado.includes(normalizarTexto(item.label)) ||
              municipioNormalizado.includes(normalizarTexto(item.value))
          );

          if (municipioParcial) {
            municipioValue = municipioParcial.value;
            console.log("Município encontrado (parcial):", municipioValue);
          } else {
            console.log(
              "Município NÃO encontrado na lista:",
              currentLocation.municipio
            );
            console.log(
              "Municípios disponíveis:",
              MUNICIPIOS_PERNAMBUCO.map((m) => m.value)
            );
          }
        }
      }

      setFormData((prev) => ({
        ...prev,
        municipio: municipioValue || prev.municipio,
        bairro: currentLocation.bairro || prev.bairro,
        logradouro: currentLocation.endereco || prev.logradouro,
        latitude: currentLocation.latitude || prev.latitude,
        longitude: currentLocation.longitude || prev.longitude,
      }));

      // Se o município foi preenchido, mostre uma mensagem
      if (municipioValue) {
        console.log("Município definido no formulário:", municipioValue);
      }
    }
  }, [currentLocation]);

  // Função para atualizar o formData
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Função para obter localização automática
  const handleGetLocation = async () => {
    try {
      setLocationLoading(true);

      Alert.alert(
        "Localização Automática",
        "Deseja usar sua localização atual para preencher automaticamente os campos de endereço?",
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => setLocationLoading(false),
          },
          {
            text: "Usar Localização",
            onPress: async () => {
              try {
                const locationData = await getCurrentLocation();

                if (!locationData.municipio) {
                  Alert.alert(
                    "Atenção",
                    "Localização obtida, mas o município não foi detectado automaticamente. Por favor, selecione o município manualmente.",
                    [{ text: "OK" }]
                  );
                } else {
                  Alert.alert(
                    "Sucesso",
                    "Localização obtida com sucesso! Campos preenchidos automaticamente.",
                    [{ text: "OK" }]
                  );
                }
              } catch (error) {
                Alert.alert(
                  "Erro de Localização",
                  "Não foi possível obter a localização. Verifique as permissões do app.",
                  [{ text: "OK" }]
                );
              } finally {
                setLocationLoading(false);
              }
            },
          },
        ]
      );
    } catch (error) {
      setLocationLoading(false);
      Alert.alert("Erro", "Não foi possível acessar a localização.");
    }
  };

  // Novas funções com expo-image-picker

  // Função para abrir a câmera
  const abrirCamera = async () => {
    console.log("Abrindo câmera...");

    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão Negada",
        "Não é possível acessar a câmera sem permissão."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    console.log("Resultado da câmera:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFotoOcorrencia(result.assets[0]);
    }
  };

  // Função para abrir a galeria
  const abrirGaleria = async () => {
    console.log("Abrindo galeria...");

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão Negada",
        "Não é possível acessar a galeria sem permissão."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    console.log("Resultado da galeria:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFotoOcorrencia(result.assets[0]);
    }
  };

  // Função para mostrar opções de foto
  const mostrarOpcoesFoto = () => {
    console.log("Mostrando opções de foto...");

    Alert.alert("Adicionar Foto", "Como deseja adicionar a foto?", [
      {
        text: "Tirar Foto",
        onPress: () => {
          console.log("Usuário escolheu tirar foto");
          abrirCamera();
        },
      },
      {
        text: "Escolher da Galeria",
        onPress: () => {
          console.log("Usuário escolheu galeria");
          abrirGaleria();
        },
      },
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => console.log("Usuário cancelou"),
      },
    ]);
  };

  // Função para remover a foto
  const removerFoto = () => {
    Alert.alert("Remover Foto", "Tem certeza que deseja remover a foto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => setFotoOcorrencia(null),
      },
    ]);
  };

  // Função para lidar com mudança de data
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataHora(selectedDate);
    }
  };

  // Função para validar e formatar a idade
  const handleIdadeChange = (value) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/[^0-9]/g, "");

    // Se estiver vazio, atualiza normalmente
    if (numericValue === "") {
      updateFormData("idade", "");
      return;
    }

    // Converte para número e limita a 125
    let idade = parseInt(numericValue, 10);
    if (idade > 125) {
      idade = 125;
    }

    // Atualiza o valor formatado
    updateFormData("idade", idade.toString());
  };

  // Função para validar e formatar o AIS
  const handleAISChange = (value) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/[^0-9]/g, "");

    // Permite que o usuário apague completamente
    if (numericValue === "") {
      updateFormData("ais", "");
      return;
    }

    // Converte para número
    let ais = parseInt(numericValue, 10);

    // Valida o intervalo 1-10
    if (ais < 1) {
      ais = 1;
    } else if (ais > 10) {
      ais = 10;
    }

    // Atualiza o valor (sem formatação automática para permitir edição)
    updateFormData("ais", ais.toString());
  };

  // Função para formatar o AIS quando o campo perde o foco
  const handleAISBlur = () => {
    if (formData.ais && formData.ais !== "") {
      const aisNumber = parseInt(formData.ais, 10);
      if (!isNaN(aisNumber) && aisNumber >= 1 && aisNumber <= 10) {
        // Formata com 2 dígitos apenas no blur
        const formattedAIS =
          aisNumber < 10 ? `0${aisNumber}` : aisNumber.toString();
        updateFormData("ais", formattedAIS);
      }
    }
  };

  // Função para converter Date para string HH:MM:SS
  const formatHoraToString = (date) => {
    if (!date) return "";
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Função para salvar a ocorrência - ATUALIZADA
  const handleSave = async () => {
    // Validação dos campos obrigatórios
    const camposVazios = validateRequiredFields(
      formData,
      dataHora,
      horaSaidaQuartel,
      horaLocal,
      horaSaidaLocal
    );

    if (camposVazios.length > 0) {
      const camposLista = camposVazios
        .map((campo) => `• ${campo.campo}`)
        .join("\n");
      Alert.alert(
        "Campos Obrigatórios",
        `Os seguintes campos são obrigatórios:\n\n${camposLista}`,
        [{ text: "OK" }]
      );
      return;
    }

    if (enviando) return;

    // Pop-up de confirmação
    Alert.alert(
      "Confirmar Salvamento",
      `Tem certeza que deseja salvar esta ocorrência?${
        fotoOcorrencia ? "\n\n Uma foto será incluída no registro." : ""
      }`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              setEnviando(true);

              // Calcular tempo de resposta se houver horários
              let tempoResposta = 0;
              if (horaSaidaQuartel && horaLocal) {
                const saidaSegundos =
                  horaSaidaQuartel.getHours() * 3600 +
                  horaSaidaQuartel.getMinutes() * 60 +
                  horaSaidaQuartel.getSeconds();
                const localSegundos =
                  horaLocal.getHours() * 3600 +
                  horaLocal.getMinutes() * 60 +
                  horaLocal.getSeconds();
                tempoResposta = Math.max(0, localSegundos - saidaSegundos) / 60; // Em minutos
              }

              //Mapeamento para os status específicos
              const mapStatus = (situacao) => {
                // Retorna o próprio texto da situação para manter consistência
                // A ListarOcorrenciasScreen já filtra os status permitidos
                return situacao;
              };

              // Formatar AIS antes de salvar (se necessário)
              let aisToSave = formData.ais;
              if (aisToSave && aisToSave !== "") {
                const aisNumber = parseInt(aisToSave, 10);
                if (!isNaN(aisNumber) && aisNumber >= 1 && aisNumber <= 10) {
                  aisToSave =
                    aisNumber < 10 ? `0${aisNumber}` : aisNumber.toString();
                }
              }

              // Monta objeto completo da ocorrência para o Dashboard
              // Monta objeto completo da ocorrência para o Dashboard
              const ocorrenciaData = {
                // Dados básicos para Dashboard
                id: `ocorrencia_${Date.now()}_${Math.random()
                  .toString(36)
                  .substr(2, 9)}`,
                tipo: formData.natureza,
                descricao: `${formData.natureza} - ${
                  formData.grupoOcorrencia || ""
                }`.trim(),
                localizacao:
                  formData.logradouro ||
                  formData.bairro ||
                  formData.municipio ||
                  "Local não informado",
                regiao: formData.regiao,

                //Usa a situação diretamente do formulário
                status: formData.situacao,
                situacao: formData.situacao, // Mantém também no campo original

                dataHora: dataHora.toISOString(),
                dataCriacao: new Date().toISOString(),
                tempoResposta: Math.round(tempoResposta),

                // Horários formatados como strings
                horaSaidaQuartel: formatHoraToString(horaSaidaQuartel),
                horaChegadaLocal: formatHoraToString(horaLocal),
                horaSaidaLocal: formatHoraToString(horaSaidaLocal),

                fotos: fotoOcorrencia ? [fotoOcorrencia.uri] : [],

                // Mantém todos os dados originais para detalhes
                ...formData,
                ais: aisToSave, // Usa o AIS formatado

                // Campos adicionais para compatibilidade
                numeroAviso: formData.numeroAviso,
                grupamento: formData.grupamento,
                situacao: formData.situacao,
                natureza: formData.natureza,
                grupoOcorrencia: formData.grupoOcorrencia,
                subgrupoOcorrencia: formData.subgrupoOcorrencia,
              };

              console.log("Salvando ocorrência:", ocorrenciaData);

              // Salva no contexto
              await adicionarOcorrencia(ocorrenciaData);

              // Feedback de sucesso
              Alert.alert(
                "Sucesso!",
                `Ocorrência registrada com sucesso${
                  fotoOcorrencia ? " incluindo a foto" : ""
                }`,
                [
                  {
                    text: "OK",
                    onPress: () =>
                      navigation.navigate("OcorrenciaRegistrada", {
                        ocorrencia: ocorrenciaData,
                      }),
                  },
                ]
              );
            } catch (error) {
              console.error("Erro ao salvar ocorrência:", error);
              Alert.alert(
                "Erro",
                "Não foi possível salvar a ocorrência: " + error.message
              );
            } finally {
              setEnviando(false);
            }
          },
        },
      ]
    );
  };

  // Função para limpar o formulário
  const handleClear = () => {
    Alert.alert(
      "Limpar Formulário",
      "Tem certeza que deseja limpar todos os campos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: () => {
            setFormData({
              numeroAviso: gerarNumeroAviso(), // GERA NOVO NÚMERO AO LIMPAR
              diretoria: "DIM",
              grupamento: "",
              pontoBase: "",
              natureza: "",
              grupoOcorrencia: "",
              subgrupoOcorrencia: "",
              situacao: "",
              motivoNaoAtendida: "",
              motivoOutro: "",
              vitimaSamu: false,
              envolvida: false,
              sexo: "",
              idade: "",
              classificacao: "",
              destino: "",
              viatura: "",
              numeroViatura: "",
              acionamento: "",
              localAcionamento: "",
              municipio: "",
              regiao: "",
              bairro: "",
              tipoLogradouro: "",
              ais: "",
              logradouro: "",
              latitude: "",
              longitude: "",
            });
            setDataHora(new Date());
            setHoraSaidaQuartel(null);
            setHoraLocal(null);
            setHoraSaidaLocal(null);
            setFotoOcorrencia(null);
          },
        },
      ]
    );
  };

  // Verifica se deve mostrar o campo de motivo
  const shouldShowMotivo =
    formData.situacao === "Não Atendida" || formData.situacao === "Sem Atuação";

  // Função para fechar o teclado
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={dynamicStyles.container}>
      <KeyboardAwareScrollView
        style={dynamicStyles.scrollView}
        contentContainerStyle={dynamicStyles.scrollContent}
        enableOnAndroid={true}
        extraScrollHeight={100}
        extraHeight={120}
        keyboardShouldPersistTaps="handled"
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
      >
        {}
        <Section title="Dados Internos">
          <InputGroup label="Data e Hora" required>
            <DatePickerInput
              value={dataHora}
              onDateChange={onDateChange}
              showPicker={showDatePicker}
              setShowPicker={setShowDatePicker}
              placeholder="Selecione a data e hora"
            />
          </InputGroup>

          <InputGroup label="Número do Aviso (I-NETOISPATCHER)">
            <TextInput
              value={formData.numeroAviso}
              onChangeText={(value) => updateFormData("numeroAviso", value)}
              placeholder="Número gerado automaticamente"
              editable={true}
              style={dynamicStyles.autoGeneratedInput}
            />
            <Text style={dynamicStyles.helperText}>
              Formato: YYYYMMDDHHMMSS + sufixo único
            </Text>
          </InputGroup>

          <InputGroup label="Diretoria" required>
            <TextInput
              value={formData.diretoria}
              onChangeText={(value) => updateFormData("diretoria", value)}
              placeholder="Digite a diretoria"
            />
          </InputGroup>

          <InputGroup label="Grupamento" required>
            <SearchablePicker
              selectedValue={formData.grupamento}
              onValueChange={(value) => updateFormData("grupamento", value)}
              items={GRUPAMENTOS}
              placeholder="Selecione o grupamento"
            />
          </InputGroup>

          <InputGroup label="Ponto Base" required>
            <TextInput
              value={formData.pontoBase}
              onChangeText={(value) => updateFormData("pontoBase", value)}
              placeholder="Digite o ponto base"
            />
          </InputGroup>
        </Section>

        {}
        <Section title="Ocorrência">
          <InputGroup label="Natureza da Ocorrência" required>
            <SearchablePicker
              selectedValue={formData.natureza}
              onValueChange={(value) => updateFormData("natureza", value)}
              items={NATUREZAS}
              placeholder="Selecione a Natureza da Ocorrência"
            />
          </InputGroup>

          {}
          <InputGroup label="Grupo da Ocorrência" required>
            <SearchablePicker
              selectedValue={formData.grupoOcorrencia}
              onValueChange={(value) =>
                updateFormData("grupoOcorrencia", value)
              }
              items={GRUPOS_OCORRENCIA}
              placeholder="Selecione o Grupo de Ocorrência"
            />
          </InputGroup>

          {}
          <InputGroup label="Subgrupo da Ocorrência" required>
            <SearchablePicker
              selectedValue={formData.subgrupoOcorrencia}
              onValueChange={(value) =>
                updateFormData("subgrupoOcorrencia", value)
              }
              items={SUBGRUPOS_OCORRENCIA}
              placeholder="Selecione o Subgrupo da Ocorrência"
            />
          </InputGroup>

          <InputGroup label="Situação da Ocorrência" required>
            <SearchablePicker
              selectedValue={formData.situacao}
              onValueChange={(value) => updateFormData("situacao", value)}
              items={SITUACOES}
              placeholder="Selecione a Situação da Ocorrência"
            />
          </InputGroup>

          {}
          <View style={dynamicStyles.row}>
            <InputGroup label="Saída do Quartel" required style={dynamicStyles.flex1}>
              <DateTimePickerInput
                value={horaSaidaQuartel}
                onDateTimeChange={setHoraSaidaQuartel}
                placeholder="Selecione a hora"
                mode="time"
              />
            </InputGroup>

            <InputGroup
              label="Chegada no Local"
              required
              style={[dynamicStyles.flex1, dynamicStyles.marginLeft]}
            >
              <DateTimePickerInput
                value={horaLocal}
                onDateTimeChange={setHoraLocal}
                placeholder="Selecione a hora"
                mode="time"
              />
            </InputGroup>
          </View>

          {}
          {shouldShowMotivo && (
            <>
              <InputGroup label="Motivo do Não Atendimento">
                <SearchablePicker
                  selectedValue={formData.motivoNaoAtendida}
                  onValueChange={(value) =>
                    updateFormData("motivoNaoAtendida", value)
                  }
                  items={MOTIVOS_NAO_ATENDIMENTO}
                  placeholder="Selecione o motivo"
                />
              </InputGroup>

              {}
              {formData.motivoNaoAtendida === "Outro" && (
                <InputGroup label="Descreva o motivo (máx. 100 caracteres)">
                  <TextInput
                    value={formData.motivoOutro}
                    onChangeText={(value) => {
                      // Limita a 100 caracteres
                      if (value.length <= 100) {
                        updateFormData("motivoOutro", value);
                      }
                    }}
                    placeholder="Digite o motivo..."
                    multiline
                    numberOfLines={3}
                    style={dynamicStyles.textArea}
                    maxLength={100}
                  />
                  <Text style={dynamicStyles.charCounter}>
                    {formData.motivoOutro.length}/100 caracteres
                  </Text>
                </InputGroup>
              )}
            </>
          )}

          <InputGroup label="Saída do Local" required>
            <DateTimePickerInput
              value={horaSaidaLocal}
              onDateTimeChange={setHoraSaidaLocal}
              placeholder="Selecione a hora"
              mode="time"
            />
          </InputGroup>

          {}
          <InputGroup label="Vítima socorrida pelo SAMU">
            <View style={dynamicStyles.buttonGroup}>
              <TouchableOpacity
                style={[
                  dynamicStyles.optionButton,
                  formData.vitimaSamu
                    ? dynamicStyles.optionButtonSelected
                    : dynamicStyles.optionButtonUnselected,
                ]}
                onPress={() => updateFormData("vitimaSamu", true)}
              >
                <Text
                  style={[
                    dynamicStyles.optionButtonText,
                    formData.vitimaSamu
                      ? dynamicStyles.optionButtonTextSelected
                      : dynamicStyles.optionButtonTextUnselected,
                  ]}
                >
                  SIM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  dynamicStyles.optionButton,
                  !formData.vitimaSamu
                    ? dynamicStyles.optionButtonSelected
                    : dynamicStyles.optionButtonUnselected,
                ]}
                onPress={() => updateFormData("vitimaSamu", false)}
              >
                <Text
                  style={[
                    dynamicStyles.optionButtonText,
                    !formData.vitimaSamu
                      ? dynamicStyles.optionButtonTextSelected
                      : dynamicStyles.optionButtonTextUnselected,
                  ]}
                >
                  NÃO
                </Text>
              </TouchableOpacity>
            </View>
          </InputGroup>
        </Section>

        {}
        <Section title="Informações da Vítima">
          {}
          <InputGroup label="Vítima Envolvida">
            <View style={dynamicStyles.buttonGroup}>
              <TouchableOpacity
                style={[
                  dynamicStyles.optionButton,
                  formData.envolvida
                    ? dynamicStyles.optionButtonSelected
                    : dynamicStyles.optionButtonUnselected,
                ]}
                onPress={() => updateFormData("envolvida", true)}
              >
                <Text
                  style={[
                    dynamicStyles.optionButtonText,
                    formData.envolvida
                      ? dynamicStyles.optionButtonTextSelected
                      : dynamicStyles.optionButtonTextUnselected,
                  ]}
                >
                  SIM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  dynamicStyles.optionButton,
                  !formData.envolvida
                    ? dynamicStyles.optionButtonSelected
                    : dynamicStyles.optionButtonUnselected,
                ]}
                onPress={() => updateFormData("envolvida", false)}
              >
                <Text
                  style={[
                    dynamicStyles.optionButtonText,
                    !formData.envolvida
                      ? dynamicStyles.optionButtonTextSelected
                      : dynamicStyles.optionButtonTextUnselected,
                  ]}
                >
                  NÃO
                </Text>
              </TouchableOpacity>
            </View>
          </InputGroup>

          <InputGroup label="Sexo da Vítima">
            <SearchablePicker
              selectedValue={formData.sexo}
              onValueChange={(value) => updateFormData("sexo", value)}
              items={SEXOS}
              placeholder="Selecione o sexo da vítima"
            />
          </InputGroup>

          <InputGroup label="Idade da Vítima">
            <TextInput
              value={formData.idade}
              onChangeText={handleIdadeChange}
              placeholder="Digite a idade (0-125)"
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={dynamicStyles.helperText}>Idade limitada a 125 anos</Text>
          </InputGroup>

          <InputGroup label="Classificação da Vítima">
            <SearchablePicker
              selectedValue={formData.classificacao}
              onValueChange={(value) => updateFormData("classificacao", value)}
              items={CLASSIFICACOES}
              placeholder="Selecione a Classificação da Vítima"
            />
          </InputGroup>

          <InputGroup label="Destino da Vítima">
            <SearchablePicker
              selectedValue={formData.destino}
              onValueChange={(value) => updateFormData("destino", value)}
              items={DESTINOS}
              placeholder="Selecione o Destino da Vítima"
            />
          </InputGroup>
        </Section>

        {}
        <Section title="Viatura e Acionamento">
          <InputGroup label="Viatura Empregada">
            <TextInput
              value={formData.viatura}
              onChangeText={(value) => updateFormData("viatura", value)}
              placeholder="Digite a viatura empregada"
            />
          </InputGroup>

          <InputGroup label="Número da Viatura">
            <TextInput
              value={formData.numeroViatura}
              onChangeText={(value) => updateFormData("numeroViatura", value)}
              placeholder="Digite o número da viatura"
            />
          </InputGroup>

          <InputGroup label="Forma de Acionamento">
            <SearchablePicker
              selectedValue={formData.acionamento}
              onValueChange={(value) => updateFormData("acionamento", value)}
              items={ACIONAMENTOS}
              placeholder="Selecione a Forma de Acionamento"
            />
          </InputGroup>

          <InputGroup label="Local do Acionamento">
            <TextInput
              value={formData.localAcionamento}
              onChangeText={(value) =>
                updateFormData("localAcionamento", value)
              }
              placeholder="Digite o local do acionamento"
            />
          </InputGroup>
        </Section>

        {}
        <Section title="Endereço da Ocorrência">
          {}
          <View style={dynamicStyles.locationButtonContainer}>
            <TouchableOpacity
              style={[
                dynamicStyles.locationButton,
                locationLoading && dynamicStyles.locationButtonDisabled,
              ]}
              onPress={handleGetLocation}
              disabled={locationLoading}
            >
              {locationLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={dynamicStyles.locationButtonText}>
                  Usar Minha Localização Atual
                </Text>
              )}
            </TouchableOpacity>
            {currentLocation.error && (
              <Text style={dynamicStyles.locationErrorText}>
                Erro: {currentLocation.error}
              </Text>
            )}
          </View>

          <InputGroup label="Município" required>
            <SearchablePicker
              selectedValue={formData.municipio}
              onValueChange={(value) => updateFormData("municipio", value)}
              items={MUNICIPIOS_PERNAMBUCO}
              placeholder="Selecione o município"
            />
          </InputGroup>

          <InputGroup label="Região" required>
            <SearchablePicker
              selectedValue={formData.regiao}
              onValueChange={(value) => updateFormData("regiao", value)}
              items={REGIOES}
              placeholder="Selecione a região"
            />
          </InputGroup>

          <InputGroup label="Bairro">
            <TextInput
              value={formData.bairro}
              onChangeText={(value) => updateFormData("bairro", value)}
              placeholder="Digite o bairro"
            />
          </InputGroup>

          <InputGroup label="Tipo de Logradouro" required>
            <SearchablePicker
              selectedValue={formData.tipoLogradouro}
              onValueChange={(value) => updateFormData("tipoLogradouro", value)}
              items={TIPOS_LOGRADOURO}
              placeholder="Selecione o Tipo de Logradouro"
            />
          </InputGroup>

          <InputGroup label="AIS">
            <TextInput
              value={formData.ais}
              onChangeText={handleAISChange}
              onBlur={handleAISBlur}
              placeholder="AIS 1-10"
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={dynamicStyles.helperText}>AIS deve ser entre 1 e 10</Text>
          </InputGroup>

          <InputGroup label="Logradouro" required>
            <TextInput
              value={formData.logradouro}
              onChangeText={(value) => updateFormData("logradouro", value)}
              placeholder="Digite o logradouro"
            />
          </InputGroup>

          <View style={dynamicStyles.row}>
            <InputGroup label="Latitude" style={dynamicStyles.flex1}>
              <TextInput
                value={formData.latitude}
                onChangeText={(value) => updateFormData("latitude", value)}
                placeholder="Digite a latitude"
                keyboardType="numbers-and-punctuation"
              />
            </InputGroup>

            <InputGroup
              label="Longitude"
              style={[dynamicStyles.flex1, dynamicStyles.marginLeft]}
            >
              <TextInput
                value={formData.longitude}
                onChangeText={(value) => updateFormData("longitude", value)}
                placeholder="Digite a longitude"
                keyboardType="numbers-and-punctuation"
              />
            </InputGroup>
          </View>
        </Section>

        {}
        <Section title="Registro Fotográfico">
          <View style={dynamicStyles.photoSection}>
            {fotoOcorrencia ? (
              <View style={dynamicStyles.photoPreviewContainer}>
                <Image
                  source={{ uri: fotoOcorrencia.uri }}
                  style={dynamicStyles.photoPreview}
                  resizeMode="cover"
                  onError={(error) =>
                    console.log("Erro ao carregar imagem:", error)
                  }
                />
                <Text style={dynamicStyles.photoInfo}>
                  Foto: {fotoOcorrencia.fileName || "sem nome"}
                </Text>
                <View style={dynamicStyles.photoActions}>
                  <TouchableOpacity
                    style={[dynamicStyles.photoButton, dynamicStyles.retakeButton]}
                    onPress={mostrarOpcoesFoto}
                  >
                    <Text style={dynamicStyles.photoButtonText}>Alterar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[dynamicStyles.photoButton, dynamicStyles.removeButton]}
                    onPress={removerFoto}
                  >
                    <Text style={dynamicStyles.photoButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={dynamicStyles.cameraButton}
                onPress={mostrarOpcoesFoto}
                activeOpacity={0.7}
              >
                <View style={dynamicStyles.cameraButtonContent}>
                  <CameraIcon width={40} height={40} color="#bc010c" />
                  <Text style={dynamicStyles.cameraButtonText}>
                    Adicionar Foto da Ocorrência
                  </Text>
                  <Text style={dynamicStyles.cameraButtonSubtext}>
                    Toque para tirar uma foto ou escolher da galeria
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </Section>

        {}
        <View style={dynamicStyles.buttonContainer}>
          <TouchableOpacity
            style={[dynamicStyles.button, dynamicStyles.clearButton]}
            onPress={handleClear}
          >
            <Text style={dynamicStyles.buttonText}>Limpar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              dynamicStyles.button,
              dynamicStyles.saveButton,
              enviando && dynamicStyles.disabledButton,
            ]}
            onPress={handleSave}
            disabled={enviando}
          >
            <Text style={dynamicStyles.buttonText}>
              {enviando ? "Salvando..." : "Salvar Ocorrência"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.requiredNote}>
          <Text style={dynamicStyles.requiredText}>* Campos obrigatórios</Text>
          <Text style={dynamicStyles.requiredText}>FIRE ALPHA</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NovaOcorrenciaScreen;
