import styles from "./Button.module.css";

const Button = ({ type, children, onClick, styleHolder }) => {
  return (
    <div className={styleHolder}>
      <button type={type} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
