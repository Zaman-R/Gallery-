import PhotoUpload from './PhotoUpload';
import DeleteButton from './DeleteButton';

// Navbar component responsible for displaying the navigation bar and UI controls.
const Navbar = ({ onSelectFile, deleteHandler, selectedImageIndexes }) => {
  return (
    <nav
      className="relative flex w-full items-center justify-between rounded-lg bg-white py-2 shadow-sm shadow-neutral-700/10 dark:bg-neutral-800 dark:shadow-black/30  lg:flex-wrap lg:justify-start"
      data-te-navbar-ref
    >
      <div className="flex w-full  flex-wrap items-center justify-between px-6 ">
        <div className="flex items-center  ">
          {/* Display the count of selected images */}
          <p className="font-bold text-white">
            {selectedImageIndexes.length} Selected Images
          </p>
        </div>
        {/* Display the title of the gallery */}
        <h1 className="text-center text-5xl mb-2 mx-auto  font-bold text-white md:text-6xl xl:text-6xl ">
          Gallery <br />
        </h1>
        <div className="my-1 flex items-center ">
          {/* Render the component for uploading photos */}
          <PhotoUpload onSelectFile={onSelectFile} />
          {/* Render the component for deleting selected images */}
          <DeleteButton deleteHandler={deleteHandler} selectedImageIndexes={selectedImageIndexes} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
