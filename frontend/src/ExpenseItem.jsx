import axios from 'axios';

const ExpenseItem = ({ expense, onUpdate, onDelete }) => {
    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/expenses/${expense.id}`)
            .then(() => onDelete(expense.id))
            .catch(error => console.error(error));
    };

    const handleEdit = () => {
        const newDescription = prompt('New description', expense.description);
        const newAmount = prompt('New amount', expense.amount);
        const newCategory = prompt('New category', expense.category);
        const newDate = prompt('New date', expense.date);
        if (newDescription && newAmount && newCategory && newDate) {
            const updated = { ...expense, description: newDescription, amount: parseFloat(newAmount), category: newCategory, date: newDate };
            axios.put(`http://localhost:8080/api/expenses/${expense.id}`, updated)
                .then(response => onUpdate(response.data))
                .catch(error => console.error(error));
        }
    };

    return (
        <div>
            <p>{expense.description} - ${expense.amount} - {expense.category} - {expense.date}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ExpenseItem;