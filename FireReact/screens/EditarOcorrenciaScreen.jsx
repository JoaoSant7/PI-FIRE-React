// screens/EditarOcorrenciaScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  Switch,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useOcorrenciasContext } from "../contexts/OcorrenciasContext";
import { createEditarOcorrenciaStyles } from "../styles/EditarOcorrenciaStyles";
import { useFontScale } from "../hooks/useFontScale";

// Importar componentes de input da NovaOcorrenciaScreen
import TextInput from "../components/TextInput";
import SearchablePicker from "../components/SearchablePicker";
import DateTimePickerInput from "../components/DateTimePickerInput";
import DatePickerInput from "../components/DatePickerInput";

// Importar dados dos pickers
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
  MUNICIPIOS_PERNAMBUCO,
  REGIOES,
} from "../constants/pickerData";

// Motivos de não atendimento
const MOTIVOS_NAO_ATENDIMENTO = [
  { label: "Selecione o motivo de não atendimento", value: "" },
  { label: "Vítima Socorrida pelo Samu", value: "Vítima Socorrida pelo Samu" },
  { label: "Vítima Socorrida pelos Populares", value: "Vítima Socorrida pelos Populares" },
  { label: "Recusou Atendimento", value: "Recusou Atendimento" },
  { label: "Outro", value: "Outro" },
];

