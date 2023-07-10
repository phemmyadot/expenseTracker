import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { Colors } from "./../constants/colors";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { editExpense, removeExpense, storeExpense } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  async function deletePressHandler() {
    setIsLoading(true);
    try {
      await removeExpense(editedExpenseId);
      deleteExpense(editedExpenseId);
    } catch (error) {
      setError("Could not delete expense!");
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function submitHandler(expenseData) {
    setIsLoading(true);
    let newId = "";
    try {
      if (isEditing) {
        await editExpense(editedExpenseId, expenseData);
        updateExpense(editedExpenseId, expenseData);
      } else {
        const newId = await storeExpense(expenseData);
        addExpense({ ...expenseData, newId });
      }
    } catch (error) {
      setError("Could not save expense!");
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
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
