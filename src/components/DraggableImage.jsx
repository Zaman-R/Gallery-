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
        border: '1px solid #ccc',
        padding: '8px',
        margin: '4px',
        borderRadius: '4px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#fff',
        display: 'inline-block',
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default DraggableImage;