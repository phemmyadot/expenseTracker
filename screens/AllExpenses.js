import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { fetchExpenses } from "../utils/http";

function AllExpenses() {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      period={"Total"}
      expenses={expenses}
      fallBackText={"No expenses registered."}
    />
  );
}

export default AllExpenses;
