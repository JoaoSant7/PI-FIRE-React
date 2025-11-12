// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import BottomNav from '../components/BottomNav';
import SettingsIcon from '../components/SettingsIcon';

export default function HomeScreen({ navigation }) {
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

  // Componente para botões sem ícones
  const ModernButton = ({ title, type, onPress }) => {
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

    return (
      <TouchableOpacity 
        style={getButtonStyle()} 
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

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
        
        {/* Botões de Acesso */}
        <ModernButton 
          title="Dashboard" 
          type="dashboard" 
          onPress={handleDashboard} 
        />
        
        <ModernButton 
          title="Listar Ocorrências" 
          type="listar" 
          onPress={handleListarOcorrencias} 
        />
        
        <ModernButton 
          title="Registrar Nova Ocorrência" 
          type="registrar" 
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
  // Estilos para os botões modernos
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboard: {
    backgroundColor: '#3E4095',
  },
  listar: {
    backgroundColor: '#FFF112',
  },
  registrar: {
    backgroundColor: '#BC010C',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});