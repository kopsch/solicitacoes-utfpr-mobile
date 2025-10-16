import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 8,
  },
  photoButtonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#002147",
  },
  headerButtonText: {
    color: "#007AFF",
    fontSize: 17,
    marginRight: 10,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerButtonDisabled: {
    color: "#A9A9A9",
  },
  loadingContainer: {
    flex: 1,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#002147",
  },
});
