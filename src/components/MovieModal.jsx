// src/components/MovieModal.jsx

export const MovieModal = ({ movie, onClose }) => {
    // Si no hay película (por seguridad), no renderizamos nada
    if (!movie) return null

    return (
        // 1. EL FONDO OSCURO (Overlay)
        // fixed inset-0: Cubre toda la pantalla y se queda fijo aunque hagas scroll.
        // bg-black/80: Fondo negro al 80% de opacidad.
        // backdrop-blur-sm: Efecto borroso pro en el fondo.
        // z-50: Asegura que esté ENCIMA de todo lo demás.
        // flex items-center justify-center: Centra la ventana modal en el medio de la pantalla.
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose} // Si hacen clic afuera (en lo negro), se cierra.
        >

            {/* 2. LA VENTANA MODAL (El contenido) */}
            <div
                className="bg-gray-900 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Botón de Cerrar (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white bg-black/50 hover:bg-red-500 rounded-full w-8 h-8 flex items-center justify-center transition"
                >
                    ✕
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Imagen Lateral */}
                    <img
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://via.placeholder.com/300x450'}
                        alt={movie.title}
                        className="w-full md:w-1/3 object-cover h-64 md:h-auto"
                    />

                    {/* Información */}
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                                <span className="bg-blue-600 text-white px-2 py-0.5 rounded">
                                    {movie.release_date?.split('-')[0]}
                                </span>
                                <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
                                <span>👥 {movie.vote_count} votos</span>
                            </div>

                            <p className="text-gray-300 leading-relaxed">
                                {movie.overview || "No hay descripción detallada disponible para esta película."}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                        >
                            Cerrar Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}