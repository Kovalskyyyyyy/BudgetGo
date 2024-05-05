import React from 'react';
import { useGlobalContext } from './globalContext'; // Ensure you are exporting and using the context properly

export const Financialplan = () => {
  const { incomes, expenses } = useGlobalContext();

  const calculateTotalIncome = () => incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const calculateTotalExpenses = () => expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const calculateTotalBalance = () => calculateTotalIncome() - calculateTotalExpenses();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
  };

  const fieldStyle = {
    padding: '15px',
    margin: '10px',
    background: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '30%',  // Makes each field take up about a third of container width
    display: 'inline-block' // Align fields horizontally
  };

  const historyStyle = {
    margin: '20px auto',
    padding: '10px',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    maxWidth: '80%',
    textAlign: 'left'
  };

  const listItemStyle = {
    borderBottom: '1px solid #ccc',
    paddingBottom: '8px',
    marginBottom: '8px',
    listStyleType: 'none', // Removes bullet points
    color: '#444'  // Default text color for neutral items
  };

  const incomeStyle = {
    color: '#4CAF50', // Green color for income
    fontWeight: 'bold'
  };

  const expenseStyle = {
    color: '#F44336', // Red color for expenses
    fontWeight: 'bold'
  };

  const incomeFieldStyle = {
    ...fieldStyle,
    background: '#4CAF50',  // Green color for income
    color: 'white'  // White text for better readability
  };

  const expenseFieldStyle = {
    ...fieldStyle,
    background: '#F44336',  // Red color for expenses
    color: 'white'  // White text for better readability
  };

  const balanceFieldStyle = {
    ...fieldStyle,
    background: '#f0f0f0',  // Neutral background for balance
  };

  // Merge and sort transactions by date descending (most recent first)
  const transactionHistory = [...incomes.map(item => ({ ...item, isIncome: true })), ...expenses.map(item => ({ ...item, isIncome: false }))]
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Ensuring the sorting is correct

  return (
    <div>
      <h1>Financial Plan</h1>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <div style={incomeFieldStyle}>TOTAL INCOME: {calculateTotalIncome().toFixed(2)}kč</div>
        <div style={balanceFieldStyle}>TOTAL BALANCE: {calculateTotalBalance().toFixed(2)}kč</div>
        <div style={expenseFieldStyle}>TOTAL EXPENSES: {calculateTotalExpenses().toFixed(2)}kč</div>
      </div>
      <div style={historyStyle}>
        <h3>Transaction History</h3>
        <ul>
          {transactionHistory.map((transaction, index) => (
            <li key={index} style={transaction.isIncome ? { ...listItemStyle, ...incomeStyle } : { ...listItemStyle, ...expenseStyle }}>
              <strong>Type:</strong> {transaction.type} <br />
              <strong>Name:</strong> {transaction.name} <br />
              <strong>Amount:</strong> ${transaction.amount.toFixed(2)} <br />
              <strong>Date:</strong> {formatDate(transaction.date)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Financialplan;
