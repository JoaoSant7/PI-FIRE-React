// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import SettingsIcon from '../components/SettingsIcon';

// Vamos carregar as fontes manualmente para garantir
const loadFonts = async () => {
  await Font.loadAsync({
    ...MaterialIcons.font,
  });
};

export default function HomeScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    };

    prepare();
  }, []);

  // Funções para os botões da barra inferior
  const handleInicio = () => {
    // Já está na tela inicial
  };

  const handleUsuario = () => {
    navigation.navigate('Usuario', { email: 'email_do_usuario@exemplo.com' });
  };

  const handleNovaOcorrencia = () => {
    navigation.navigate('NovaOcorrencia');
  };

  // Funções para os botões principais
  const handleDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const handleListarOcorrencias = () => {
    navigation.navigate('ListarOcorrencias');
  };

  const handleRegistrarOcorrencia = () => {
    navigation.navigate('NovaOcorrencia');
  };

  // Função para o botão de configurações no header
  const handleConfiguracoes = () => {
    navigation.navigate('Configuracoes');
  };

  // Componente para botões com ícones
  const IconButton = ({ title, type, onPress, iconName }) => {
    const getButtonStyle = () => {
      switch(type) {
        case 'dashboard':
          return [styles.button, styles.dashboard];
        case 'listar':
          return [styles.button, styles.listar];
        case 'registrar':
          return [styles.button, styles.registrar];
        default:
          return [styles.button, styles.dashboard];
      }
    };

    const getIconColor = () => {
      switch(type) {
        case 'dashboard': return '#3498db';
        case 'listar': return '#2ecc71';
        case 'registrar': return '#e74c3c';
        default: return '#3498db';
      }
    };

    return (
      <TouchableOpacity 
        style={getButtonStyle()} 
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          {fontsLoaded && (
            <MaterialIcons 
              name={iconName} 
              size={24} 
              color={getIconColor()} 
              style={styles.icon} 
            />
          )}
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.fireTitle}>Início</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <Text>Carregando...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
      
      {/* Header Vermelho */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.fireTitle}>Início</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={handleConfiguracoes}
          >
            <SettingsIcon width={24} height={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>O que você deseja acessar?</Text>
        
        {/* Botões de Acesso com Ícones */}
        <IconButton 
          title="Dashboard" 
          type="dashboard" 
          iconName="dashboard" 
          onPress={handleDashboard} 
        />
        
        <IconButton 
          title="Listar Ocorrências" 
          type="listar" 
          iconName="list" 
          onPress={handleListarOcorrencias} 
        />
        
        <IconButton 
          title="Registrar Nova Ocorrência" 
          type="registrar" 
          iconName="add-alert" 
          onPress={handleRegistrarOcorrencia} 
        />
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
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#bc010c',
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
    height: 50,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    alignItems: 'center',
    marginBottom: 70,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 50,
    textAlign: 'center',
  },
  // Novos estilos para os botões com ícones
  button: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dashboard: {
    backgroundColor: '#2c3e50',
  },
  listar: {
    backgroundColor: '#27ae60',
  },
  registrar: {
    backgroundColor: '#c0392b',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  icon: {
    marginRight: 12,
  },
});