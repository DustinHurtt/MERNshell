import React from "react";

const ConfirmPassword = ({ setConfirmPassword }) => {
  return (
    <div>
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  );
};

export default ConfirmPassword;