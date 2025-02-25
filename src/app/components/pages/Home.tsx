"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableItem, DropArea } from "../common/index";
import Navbar from "../common/Navbar";
import { SizeProvider } from "@/app/context/NavbarContext";
import { components } from "./constants";

const Home = () => {
  return (
    <>
      <SizeProvider>
      <Navbar/> 
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4 p-4">
        {/* Sidebar */}
        <div className="w-1/4 border p-2">
          <h2>{components}</h2>
          <DraggableItem type="text" />
          <DraggableItem type="image" />
        </div>

        {/* Drop Area */}
        <div className="w-3/4">
          <DropArea />
        </div>
      </div>
    </DndProvider>
      </SizeProvider>
  
    </>
 
  );
};

export default Home;
