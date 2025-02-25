"use client";

import { useDrag } from "react-dnd";
import { useRef } from "react";
import { DraggableItemProps } from "../../pages/types";
import useHome from "../../pages/useHome";



const DraggableItem: React.FC<DraggableItemProps> = ({ type }) => {
  const { ref } = useHome();
  const [{ isDragging }, drag] = useDrag(() => ({
    type, // This must match the `accept` type in DropArea
    item: { type }, // ✅ Now passing the type explicitly
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref); // Attach drag behavior

  return (
    <div
      ref={ref}
      className={`p-2 border cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {type === "text" ? "Text Component" : "Image Component"}
    </div>
  );
};

export default DraggableItem;