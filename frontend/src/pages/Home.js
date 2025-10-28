import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';



function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => navigate('/login'), 1000);
  };

  useEffect(() => {
    const amounts = expenses.map(item => item.amount);
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => acc + item, 0);
    const exp = amounts
      .filter(item => item < 0)
      .reduce((acc, item) => acc + item, 0) * -1;

    setIncomeAmt(income);
    setExpenseAmt(exp);
  }, [expenses]);

  const deleteExpens = async (id) => {
    try {
      const url = `${APIUrl}/expenses/${id}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        method: 'DELETE',
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExpenses = useCallback(async () => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  }, [navigate]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addTransaction = async (data) => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.welcomeText}>Welcome, {loggedInUser}</h1>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>

        <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
        <ExpenseForm addTransaction={addTransaction} />
        <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />
        <ToastContainer />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    padding: '30px 0',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    width: '90%',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
    color: '#f1f5f9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
  },
  welcomeText: {
    fontSize: '26px',
    color: '#e2e8f0',
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default Home;
