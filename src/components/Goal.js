import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:7770/api/v1'; // Ensure this matches your backend's configured base URL

export const Goal = () => {
  const [goal, setGoal] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState(0);
  const [addSavings, setAddSavings] = useState('');
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-goals`);
      setGoals(response.data);
      if (response.data.length > 0) {
        // Assuming you want to show the latest goal as the active one
        const latestGoal = response.data[0];
        setGoal(latestGoal.goal);
        setTargetAmount(latestGoal.targetAmount);
        setCurrentSavings(latestGoal.currentSavings);
      }
    } catch (err) {
      setError("Failed to fetch goals: " + err.message);
    }
  };

  const addGoal = async () => {
    if (!goal || !targetAmount) {
      setError('Both goal name and target amount are required.');
      return;
    }

    const newGoal = {
      goal,
      targetAmount: parseFloat(targetAmount),
      currentSavings: parseFloat(currentSavings)
    };

    try {
      await axios.post(`${BASE_URL}/add-goal`, newGoal);
      setGoal('');
      setTargetAmount('');
      setCurrentSavings(0);
      fetchGoals();
      setError(null);
    } catch (err) {
      setError("Failed to add goal: " + err.message);
    }
  };

  const updateSavings = async () => {
    const savingsToAdd = parseFloat(addSavings);
    if (isNaN(savingsToAdd) || savingsToAdd <= 0) {
      setError('Please enter a positive number for savings.');
      return;
    }

    try {
      const latestGoal = goals[0];
      const updatedSavings = latestGoal.currentSavings + savingsToAdd;
      await axios.patch(`${BASE_URL}/update-goal/${latestGoal._id}`, { additionalSavings: savingsToAdd });
      setCurrentSavings(updatedSavings);
      setAddSavings('');
      setError(null);
    } catch (err) {
      setError("Failed to update savings: " + err.message);
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
        onChange={(e) => setTargetAmount(e.target.value)}
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
