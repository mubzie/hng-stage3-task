/* eslint-disable react/prop-types */
import React from "react";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Sortable } from "./sortableItems";
import styles from "./Galery.module.css";

const Gallery = () => {
  const [gallerys, setGallerys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleDragEnd = (e) => {
    const { active, over } = e;
    console.log("active:" + active.id);
    console.log("over:" + over.id);

    if (active.id !== over.id) {
      setGallerys((gallerys) => {
        const activeIndex = gallerys.findIndex(
          (gallery) => gallery.id === active.id
        );
        const overIndex = gallerys.findIndex(
          (gallery) => gallery.id === over.id
        );
        console.log(arrayMove(gallerys, activeIndex, overIndex));

        return arrayMove(gallerys, activeIndex, overIndex);
      });
    }
  };

  useEffect(() => {
    const countryCount = [];

    const generateRandom = () => {
      for (let i = 0; i < 8; i++) {
        countryCount.push(i);
      }
    };

    const fetchImages = async () => {
      let resultArray = [];

      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();

      generateRandom();

      countryCount.map((index) => {
        resultArray = [
          ...resultArray,
          {
            id: index,
            name: data[index]["name"]["common"],
            tag: data[index]["continents"][0],
            image: data[index]["flags"]["png"],
          },
        ];
      });

      setGallerys([...resultArray]);
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <input type="text" placeholder="search a country"></input>
          <button className={styles.searchBtn}>search</button>
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className={styles.cardWrapper}>
          <SortableContext items={gallerys} strategy={rectSortingStrategy}>
            {gallerys.map((gallery) => (
              // console.log(gallery.id)
              <Sortable key={gallery.id} props={gallery} />
            ))}
            {/* {gallerys.map((gallery) => {
              return (
                <SortableGallery
                  key={gallery.id}
                  gallery={gallerys}
                ></SortableGallery>
              );
            })} */}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
};

export default Gallery;
