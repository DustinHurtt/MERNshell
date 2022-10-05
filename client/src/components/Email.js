import React from "react";

const Email = ({ setEmail }) => {
  return (
    <div>
      <label>Email</label>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default Email;