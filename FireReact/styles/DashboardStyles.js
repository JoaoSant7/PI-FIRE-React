// styles/DashboardStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  syncButton: {
    position: "absolute",
    right: 0,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  errorBanner: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#e53935",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "#fff",
    marginLeft: 8,
    flex: 1,
  },
  syncInfo: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "center",
  },
  syncText: {
    marginLeft: 6,
    color: "#666",
    fontSize: 12,
  },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  fullWidth: {
    width: "100%",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  rowPercent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  percentBox: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  percentValue: {
    fontSize: 28,
    fontWeight: "bold",
  },
  percentLabel: {
    marginTop: 6,
    fontSize: 14,
    color: "#555",
  },
  chartSection: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  centeredChart: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoSection: {
    margin: 16,
    padding: 12,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
  },
  infoText: {
    textAlign: "center",
    color: "#1e88e5",
    fontSize: 13,
  },
});
