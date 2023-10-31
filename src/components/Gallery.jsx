import { useState } from 'react';
import { useDrag } from 'react-dnd';

const DraggableImage = ({ image, index, onDrag }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrag(item.index, dropResult.index);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
      <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        /* your other styles here */
      }}
    >
    <p>hello</p>
      <img src={image.src} alt={image.alt} />
    </div>
  );
};

const Gallery = () => {
  const [images, setImages] = useState(/* your images array here */);

  const handleDrag = (fromIndex, toIndex) => {
    // Update your images array to reflect the new order
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  return (
    <div>
      {images.map((image, index) => (
        <DraggableImage
          key={index}
          index={index}
          image={image}
          onDrag={handleDrag}
        />
      ))}
    </div>
  );
};

export default Gallery;