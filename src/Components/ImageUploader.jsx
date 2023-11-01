
const ImageUploader = ({ onSelectFile }) => {
  return (
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
  );
};

export default ImageUploader;
