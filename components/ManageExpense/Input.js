import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";

function Input({ label, textInputConfig, style, invalid }) {
  let inputStyles = [styles.textInput];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.multiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidTextInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.text}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  text: {
    color: Colors.secondary800,
    fontSize: 14,
    marginBottom: 4,
  },
  textInput: {
    borderColor: Colors.accent400,
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
  },
  invalidTextInput: {
    borderColor: Colors.error500,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});

export default Input;
