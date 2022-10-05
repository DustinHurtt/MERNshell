import React from "react";

const Password = ({ setPassword }) => {
  return (
    <div>
      <label>Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export default Password;