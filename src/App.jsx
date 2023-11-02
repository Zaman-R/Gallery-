import { useState } from "react";
import ImageGallery from "./Components/ImageGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([]);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);

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
    if (draggedImageIndex !== null) {
      setDraggedImageIndex(null);
      return;
    }
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

  function handleImageReorder(fromIndex, toIndex) {
    // Reorder images in the selectedImages array
    const updatedImages = [...selectedImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);

    // Update selectedImageIndexes to reflect the new order
    const updatedIndexes = [...selectedImageIndexes];
    updatedIndexes.splice(fromIndex, 1);
    updatedIndexes.splice(toIndex, 0, fromIndex);

    setSelectedImages(updatedImages);
    setSelectedImageIndexes(updatedIndexes);
  }

  return (
    <div className="p-8">
      <nav
        className="relative flex w-full items-center justify-between rounded-lg bg-white py-2 shadow-sm shadow-neutral-700/10 dark:bg-neutral-800 dark:shadow-black/30  lg:flex-wrap lg:justify-start"
        data-te-navbar-ref
      >
        <div className="flex w-full  flex-wrap items-center justify-between px-6 ">


          <div className="flex items-center  ">
            <p className="font-bold text-white">
              {selectedImageIndexes.length} Selected Images
            </p>
          </div>

          <h1 className="text-center    text-5xl mb-2 mx-auto  font-bold text-white md:text-6xl xl:text-6xl ">
            Gallery <br />
          </h1>

          <div className="my-1 flex items-center lg:my-0 ">
            <label className="upload-btn font-bold  rounded-xl h-10 w-12 text-red flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-9 w-9 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400 motion-reduce:transition-none cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="file"
                name="images"
                onChange={onSelectFile}
                multiple
                accept="image/png image/jpeg image/webp"
                className="hidden"
              />
            </label>

            <button
              className={`upload-btn font-bold m-auto block border  rounded-xl w-12 h-10 text-red ${
                selectedImageIndexes.length > 0 ? "bg-gray-200" : "bg-gray-400"
              }`}
              onClick={deleteHandler}
            >
             <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </nav>
      <br />
      <div className="flex">
        <ImageGallery
          selectedImages={selectedImages}
          selectedImageIndexes={selectedImageIndexes}
          toggleImageSelection={toggleImageSelection}
          onImageReorder={handleImageReorder}
          draggedImageIndex={draggedImageIndex}
          setDraggedImageIndex={setDraggedImageIndex}
        />
      </div>
    </div>
  );
};

export default App;
