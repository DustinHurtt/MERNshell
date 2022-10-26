const ConfirmPassword = ({ setConfirmPassword }) => {
  return (
    <div className="form-item">
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