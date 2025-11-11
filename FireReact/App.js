// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import de Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import UsuarioScreen from './screens/UsuarioScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';
import DashboardScreen from './screens/DashboardScreen';
import ListarOcorrenciasScreen from './screens/ListarOcorrenciasScreen';
import NovaOcorrenciaScreen from './screens/NovaOcorrenciaScreen';
import OcorrenciaRegistradaScreen from './screens/OcorrenciaRegistradaScreen'; // Nova tela adicionada

// Configurações do tema
const THEME_COLORS = {
  primary: '#bc010c',
  background: '#f5f5f5',
  textLight: '#ffffff'
};

const headerOptions = {
  headerStyle: {
    backgroundColor: THEME_COLORS.primary,
  },
  headerTintColor: THEME_COLORS.textLight,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const Stack = createStackNavigator();

// Stack de Autenticação
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Stack Principal da Aplicação
const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Usuario" 
      component={UsuarioScreen}
      options={{ 
        ...headerOptions,
        title: 'Perfil do Usuário'
      }}
    />
    <Stack.Screen 
      name="Configuracoes" 
      component={ConfiguracoesScreen}
      options={{ 
        ...headerOptions,
        title: 'Configurações'
      }}
    />
    <Stack.Screen 
      name="Dashboard" 
      component={DashboardScreen}
      options={{ 
        ...headerOptions,
        title: 'Dashboard Operacional'
      }}
    />
    <Stack.Screen 
      name="ListarOcorrencias" 
      component={ListarOcorrenciasScreen}
      options={{ 
        ...headerOptions,
        title: 'Lista de Ocorrências'
      }}
    />
    <Stack.Screen 
      name="NovaOcorrencia" 
      component={NovaOcorrenciaScreen}
      options={{ 
        ...headerOptions,
        title: 'Nova Ocorrência'
      }}
    />
    {/* Nova tela de confirmação adicionada */}
    <Stack.Screen 
      name="OcorrenciaRegistrada" 
      component={OcorrenciaRegistradaScreen}
      options={{ 
        ...headerOptions,
        title: 'Ocorrência Registrada',
        headerLeft: null // Remove o botão de voltar para evitar que o usuário volte para a tela de nova ocorrência
      }}
    />
  </Stack.Navigator>
);

// Criando Context para gerenciar autenticação
export const AuthContext = React.createContext();

// Componente Principal
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulando verificação de autenticação
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Aqui você verificaria se o usuário está logado
      // Por exemplo: verificar AsyncStorage, token JWT, etc.
      // const token = await AsyncStorage.getItem('userToken');
      // setIsAuthenticated(!!token);
      
      // Por enquanto, vamos simular um delay de carregamento
      setTimeout(() => {
        setIsLoading(false);
        // setIsAuthenticated(!!token); // Descomente quando implementar a lógica real
      }, 1000);
    };

    checkAuthStatus();
  }, []);

  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  };

  // Tela de carregamento enquanto verifica autenticação
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: THEME_COLORS.primary }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <StatusBar 
          backgroundColor={THEME_COLORS.primary} 
          barStyle="light-content" 
        />
        {isAuthenticated ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}