export default function EditarOcorrenciaScreen({ navigation, route }) {
  const { ocorrencia } = route.params;
  const { editarOcorrencia } = useOcorrenciasContext();

  // Hook para escala de fonte
  const { scaleFont } = useFontScale();
  const styles = React.useMemo(() => createEditarOcorrenciaStyles(scaleFont), [scaleFont]);

  // ====== ESTADOS DOS CAMPOS ======
  
  // Converter string de data para Date object
  const parseDataHora = (dataString) => {
    if (!dataString) return new Date();
    try {
      return new Date(dataString);
    } catch {
      return new Date();
    }
  };

  // Converter string de hora (HH:MM:SS ou HH:MM) para Date object
  const parseHora = (horaString) => {
    if (!horaString) return null;
    try {
      const hoje = new Date();
      const partes = horaString.split(':');
      hoje.setHours(parseInt(partes[0]) || 0);
      hoje.setMinutes(parseInt(partes[1]) || 0);
      hoje.setSeconds(parseInt(partes[2]) || 0);
      return hoje;
    } catch {
      return null;
    }
  };

  // Dados Internos
  const [dataHora, setDataHora] = useState(parseDataHora(ocorrencia.dataHora));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [numeroAviso, setNumeroAviso] = useState(ocorrencia.numeroAviso || "");
  const [diretoria, setDiretoria] = useState(ocorrencia.diretoria || "");
  const [grupamento, setGrupamento] = useState(ocorrencia.grupamento || "");
  const [pontoBase, setPontoBase] = useState(ocorrencia.pontoBase || "");

  // Ocorrência
  const [natureza, setNatureza] = useState(ocorrencia.natureza || "");
  const [grupoOcorrencia, setGrupoOcorrencia] = useState(ocorrencia.grupoOcorrencia || "");
  const [subgrupoOcorrencia, setSubgrupoOcorrencia] = useState(ocorrencia.subgrupoOcorrencia || "");
  const [situacao, setSituacao] = useState(ocorrencia.situacao || ocorrencia.status || "");
  const [horaSaidaQuartel, setHoraSaidaQuartel] = useState(parseHora(ocorrencia.horaSaidaQuartel));
  const [horaLocal, setHoraLocal] = useState(parseHora(ocorrencia.horaLocal || ocorrencia.horaChegadaLocal));
  const [horaSaidaLocal, setHoraSaidaLocal] = useState(parseHora(ocorrencia.horaSaidaLocal));
  const [motivoNaoAtendida, setMotivoNaoAtendida] = useState(ocorrencia.motivoNaoAtendida || "");
  const [motivoOutro, setMotivoOutro] = useState(ocorrencia.motivoOutro || "");
  const [vitimaSamu, setVitimaSamu] = useState(ocorrencia.vitimaSamu || false);

  // Informações da Vítima
  const [envolvida, setEnvolvida] = useState(ocorrencia.envolvida || false);
  const [sexo, setSexo] = useState(ocorrencia.sexo || "");
  const [idade, setIdade] = useState(ocorrencia.idade || "");
  const [classificacao, setClassificacao] = useState(ocorrencia.classificacao || "");
  const [destino, setDestino] = useState(ocorrencia.destino || "");

  // Viatura e Acionamento
  const [viatura, setViatura] = useState(ocorrencia.viatura || "");
  const [numeroViatura, setNumeroViatura] = useState(ocorrencia.numeroViatura || "");
  const [acionamento, setAcionamento] = useState(ocorrencia.acionamento || "");
  const [localAcionamento, setLocalAcionamento] = useState(ocorrencia.localAcionamento || "");

  // Endereço
  const [municipio, setMunicipio] = useState(ocorrencia.municipio || "");
  const [regiao, setRegiao] = useState(ocorrencia.regiao || "");
  const [bairro, setBairro] = useState(ocorrencia.bairro || "");
  const [tipoLogradouro, setTipoLogradouro] = useState(ocorrencia.tipoLogradouro || "");
  const [ais, setAis] = useState(ocorrencia.ais || "");
  const [logradouro, setLogradouro] = useState(ocorrencia.logradouro || "");
  const [numero, setNumero] = useState(ocorrencia.numero || "");
  const [latitude, setLatitude] = useState(ocorrencia.latitude || "");
  const [longitude, setLongitude] = useState(ocorrencia.longitude || "");

  // Descrição adicional
  const [descricao, setDescricao] = useState(ocorrencia.descricao || "");

  const [saving, setSaving] = useState(false);

  // Função para formatar hora para string
  const formatHoraToString = (date) => {
    if (!date) return "";
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
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
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue === "") {
      setIdade("");
      return;
    }
    let idadeNum = parseInt(numericValue, 10);
    if (idadeNum > 125) idadeNum = 125;
    setIdade(idadeNum.toString());
  };

  // Função para validar e formatar o AIS
  const handleAISChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue === "") {
      setAis("");
      return;
    }
    let aisNum = parseInt(numericValue, 10);
    if (aisNum < 1) aisNum = 1;
    else if (aisNum > 10) aisNum = 10;
    setAis(aisNum.toString());
  };

  const handleAISBlur = () => {
    if (ais && ais !== "") {
      const aisNumber = parseInt(ais, 10);
      if (!isNaN(aisNumber) && aisNumber >= 1 && aisNumber <= 10) {
        const formattedAIS = aisNumber < 10 ? `0${aisNumber}` : aisNumber.toString();
        setAis(formattedAIS);
      }
    }
  };

  const handleSalvar = async () => {
    // Validações básicas
    if (!natureza.trim() && !grupoOcorrencia.trim()) {
      Alert.alert("Atenção", "Preencha pelo menos a Natureza ou o Grupo da Ocorrência");
      return;
    }

    setSaving(true);

    // Formatar AIS antes de salvar
    let aisToSave = ais;
    if (aisToSave && aisToSave !== "") {
      const aisNumber = parseInt(aisToSave, 10);
      if (!isNaN(aisNumber) && aisNumber >= 1 && aisNumber <= 10) {
        aisToSave = aisNumber < 10 ? `0${aisNumber}` : aisNumber.toString();
      }
    }

    const dadosAtualizados = {
      // Dados Internos
      dataHora: dataHora.toISOString(),
      numeroAviso: numeroAviso.trim(),
      diretoria: diretoria.trim(),
      grupamento: grupamento.trim(),
      pontoBase: pontoBase.trim(),

      // Ocorrência
      natureza: natureza.trim(),
      grupoOcorrencia: grupoOcorrencia.trim(),
      subgrupoOcorrencia: subgrupoOcorrencia.trim(),
      situacao: situacao.trim(),
      status: situacao.trim(), // Mantém compatibilidade
      horaSaidaQuartel: formatHoraToString(horaSaidaQuartel),
      horaLocal: formatHoraToString(horaLocal),
      horaChegadaLocal: formatHoraToString(horaLocal), // Compatibilidade
      horaSaidaLocal: formatHoraToString(horaSaidaLocal),
      motivoNaoAtendida: motivoNaoAtendida.trim(),
      motivoOutro: motivoOutro.trim(),
      vitimaSamu,

      // Informações da Vítima
      envolvida,
      sexo: sexo.trim(),
      idade: idade.trim(),
      classificacao: classificacao.trim(),
      destino: destino.trim(),

      // Viatura e Acionamento
      viatura: viatura.trim(),
      numeroViatura: numeroViatura.trim(),
      acionamento: acionamento.trim(),
      localAcionamento: localAcionamento.trim(),

      // Endereço
      municipio: municipio.trim(),
      regiao: regiao.trim(),
      bairro: bairro.trim(),
      tipoLogradouro: tipoLogradouro.trim(),
      ais: aisToSave,
      logradouro: logradouro.trim(),
      numero: numero.trim(),
      latitude: latitude.trim(),
      longitude: longitude.trim(),

      // Descrição
      descricao: descricao.trim(),
    };

    const result = await editarOcorrencia(ocorrencia.id, dadosAtualizados);

    setSaving(false);

    if (result.success) {
      Alert.alert("Sucesso", "Ocorrência atualizada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert("Erro", result.message || "Falha ao atualizar ocorrência");
    }
  };

  const handleCancelar = () => {
    Alert.alert(
      "Cancelar Edição",
      "Deseja descartar as alterações?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="edit" size={50} color="#bc010c" />
          <Text style={styles.title}>Editar Ocorrência</Text>
          <Text style={styles.subtitle}>
            ID: {ocorrencia.id?.slice(0, 20)}...
          </Text>
        </View>

        <View style={styles.form}>
          {/* ====== SEÇÃO: DADOS INTERNOS ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="business" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Dados Internos</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Data e Hora</Text>
            <DatePickerInput
              value={dataHora}
              onDateChange={onDateChange}
              showPicker={showDatePicker}
              setShowPicker={setShowDatePicker}
              placeholder="Selecione a data e hora"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Número do Aviso</Text>
            <TextInput
              value={numeroAviso}
              onChangeText={setNumeroAviso}
              placeholder="Número do chamado"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Diretoria</Text>
            <TextInput
              value={diretoria}
              onChangeText={setDiretoria}
              placeholder="Ex: 1ª Diretoria, DIM"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Grupamento</Text>
            <SearchablePicker
              selectedValue={grupamento}
              onValueChange={setGrupamento}
              items={GRUPAMENTOS}
              placeholder="Selecione o grupamento"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Ponto Base</Text>
            <TextInput
              value={pontoBase}
              onChangeText={setPontoBase}
              placeholder="Local da base"
            />
          </View>

          {/* ====== SEÇÃO: OCORRÊNCIA ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="warning" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Ocorrência</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Natureza <Text style={styles.required}>*</Text>
            </Text>
            <SearchablePicker
              selectedValue={natureza}
              onValueChange={setNatureza}
              items={NATUREZAS}
              placeholder="Selecione a Natureza da Ocorrência"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Grupo da Ocorrência</Text>
            <SearchablePicker
              selectedValue={grupoOcorrencia}
              onValueChange={setGrupoOcorrencia}
              items={GRUPOS_OCORRENCIA}
              placeholder="Selecione o Grupo de Ocorrência"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Subgrupo da Ocorrência</Text>
            <SearchablePicker
              selectedValue={subgrupoOcorrencia}
              onValueChange={setSubgrupoOcorrencia}
              items={SUBGRUPOS_OCORRENCIA}
              placeholder="Selecione o Subgrupo da Ocorrência"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Situação/Status</Text>
            <SearchablePicker
              selectedValue={situacao}
              onValueChange={setSituacao}
              items={SITUACOES}
              placeholder="Selecione a Situação da Ocorrência"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hora Saída do Quartel</Text>
            <DateTimePickerInput
              value={horaSaidaQuartel}
              onDateTimeChange={setHoraSaidaQuartel}
              placeholder="Selecione a hora"
              mode="time"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hora Chegada ao Local</Text>
            <DateTimePickerInput
              value={horaLocal}
              onDateTimeChange={setHoraLocal}
              placeholder="Selecione a hora"
              mode="time"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hora Saída do Local</Text>
            <DateTimePickerInput
              value={horaSaidaLocal}
              onDateTimeChange={setHoraSaidaLocal}
              placeholder="Selecione a hora"
              mode="time"
            />
          </View>

          {(situacao === "Não Atendida" || situacao === "Sem Atuação") && (
            <>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Motivo Não Atendimento</Text>
                <SearchablePicker
                  selectedValue={motivoNaoAtendida}
                  onValueChange={setMotivoNaoAtendida}
                  items={MOTIVOS_NAO_ATENDIMENTO}
                  placeholder="Selecione o motivo"
                />
              </View>

              {motivoNaoAtendida === "Outro" && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Especificar Outro Motivo</Text>
                  <TextInput
                    value={motivoOutro}
                    onChangeText={(value) => {
                      if (value.length <= 100) setMotivoOutro(value);
                    }}
                    placeholder="Especifique o motivo (máx. 100 caracteres)"
                    multiline
                    numberOfLines={3}
                    maxLength={100}
                  />
                  <Text style={styles.hint}>{motivoOutro.length}/100 caracteres</Text>
                </View>
              )}
            </>
          )}

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima Socorrida pelo SAMU</Text>
            <Switch
              value={vitimaSamu}
              onValueChange={setVitimaSamu}
              trackColor={{ false: "#ccc", true: "#bc010c" }}
              thumbColor={vitimaSamu ? "#fff" : "#f4f3f4"}
            />
          </View>

          {/* ====== SEÇÃO: INFORMAÇÕES DA VÍTIMA ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="person" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Informações da Vítima</Text>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Vítima Envolvida</Text>
            <Switch
              value={envolvida}
              onValueChange={setEnvolvida}
              trackColor={{ false: "#ccc", true: "#bc010c" }}
              thumbColor={envolvida ? "#fff" : "#f4f3f4"}
            />
          </View>

          {envolvida && (
            <>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Sexo</Text>
                <SearchablePicker
                  selectedValue={sexo}
                  onValueChange={setSexo}
                  items={SEXOS}
                  placeholder="Selecione o sexo da vítima"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Idade</Text>
                <TextInput
                  value={idade}
                  onChangeText={handleIdadeChange}
                  placeholder="Digite a idade (0-125)"
                  keyboardType="numeric"
                  maxLength={3}
                />
                <Text style={styles.hint}>Idade limitada a 125 anos</Text>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Classificação</Text>
                <SearchablePicker
                  selectedValue={classificacao}
                  onValueChange={setClassificacao}
                  items={CLASSIFICACOES}
                  placeholder="Selecione a Classificação da Vítima"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Destino</Text>
                <SearchablePicker
                  selectedValue={destino}
                  onValueChange={setDestino}
                  items={DESTINOS}
                  placeholder="Selecione o Destino da Vítima"
                />
              </View>
            </>
          )}

          {/* ====== SEÇÃO: VIATURA E ACIONAMENTO ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="directions-car" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Viatura e Acionamento</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Viatura Empregada</Text>
            <TextInput
              value={viatura}
              onChangeText={setViatura}
              placeholder="Tipo de viatura"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Número da Viatura</Text>
            <TextInput
              value={numeroViatura}
              onChangeText={setNumeroViatura}
              placeholder="Identificação da viatura"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Forma de Acionamento</Text>
            <SearchablePicker
              selectedValue={acionamento}
              onValueChange={setAcionamento}
              items={ACIONAMENTOS}
              placeholder="Selecione a Forma de Acionamento"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Local do Acionamento</Text>
            <TextInput
              value={localAcionamento}
              onChangeText={setLocalAcionamento}
              placeholder="Onde foi feito o chamado"
            />
          </View>

          {/* ====== SEÇÃO: ENDEREÇO ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="place" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Endereço da Ocorrência</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Município</Text>
            <SearchablePicker
              selectedValue={municipio}
              onValueChange={setMunicipio}
              items={MUNICIPIOS_PERNAMBUCO}
              placeholder="Selecione o município"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Região</Text>
            <SearchablePicker
              selectedValue={regiao}
              onValueChange={setRegiao}
              items={REGIOES}
              placeholder="Selecione a região"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              value={bairro}
              onChangeText={setBairro}
              placeholder="Nome do bairro"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Tipo de Logradouro</Text>
            <SearchablePicker
              selectedValue={tipoLogradouro}
              onValueChange={setTipoLogradouro}
              items={TIPOS_LOGRADOURO}
              placeholder="Selecione o Tipo de Logradouro"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>AIS (Área Integrada de Segurança)</Text>
            <TextInput
              value={ais}
              onChangeText={handleAISChange}
              onBlur={handleAISBlur}
              placeholder="AIS 1-10"
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={styles.hint}>AIS deve ser entre 1 e 10</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              value={logradouro}
              onChangeText={setLogradouro}
              placeholder="Nome da rua/avenida"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              value={numero}
              onChangeText={setNumero}
              placeholder="Número do imóvel"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput
              value={latitude}
              onChangeText={setLatitude}
              placeholder="Ex: -8.0476"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput
              value={longitude}
              onChangeText={setLongitude}
              placeholder="Ex: -34.8770"
              keyboardType="decimal-pad"
            />
          </View>

          {/* ====== SEÇÃO: DESCRIÇÃO ADICIONAL ====== */}
          <View style={styles.sectionHeader}>
            <Icon name="description" size={24} color="#bc010c" />
            <Text style={styles.sectionTitle}>Descrição Adicional</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Observações</Text>
            <TextInput
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva detalhes adicionais da ocorrência..."
              multiline
              numberOfLines={5}
              style={styles.textArea}
            />
          </View>

          {/* Info de última atualização */}
          {ocorrencia.dataAtualizacao && (
            <View style={styles.infoBox}>
              <Icon name="info-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                Última atualização:{" "}
                {new Date(ocorrencia.dataAtualizacao).toLocaleString("pt-BR")}
              </Text>
            </View>
          )}

          {/* Botões */}
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.buttonDisabled]}
            onPress={handleSalvar}
            disabled={saving}
          >
            <Icon name="save" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>
              {saving ? "Salvando..." : "Salvar Alterações"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelar}
            disabled={saving}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}