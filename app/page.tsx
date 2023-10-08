"use client";
import cs from "classnames";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  let defaultItems = [
    { name: "Bread", done: false },
    { name: "Milk", done: false },
  ];

  if (typeof window !== "undefined") {
    const savedItemString = localStorage.getItem("items");
    if (savedItemString) defaultItems = JSON.parse(savedItemString);
  }

  const [items, setItems] = useState(defaultItems);
  const saveItems = () => {
    localStorage.setItem("items", JSON.stringify(items));
  };

  useEffect(() => {
    saveItems();
  }, [items]);

  return (
    <main className="min-h-screen min-w-screen animated">
      <div>
        <div className="p-3 bg-gray-800 w-full border-b-2 border-white">
          <form
            className="text-center"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);

              setItems([
                ...items,
                {
                  // @ts-ignore
                  name: (e.target as HTMLFormElement).elements[0].value,
                  done: false,
                },
              ]);

              // clear input
              // @ts-ignore
              (e.target as HTMLFormElement).elements[0].value = "";
            }}
          >
            <input
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e);
              }}
              className="outline-none w-1/2  p-1 px-3 center rounded-full border-2 border-black-200 bg-gray-400"
            ></input>
            <button
              className="bg-gray-900 p-1 px-3 rounded-md border-2 border-gray-300 color-indigo-800 text-white ml-2"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>

        <div>
          <div className="flex justify-center align-center bg-[#4C5D7E] border-b-4 boder-white">
            <div className="text-center px-3 py-2 my-2 text-white">Events</div>
            <div className="text-center px-3 py-2 my-2 text-white bg-indigo-950 rounded-full">
              Grocery
            </div>
            <div className="text-center px-3 py-2 my-2 text-white">Tasks</div>
          </div>
        </div>
        {/* loop through items to generate elements */}
        {items.map((item: any, i: number) => (
          <div
            key={item.name}
            className={cs(
              "p-4 border-b-2 transition-all duration-500 overflow-hidden flex relative pr-10",
              item.done
                ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                : "bg-rose-100 border-rose-500 text-rose-950"
            )}
            onClick={() => {
              const newItems = [...items];
              newItems[i].done = !newItems[i].done;
              setItems(newItems);
            }}
          >
            <div
              className={cs(
                "transition-[width] duration-300 ease-in-out text-right whitespace-nowrap",
                item.done ? "w-0" : "w-full"
              )}
            >
              {item.name}
            </div>
            <div className="absolute right-3">
              <Image
                src="/cross.png"
                width="20"
                height="20"
                alt="trash"
                className="z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("delete");
                  const newItems = [...items];
                  newItems.splice(i, 1);
                  setItems(newItems);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
