import { Link } from "react-router-dom"

const MoviesContainer = ({popular}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5  gap-12 text-white justify-items-center flex-wrap justify-center ">

    {popular?.slice(0,10).map((movie)=>{
      return (
        <Link to={`/movie/${movie.id}`} className=" hover:scale-110 transition-all cursor-pointer duration-300 " key={movie.id}>
          <div className="relative">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className=" hover:border-white  hover:border-[5px] transition-all duration-200"></img>
          <div className=" w-[50px] h-[50px] bg-white absolute bottom-5 font-bold right-5 text-black flex justify-center items-center shadow-2xl rounded-full opacity-80">{movie.vote_average} </div>
          </div>
          <div className="mt-3">
          <p>{movie.title}</p>
          <p className="line-clamp-2 text-gray-500 mt-2">{movie.overview}</p>
          </div>
        </Link>
      )
    })}
  </div>
  )
}

export default MoviesContainer