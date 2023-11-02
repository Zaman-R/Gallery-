const ImageGallery = ({ selectedImages, selectedImageIndexes, toggleImageSelection, onImageReorder, draggedImageIndex, setDraggedImageIndex }) => {
  
  
  function handleImageClick(index, e) {
    // Don't select when dragging
    if (draggedImageIndex !== null) {
      setDraggedImageIndex(null);
      return;
    }

    if (e.target.type === "checkbox") {
      toggleImageSelection(index);
    }
  }

  function handleDragStart(e, index) {
    
    e.dataTransfer.setData("text/plain", index);
    // console.log(e.target);
    setDraggedImageIndex(index);
  }

  function handleDragEnd() {
    setDraggedImageIndex(null);
  }

  function handleDragOver(e) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {selectedImages &&
        selectedImages.map((image, index) => (
          <div
            key={image.url}
            className={`${
              index === 0 ? 'md:col-span-2 lg:col-span-2 xl:col-span-2 xl:row-span-2' : 'col-span-1'
            } relative shadow-md `}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={(e) => handleDragEnd(e, index)}
              onClick={(e) => handleImageClick(index, e)}
            >
              <input
                type="checkbox"
                checked={selectedImageIndexes.includes(index)}
                className="absolute top-4 left-4 z-50 bg-white w-5 h-5"
              />
              <img className="hover:brightness-50" src={image.url} height="200" alt="upload" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ImageGallery;