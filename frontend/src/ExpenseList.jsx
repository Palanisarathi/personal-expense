import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onUpdate, onDelete, filterCategory }) => {
    const filtered = filterCategory ? expenses.filter(e => e.category === filterCategory) : expenses;
    return (
        <div>
            {filtered.map(expense => (
                <ExpenseItem key={expense.id} expense={expense} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default ExpenseList;