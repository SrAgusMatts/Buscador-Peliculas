import axios from 'axios'

// Leemos la llave del archivo .env
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const BASE_URL = 'https://api.themoviedb.org/3'

// Configuramos Axios para no repetir la URL y la llave siempre
const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'es-ES', // Para que las pelis salgan en español
  }
})

// Función para buscar películas
export const buscarPeliculas = async (query) => {
  // Si no hay texto, devolvemos lista vacía
  if (!query) return [] 

  const { data } = await tmdbAPI.get('/search/movie', {
    params: { query }
  })
  
  return data.results
}