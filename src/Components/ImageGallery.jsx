import { useState } from "react";

const ImageGallery = ({ selectedImages, selectedImageIndexes, toggleImageSelection, onImageReorder }) => {
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);

  function handleImageClick(index) {
    toggleImageSelection(index);
  }

  function handleDragStart(e, index) {
    e.dataTransfer.setData("text/plain", index);
    setDraggedImageIndex(index);
  }

  function handleDragOver(e, index) {
    e.preventDefault();
  }

  function handleDrop(e, index) {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
    setDraggedImageIndex(null);
    if (fromIndex !== index) {
      onImageReorder(fromIndex, index);
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center">
      {selectedImages &&
        selectedImages.map((image, index) => (
          <div
            key={image.url}
            className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2`}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div
              className={`image relative shadow-md ${
                index === 0 ? 'w-full' : 'w-3/4'
              } hover:opacity-80`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onClick={() => handleImageClick(index)}
            >
              <input
                type="checkbox"
                checked={selectedImageIndexes.includes(index)}
                onChange={() => toggleImageSelection(index)}
                className="absolute top-2 left-2"
              />
              <img src={image.url} height="200" alt="upload" />
              {selectedImageIndexes.includes(index) && <div className="overlay"></div>}
              {draggedImageIndex === index && <div className="drag-indicator">Drop Here</div>}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ImageGallery;
