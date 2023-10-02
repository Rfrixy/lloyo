"use client";
import cs from "classnames";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([
    { name: "Eggs", done: true },
    { name: "Dustbin Bags", done: false },
  ]);

  return (
    <main className="min-h-screen min-w-screen animated">
      <div>
        <div className="p-3 bg-indigo-100">
          Produce
          <form
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
            }}
          >
            <input
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e);
              }}
            ></input>
          </form>
        </div>

        {/* loop through items to generate elements */}
        {items.map((item, i) => (
          <div
            key={item.name}
            className={cs(
              "p-4 border-b-2 transition-all duration-500 overflow-hidden",
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
                "transition-[width] duration-300 ease-in-out m-r-7 text-right whitespace-nowrap",
                item.done ? "w-0" : "w-full"
              )}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
