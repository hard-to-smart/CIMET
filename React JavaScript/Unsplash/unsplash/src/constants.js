const apiKey = import.meta.env.VITE_API_KEY;
console.log(apiKey)
export const getRandomImagesURL = (`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=30`)
export const getCustomImagesURL = (`https://api.unsplash.com/search/photos?client_id=${apiKey}&per_page=30`)