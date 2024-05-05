import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:7770/api/v1/";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
        } catch (err) {
            setError("Failed to add income: " + (err.response ? err.response.data.message : err.message));
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            console.log("Incomes fetched:", response.data); // Check the data structure
            setIncomes(response.data);
        } catch (err) {
            console.error("Failed to fetch incomes:", err);
            setError("Failed to fetch incomes: " + err.message);
        }
    };

    const deleteIncome = async (id) => {
        console.log("Attempting to delete income with ID:", id); // Log the ID received
        if (!id) {
            console.error("Delete attempt without an ID");
            setError("Deletion failed: No ID provided");
            return;
        }
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            setIncomes(prevIncomes => prevIncomes.filter(income => income.id !== id));
        } catch (err) {
            console.error("Failed to delete income:", err);
            setError("Failed to delete income: " + (err.response ? err.response.data.message : err.message));
        }
    };

    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses();
        } catch (err) {
            setError("Failed to add expense: " + (err.response ? err.response.data.message : err.message));
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError("Failed to fetch expenses: " + err.message);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
        } catch (err) {
            setError("Failed to delete expense: " + (err.response ? err.response.data.message : err.message));
        }
    };

    return (
        <GlobalContext.Provider value={{
            incomes,
            expenses,
            addIncome,
            getIncomes,
            deleteIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            error
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
