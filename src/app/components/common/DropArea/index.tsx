"use client";
import { useDrop } from "react-dnd";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type DroppedItem = {
  id: number;
  type: "text" | "image";
  content?: string;
};

const DropArea: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<DroppedItem[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["text", "image"],
    drop: (item: { type: "text" | "image" }) => {
      setItems((prev) => [
        ...prev,
        {
          id: Math.random(), // Avoid hydration mismatch
          type: item.type,
          content:
            item.type === "text" ? "Edit me" : "/assets/placeholder.svg", // ✅ Use a local placeholder image
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref);

  useEffect(() => {
    console.log("items", items);
  }, [items]);

  return (
    <div
      ref={ref}
      className={`w-full h-[500px] border-2 ${isOver ? "bg-gray-200" : ""}`}
    >
      {items.map((item) => (
        <div key={item.id} className="p-2 border my-2">
          {item.type === "text" ? (
            <input type="text" value={item.content} className="border p-1" />
          ) : (
            <Image
              src={item.content || "https://placehold.co/600x400"} // ✅ Use local static image
              width={600}
              height={400}
              alt="Placeholder Image"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DropArea;
