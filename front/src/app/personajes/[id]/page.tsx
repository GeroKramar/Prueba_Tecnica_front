'use client'
import { useEffect, useState } from "react";
import './pjstyle.css';
import Link from "next/link";
import { CharacterFull } from "@/app/interfaces";
import Image from 'next/image';
  
  export default function CharacterDetail({ params }: { params: { id: string } }) {
    const [character, setCharacter] = useState<CharacterFull | null>(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
      const fetchCharacter = async () => {
        const res = await fetch(`${apiUrl}/characters/${params.id}`);
        const data = await res.json();
        setCharacter(data);
      };
  
      fetchCharacter();
    }, [params.id, apiUrl]);
  
    if (!character) {
      return <div className="text-white">Cargando...</div>;
    }
  
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative">
        <div className="stars"></div> 
        <div className="portal float"></div>
  
        <div className="z-10 text-center p-8 rounded-lg bg-gray-800 shadow-lg transition-transform transform hover:scale-105">
          <h1 className="text-5xl font-bold mb-4">{character.name}</h1>
          <Image
            src={character.image}
            alt={character.name}
            className="w-48 h-48 mx-auto rounded-full mb-4 border-4 border-green-500 animate-pulse"
          />
          <p className="text-xl">Estado: <span className="text-green-400">{character.status}</span></p>
          <p className="text-xl">Especie: <span className="text-green-400">{character.species}</span></p>
          <p className="text-xl">Género: <span className="text-green-400">{character.gender}</span></p>
          <p className="text-xl">Origen: <span className="text-green-400">{character.origin.name}</span></p>
          <p className="text-xl">Ubicación: <span className="text-green-400">{character.location.name}</span></p>
          
        <Link
          href="/personajes"
          className="inline-block mt-11 bg-green-400 text-black font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 hover:bg-green-500"
        >
          Volver a personajes
        </Link>
        </div>
      </div>
    );
  }