import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

// Import dos estilos
import styles from "../styles/OcorrenciaRegistradaStyles";

const OcorrenciaRegistradaScreen = ({ navigation }) => {
  const handleInicio = () => {
    navigation.navigate("Home");
  };

  const handleListarOcorrencias = () => {
    navigation.navigate("ListarOcorrencias");
  };

  const handleNovaOcorrencia = () => {
    navigation.navigate("NovaOcorrencia");
  };

  const handleExportarPDF = () => {
    // Lógica para exportar PDF
    Alert.alert("PDF Exportado", "Ocorrência exportada em PDF com sucesso!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Ícone de sucesso */}
          <View style={styles.successIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          {/* Mensagem de sucesso */}
          <Text style={styles.successTitle}>
            Ocorrência Registrada com Sucesso!
          </Text>
          <Text style={styles.successMessage}>
            A ocorrência foi salva no sistema e está disponível para consulta.
          </Text>

          {/* Botões de ação */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleInicio}
            >
              <Text style={styles.buttonText}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleListarOcorrencias}
            >
              <Text style={styles.buttonText}>Listar Ocorrências</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.accentButton]}
              onPress={handleNovaOcorrencia}
            >
              <Text style={styles.buttonText}>Registrar Nova Ocorrência</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.pdfButton]}
              onPress={handleExportarPDF}
            >
              <Text style={styles.buttonText}>Exportar Ocorrência em PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OcorrenciaRegistradaScreen;
