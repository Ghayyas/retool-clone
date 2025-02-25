"use client";
import { useDrop } from "react-dnd";
import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import { SizeContext } from "@/app/context/NavbarContext";
import { v4 as uuidv4 } from 'uuid';

type DroppedItem = {
  id: string;
  type: "text" | "image";
  content?: string;
};

const DropArea: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<DroppedItem[]>([]);
  const { selectedSize } = useContext(SizeContext);


  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["text", "image"],
    drop: (item: { type: "text" | "image" }) => {
      setItems((prev) => [
        ...prev,
        {
          id: uuidv4(), // Avoid hydration mismatch
          type: item.type,
          content:
            item.type === "text" ? "Edit me" : "../../assets/placeholder.svg", // ✅ Use a local placeholder image
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref);

  useEffect(() => {
    console.log("items", selectedSize);
  }, [items]);

  const handleImageChange = (e:any, id:any) => {
    const selectedImage = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const imageDataUrl = reader.result;
      // Update the item's content with the selected image
      setItems((prevItems:any) =>
        prevItems.map((item:any) => (item.id === id ? { ...item, content: imageDataUrl } : item))
      );
    };
  
    reader.readAsDataURL(selectedImage);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Initial text");

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e:any) => {
    setText(e.target.value);
  };

  return (
    <div
    ref={ref}
    className={`w-full h-[500px] ${isOver ? "bg-gray-200" : ""}`}
    style={{ display: selectedSize == 'desktop' ? "flex" : "block", flexDirection: "row", flexWrap: "wrap" }}
  >
    {items.map((item) => (
      <div key={item.id} className="p-2 my-2" style={{ flexBasis: "48%" }}>
        {item.type === "text" ? (
          <div className="resizable" style={{ resize: "both", overflow: "auto", height: "30px" }}>
           {isEditing ? <input
              type="text"
              value={text}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your text"
              className="border p-1 w-full h-full"
              style={{
                resize: "both",
                fontSize: "24px", // Increase font size
              }}            />
            : (
              <p onClick={handleFocus}>{text}</p>
            )}
            
          </div>
        ) : (
          <div className="resizable relative">
            <Image
              src={item.content || "https://placehold.co/600x400"}
              width={30}
              layout="responsive"
              height={20}
              alt="Placeholder Image"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleImageChange(e, item.id)}
            />
          </div>
        )}
      </div>
    ))}
  </div>
  );
};

export default DropArea;
