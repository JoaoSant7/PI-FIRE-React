// screens/DetalhesStyles.js
import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  card: {
    margin: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    flex: 1.5,
    textAlign: "right",
    flexWrap: "wrap",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 100,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  // Estilos para a seção de fotos
  photosScrollView: {
    marginHorizontal: -4,
  },
  photosContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  photo: {
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  noPhotosContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  noPhotosText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default styles;