// src/components/MovieCard.jsx

export const MovieCard = ({ movie, onClick }) => {
    // Construimos la URL de la imagen
    const imgUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'

    return (


        // 1. EL CONTENEDOR PRINCIPAL
        // relative: Para poder posicionar cosas (como la estrella) encima.
        // group: Permite que los hijos detecten el hover de este padre.
        // overflow-hidden: Si la imagen hace zoom, que no se salga de los bordes redondeados.
        <div onClick={onClick} className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer h-[400px]">

            {/* 2. LA IMAGEN DE FONDO */}
            {/* w-full h-full: Ocupa todo el espacio. */}
            {/* object-cover: Recorta la imagen para llenar el hueco sin estirarse (como background-size: cover). */}
            {/* transition-transform duration-500: Suaviza la animación. */}
            {/* group-hover:scale-110: AQUÍ ESTÁ EL TRUCO. Al pasar el mouse por la tarjeta, la imagen crece un 10%. */}
            <img
                src={imgUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* 3. EL DEGRADADO OSCURO (Para que el texto se lea) */}
            {/* absolute inset-0: Cubre toda la tarjeta. */}
            {/* bg-gradient-to-t: Degradado hacia arriba (to top). */}
            {/* from-black/80: Empieza negro casi opaco abajo. */}
            {/* to-transparent: Termina transparente arriba. */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />

            {/* 4. LA PUNTUACIÓN (Badge) */}
            {/* absolute top-4 right-4: Lo fija en la esquina superior derecha. */}
            <div className="absolute top-4 right-4 bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-xs shadow-md">
                ⭐ {movie.vote_average.toFixed(1)}
            </div>

            {/* 5. EL TEXTO (Título y Año) */}
            {/* absolute bottom-0: Se pega al fondo. */}
            {/* translate-y-4 group-hover:translate-y-0: Efecto pro. El texto sube un poquito cuando pasas el mouse. */}
            <div className="absolute bottom-0 p-5 w-full text-white transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">

                {/* Título: truncate corta el texto si es muy largo con "..." */}
                <h3 className="text-xl font-bold truncate">{movie.title}</h3>

                {/* Año y Resumen */}
                <div className="flex items-center justify-between text-sm text-gray-300 mt-1 mb-2">
                    <span>📅 {movie.release_date?.split('-')[0] || 'N/A'}</span>
                </div>

                {/* Descripción: line-clamp-3 muestra solo 3 líneas y corta el resto. 
            opacity-0 group-hover:opacity-100: Solo aparece al hacer hover. */}
                <p className="text-xs text-gray-400 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {movie.overview || "Sin descripción disponible."}
                </p>
            </div>
        </div>
    )
}