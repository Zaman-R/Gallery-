import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = ({ deleteHandler, selectedImageIndexes }) => {
  return (
    <button
      className={`upload-btn font-bold m-auto block border rounded-xl w-12 h-10 text-red ${
        selectedImageIndexes.length > 0 ? "bg-gray-200" : "bg-gray-400"
      }`}
      onClick={deleteHandler}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteButton;
