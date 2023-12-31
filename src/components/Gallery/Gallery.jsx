/* eslint-disable react/prop-types */
import React from "react";
import { useState, useEffect } from "react";
import { Sortable } from "./sortableItems";
import AppNav from "../AppNav/AppNav";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import styles from "./Gallery.module.css";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

const Gallery = () => {
  const [gallerys, setGallerys] = useState([]);
  const [originalGallerys, setOriginalGallerys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      // If the search field is empty, reset the gallerys state to its initial value
      setGallerys(originalGallerys);
      return;
    }

    // Filter the gallerys array by tag and search query
    const filteredGallerys = gallerys.filter((gallery) => {
      const tagMatches = gallery.tag.toLowerCase().includes(query);
      return tagMatches;
    });

    setGallerys(filteredGallerys);
  };

  useEffect(() => {
    const countryCount = [];

    const generateRandom = () => {
      for (let i = 0; i < 10; i++) {
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

        setOriginalGallerys([...resultArray]);
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
    <div className={styles.mainContainer}>
      <AppNav />

      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <InputField
            type="text"
            placeholder="filter country by tag"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button type="primaryBtn">search</Button>
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
    </div>
  );
};

export default Gallery;
