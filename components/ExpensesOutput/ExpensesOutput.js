import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Colors } from "../../constants/colors";

function ExpensesOutput({ expenses, period, fallBackText }) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary period={period} expenses={expenses} />
      {content}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: Colors.offWhite,
    flex: 1,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.secondary800,
    marginTop: 32,
  },
});

export default ExpensesOutput;
