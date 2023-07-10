import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.secondary800} />
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
});

export default LoadingOverlay;
