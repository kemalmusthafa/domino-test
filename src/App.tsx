import React, { useState } from "react";
import {
  countDoubles,
  countThrees,
  sortDominoes,
  removeDuplicates,
  flipCards,
  removeByTotal,
} from "./utils";

type Domino = [number, number];

const defaultData: Domino[] = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

const renderDots = (value: number) => {
  const positions: Record<number, number[]> = {
    0: [],
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 md:gap-2 w-10 h-10 md:w-20 md:h-20">
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          className={`w-3 h-3 md:w-6 md:h-6 ${
            positions[value].includes(i) ? "bg-red-700 rounded-full" : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [dominoes, setDominoes] = useState<Domino[]>(defaultData);
  const [_sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalInput, setTotalInput] = useState<number | "">("");
  const [newDomino, setNewDomino] = useState<Domino>([0, 0]);

  // Duplicates untuk cek nilai agar sama
  const duplicates = dominoes.filter(
    (item, index, array) =>
      array.findIndex(
        ([a, b]) =>
          (a === item[0] && b === item[1]) || (a === item[1] && b === item[0])
      ) !== index
  );

  const handleSort = (order: "asc" | "desc") => {
    setDominoes(sortDominoes(dominoes, order));
    setSortOrder(order);
  };

  const handleRemoveDuplicates = () => {
    setDominoes(removeDuplicates(dominoes));
  };

  const handleFlipCards = () => {
    setDominoes(flipCards(dominoes));
  };

  const handleRemoveByTotal = (total: number) => {
    setDominoes(removeByTotal(dominoes, total));
  };

  const handleRemoveByInput = () => {
    if (totalInput !== "") {
      handleRemoveByTotal(Number(totalInput));
      setTotalInput("");
    }
  };

  const resetData = () => {
    setDominoes(defaultData);
  };

  const handleAddDominoClick = () => {
    const newDominoData = [...dominoes, newDomino];
    setDominoes(newDominoData);
    setNewDomino([0, 0]); // Reset input setelah berhasil
  };

  return (
    <div className="min-h-screen bg-teal-800 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Domino`s Test</h1>

      {/* Area untuk kartu domino */}
      <div className="flex justify-center items-center bg-amber-950 border-2 w-full max-w-6xl h-[450px] py-4 rounded-full mb-4">
        <div className="flex flex-wrap justify-center gap-4">
          {dominoes.map(([a, b], index) => (
            <div
              key={index}
              className={`domino-card border border-black rounded-md shadow-lg ${
                a === b
                  ? "bg-blue-300"
                  : duplicates.some(
                      ([x, y]) => (x === a && y === b) || (x === b && y === a)
                    )
                  ? "bg-yellow-300"
                  : "bg-white"
              } w-20 h-40 sm:w-24 sm:h-48 md:w-28 md:h-56 lg:w-32 lg:h-64`}
            >
              <div className="domino-half">{renderDots(a)}</div>
              <div className="domino-divider h-1 sm:h-1 md:h-1 bg-black"></div>
              <div className="domino-half">{renderDots(b)}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="flex flex-col justify-center text-center m-1 text-white">
        <div>
          Double Numbers Count: <strong>{countDoubles(dominoes)}</strong>
        </div>
        <div>
          Pairs Count: <strong>{duplicates.length}</strong>
        </div>
        <div>
          Threes Count: <strong>{countThrees(dominoes)}</strong>
        </div>
      </p>

      <div className="flex flex-col bg-white border-black border-2 w-full sm:w-[500px] h-[200px] m-5 items-center justify-center rounded-full">
        <div className="font-bold">Domino Manipulate :</div>
        <div className="flex flex-wrap justify-center gap-2">
          {dominoes.map(([a, b], index) => (
            <div key={index} className="text-sm">
              [{a},{b}]
            </div>
          ))}
        </div>
      </div>

      {/* Tombol tindakan */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button
          onClick={() => handleSort("asc")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full sm:w-auto"
        >
          Sort Ascending
        </button>
        <button
          onClick={() => handleSort("desc")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full sm:w-auto"
        >
          Sort Descending
        </button>
        <button
          onClick={handleRemoveDuplicates}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full sm:w-auto"
        >
          Remove Duplicates
        </button>
        <button
          onClick={handleFlipCards}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 w-full sm:w-auto"
        >
          Flip Cards
        </button>
        <button
          onClick={resetData}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full sm:w-auto"
        >
          Reset Data
        </button>
      </div>

      {/* Input dan tombol tambah */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 w-full sm:w-auto">
        <input
          type="number"
          value={newDomino[0]}
          onChange={(e) => {
            const value = Math.min(Math.max(Number(e.target.value), 0), 6);
            setNewDomino([value, newDomino[1]]);
          }}
          className="px-4 py-2 border border-gray-400 rounded-md w-full sm:w-[150px]"
          placeholder="First number (0-6)"
          min="0"
          max="6"
        />
        <input
          type="number"
          value={newDomino[1]}
          onChange={(e) => {
            const value = Math.min(Math.max(Number(e.target.value), 0), 6);
            setNewDomino([newDomino[0], value]);
          }}
          className="px-4 py-2 border border-gray-400 rounded-md w-full sm:w-[150px]"
          placeholder="Second number (0-6)"
          min="0"
          max="6"
        />
        <button
          onClick={handleAddDominoClick}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full sm:w-auto"
        >
          Add Domino
        </button>
      </div>

      {/* Input dan tombol hapus */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <input
          type="number"
          value={totalInput}
          onChange={(e) =>
            setTotalInput(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="px-4 py-2 border border-gray-400 rounded-md w-full sm:w-[150px]"
          placeholder="Enter total to remove"
        />
        <button
          onClick={handleRemoveByInput}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full sm:w-auto"
        >
          Remove By Input
        </button>
      </div>
    </div>
  );
};

export default App;
