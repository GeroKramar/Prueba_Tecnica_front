"use client";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function CrearPersonajePage() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Vivo");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("Desconocido");
  const [originName, setOriginName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [image, setImage] = useState("");
  const [episodes, setEpisodes] = useState<string[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const notify = (message: string, type: 'success' | 'error') => {
    if (type === 'success') {
      toast.success(message, {
        style: {
          background: '#4caf50',
          color: '#fff',
        },
      });
    } else {
      toast.error(message, {
        style: {
          background: '#f44336',
          color: '#fff',
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCharacter = {
      name,
      status,
      species,
      type,
      gender,
      origin: { name: originName },
      location: { name: locationName },
      image,
      episode: episodes,
    };
  
    try {
      const res = await fetch(`${apiUrl}/characters/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCharacter),
      });
  
      if (res.ok) {
        notify("Personaje creado exitosamente!", "success");
        setName("");
        setStatus("Vivo");
        setSpecies("");
        setType("");
        setGender("Desconocido");
        setOriginName("");
        setLocationName("");
        setImage("");
        setEpisodes([]);
      } else {
        notify("Error al crear el personaje.", "error");
      }
    } catch (error:any) {
      console.log(error)
      notify("Error al conectar con el servidor.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <Toaster />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-center">Crear nuevo personaje</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nombre del personaje"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-2 border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-lg font-medium">Estado</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-2 border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="Vivo">Vivo</option>
              <option value="Muerto">Muerto</option>
              <option value="Desconocido">Desconocido</option>
            </select>
          </div>

          {/* Especie */}
          <div>
            <label htmlFor="species" className="block text-lg font-medium">Especie</label>
            <input
              id="species"
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              placeholder="Especie"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-2 border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Tipo */}
          <div>
            <label htmlFor="type" className="block text-lg font-medium">
              Tipo
            </label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Tipo"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-2 border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Género */}
          <div>
            <label htmlFor="gender" className="block text-lg font-medium">
              Género
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-2 border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Desconocido">Desconocido</option>
            </select>
          </div>

          {/* Origen */}
          <div>
            <label htmlFor="originName" className="block text-lg font-medium">
              Origen
            </label>
            <input
              id="originName"
              type="text"
              value={originName}
              onChange={(e) => setOriginName(e.target.value)}
              placeholder="Nombre del origen"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-2 border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            />

          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="locationName" className="block text-lg font-medium">
              Ubicación
            </label>
            <input
              id="locationName"
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Nombre de la ubicación"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-2 border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Imagen */}
          <div>
            <label htmlFor="image" className="block text-lg font-medium">
              Imagen
            </label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL de la imagen"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-2 border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Episodios */}
          <div>
            <label htmlFor="episodes" className="block text-lg font-medium">
              Episodios
            </label>
            <input
              id="episodes"
              type="text"
              value={episodes.join(", ")}
              onChange={(e) => setEpisodes(e.target.value.split(","))}
              placeholder="Lista de episodios separados por coma"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-2 border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Botón para enviar */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              Guardar Personaje
            </button>
            <Link href="/personajes">
              <button
                type="button"
                className="ml-4 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold text-lg rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                Volver a Personajes
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
