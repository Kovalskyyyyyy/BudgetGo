import React from 'react';
import { useGlobalContext } from './globalContext';
import IncomeForm from './IncomeForm';

export const Income = () => {
  const { incomes, deleteIncome, addIncome } = useGlobalContext();

  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);

  const totalStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
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
      <h1>Income</h1>
      <div style={totalStyle}>TOTAL INCOMES: {totalIncome.toFixed(2)}kč</div>
      <div style={containerStyle}>
        <IncomeForm addTransaction={addIncome} isIncome={true} style={{ maxWidth: '100%' }} />
        <div style={{ width: '60%' }}>
          <ul style={{ padding: 0, width: '100%', overflowY: 'auto' }}>
            {incomes.map((income) => (
              <li key={income._id} style={listItemStyle}>
                <span style={itemDetailStyle}><strong>Name:</strong> {income.name}</span>
                <span style={itemDetailStyle}><strong>Amount:</strong> {income.amount.toFixed(2)}kč</span>
                <span style={itemDetailStyle}><strong>Date:</strong> {formatDate(income.date)}</span>
                <span style={itemDetailStyle}><strong>Type:</strong> {income.type}</span>
                <button onClick={() => deleteIncome(income._id)} style={{ padding: '5px 10px', fontSize: '0.85rem', marginLeft: '10px' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Income;
