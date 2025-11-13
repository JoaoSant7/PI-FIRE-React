// screens/LoginScreen.jsx
import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext"; // Updated import path

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // Use o contexto

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    if (email && password) {
      login();
    } else {
      alert("Por favor, preencha email e senha!");
    }
  };

  const handleForgotPassword = () => {
    alert(
      "Entre em contato com o setor de suporte técnico do seu batalhão para realizar a recuperação de sua senha."
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../components/Fire-noBG.png")}
          style={styles.logo}
          resizeMode="cover"
        />

        <Text style={styles.fireTitle}>FIRE</Text>
        <Text style={styles.subtitle}>
          Ferramenta Integrada de Resposta a Emergências
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>SENHA</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.loginButton,
              (!email || !password) && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!email || !password}
          >
            <Text style={styles.loginButtonText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <Text style={styles.signUpText}></Text>
          </Text>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Keep the same styles...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  fireTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#bc010c",
    textAlign: "center",
    marginBottom: 10,
  },
  logo: {
    width: 240,
    height: 240,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 50,
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#bc010c",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "bold",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#bc010c",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#bc010c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
    shadowColor: "#ccc",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
});
