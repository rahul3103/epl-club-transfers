"use client";
import Bucket from "@/components/Bucket";
import List from "@/components/List";

import players from "@/data/players";
import { useState } from "react";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function Home() {
  const [list, setList] = useState(players);
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    setList(reorder(list, source.index, destination.index));
  };
  return (
    <main className="flex min-h-screen flex-col gap-6 p-4">
      <Bucket list={list} onDragEnd={handleDragEnd} />
      <div className="grid grid-cols-3 gap-16">
        <List
          list={list}
          onDragEnd={handleDragEnd}
          dragItemStyle={{
            background: "pink",
          }}
        />
        <List list={list} onDragEnd={handleDragEnd} />
        <List list={list} onDragEnd={handleDragEnd} />
      </div>
    </main>
  );
}
