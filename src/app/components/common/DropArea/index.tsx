"use client";
import { useDrop } from "react-dnd";
import { useContext } from "react";
import Image from "next/image";
import { SizeContext } from "@/app/context/NavbarContext";
import { v4 as uuidv4 } from 'uuid';
import useHome from "../../pages/useHome";
import { ItemContainer, ResizableDiv } from "../style";



const DropArea: React.FC = () => {
  const { selectedSize } = useContext(SizeContext);
  const { handleImageChange, items, setItems,isEditing, text,handleFocus,handleBlur,handleChange,ref  } = useHome();



  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["text", "image"],
    drop: (item: { type: "text" | "image" }) => {
      setItems((prev) => [
        ...prev,
        {
          id: uuidv4(), // Avoid hydration mismatch
          type: item.type,
          content:
            item.type === "text" ? "Edit me" : "/assets/demo.png", // ✅ Use a local placeholder image
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref);

  return (
    <div
    ref={ref}
    className={`w-full h-[500px] ${isOver ? "bg-gray-200" : ""}`}
    style={{ display: selectedSize == 'desktop' ? "flex" : "block", flexDirection: "row", flexWrap: "wrap" }}
  >
    {items.map((item) => (
      <ItemContainer key={item.id}>
        {item.type === "text" ? (
          <ResizableDiv>
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
            
          </ResizableDiv>
        ) : (
          <div className="resizable relative">
            <Image
              src={item.content || "https://placehold.co/600x400"}
              width={30}
              layout="responsive"
              height={20}
              alt="Placeholder Image"
              className="border"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleImageChange(e, item.id)}
            />
          </div>
        )}
      </ItemContainer>
    ))}
  </div>
  );
};

export default DropArea;
