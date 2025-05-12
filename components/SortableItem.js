import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Card from "./Card";

const SortableItem = ({ item, containerIndex }) => {
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
  const width = containerIndex === 0 ? "lg:w-56" : "lg:w-full";
  const opacity = isDragging ? "opacity-50" : "opacity-100";
  return (
    <li
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`${opacity} ${width} xl:w-56`}
    >
      <Card {...item} />
    </li>
  );
};

export default SortableItem;
