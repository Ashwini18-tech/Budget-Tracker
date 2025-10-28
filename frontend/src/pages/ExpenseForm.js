import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseForm({ addTransaction }) {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: '',
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInfo({ ...expenseInfo, [name]: value });
  };

  const addExpenses = (e) => {
    e.preventDefault();
    const { amount, text } = expenseInfo;
    if (!amount || !text) {
      handleError('Please add Expense Details');
      return;
    }
    addTransaction(expenseInfo);
    setExpenseInfo({ amount: '', text: '' });
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Add New Expense</h2>
      <form onSubmit={addExpenses} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="text" style={styles.label}>Expense Detail</label>
          <input
            onChange={handleChange}
            type="text"
            name="text"
            placeholder="Enter your expense detail..."
            value={expenseInfo.text}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="amount" style={styles.label}>Amount</label>
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            placeholder="Enter amount..."
            value={expenseInfo.amount}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Add Expense</button>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#1e293b',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
    marginBottom: '30px',
    color: '#f1f5f9',
    maxWidth: '500px',
    margin: '0 auto 40px auto',
  },
  heading: {
    textAlign: 'center',
    color: '#38bdf8',
    marginBottom: '20px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    color: '#cbd5e1',
    fontSize: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
  },
  button: {
    padding: '14px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ExpenseForm;
