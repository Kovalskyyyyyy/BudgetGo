import React, { useState } from 'react';

const IncomeForm = ({ addTransaction, isIncome }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    gap: '10px',
    fontSize: '1.3rem',
    marginLeft: 'auto',
    marginRight: '200px'
  };

  const inputStyle = {
    padding: '10px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      name,
      amount: parseFloat(amount),
      date,
      type
    };

    addTransaction(transaction);
    setName('');
    setAmount('');
    setDate('');
    setType('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Add Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Add Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        style={inputStyle}
      />
      <select value={type} onChange={(e) => setType(e.target.value)} required style={inputStyle}>
        <option value="">Select Type</option>
        <option value="Food">Food</option>
        <option value="Clothes">Clothes</option>
        <option value="Electronics">Electronics</option>
        <option value="Salary">Salary</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit" style={buttonStyle}>{isIncome ? 'Add Income' : 'Add Expense'}</button>
    </form>
  );
};

export default IncomeForm;
