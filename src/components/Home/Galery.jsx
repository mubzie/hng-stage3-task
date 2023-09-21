/* eslint-disable react/prop-types */
import React from "react";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Sortable } from "./sortableItems";
import styles from "./Galery.module.css";

const Gallery = () => {
  const [gallerys, setGallerys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleDragEnd = (e) => {
    const { active, over } = e;

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

      try {
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
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (error)
    return (
      <div className={styles.errorState}>
        A network error was encountered `{error.message}`
      </div>
    );

  if (loading) return <div className={styles.loadingState}>Loading...</div>;

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
              <Sortable key={gallery.id} props={gallery} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
};

export default Gallery;
