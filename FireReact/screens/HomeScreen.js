// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import BottomNav from '../components/BottomNav';
import SettingsIcon from '../components/SettingsIcon';

export default function HomeScreen({ navigation }) {
  // Funções para os botões da barra inferior
  const handleInicio = () => {
    // Já está na tela inicial
    // Pode adicionar funcionalidade de scroll para topo se necessário
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
      
      {/* Header Vermelho */}
      <View style={styles.header}>
        <Text style={styles.fireTitle}>Início</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={handleConfiguracoes}
        >
          <SettingsIcon width={24} height={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>O que você deseja acessar?</Text>
        
        {/* Botões de Acesso */}
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handleDashboard}
        >
          <Text style={styles.menuButtonText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handleListarOcorrencias}
        >
          <Text style={styles.menuButtonText}>Listar Ocorrências</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handleRegistrarOcorrencia}
        >
          <Text style={styles.menuButtonText}>Registrar Nova Ocorrência</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Para posicionar o botão absolutamente
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
    top: 60,
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
  menuButton: {
    backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderColor: '#bc010c',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
});