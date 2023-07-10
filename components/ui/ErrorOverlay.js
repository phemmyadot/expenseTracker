import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "./Button";

function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.offWhite,
  },
  text: {
    textAlign: "center",
    color: Colors.secondary800,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ErrorOverlay;
