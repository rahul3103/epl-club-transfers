import Card from "@/components/Card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function List({ list, onDragEnd, dragItemStyle = {} }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-0 p-5 dark:border-gray-600 dark:bg-gray-900"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.map((item, index) => (
              <Draggable key={item.name} index={index} draggableId={item.name}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      ...(snapshot.isDragging ? dragItemStyle : {}),
                    }}
                  >
                    <Card key={item.name} {...item} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
