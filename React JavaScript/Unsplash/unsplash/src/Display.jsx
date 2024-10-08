import React, { useState } from "react";
import FormContainer from "./components/FormContainer";
import Carousel from "./components/Carousel";
import axios, { all } from "axios";
import { getCustomImagesURL, getRandomImagesURL } from "./constant";

const Display = () => {
  const [images, setImages] = useState([]);
  const handleFetchAPI = async (
    keyword,
    count,
    imageOrientation,
    selectedRandom
  ) => {
    if (selectedRandom) {
      try {
        const response = await axios.get(getRandomImagesURL);
        setImages([response.data[response.data], ...response.data[0]]);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch images");
      }
    } else {
      try {
        let pageCount = Math.ceil(count / 30);
        let allimages = [];
        let url = `${getCustomImagesURL}&query=${keyword}&orientation=${imageOrientation}`;
        for (let i = 1; i <= pageCount; i++) {
          const response = await axios.get(`${url}&page=${i}`);
          allimages = [...allimages, ...response.data.results];
        }
        const imagesToDisplay = allimages.slice(0, count);
        if (imagesToDisplay.length > 0) {
          imagesToDisplay.push(allimages[0]);

          imagesToDisplay.unshift(allimages[count - 1]);
        }

        setImages(imagesToDisplay);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch images");
      }
    }
  };
  console.log(images);
  return (
    <div className="bg-stone-300 flex flex-col justify-center w-full p-8">
      <FormContainer handleFetchAPI={handleFetchAPI} />

      {images.length > 0 && <Carousel images={images} />}
    </div>
  );
};

export default Display;
