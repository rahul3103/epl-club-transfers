import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Card from "./Card";

const SortableItem = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const opacity = isDragging ? "opacity-50" : "opacity-100";
  return (
    <li
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`${opacity}`}
    >
      <Card {...item} />
    </li>
  );
};

export default SortableItem;
