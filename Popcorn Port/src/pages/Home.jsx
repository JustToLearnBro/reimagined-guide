import { useEffect, useState } from "react";
import useFetchData from "../utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MoviesContainer from "../components/MoviesContainer";
import Hero from "../components/Hero";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import { EffectCoverflow, Keyboard, Mousewheel } from "swiper/modules";
import romimage from '../assets/Romance.jpg'

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Function to update isMobile when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




 const { data: Trending, loading: TrendingLoading } = useFetchData(
    "/trending/movie/day?language=en-US"
  );


  const { data, loading, error } = useFetchData("/movie/popular", "", 1000);

  const { data: Theatres, loading: Theatresloading } = useFetchData(
    "/movie/top_rated?language=en-US&page=1"
  );



  useEffect(() => {
    console.log(data?.results);

  }, [data]);

  return (
    <div className="container mx-auto md:px-11 mb-8 pt-[90px] ">
      <Hero popular={Trending?.results} />

      <Swiper
        className=" mt-14"
        spaceBetween={50}
        slidesOffsetAfter={30}
        effect={isMobile ? 'coverflow' : ''}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}


        modules={[Keyboard, Mousewheel, EffectCoverflow]}
        mousewheel={{
          sensitivity: 1,
          noMousewheelClass: true,


        }}
        grabCursor={true}


        breakpoints={{
          200: {
            slidesPerView: 1.3,
            spaceBetween: 20,
            effect: 'coverflow',
            centeredSlides: true

          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          858: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}

        onSlideChange={() => console.log("slide change")}
        keyboard={{
          enabled: true,
        }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Link to={'/category/28'}
            className=" bg-red-500 text-white flex relative hover:border-white  cursor-pointer  hover:border-[5px] transition-all duration-200 items-end px-4 py-4  backdrop-blur-lg  aspect-video "
            style={{
              background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR74vxucbMtZfR6CbNVvmNRYzCc9qhWQwxnSg&usqp=CAU')`,
            }}
          >
            <div className="overlay bg-gradient-to-r -z-10 from-black via-60% to-transparent left-0 absolute bottom-0 h-full w-full opacity-90 pointer-events-none">
              {" "}
            </div>
            <h5 className="text-3xl pointer-events-none">Action</h5>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={'/category/9648'}
            className=" bg-red-500 text-white hover:border-white  cursor-pointer  hover:border-[5px] transition-all duration-200  flex  items-end px-4 py-4 backdrop-blur-lg   aspect-video "
            style={{
              background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH50ualqXuUv32wt3P8tl2vKkoFAzz9ev1ZQ&usqp=CAU')`,
            }}

          >
            <div className="overlay bg-gradient-to-r -z-10 from-black via-60% to-transparent left-0 absolute bottom-0 h-full w-full opacity-90 pointer-events-none">
              {" "}
            </div>
            <h5 className="text-3xl pointer-events-none">Mystery</h5>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={'/category/27'}
            className=" bg-red-500 text-white hover:border-white  cursor-pointer  hover:border-[5px] transition-all duration-200 flex  items-end px-4 py-4 backdrop-blur-lg   aspect-video "
            style={{
              background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIuRo45GTGEoaPwIWjk2MAxIoGjyxxXrJICg&usqp=CAU')`,
            }}
          >
            <div className="overlay bg-gradient-to-r -z-10 from-black via-60% to-transparent left-0 absolute bottom-0 h-full w-full opacity-90 pointer-events-none">
              {" "}
            </div>

            <h5 className="text-3xl pointer-events-none">Horror</h5>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={'/category/10749'}
            className=" bg-red-500 text-white hover:border-white  cursor-pointer hover:border-[5px] transition-all duration-200 flex  items-end px-4 py-4 backdrop-blur-lg   aspect-video "
            style={{
              background: `url('${romimage}')`,
              backgroundSize: '100%'
            }}
          >
            <div className="overlay bg-gradient-to-r -z-10 from-black via-60% to-transparent left-0 absolute bottom-0 h-full w-full opacity-90 pointer-events-none">
              {" "}
            </div>
            <h5 className="text-3xl pointer-events-none">Romance</h5>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={'/category/35'}
            className=" bg-red-500 text-white hover:border-white  cursor-pointer hover:border-[5px] transition-all duration-200 flex  items-end px-4 py-4 backdrop-blur-lg   aspect-video "
            style={{
              background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHxrP15C8YWepfti9P3kdpgC44N6kB2U4eHQ&usqp=CAU')`,
              backgroundSize: '100%'

            }}
          >
            <div className="overlay bg-gradient-to-r -z-10 from-black via-60% to-transparent left-0 absolute bottom-0 h-full w-full opacity-90 pointer-events-none">
              {" "}
            </div>

            <h5 className="text-3xl pointer-events-none">Comedy</h5>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/category/878'}
            className=" bg-red-500 text-white hover:border-white   cursor-pointer hover:border-[5px] transition-all duration-200 flex  items-end px-4 py-4 backdrop-blur-lg   aspect-video "
            style={{
              background: `url('https://i0.wp.com/flickside.com/wp-content/uploads/2022/08/Blade-Runner-2049-explained-3.jpg?fit=1200%2C900&ssl=1')`,
              backgroundSize: '100%'

            }}
          >
            <div className="overlay bg-gradient-to-r -z-10 from-black via-60% to-transparent left-0 absolute bottom-0 h-full w-full opacity-90 pointer-events-none">
              {" "}
            </div>

            <h5 className="text-3xl pointer-events-none">Sci-fi</h5>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/category/14'}
            className=" bg-red-500 text-white hover:border-white  cursor-pointer hover:border-[5px] transition-all duration-200 flex  items-end px-4 py-4 backdrop-blur-lg   aspect-video "
            style={{
              background: `url('https://static01.nyt.com/images/2022/09/05/arts/01lotr/01lotr-videoSixteenByNine3000.jpg')`,
              backgroundSize: '100%'

            }}
          >
            <div className="overlay bg-gradient-to-r -z-10 from-black via-60% to-transparent left-0 absolute bottom-0 h-full w-full opacity-90 pointer-events-none">
              {" "}
            </div>
            <h5 className="text-3xl pointer-events-none">Fantasy</h5>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={'/category/18'}
            className=" bg-red-500 text-white hover:border-white  cursor-pointer hover:border-[5px] transition-all duration-200 flex  items-end px-4 py-4 backdrop-blur-lg   aspect-video "
            style={{
              background: `url('https://www.looper.com/img/gallery/best-drama-movies-of-all-time-ranked/the-green-mile-1660930801.jpg')`,
              backgroundSize: '100%'

            }}
          >
            <div className="overlay bg-gradient-to-r -z-10 from-black via-60% to-transparent left-0 absolute bottom-0 h-full w-full opacity-90 pointer-events-none">
              {" "}
            </div>
            <h5 className="text-3xl pointer-events-none">Drama</h5>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={'/category/80'}
            className=" bg-red-500 text-white hover:border-white  cursor-pointer hover:border-[5px] transition-all duration-200 flex  items-end px-4 py-4 backdrop-blur-lg   aspect-video "
            style={{
              background: `url('https://m.media-amazon.com/images/M/MV5BOGU1YjI0NmEtN2JiZi00YWRjLWJkMjctODFlMjgyYTA1MmJiXkEyXkFqcGdeQXVyMDc2NTEzMw@@._V1_.jpg')`,
              backgroundSize: '100%'

            }}
          >
            <div className="overlay bg-gradient-to-r -z-10 from-black via-60% to-transparent left-0 absolute bottom-0 h-full w-full opacity-90 pointer-events-none">
              {" "}
            </div>
            <h5 className="text-3xl pointer-events-none">Crime</h5>
          </Link>
        </SwiperSlide>


      </Swiper>
      <div className=" max-md:px-14">
        <h2 className="text-white my-10 text-3xl max-sm:text-center ">Top Rated Movies</h2>
        {Theatresloading ? (
          <div className=" text-white">
            <Loader />
          </div>
        ) : (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-12 mb-9 ">
            {console.log(Theatres?.results)}
            {Theatres?.results.slice(0, 10).map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                className=" hover:scale-110 transition-all cursor-pointer duration-300 "
                key={movie.id}
              >
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className=" hover:border-white  hover:border-[5px] transition-all duration-200"
                  ></img>
                  <div className=" w-[50px] h-[50px] bg-white absolute bottom-5 font-bold right-5 text-black flex justify-center items-center shadow-2xl rounded-full opacity-80">
                    {movie.vote_average}{" "}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-white">{movie.title}</p>

                  <p className="line-clamp-2 text-gray-500 mt-2">
                    {movie.overview}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <h2 className="text-white my-10 text-3xl ">Trending Movies</h2>
        {Theatresloading ? (
          <div className=" text-white">
            <Loader />
          </div>
        ) : (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-12 mb-9 ">
            {console.log(Trending?.results)}
            {Trending?.results.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                className=" hover:scale-110 transition-all cursor-pointer duration-300 "
                key={movie.id}
              >
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className=" hover:border-white  hover:border-[5px] transition-all duration-200"
                  ></img>
                  <div className=" w-[50px] h-[50px] bg-white absolute bottom-5 font-bold right-5 text-black flex justify-center items-center shadow-2xl rounded-full opacity-80">
                    {movie.vote_average}{" "}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-white">{movie.title}</p>

                  <p className="line-clamp-2 text-gray-500 mt-2">
                    {movie.overview}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <h2 className="text-white my-10 text-3xl ">Popular Movies</h2>
        {loading ? (
          <div className="text-white">
            <Loader />
          </div>
        ) : (
          <MoviesContainer popular={data?.results} />
        )}
      </div>
    </div>
  );
};

export default Home;
