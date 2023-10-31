import { useState} from "react";

const App = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return { url: URL.createObjectURL(file), selected: false };
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    event.target.value = "";
  };

  function deleteHandler() {
    const updatedImages = selectedImages.filter(
      (image, index) => !selectedImageIndexes.includes(index)
    );
    setSelectedImages(updatedImages);
    setSelectedImageIndexes([]);
  }

  function toggleImageSelection(index) {
    const updatedIndexes = [...selectedImageIndexes];
    if (updatedIndexes.includes(index)) {
      // Image is already selected, so deselect it
      const imageIndex = updatedIndexes.indexOf(index);
      updatedIndexes.splice(imageIndex, 1);
    } else {
      // Image is not selected, so select it
      updatedIndexes.push(index);
    }
    setSelectedImageIndexes(updatedIndexes);
  }

  function handleImageClick(index) {
    toggleImageSelection(index);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between ">
      
        <p>{selectedImageIndexes.length} Selected Images</p>

        <button
          className="upload-btn m-auto block border rounded-xl w-40 h-12 text-red bg-red"
          onClick={deleteHandler}
        >
          Delete Selected
        </button>
      </div>
      <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
        {selectedImages &&
          selectedImages.map((image, index) => (
            <div
              key={image.url}
              className={`image relative shadow-md ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
              onClick={() => handleImageClick(index)}
            >
              <input
                type="checkbox"
                checked={selectedImageIndexes.includes(index)}
                onChange={() => toggleImageSelection(index)}
                className="absolute top-2 left-2"
              />
              <img src={image.url} height="200" alt="upload" />
            </div>
          ))}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <label className="flex flex-col justify-center items-center border border-dotted rounded-xl w-full h-full cursor-pointer text-lg">
            + Add Images
            <br />
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              multiple
              accept="image/png image/jpeg image/webp"
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
