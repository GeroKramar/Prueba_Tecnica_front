"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Character } from "../interfaces";
import Link from "next/link";
import Swal from "sweetalert2";

export default function PersonajesPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await fetch(
        `${apiUrl}/characters?page=${page}&limit=10`
      );
      const data = await res.json();
      setCharacters(data.characters);
      setAllCharacters(data.characters); 
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
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${apiUrl}/characters/delete/${id}`, {
            method: "DELETE",
          });
  
          if (res.ok) {
            setCharacters((prev) => prev.filter((char) => char._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          } else {
            console.error("Error al eliminar el personaje.");
          }
        } catch (error) {
          console.error("Error al conectar con el servidor.", error);
        }
      }
    });
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


        <div className="flex justify-center items-center gap-8 mb-8">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 w-96 rounded-lg border-2 border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />

          <Link href="/crear">
            <button className="inline-block bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
              Crear personaje
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {characters.length > 0 ? (
            characters.map((character) => (
              <div
                key={character._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg text-center"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold">{character.name}</h2>
                <p className="text-gray-400">{character.status}</p>

                {/* Botones debajo de los personajes */}
                <div className="flex justify-between mt-12 align-middle space-x-2">
                  <Link href={`/personajes/${character._id}`}>
                    <button className="px-4 py-2 bg-green-500 hover:bg-gray-400 text-white font-bold rounded-lg">
                      Ver detalles
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(character._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron personajes.</p>
          )}
        </div>

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
