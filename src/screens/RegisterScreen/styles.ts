import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#002147", // azul universitário
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#002147",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
});
