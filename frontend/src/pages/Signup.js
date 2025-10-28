import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }
    try {
      const url = `${APIUrl}/auth/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Create Account</h2>
          <form onSubmit={handleSignup} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={signupInfo.name}
              onChange={handleChange}
              style={styles.input}
              autoFocus
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupInfo.email}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupInfo.password}
              onChange={handleChange}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Sign Up</button>
          </form>
          <p style={styles.linkText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>Login</Link>
          </p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

const styles = {
    wrapper: {
        height: '100vh',
        width: '100vw',
        backgroundImage: "url('/background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(15, 23, 42, 0.3)', // Optional: Add overlay if too bright
        backgroundBlendMode: 'overlay',           // Optional: Blend image with overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflow: 'hidden',
      },
      
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.6)', // Slight darkness for readability
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1e293bd9',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    color: '#f1f5f9',
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

export default Signup;
