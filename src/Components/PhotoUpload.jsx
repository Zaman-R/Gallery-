
const PhotoUpload = ({ onSelectFile }) => {
  return (
    <label className="upload-btn font-bold rounded-xl h-10 w-12 text-red flex justify-center items-center">
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
  );
};

export default PhotoUpload;
