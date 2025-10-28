import React from 'react';

const ExpenseTable = ({ expenses, deleteExpens }) => {
  return (
    <div style={styles.tableWrapper}>
      <h3 style={styles.heading}>Transaction History</h3>
      <div style={styles.expenseList}>
        {expenses.length === 0 ? (
          <p style={styles.noData}>No transactions yet.</p>
        ) : (
          expenses.map((expense, index) => (
            <div key={index} style={styles.expenseItem}>
              <button style={styles.deleteButton} onClick={() => deleteExpens(expense._id)}>X</button>
              <div style={styles.expenseDescription}>{expense.text}</div>
              <div
                style={{
                  ...styles.expenseAmount,
                  color: expense.amount > 0 ? '#27ae60' : '#ef4444',
                }}
              >
                ₹{expense.amount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  tableWrapper: {
    backgroundColor: '#334155',
    borderRadius: '16px',
    padding: '20px',
    marginTop: '30px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
  },
  heading: {
    fontSize: '18px',
    marginBottom: '16px',
    color: '#f1f5f9',
    textAlign: 'center',
  },
  expenseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  expenseItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: '12px 18px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  expenseDescription: {
    color: '#f1f5f9',
    fontWeight: '500',
    flex: 1,
    marginLeft: '10px',
  },
  expenseAmount: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  noData: {
    textAlign: 'center',
    color: '#cbd5e1',
    fontStyle: 'italic',
  },
};

export default ExpenseTable;
