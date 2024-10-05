import React from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";

const Carousel = ({ images }) => {
  return (
    <div className="flex flex-row w-full relative h-full gap-4">
      <button className="absolute left-10 bg-blue-700" onClick={console.log('prev clicked')}>
        <IoCaretBackOutline />
      </button>
        {images.map((image) => (
          <img id={image.id} src={image.urls.small} />
        ))}
      <button className="absolute right-10 bg-blue-700" onClick={console.log('next clicked')}>
        <IoCaretForwardOutline />
      </button>
    </div>
  );
};

export default Carousel;
