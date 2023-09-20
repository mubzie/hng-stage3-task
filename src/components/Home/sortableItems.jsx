/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./Galery.module.css";

export function Sortable({ props }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id }); 

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={styles.parentContainer}
        {...attributes}
        {...listeners}
        style={style}
        // key={props.id}
      >
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img
              className={styles.gallery}
              style={{ backgroundImage: `url(${props.image})` }}
            ></img>
            <div className={styles.galleryInfo}>
              <div className={styles.name}>{props.name}</div>
              <div className={styles.tag}>{props.tag}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
