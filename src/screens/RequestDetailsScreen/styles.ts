import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f8fa",
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
  },
  imageLoader: {
    position: "absolute",
    top: "50%",
  },
  content: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#002147",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#002147",
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: "#333",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  buttonContainer: {
    marginTop: 15,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#002147",
    marginHorizontal: 16,
    marginTop: 25,
    marginBottom: 8,
  },
  fab: {
    position: "absolute",
    right: 20,
    backgroundColor: "#002147",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
