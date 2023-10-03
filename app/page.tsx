"use client";
import cs from "classnames";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  let defaultItems = [];
  if (typeof window !== "undefined") {
    defaultItems = JSON.parse(localStorage.getItem("items") || "[]");
  }

  const [items, setItems] = useState(defaultItems);
  const saveItems = () => {
    console.log("saving");
    localStorage.setItem("items", JSON.stringify(items));
  };

  // useEffect(() => {
  //   const items = localStorage.getItem("items");
  //   if (items) {
  //     setItems(JSON.parse(items));
  //   }
  // }, []);

  useEffect(() => {
    saveItems();
  }, [items]);

  return (
    <main className="min-h-screen min-w-screen animated">
      <div>
        <div className="p-3 bg-indigo-50 w-full border-b-4">
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
              className="outline-none w-1/2  p-1 center rounded-md border-2 border-indigo-200"
            ></input>
            <button
              className="bg-indigo-200 p-1 rounded-md border-2 border-indigo-200 color-indigo-800 text-white ml-2"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>

        {/* loop through items to generate elements */}
        {items.map((item, i) => (
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
