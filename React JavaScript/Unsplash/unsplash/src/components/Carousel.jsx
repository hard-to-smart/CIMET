import React, { useEffect, useState } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import Spinner from "../Spinner";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxLength = images.length
  const handleIndexChange = (id) => {
    if (id === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (id === "next") {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };
 

  return (
    <div className="flex flex-row relative h-[80vh] max-w-[80vw] items-center justify-center gap-4 overflow-hidden mx-40">
      <button
        id="prev"
        className="absolute w-[50px] h-[50px] flex items-center justify-center rounded-full left-10 bg-blue-400 focus:bg-blue-600 hover:bg-blue-600 hover:ring-offset-zinc-200 hover:ring-4 ring z-10"
        onClick={() => handleIndexChange("prev")}
      >
        <IoCaretBackOutline size={28} />
      </button>
    
      <div className='flex duration-300 h-full w-full' style={{ transform: ` ${currentIndex === maxLength ? 0 : `translateX(-${currentIndex * 100}%)`}` }}>
        {images.map((image) => (
          <div key={image.id} className="flex-shrink-0 flex w-full h-full items-center justify-center">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="object-cover"
              onClick={() => console.log(image.id)}
            />
          </div>
        ))}
      </div>
     <button
        id="next"
        className="absolute  w-[50px] h-[50px] rounded-full text-center right-10 bg-blue-400 flex items-center focus:bg-blue-600 hover:bg-blue-600 hover:ring-offset-zinc-200 hover:ring-4 ring justify-center z-10"
        onClick={() => handleIndexChange("next")}
      >
        <IoCaretForwardOutline size={28} />
      </button>
    </div>
  );
};

export default Carousel;
