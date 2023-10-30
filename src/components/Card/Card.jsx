import styles from "./Card.module.css";

const Card = ({ props }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <img className={styles.gallery} src={props.image}></img>
        </div>
        <div className={styles.galleryInfo}>
          <div className={styles.name}>{props.name}</div>
          <div className={styles.tag}>{props.tag}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
