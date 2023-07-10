import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function Button({ children, onPress, mode }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.buttonContainer, mode === "flat" && styles.flat]}>
        <Text style={[styles.text, mode === "flat" && styles.flatText]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 8,
    minWidth: 70,
    backgroundColor: Colors.secondary800,
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
  flat: {
    backgroundColor: "transparent",
  },
  flatText: {
    color: Colors.secondary800,
  },
  text: {
    color: Colors.primary400,
    textAlign: "center",
  },
});

export default Button;
