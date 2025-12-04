// components/BottomNav.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import HomeIcon from './HomeIcon';
import UserIcon from './UserIcon';
import PlusIcon from './PlusIcon';
import styles from '../styles/BottomNavStyles';

const BottomNav = ({ 
  onHomePress, 
  onUserPress,
  onNewOccurrencePress 
}) => {
  return (
    <View style={styles.bottomNav}>
      {/* Botão Home - Lado Esquerdo */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onHomePress}
      >
        <View style={styles.iconWrapper}>
          <HomeIcon size={24} color="#f8f8f8" />
        </View>
        <Text style={styles.navText}>Início</Text>
      </TouchableOpacity>
      
      {/* Botão Nova Ocorrência - Centro */}
      <TouchableOpacity 
        style={styles.centralNavItem} 
        onPress={onNewOccurrencePress}
      >
        <View style={styles.centralIconWrapper}>
          <PlusIcon width={42} height={42} color="#bc010c" />
        </View>
        <Text style={styles.navText}>Nova Ocorrência</Text>
      </TouchableOpacity>
      
      {/* Botão Usuário - Lado Direito */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onUserPress}
      >
        <View style={styles.iconWrapper}>
          <UserIcon width={24} height={24} color="#f8f8f8" />
        </View>
        <Text style={styles.navText}>Usuário</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;