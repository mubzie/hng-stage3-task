/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./Galery.module.css";
import Card from "../Card/Card";

export function Sortable({ props }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={style.pContainer}
    >
      <div
        className={styles.parentContainer}
        {...attributes}
        {...listeners}
        style={style}
      >
        <Card props={props} />
      </div>
    </div>
  );
}

export default Sortable;
