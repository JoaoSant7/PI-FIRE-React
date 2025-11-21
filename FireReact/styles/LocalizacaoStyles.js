import { StyleSheet } from "react-native";

export const LocalizacaoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 140,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  obterLocalizacao: {
    backgroundColor: "#BC010C",
  },
  compartilharLocalizacao: {
    backgroundColor: "#3E4095",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 12,
  },
  locationContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    width: "100%",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "500",
  },
  coordinatesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  coordinateBox: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  coordinateLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  coordinateValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
});

export default LocalizacaoStyles;