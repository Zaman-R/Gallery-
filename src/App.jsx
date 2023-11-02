import { useState } from "react";
import ImageGallery from "./components/ImageGallery";
import ImageUploader from "./Components/ImageUploader";

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
  }

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
      <div className="flex justify-between">
        <p>{selectedImageIndexes.length} Selected Images</p>
        <button
          className={`upload-btn m-auto block border rounded-xl w-40 h-12 text-red ${
            selectedImageIndexes.length > 0 ? "bg-gray-300" : "bg-red"
          }`}
          onClick={deleteHandler}
        >
          Delete Selected
        </button>
      </div>
      <br />
      <ImageGallery
        selectedImages={selectedImages}
        selectedImageIndexes={selectedImageIndexes}
        toggleImageSelection={toggleImageSelection}
        onImageReorder={handleImageReorder}
        draggedImageIndex={draggedImageIndex}
        setDraggedImageIndex={setDraggedImageIndex}
      />
      <ImageUploader onSelectFile={onSelectFile} />
    </div>
  );
};

export default App;
