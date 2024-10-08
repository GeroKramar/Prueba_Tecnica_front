'use client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Character } from '../interfaces';


export default function PersonajesPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Llamada a la API con paginación
    const fetchCharacters = async () => {
      const res = await fetch(`/api/character?page=${page}&limit=10`); // Ajustar la URL a la paginación del backend
      const data = await res.json();
      setCharacters(data.results);
      setTotalPages(data.totalPages); // Actualizar la cantidad total de páginas
    };
    fetchCharacters();
  }, [page]);

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
        <h1 className="text-4xl font-extrabold text-center mb-10">Personajes de Rick and Morty</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {characters.map((character) => (
            <div key={character.id} className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
              <img src={character.image} alt={character.name} className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h2 className="text-2xl font-bold">{character.name}</h2>
              <p className="text-gray-400">{character.status}</p>
            </div>
          ))}
        </div>

        {/* Botones de paginación */}
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
