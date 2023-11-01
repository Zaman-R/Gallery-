const ImageGallery = ({ selectedImages, selectedImageIndexes, toggleImageSelection }) => {
  function handleImageClick(index) {
    toggleImageSelection(index);
  }

  return (
    <div className="flex flex-wrap justify-center items-center">
      {selectedImages &&
        selectedImages.map((image, index) => (
          <div
            key={image.url}
            className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2`}
          >
            <div
              className={`image relative shadow-md ${
                index === 0 ? 'w-full' : 'w-3/4'
              } hover:opacity-80`}
              onClick={() => handleImageClick(index)}
            >
              <input
                type="checkbox"
                checked={selectedImageIndexes.includes(index)}
                onChange={() => toggleImageSelection(index)}
                className="absolute top-2 left-2"
              />
              <img src={image.url} height="200" alt="upload" />

              {selectedImageIndexes.includes(index) && (
                <div className="overlay"></div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ImageGallery;
