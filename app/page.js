"use client";

import Card from "@/components/Card";
import Droppable from "@/components/Droppable";
import players from "@/data/players";
import { arrayMove, insertAtIndex, removeAtIndex } from "@/utils/array";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function findPlayerByName(name) {
  return players.find((player) => player.name === name);
}

function moveBetweenContainers(
  items,
  activeContainer,
  activeIndex,
  overContainer,
  overIndex,
  item
) {
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
  };
}

function App() {
  const [itemGroups, setItemGroups] = useState({
    group1: [],
    group2: players,
    group3: [],
    group4: [],
  });
  const [activeItem, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector("#portal");
    setMounted(true);
  }, []);

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = itemGroups[activeContainer].findIndex(
          (item) => item.name === active.id
        );
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : itemGroups[activeContainer].findIndex(
                (item) => item.name === active.id
              );
        const item = itemGroups[activeContainer].find(
          (item) => item.name === active.id
        );
        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          item
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = itemGroups[activeContainer].findIndex(
        (item) => item.name === active.id
      );
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : itemGroups[overContainer].findIndex(
              (item) => item.name === over.id
            );
      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          const item = itemGroups[activeContainer].find(
            (item) => item.name === active.id
          );
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            item
          );
        }
        return newItems;
      });
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid min-h-screen grid-cols-3 grid-rows-[auto_1fr] gap-6 p-6">
        {Object.keys(itemGroups).map((group, index) => (
          <Droppable
            index={index}
            id={group}
            items={itemGroups[group]}
            activeItem={activeItem}
            key={group}
          />
        ))}
      </div>
      {mounted && ref.current
        ? createPortal(
            <DragOverlay>
              {activeItem ? (
                <Card {...findPlayerByName(activeItem)} dragOverlay />
              ) : null}
            </DragOverlay>,
            document.getElementById("portal")
          )
        : null}
    </DndContext>
  );
}

export default App;
