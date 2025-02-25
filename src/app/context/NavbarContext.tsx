import { createContext, useState } from "react";

const SizeContext = createContext<{
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}>({ selectedSize: "", setSelectedSize: () => {} });

const SizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedSize, setSelectedSize] = useState("desktop");

  return (
    <SizeContext.Provider value={{ selectedSize, setSelectedSize }}>
      {children}
    </SizeContext.Provider>
  );
};

export { SizeProvider, SizeContext };