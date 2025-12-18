import { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onAdd }) => {
    const [expense, setExpense] = useState({ description: '', amount: '', category: '', date: '' });

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/expenses', expense)
            .then(response => {
                onAdd(response.data);
                setExpense({ description: '', amount: '', category: '', date: '' });
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="description" value={expense.description} onChange={handleChange} placeholder="Description" required />
            <input name="amount" type="number" step="0.01" value={expense.amount} onChange={handleChange} placeholder="Amount" required />
            <select name="category" value={expense.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
            </select>
            <input name="date" type="date" value={expense.date} onChange={handleChange} required />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;