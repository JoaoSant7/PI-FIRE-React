import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

const OcorrenciaRegistradaScreen = ({ navigation }) => {
  const { colors } = useTheme();
  
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Ícone de sucesso */}
          <View style={[styles.successIcon, { backgroundColor: colors.success }]}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          {/* Mensagem de sucesso */}
          <Text style={[styles.successTitle, { color: colors.success }]}>
            Ocorrência Registrada com Sucesso!
          </Text>
          <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
            A ocorrência foi salva no sistema e está disponível para consulta.
          </Text>

          {/* Botões de ação */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton, { backgroundColor: colors.textSecondary }]}
              onPress={handleInicio}
            >
              <Text style={styles.buttonText}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton, { backgroundColor: colors.warning }]}
              onPress={handleListarOcorrencias}
            >
              <Text style={styles.buttonText}>Listar Ocorrências</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.accentButton, { backgroundColor: colors.primary }]}
              onPress={handleNovaOcorrencia}
            >
              <Text style={styles.buttonText}>Registrar Nova Ocorrência</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.pdfButton, { backgroundColor: colors.success }]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    paddingVertical: 40,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  primaryButton: {},
  secondaryButton: {},
  accentButton: {},
  pdfButton: {},
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OcorrenciaRegistradaScreen;