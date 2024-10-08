import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center text-white">
      <Head>
        <title>Rick and Morty App</title>
        <meta name="description" content="App de personajes de Rick and Morty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fondo de estrellas */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="stars"></div>
      </div>

      {/* Contenido principal */}
      <main className="relative z-10 text-center p-6 max-w-2xl w-full">
        <h1 className="text-5xl font-extrabold mb-6 text-green-300">
          ¡Explorá el Multiverso de Rick y Morty!
        </h1>
        <p className="text-lg mb-8 font-light text-green-100">
          Gestioná y descubrí personajes interdimensionales con esta app interactiva.
        </p>

        <a
          href="/personajes"
          className="inline-block bg-green-400 text-black font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 hover:bg-green-500"
        >
          Ver Personajes
        </a>
      </main>
    </div>
  )
}
