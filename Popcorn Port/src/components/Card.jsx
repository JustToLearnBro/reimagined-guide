import React, { useState } from 'react';
import noresult from '../assets/no-poster.png';
import { Link } from 'react-router-dom';

function testImage(URL) {
  var tester=new Image();
  if(tester.onload){
    return true
  }
  else if (tester.onerror){
    return false
  }
  tester.src=URL;
}

const Card = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      to={`/movie/${movie?.id}`}
      className="hover:scale-110 transition-all cursor-pointer duration-300"
      key={movie?.id}
    >
      <div className="relative">
        <div className=" bg-gray-300 w-full h-full ">
          {!imageLoaded && <img src={noresult} alt="Placeholder" className="w-full  object-cover opacity-50" />}
          {movie?.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
              className={`hover:border-white  hover:border-[5px] transition-all  duration-200 ${imageLoaded ? '' : 'hidden'}`}
              onLoad={handleImageLoad}
              style={{objectFit:'cover'}}
            />
            
          )}
        </div>
        <div className="w-[50px] h-[50px] bg-white absolute bottom-5 font-bold right-5 text-black flex justify-center items-center shadow-2xl rounded-full opacity-80">
          {movie?.vote_average}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-white">{movie.title}</p>
        <p className="line-clamp-2 text-gray-500 mt-2">{movie?.overview}</p>
      </div>
    </Link>
  );
};

export default Card;
