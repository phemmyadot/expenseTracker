import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./../../constants/colors";

function ExpensesSummary({ period, expenses }) {
  const total = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.sum}>${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.primary400,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  period: {
    fontSize: 12,
    color: Colors.secondary800,
  },
  sum: {
    fontSize: 16,
    color: Colors.secondary800,
    fontWeight: "bold",
  },
});
export default ExpensesSummary;
