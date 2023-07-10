import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpenses() {
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

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      period={"Last 7"}
      expenses={recentExpenses}
      fallBackText={"No expenses registered for the last 7 days."}
    />
  );
}

export default RecentExpenses;
