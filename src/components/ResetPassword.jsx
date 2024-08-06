import React, { useState } from 'react';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle password reset logic here
    console.log('Password reset link sent to:', email);
  };

  const handleCancel = () => {
    // Handle cancel action (e.g., navigate away or clear form)
    console.log('Password reset canceled');
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
          <br />
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
