"use client";
import cs from "classnames";
import { useState } from "react";

export default function Home() {
  const [done, setDone] = useState(false);

  return (
    <main className="min-h-screen min-w-screen animated">
      <div>
        <div className="p-3 bg-indigo-100">Produce</div>
        <div
          className={cs(
            "p-4 border-b-2 transition-all duration-500",
            done
              ? "bg-rose-300 border-rose-500 text-rose-950"
              : "bg-emerald-300 border-emerald-400 text-emerald-800"
          )}
          onClick={() => setDone(!done)}
        >
          <div className={cs("duration-500", done ? "translate-x-3/4" : "")}>
            Eggs
          </div>
        </div>
        <div>Dustbin Bags</div>
      </div>
    </main>
  );
}
