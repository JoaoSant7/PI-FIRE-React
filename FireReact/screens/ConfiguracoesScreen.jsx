// screens/ConfiguracoesScreen.jsx
import React from "react";
import {
  Text,
  View,
  Switch,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSettings } from "../contexts/SettingsContext";
import { useTheme } from '../contexts/ThemeContext';
import { useFontScale } from "../hooks/useFontScale";

// Import dos estilos
import { createConfiguracoesStyles } from "../styles/ConfiguracoesStyles";

export default function ConfiguracoesScreen() {
  const { settings, updateSetting, loading } = useSettings();
  const { scaleFont } = useFontScale();
  const { isDark, setTheme } = useTheme();

  // Estilos dinâmicos com escala de fonte
  const dynamicStyles = React.useMemo(
    () => createConfiguracoesStyles(scaleFont),
    [scaleFont]
  );

  if (loading || !settings) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#bc010c" />
      </View>
    );
  }

  return (
    <ScrollView style={dynamicStyles.scrollView}>
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.title}>Configurações</Text>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Acessibilidade</Text>
          <View style={dynamicStyles.fontSizeContainer}>
            <Text style={dynamicStyles.switchText}>Tamanho da Fonte</Text>
            <View style={dynamicStyles.fontSizeButtonGroup}>
              <TouchableOpacity
                style={[
                  dynamicStyles.fontSizeButton,
                  settings.fontScale === 0.9
                    ? dynamicStyles.fontSizeButtonSelected
                    : dynamicStyles.fontSizeButtonUnselected,
                ]}
                onPress={() => updateSetting("fontScale", 0.9)}
              >
                <Text
                  style={[
                    dynamicStyles.fontSizeButtonText,
                    settings.fontScale === 0.9
                      ? dynamicStyles.fontSizeButtonTextSelected
                      : dynamicStyles.fontSizeButtonTextUnselected,
                  ]}
                >
                  Pequeno
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  dynamicStyles.fontSizeButton,
                  settings.fontScale === 1
                    ? dynamicStyles.fontSizeButtonSelected
                    : dynamicStyles.fontSizeButtonUnselected,
                ]}
                onPress={() => updateSetting("fontScale", 1)}
              >
                <Text
                  style={[
                    dynamicStyles.fontSizeButtonText,
                    settings.fontScale === 1
                      ? dynamicStyles.fontSizeButtonTextSelected
                      : dynamicStyles.fontSizeButtonTextUnselected,
                  ]}
                >
                  Médio
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  dynamicStyles.fontSizeButton,
                  settings.fontScale === 1.2
                    ? dynamicStyles.fontSizeButtonSelected
                    : dynamicStyles.fontSizeButtonUnselected,
                ]}
                onPress={() => updateSetting("fontScale", 1.2)}
              >
                <Text
                  style={[
                    dynamicStyles.fontSizeButtonText,
                    settings.fontScale === 1.2
                      ? dynamicStyles.fontSizeButtonTextSelected
                      : dynamicStyles.fontSizeButtonTextUnselected,
                  ]}
                >
                  Grande
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
