import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle password reset logic here
    console.log('Password reset link sent to:', email);
  };

  const handleCancel = () => {
    // Navigate back to the login page
    navigate('/employeelogin');
  };

  // Inline styles
  const containerStyle = {
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '32px 24px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#212121',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxSizing: 'border-box',
    borderRadius: '10px',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168)',
  };

  const logoStyle = {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '18px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '6px',
    fontFamily: 'inherit',
    border: '1px solid #ccc',
  };

  const inputFocusStyle = {
    outline: 'none',
    borderColor: '#1778f2',
  };

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'inherit',
    color: '#fff',
    backgroundColor: '#212121',
    border: 'none',
    width: '100%',
    padding: '12px 16px',
    fontSize: 'inherit',
    gap: '8px',
    margin: '12px 0',
    cursor: 'pointer',
    borderRadius: '6px',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168)',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#313131',
  };

  const linkStyle = {
    color: '#1778f2',
    textDecoration: 'none',
  };

  const signupLinkStyle = {
    alignSelf: 'center',
    fontWeight: '500',
  };

  const signupLinkTextStyle = {
    fontWeight: '400',
  };

  return (
    <div style={containerStyle}>
      <div style={logoStyle}>
        Forgot Password
      </div>

      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#1778f2'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
        </div>

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#313131'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#212121'}
        >
          Send Email
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleCancel}
          style={{
            ...buttonStyle,
            backgroundColor: '#ccc',
            color: '#000',
            boxShadow: 'none',
            margin: '0',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#aaa'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ccc'}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
