// src/App.jsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { buscarPeliculas } from './api/tmdb'
import { MovieCard } from './components/MovieCard'
import { MovieModal } from './components/MovieModal'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)

  // 🔥 AQUÍ OCURRE LA MAGIA DE REACT QUERY
  const { data: peliculas, isLoading, isError, error } = useQuery({
    // 1. La "llave" única: cuando 'searchTerm' cambie, React Query sabe que debe buscar de nuevo
    queryKey: ['peliculas', searchTerm],

    // 2. La función que trae los datos
    queryFn: () => buscarPeliculas(searchTerm),

    // 3. Condición: Solo busca si escribiste más de 2 letras (para no saturar la API)
    enabled: searchTerm.length > 2,

    // 4. Cache: Si buscas "Batman", borras y vuelves a buscar "Batman", 
    // lo sacará de la memoria instantáneamente sin llamar a la API de nuevo.
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <h1 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          🎬 CineBuscador
        </h1>

        {/* Input de Búsqueda */}
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Escribe una película (ej: Avatar, Matrix)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-6 text-lg rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition shadow-xl placeholder-gray-500"
          />
        </div>

        {/* ESTADOS DE LA INTERFAZ (Feedback al usuario) */}

        {/* 1. Cargando */}
        {isLoading && (
          <div className="text-center text-xl text-blue-400 animate-pulse">
            🔍 Buscando en la base de datos...
          </div>
        )}

        {/* 2. Error */}
        {isError && (
          <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
            ❌ Ocurrió un error: {error.message}
          </div>
        )}

        {/* 3. Resultados Vacíos */}
        {searchTerm.length > 2 && peliculas?.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 text-lg">
            😢 No encontramos nada con ese nombre.
          </div>
        )}

        {/* 4. Lista de Películas (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {peliculas?.map((pelicula) => (
            // Reemplazamos todo el código largo por nuestro componente limpio
            <MovieCard key={pelicula.id} movie={pelicula} onClick={() => setSelectedMovie(pelicula)}/>
          ))}
        </div>

        {/* 5. EL MODAL (Solo aparece si selectedMovie tiene datos) */}
        {selectedMovie && (
          <MovieModal 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)} // Para cerrar, limpiamos el estado
          />
        )}

      </div>
    </div>
  )
}

export default App