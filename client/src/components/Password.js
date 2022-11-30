const Password = ({ setPassword, password }) => {
  return (
    <div className="form-item">
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export default Password;