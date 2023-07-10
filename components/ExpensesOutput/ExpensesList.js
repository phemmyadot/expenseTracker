import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
  function renderExpensesList(itemData) {
    return <ExpenseItem {...itemData.item} />;
  }
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpensesList}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
