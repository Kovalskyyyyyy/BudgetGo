import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:7770/api/v1'; // Ensure this matches your backend's configured base URL

export const Goal = () => {
  const [goal, setGoal] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [addSavings, setAddSavings] = useState('');
  const [goalId, setGoalId] = useState('');  // State for storing the goal ID
  const [error, setError] = useState(null);

  const addGoal = async () => {
    if (!goal || !targetAmount) {
      setError('Both goal name and target amount are required.');
      return;
    }

    const newGoal = {
      goal,
      targetAmount: parseFloat(targetAmount),
      currentSavings: parseFloat(currentSavings || 0) // Defaults to 0 if undefined
    };

    try {
      const response = await axios.post(`${BASE_URL}/add-goal`, newGoal);
      console.log('Added goal:', response.data.goal);
      setGoalId(response.data.goal._id);  // Set the goal ID after adding the goal
      setGoal('');
      setTargetAmount('');
      setCurrentSavings('');
      setError(null);
    } catch (err) {
      console.error('Failed to add goal:', err);
      const errMsg = err.response ? 
                      (err.response.data ? 
                        (err.response.data.message || JSON.stringify(err.response.data)) 
                        : 'No detailed error message.')
                      : err.message || 'Network error';
      setError("Failed to add goal: " + errMsg);
    }
  };

  const updateSavings = async () => {
    const savingsToAdd = parseFloat(addSavings);
    if (isNaN(savingsToAdd) || savingsToAdd <= 0) {
      setError('Please enter a positive number for savings.');
      return;
    }

    try {
      const response = await axios.patch(`${BASE_URL}/update-goal/${goalId}`, { additionalSavings: savingsToAdd });
      setCurrentSavings(response.data.currentSavings);
      setAddSavings('');
      setError(null);
    } catch (err) {
      console.error('Failed to update savings:', err);
      setError("Failed to update savings: " + (err.response ? err.response.data.message : err.message));
    }
  };

  const progressPercentage = () => {
    if (!targetAmount || targetAmount === 0) return 0;
    return (currentSavings / targetAmount) * 100;
  };

  return (
    <div>
      <h1>Saving for Goal</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter your goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target amount (kč)"
        value={targetAmount}
        onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
      />
      <input
        type="number"
        placeholder="Current savings (kč)"
        value={currentSavings}
        onChange={(e) => setCurrentSavings(parseFloat(e.target.value))}
      />
      <button onClick={addGoal}>Add Goal</button>
      <input
        type="number"
        placeholder="Add to savings (kč)"
        value={addSavings}
        onChange={(e) => setAddSavings(e.target.value)}
      />
      <button onClick={updateSavings}>Update Savings</button>
      <div>
        <h3>Progress: {progressPercentage().toFixed(2)}%</h3>
        <div style={{ width: '100%', backgroundColor: '#ddd' }}>
          <div style={{ height: '20px', width: `${progressPercentage()}%`, backgroundColor: 'green' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Goal;
