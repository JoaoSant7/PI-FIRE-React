// screens/DashboardScreen.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";

const DashboardScreen = () => {
  const ScreenWidth = Dimensions.get("window").width;

  // Dados mockados
  const dashboardData = {
    totalOcorrencias: "1.247",
    emAndamento: "156",
    ocorrenciasAtendidas: "1.091",
    tempoMedioResposta: "15min",
  };

  // Dados para gráficos
  const pieData = [
    {
      name: "Incêndio",
      population: 215,
      color: "#FF6384",
      legendFontColor: "#7F7F7F",
    },
    {
      name: "Acidente",
      population: 180,
      color: "#36A2EB",
      legendFontColor: "#7F7F7F",
    },
    {
      name: "Assistência",
      population: 320,
      color: "#FFCE56",
      legendFontColor: "#7F7F7F",
    },
    {
      name: "Outros",
      population: 532,
      color: "#4BC0C0",
      legendFontColor: "#7F7F7F",
    },
  ];

  const barData = {
    labels: ["Norte", "Sul", "Leste", "Oeste", "Centro"],
    datasets: [
      {
        data: [320, 180, 215, 280, 252],
      },
    ],
  };

  const lineData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        data: [180, 190, 170, 160, 210, 240, 195],
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
  };

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
              <Text style={styles.statValue}>
                {dashboardData.totalOcorrencias}
              </Text>
              <Text style={styles.statLabel}>Total de Ocorrências</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.emAndamento}</Text>
              <Text style={styles.statLabel}>Em Andamento</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {dashboardData.ocorrenciasAtendidas}
              </Text>
              <Text style={styles.statLabel}>Ocorrências Atendidas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {dashboardData.tempoMedioResposta}
              </Text>
              <Text style={styles.statLabel}>Tempo Médio Resposta</Text>
            </View>
          </View>
        </View>

        {/* Divisor */}
        <View style={styles.divider} />

        {/* Análise de Dados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Análise de Dados</Text>

          {/* Gráfico de Pizza - Ocorrências por Natureza */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Ocorrências por Natureza</Text>
            <PieChart
              data={pieData}
              width={ScreenWidth - 40}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>

          {/* Gráfico de Barras - Ocorrências por Região */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Ocorrências por Região</Text>
            <BarChart
              data={barData}
              width={ScreenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              fromZero
            />
          </View>

          {/* Gráfico de Linha - Ocorrências por Turno (Semanal) */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>
              Ocorrências por Turno (Semanal)
            </Text>
            <LineChart
              data={lineData}
              width={ScreenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
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
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  chartSection: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
});

export default DashboardScreen;
