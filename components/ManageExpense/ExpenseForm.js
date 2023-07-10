import { StyleSheet, Text, TextInput, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { getDateFormatted } from "../../utils/date";
import { Colors } from "../../constants/colors";

function ExpenseForm({ onCancel, isEditing, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      isValid: true,
      value: defaultValues ? defaultValues.amount.toString() : "",
    },
    date: {
      isValid: true,
      value: defaultValues ? getDateFormatted(defaultValues.date) : "",
    },
    description: {
      isValid: true,
      value: defaultValues ? defaultValues.description : "",
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      console.log(descriptionIsValid);

      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputRow}>
        <Input
          label={"Amount"}
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "amount"),
            keyboardType: "decimal-pad",
            value: inputs.amount.value,
          }}
        />
        <Input
          label={"Date"}
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "date"),
            maxLength: 10,
            placeholder: "YYYY-MM-DD",
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label={"Description"}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "description"),
          multiline: true,
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values, please check.
        </Text>
      )}
      <View style={styles.actions}>
        <Button mode={"flat"} onPress={onCancel}>
          Cancel
        </Button>
        <Button onPress={submitHandler}>{isEditing ? "Update" : "Add"}</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 16,
  },
  inputRow: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    margin: 8,
    textAlign: "center",
    color: Colors.error500,
  },
});

export default ExpenseForm;
