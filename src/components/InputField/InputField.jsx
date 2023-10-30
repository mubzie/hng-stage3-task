const InputField = ({ value, onChange, placeholder, str, type, className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      id={str}
      name={str}
      autoComplete={str}
      className={className}
      required
    ></input>
  );
};

export default InputField;
