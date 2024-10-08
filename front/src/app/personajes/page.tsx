"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Character } from "../interfaces";

import Link from "next/link";

export default function PersonajesPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]); // Almacena todos los personajes
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await fetch(
        `http://127.0.0.1:3000/characters?page=${page}&limit=10`
      );
      const data = await res.json();
      setCharacters(data.characters);
      setAllCharacters(data.characters); // Almacena todos los personajes cuando se cargan
      setTotalPages(data.totalPages);
    };
    fetchCharacters();
  }, [page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      // Si la búsqueda está vacía, mostramos todos los personajes
      setCharacters(allCharacters);
    } else {
      // Filtrar personajes localmente
      const filteredCharacters = allCharacters.filter((character) =>
        character.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCharacters(filteredCharacters);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-y-auto">
      <Head>
        <title>Personajes de Rick and Morty</title>
      </Head>

      <main className="max-w-4xl mx-auto py-10">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Personajes de Rick and Morty
        </h1>

        {/* Barra de búsqueda y botón Crear */}
        <div className="flex justify-center items-center gap-8 mb-8">
          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 w-96 rounded-lg border-2 border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />

          <Link href={'/personajes/crear'}>
          <button
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
            Crear tu personaje
          </button>
          </Link>


        </div>

        {/* Mostrar personajes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {characters.length > 0 ? (
            characters.map((character) => (
              <div
                key={character.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg text-center"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold">{character.name}</h2>
                <p className="text-gray-400">{character.status}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron personajes.</p>
          )}
        </div>

        {/* Paginación */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
}