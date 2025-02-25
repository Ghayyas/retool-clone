import { useRef, useState } from 'react';
import { DroppedItem } from './types';



const useHome = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<DroppedItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Initial text");

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number
  ): void => {
    const target = e.target;
    if (!target || !target.files) {
      return;
    }
  
    const selectedImage: File | null = target.files[0];
    if (!selectedImage) {
      return;
    }
    const reader = new FileReader();
  
    reader.onload = () => {
      const imageDataUrl: string | ArrayBuffer | null = reader.result;
      setItems((prevItems: DroppedItem[]) =>
        prevItems.map((item: DroppedItem) =>
          item.id === id ? { ...item, content: imageDataUrl as string } : item
        )
      );
    };
  
    reader.readAsDataURL(selectedImage);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  

  return { handleImageChange, items, setItems,isEditing, setIsEditing,text, setText,handleFocus,handleBlur,handleChange,ref };
};

export default useHome;