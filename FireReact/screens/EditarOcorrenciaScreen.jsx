// screens/EditarOcorrenciaScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useOcorrenciasContext } from "../contexts/OcorrenciasContext";

export default function EditarOcorrenciaScreen({ navigation, route }) {
  const { ocorrencia } = route.params;
  const { editarOcorrencia } = useOcorrenciasContext();

  const [tipo, setTipo] = useState(ocorrencia.tipo || ocorrencia.natureza || "");
  const [descricao, setDescricao] = useState(ocorrencia.descricao || "");
  const [localizacao, setLocalizacao] = useState(
    ocorrencia.localizacao || ocorrencia.logradouro || ""
  );
  const [status, setStatus] = useState(ocorrencia.status || ocorrencia.situacao || "");

  const handleSalvar = async () => {
    if (!tipo.trim()) {
      Alert.alert("Atenção", "Preencha o tipo da ocorrência");
      return;
    }

    const dadosAtualizados = {
      tipo,
      descricao,
      localizacao,
      status,
      dataAtualizacao: new Date().toISOString(),
    };

    const result = await editarOcorrencia(ocorrencia.id, dadosAtualizados);

    if (result.success) {
      Alert.alert("Sucesso", "Ocorrência atualizada com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert("Erro", result.message || "Falha ao atualizar ocorrência");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="edit" size={40} color="#bc010c" />
        <Text style={styles.title}>Editar Ocorrência</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Tipo *</Text>
        <TextInput
          style={styles.input}
          value={tipo}
          onChangeText={setTipo}
          placeholder="Ex: Incêndio, Resgate..."
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Descreva a ocorrência"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Localização</Text>
        <TextInput
          style={styles.input}
          value={localizacao}
          onChangeText={setLocalizacao}
          placeholder="Endereço ou ponto de referência"
        />

        <Text style={styles.label}>Status</Text>
        <TextInput
          style={styles.input}
          value={status}
          onChangeText={setStatus}
          placeholder="Ex: Atendida, Não Atendida..."
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
          <Icon name="save" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#bc010c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginTop: 30,
    gap: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});