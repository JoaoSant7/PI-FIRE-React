// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import UsuarioScreen from './screens/UsuarioScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';
import DashboardScreen from './screens/DashboardScreen';
import ListaOcorrenciasScreen from './screens/ListarOcorrenciasScreen'; // Corrigi o nome do arquivo
import NovaOcorrenciaScreen from './screens/NovaOcorrenciaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Usuario" 
          component={UsuarioScreen}
          options={{ 
            headerShown: true, 
            title: 'Perfil do Usuário',
            headerStyle: { backgroundColor: '#bc010c' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Configuracoes" 
          component={ConfiguracoesScreen}
          options={{ 
            headerShown: true, 
            title: 'Configurações',
            headerStyle: { backgroundColor: '#bc010c' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ 
            headerShown: true, 
            title: 'Dashboard',
            headerStyle: { backgroundColor: '#bc010c' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="ListaOcorrencias" 
          component={ListaOcorrenciasScreen}
          options={{ 
            headerShown: true, 
            title: 'Lista de Ocorrências',
            headerStyle: { backgroundColor: '#bc010c' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="NovaOcorrencia" 
          component={NovaOcorrenciaScreen}
          options={{ 
            headerShown: true, 
            title: 'Nova Ocorrência',
            headerStyle: { backgroundColor: '#bc010c' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}