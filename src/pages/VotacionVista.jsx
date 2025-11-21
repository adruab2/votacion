import { useState } from "react";

export default function VotacionVista() {
  const memes = [
    { id: 1, title: "No Stress", img: "/meme1.jpeg" },
    { id: 2, title: "No Stress", img: "/meme1.jpeg" },
    { id: 3, title: "No Stress", img: "/meme1.jpeg" },
    { id: 4, title: "No Stress", img: "/meme1.jpeg" },
    { id: 5, title: "No Stress", img: "/meme1.jpeg" },
    { id: 6, title: "No Stress", img: "/meme1.jpeg" }
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full bg-blue-500 py-6 text-center text-white text-3xl font-bold">
        Sistema de Votación
      </div>

      {/* Botones superiores */}
      <div className="flex justify-between w-11/12 mt-6">
        <button className="bg-gray-200 px-5 py-2 rounded-full font-semibold hover:bg-gray-300">
          Anterior
        </button>

        <button className="bg-gray-200 px-5 py-2 rounded-full font-semibold hover:bg-gray-300">
          Categorías
        </button>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold mt-8">Mejor meme del mes</h2>
      <p className="text-gray-600">Vota por el meme más divertido de noviembre</p>

      {/* Grid de memes */}
      <div className="grid grid-cols-3 gap-6 mt-10 w-11/12">
        {memes.map((meme) => (
          <div
            key={meme.id}
            onClick={() => setSelected(meme.id)}
            className={`flex p-4 rounded-xl border cursor-pointer transition 
              ${selected === meme.id ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"}
            `}
          >
            {/* Imagen */}
            <img
              src={meme.img}
              alt="Meme"
              className="w-28 h-36 object-cover rounded-lg"
            />

            {/* Info */}
            <div className="ml-4 text-gray-700 flex flex-col justify-center">
              <p>Info</p>
              <p>Info</p>
              <p>Info</p>
              <p>Info</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón enviar */}
      <button className="bg-blue-500 text-white px-8 py-2 rounded-full font-semibold mt-10 hover:bg-blue-600">
        Enviar
      </button>
    </div>
  );
}