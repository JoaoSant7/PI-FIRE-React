// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
      
      {/* Header Vermelho */}
      <View style={styles.header}>
        <Text style={styles.fireTitle}>Início</Text>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>O que você deseja acessar?</Text>
        
        {/* Botões de Acesso */}
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Listar Ocorrências</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Registrar Nova Ocorrência</Text>
        </TouchableOpacity>
      </View>

      {/* Barra Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          {/* Substitua este Text pelo seu ícone de Configurações */}
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navText}>Configurações</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          {/* Substitua este Text pelo seu ícone de Usuário */}
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          {/* Substitua este Text pelo seu ícone de Início */}
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Usuário</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    alignItems: 'center',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#bc010c',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#bc010c',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
    color: '#f8f8f8',
    fontWeight: '500',
  },
});