export default function Options({ label, value, onChange, options, disabled }) {
  return (
    <>
      <label style={{ marginTop: "10px" }}>{label}</label>
      <select value={value} onChange={onChange} disabled={disabled}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
