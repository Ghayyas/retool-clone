import { useState } from 'react';

interface DroppedItem {
    id: string;
    type: 'text' | 'image'; // Add this line
    content: string;
  }

const useHome = () => {
  const [items, setItems] = useState<DroppedItem[]>([]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number
  ): void => {
    // function implementation...
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
      const imageDataUrl = reader.result;
      // Update the item's content with the selected image
      setItems((prevItems:any) =>
        prevItems.map((item:any) => (item.id === id ? { ...item, content: imageDataUrl } : item))
      );
    };
  
    reader.readAsDataURL(selectedImage);
  };
  

  return { handleImageChange, items, setItems };
};

export default useHome;