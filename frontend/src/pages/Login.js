import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }
    try {
      const url = `${APIUrl}/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => navigate('/home'), 1000);
      } else if (error) {
        handleError(error?.details[0]?.message || message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <img src="/expense.png" alt="Budget Tracker" style={styles.image} />
        <h2 style={styles.heading}>Budget Tracker</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginInfo.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.linkText}>
          Don’t have an account?{' '}
          <Link to="/signup" style={styles.link}>Sign Up</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    color: '#f1f5f9',
  },
  image: {
    width: '70%',
    height: '200px',
    marginBottom: '25px',
    objectFit: 'contain',
    borderRadius: '12px',
    margin: '0 auto 25px auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#cbd5e1',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
  },
  button: {
    padding: '12px',
    marginTop: '15px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  linkText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#94a3b8',
  },
  link: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;
