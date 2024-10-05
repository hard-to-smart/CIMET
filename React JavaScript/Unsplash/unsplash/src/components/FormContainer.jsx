import { useState } from "react";

const FormContainer = ({handleFetchAPI}) => {
  const [selectedRandom, setSelectedRandom] = useState(false);
  const [userInput, setUserInput] = useState({
    keyword: '',
    count: 1,
    imageOrientation: "landscape",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleRandom=(e)=>{
    setSelectedRandom(e.target.checked);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {keyword, count, imageOrientation} = userInput
    handleFetchAPI(keyword, count, imageOrientation)
  };
  return (
      <form className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6 w-full justify-center items-center"
      onSubmit={handleSubmit}>
        <div className="flex items-center gap-6 justify-center">
          <input type="checkbox" className="accent-blue-500 w-[1em] h-[1em]" checked={selectedRandom} onChange={handleRandom} />
          <span className="text-gray-700 font-semibold text-lg">
            Do you want random images?
          </span>
        </div>
        <div className={`w-full gap-4 justify-around flex items-center ${selectedRandom ? 'text-gray-400':'text-black'}`}>
          <label
            htmlFor="keyword"
            className="text-lg font-semibold"
          >
            Search Photos of:
          </label>
          <input
            id="keyword"
            type="text"
            value={userInput.keyword}
            placeholder="Keywords of photos "
            onChange={handleChange}
            disabled={selectedRandom}
            
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label
            htmlFor="count"
            className="text-lg font-semibold"
          >
            No. of Photos to display :
          </label>
          <input
            type="number"
            id="count"
            value={userInput.count}
            onChange={handleChange}
            placeholder="No. of photos"
            disabled={selectedRandom}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
          />
          <label
            htmlFor="countries"
            className="block text-md font-semibold"
          >
            Set orientation
          </label>
          <select
            id="imageOrientation"
            value={userInput.orientation}
            onChange={handleChange}
            disabled={selectedRandom}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option defaultValue="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </div>

        <button
          className="bg-blue-500 text-white w-3/4  py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          type="submit"
        >
          Search
        </button>
      </form>
  );
};

export default FormContainer;
