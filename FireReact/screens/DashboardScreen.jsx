// screens/DashboardScreen.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const DashboardScreen = () => {
  // Dados mockados - você pode substituir por dados reais
  const dashboardData = {
    totalOcorrencias: '1.247',
    emAndamento: '156',
    ocorrenciasAtendidas: '1.091',
    tempoMedioResposta: '15min',
  };

  const ScreenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard Operacional</Text>
        </View>

        {/* Visão Geral */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visão Geral (Mês)</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.totalOcorrencias}</Text>
              <Text style={styles.statLabel}>Total de Ocorrências</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.emAndamento}</Text>
              <Text style={styles.statLabel}>Em Andamento</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.ocorrenciasAtendidas}</Text>
              <Text style={styles.statLabel}>Ocorrências Atendidas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.tempoMedioResposta}</Text>
              <Text style={styles.statLabel}>Tempo Médio Resposta</Text>
            </View>
          </View>
        </View>

        {/* Divisor */}
        <View style={styles.divider} />

        {/* Análise de Natureza */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Análise de Natureza</Text>
          
          {/* Ocorrências por Natureza */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Ocorrências por Natureza</Text>
            <View style={[styles.chartPlaceholder, {width: ScreenWidth - 40}]}>
              <Text style={styles.placeholderText}>
                *Espaço para Gráfico de Pizza/Barra*
              </Text>
            </View>
          </View>

          {/* Ocorrências Semanais */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Ocorrências Semanais</Text>
            <View style={[styles.chartPlaceholder, {width: ScreenWidth - 40}]}>
              <Text style={styles.placeholderText}>
                *Espaço para Gráfico de Linha*
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  chartSection: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default DashboardScreen;