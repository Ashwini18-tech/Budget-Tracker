import React from 'react';

function ExpenseDetails({ incomeAmt, expenseAmt }) {
  return (
    <div style={styles.container}>
      <div style={styles.balanceBox}>
        <h2 style={styles.balanceText}>Your Balance</h2>
        <h1 style={styles.balanceAmt}>₹ {incomeAmt - expenseAmt}</h1>
      </div>

      <div style={styles.amountsContainer}>
        <div style={styles.amountBox}>
          <p style={styles.label}>Income</p>
          <span style={styles.income}>+ ₹{incomeAmt}</span>
        </div>
        <div style={styles.amountBox}>
          <p style={styles.label}>Expense</p>
          <span style={styles.expense}>- ₹{expenseAmt}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#334155',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    color: '#f1f5f9',
    textAlign: 'center',
  },
  balanceBox: {
    marginBottom: '20px',
  },
  balanceText: {
    margin: 0,
    fontSize: '18px',
    color: '#94a3b8',
  },
  balanceAmt: {
    fontSize: '28px',
    margin: '5px 0',
    color: '#38bdf8',
  },
  amountsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
  },
  amountBox: {
    backgroundColor: '#1e293b',
    padding: '15px 25px',
    borderRadius: '10px',
    width: '45%',
  },
  label: {
    marginBottom: '8px',
    fontSize: '14px',
    color: '#94a3b8',
  },
  income: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  expense: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: '18px',
  },
};

export default ExpenseDetails;
