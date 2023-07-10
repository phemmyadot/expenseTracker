import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const { expenses } = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      period={"Total"}
      expenses={expenses}
      fallBackText={"No expenses registered."}
    />
  );
}

export default AllExpenses;
