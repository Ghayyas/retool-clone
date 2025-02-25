'use client';

export interface DroppedItem {
    id: string;
    type: 'text' | 'image'; // Add this line
    content: string;
  }

  export type DraggableItemProps = {
    type: "text" | "image";
  };
