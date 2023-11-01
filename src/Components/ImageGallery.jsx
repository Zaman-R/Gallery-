const ImageGallery = ({ selectedImages, selectedImageIndexes, toggleImageSelection }) => {
  function handleImageClick(index) {
    toggleImageSelection(index);
  }

  return (
    <div className="flex justify-center items-center">
      {selectedImages &&
        selectedImages.map((image, index) => (
          <div
            key={image.url}
            className={`image relative shadow-md m-2 ${index === 0 ? 'w-64' : 'w-32'} hover:opacity-80`}
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
    </div>
  );
};

export default ImageGallery;
