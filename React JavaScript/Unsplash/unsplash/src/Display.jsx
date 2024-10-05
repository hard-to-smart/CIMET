import React, { useState } from 'react'
import FormContainer from './components/FormContainer'
import Carousel from './components/Carousel'
import axios from 'axios'
import { getImagesURL } from './constants'

const Display = () => {
    const [images, setImages] = useState([])
    const handleFetchAPI= async(keyword, count, imageOrientation)=>{
        try{
        const response = await axios.get(getImagesURL)
        console.log(response.data)
        return setImages(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <div className="bg-stone-300 flex flex-col justify-center w-full p-8">
    <FormContainer handleFetchAPI={handleFetchAPI} />
    <Carousel images={images}/>
    </div>
  )
}

export default Display