// screens/HomeScreen.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import CustomHeader from "../components/CustomHeader"; // Importe o CustomHeader

export default function HomeScreen({ navigation }) {
  // Funções para os botões da barra inferior
  const handleInicio = () => {
    // Já está na tela inicial
  };

  const handleUsuario = () => {
    navigation.navigate("Usuario", { email: "email_do_usuario@exemplo.com" });
  };

  const handleNovaOcorrencia = () => {
    navigation.navigate("NovaOcorrencia");
  };

  // Funções para os botões principais
  const handleDashboard = () => {
    navigation.navigate("Dashboard");
  };

  const handleListarOcorrencias = () => {
    navigation.navigate("ListarOcorrencias");
  };

  const handleRegistrarOcorrencia = () => {
    navigation.navigate("NovaOcorrencia");
  };

  // Componente para botões modernos com ícones
  const ModernButton = ({ title, type, onPress, iconName }) => {
    const getButtonStyle = () => {
      switch (type) {
        case "dashboard":
          return [styles.button, styles.dashboard];
        case "listar":
          return [styles.button, styles.listar];
        case "registrar":
          return [styles.button, styles.registrar];
        default:
          return [styles.button, styles.dashboard];
      }
    };

    return (
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <MaterialCommunityIcons name={iconName} size={32} color="#fff" />
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      {/* Novo Custom Header */}
      <CustomHeader title="INÍCIO" />

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>O que você deseja acessar?</Text>

        <View style={styles.buttonsContainer}>
          {/* Botões de Acesso */}
          <ModernButton
            title="Dashboard"
            type="dashboard"
            onPress={handleDashboard}
            iconName="view-dashboard"
          />

          <ModernButton
            title="Listar Ocorrências"
            type="listar"
            onPress={handleListarOcorrencias}
            iconName="format-list-bulleted"
          />

          <ModernButton
            title="Registrar Nova Ocorrência"
            type="registrar"
            onPress={handleRegistrarOcorrencia}
            iconName="plus-circle"
          />
        </View>
      </View>

      {/* Barra Inferior */}
      <BottomNav
        onHomePress={handleInicio}
        onUserPress={handleUsuario}
        onNewOccurrencePress={handleNovaOcorrencia}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20, // Reduzido para compensar o header
    alignItems: "center",
    marginBottom: 70,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  // Estilos para os botões modernos
  button: {
    width: "48%", // Dois botões por linha com espaçamento
    height: 140,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  dashboard: {
    backgroundColor: "#3E4095",
  },
  listar: {
    backgroundColor: "#E6A400",
  },
  registrar: {
    backgroundColor: "#BC010C",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 12,
  },
});
