import { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { Colors } from "./../constants/colors";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const { deleteExpense, addExpense, updateExpense, expenses } =
    useContext(ExpensesContext);

  const editedExpenseId = route.params?.eId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find((e) => e.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        title: isEditing ? "Edit Expense" : "Add Expense",
      },
      [navigation, isEditing]
    );
  });

  function deletePressHandler() {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function submitHandler(expenseData) {
    if (isEditing) {
      updateExpense(editedExpenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={"trash"}
            color={Colors.error500}
            size={24}
            onPress={deletePressHandler}
          />
        </View>
      )}
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={submitHandler}
        defaultValues={selectedExpense}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.offWhite },

  deleteContainer: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "flex-end",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent400,
    alignItems: "center",
  },
});

export default ManageExpense;
