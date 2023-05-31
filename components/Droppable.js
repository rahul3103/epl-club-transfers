import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Droppable = ({ id, items, index, card }) => {
  const { setNodeRef } = useDroppable({ id });
  const span = index === 0 ? "col-span-3 sm:grid-cols-5" : "";
  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul
        className={`auto-rows-max grid-cols-2 gap-2 ${span} grid rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-5 dark:border-gray-600 dark:bg-gray-900`}
        ref={setNodeRef}
      >
        {items.map((item) => (
          <SortableItem key={item.name} item={item} id={item} card={card} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;
