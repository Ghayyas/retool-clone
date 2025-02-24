// "use client";

// import { useDrag } from "react-dnd";
// import { useRef } from "react";

// const SidebarItem = ({ type, label }: { type: string; label: string }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type,
//     item: { type },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   drag(ref); // Apply drag to ref

//   return (
//     <div
//       ref={drag}
//       className="p-3 m-2 bg-gray-200 rounded cursor-pointer"
//       style={{ opacity: isDragging ? 0.5 : 1 }}
//     >
//       {label}
//     </div>
//   );
// };

// export default function Sidebar() {
//   return (
//     <div className="w-1/4 p-4 bg-gray-100">
//       <h2 className="text-lg font-bold">Components</h2>
//       <SidebarItem type="text" label="Text" />
//       <SidebarItem type="image" label="Image" />
//     </div>
//   );
// }
