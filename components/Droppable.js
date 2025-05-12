import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Droppable = ({ id, items, index, card }) => {
  const { setNodeRef } = useDroppable({ id });
  const span = index === 0 ? "col-span-3 sm:grid-cols-5" : "";
  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.name)}
      strategy={rectSortingStrategy}
    >
      <ul
        className={`auto-rows-max gap-2 ${span} flex flex-wrap content-start rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-4 dark:border-gray-600 dark:bg-gray-900`}
        ref={setNodeRef}
      >
        {items.map((item) => (
          <SortableItem
            key={item.name}
            item={item}
            id={item}
            card={card}
            containerIndex={index}
          />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;
