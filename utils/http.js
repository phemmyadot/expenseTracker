import axios from "axios";

const apiUrl = "https://expense-app-3c71e-default-rtdb.firebaseio.com";

export async function fetchExpenses() {
  const response = await axios.get(apiUrl + "/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export async function storeExpense(expenseData) {
  const response = await axios.post(apiUrl + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export function removeExpense(id) {
  axios.delete(`${apiUrl}/expenses/${id}.json`);
}

export function editExpense(id, expenseData) {
  axios.put(`${apiUrl}/expenses/${id}.json`, expenseData);
}
