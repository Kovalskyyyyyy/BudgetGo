import React from 'react';
import { useGlobalContext } from './globalContext';
import IncomeForm from './IncomeForm';  // Assuming IncomeForm can be used for expenses with minor tweaks

export const Expenses = () => {
  const { expenses, deleteExpense, addExpense } = useGlobalContext();

  // Function to calculate total expenses
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const totalStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center', // Centered text
    padding: '10px',
    background: '#f0f0f0',
    margin: '10px 0 20px',
    borderRadius: '5px',
    width: '100%'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: '40px'
  };

  const listItemStyle = {
    padding: '10px',
    margin: '6px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
    width: '80vh'
  };

  const itemDetailStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: '1 1 auto',
    padding: '0 8px'
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  return (
    <div>
      <h1>Expenses</h1>
      <div style={totalStyle}>TOTAL EXPENSES: {totalExpenses.toFixed(2)}kč</div>
      <div style={containerStyle}>
        <IncomeForm addTransaction={addExpense} isIncome={false} style={{ maxWidth: '300px' }} />
        <div style={{ width: '60%' }}>
          <ul style={{ padding: 0, width: '100%', overflowY: 'auto' }}>
            {expenses.map((expense) => (
              <li key={expense._id} style={listItemStyle}>
                <span style={itemDetailStyle}><strong>Name:</strong> {expense.name}</span>
                <span style={itemDetailStyle}><strong>Amount:</strong> {expense.amount.toFixed(2)}kč</span>
                <span style={itemDetailStyle}><strong>Date:</strong> {formatDate(expense.date)}</span>
                <span style={itemDetailStyle}><strong>Type:</strong> {expense.type}</span>
                <button onClick={() => deleteExpense(expense._id)} style={{ padding: '5px 10px', fontSize: '0.85rem', marginLeft: '10px' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
