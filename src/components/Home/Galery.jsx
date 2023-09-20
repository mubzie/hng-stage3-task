import React from "react";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import styles from "./Galery.module.css";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleOndragEnd = (result) => {
    const items = Array.from(gallery);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGallery(items);
    console.log(result);
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

      setGallery([...resultArray]);
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

      <div className={styles.cardWrapper}>
        {gallery.map((item) => {
          return (
            <div key={item.id} className={styles.parentContainer}>
              <div className={styles.cardContainer}>
                <div className={styles.card}>
                  <img
                    className={styles.gallery}
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></img>
                  <div className={styles.galleryInfo}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.tag}>{item.tag}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
