import { createContext, useReducer, useState } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoe",
    amount: 28.99,
    date: new Date("2023-12-12"),
  },
  {
    id: "e2",
    description: "Movie ticket",
    amount: 8.99,
    date: new Date("2023-2-11"),
  },
  {
    id: "e3",
    description: "A new Laptop",
    amount: 2000.99,
    date: new Date("2023-7-7"),
  },
  {
    id: "e4",
    description: "A pair of shoe",
    amount: 28.99,
    date: new Date("2023-2-2"),
  },
  {
    id: "e5",
    description: "Movie ticket",
    amount: 8.99,
    date: new Date("2023-7-6"),
  },
  {
    id: "e6",
    description: "A new Laptop",
    amount: 2000.99,
    date: new Date("2023-2-2"),
  },
  {
    id: "e7",
    description: "A pair of shoe",
    amount: 28.99,
    date: new Date("2023-2-2"),
  },
  {
    id: "e8",
    description: "Movie ticket",
    amount: 8.99,
    date: new Date("2023-2-11"),
  },
  {
    id: "e9",
    description: "A new Laptop",
    amount: 2000.99,
    date: new Date("2023-2-2"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      return [...state].map((expense) => {
        if (expense.id === action.payload.id) {
          expense = { ...expense, ...action.payload.data };
        }
        return expense;
      });
    case "DELETE":
      return [...state].filter((expense) => action.payload.id !== expense.id);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: { id: id } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
