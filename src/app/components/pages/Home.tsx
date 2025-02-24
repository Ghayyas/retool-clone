"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableItem, DropArea } from "../common/index";

const Home = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4 p-4">
        {/* Sidebar */}
        <div className="w-1/4 border p-2">
          <h2>Components</h2>
          <DraggableItem type="text" />
          <DraggableItem type="image" />
        </div>

        {/* Drop Area */}
        <div className="w-3/4">
          <DropArea />
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
