import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import './App.css';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/expenses')
            .then(response => setExpenses(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAdd = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const handleUpdate = (updatedExpense) => {
        setExpenses(expenses.map(e => e.id === updatedExpense.id ? updatedExpense : e));
    };

    const handleDelete = (id) => {
        setExpenses(expenses.filter(e => e.id !== id));
    };

    return (
        <div className="App">
            <h1>Personal Expense Tracker</h1>
            <ExpenseForm onAdd={handleAdd} />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
            </select>
            <ExpenseList expenses={expenses} onUpdate={handleUpdate} onDelete={handleDelete} filterCategory={filterCategory} />
        </div>
    );
}

export default App;
