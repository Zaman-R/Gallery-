<<<<<<< HEAD
import { useState } from 'react';
import ImageGallery from './Components/ImageGallery';
import Navbar from './Components/Navbar';
=======
import { useState } from "react";
import ImageGallery from "./Components/ImageGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
>>>>>>> cfc22d4e0a9e13c1daeaeaf4aeab77da69a9d16a

const App = () => {
  // State variables to manage selected images, indexes, and dragged image index
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([]);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);

  // Function to handle file selection for image upload
  const onSelectFile = (event) => {
    // Get the selected files from the input element
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    // Create an array of image objects with URLs and selection status
    const imagesArray = selectedFilesArray.map((file) => {
      return { url: URL.createObjectURL(file), selected: false };
    });

    // Update the selectedImages state with the new images
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // Reset the input element to allow selecting the same file again
    event.target.value = '';
  };

  // Function to handle image deletion
  function deleteHandler() {
    // Filter out the selected images based on their indexes
    const updatedImages = selectedImages.filter(
      (image, index) => !selectedImageIndexes.includes(index)
    );

    // Update the selectedImages state with the filtered images
    setSelectedImages(updatedImages);

    // Clear the selected image indexes
    setSelectedImageIndexes([]);
  }

  // Function to toggle image selection when clicked
  function toggleImageSelection(index) {
    if (draggedImageIndex !== null) {
      // If an image is being dragged, do not toggle selection
      setDraggedImageIndex(null);
      return;
    }

    const updatedIndexes = [...selectedImageIndexes];

    if (updatedIndexes.includes(index)) {
      // if Image is already selected, so deselect it
      const imageIndex = updatedIndexes.indexOf(index);
      updatedIndexes.splice(imageIndex, 1);
    } else {
      // Selected imaged got pushed
      updatedIndexes.push(index);
    }

    // Update the selectedImageIndexes state with the new selection
    setSelectedImageIndexes(updatedIndexes);
  }

  // Function to handle image reordering
  function handleImageReorder(fromIndex, toIndex) {
    // Create a copy of the selectedImages array to prevent making direct changes to the state

    const updatedImages = [...selectedImages];

    // Remove the image from the source index and add it to the target index
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);

    // Clone the selectedImageIndexes array to show the new order
    const updatedIndexes = [...selectedImageIndexes];
    updatedIndexes.splice(fromIndex, 1);
    updatedIndexes.splice(toIndex, 0, fromIndex);

    // Update the selectedImages and selectedImageIndexes states
    setSelectedImages(updatedImages);
    setSelectedImageIndexes(updatedIndexes);
  }

  return (
    <div className="p-8">
      {/* Render the Navbar component with  props */}
      <Navbar
        onSelectFile={onSelectFile}
        deleteHandler={deleteHandler}
        selectedImageIndexes={selectedImageIndexes}
      />
      <br />
      <div className="flex">

        {/* Render the ImageGallery component with props */}

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
