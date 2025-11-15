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
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

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
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={require("../components/Fire-noBG.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.fireTitle}>FIRE</Text>
          <Text style={styles.subtitle}>
            Ferramenta Integrada de Resposta a Emergências
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
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
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>SENHA</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

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

        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 40,
    minHeight: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  fireTitle: {
    fontSize: 48,
    fontWeight: "800",
    color: "#bc010c",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(188, 1, 12, 0.1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  formContainer: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1.5,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 30,
    paddingVertical: 5,
  },
  forgotPasswordText: {
    color: "#bc010c",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#bc010c",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#bc010c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#a0010a",
  },
  loginButtonDisabled: {
    backgroundColor: "#cccccc",
    shadowColor: "#cccccc",
    borderColor: "#bbbbbb",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
