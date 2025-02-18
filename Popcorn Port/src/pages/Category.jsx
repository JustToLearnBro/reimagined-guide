import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import useFetchData from "../utils/api";
import Card from "../components/Card";
import Hero from "../components/Hero";
import genres from "../utils/genres";
import { IoIosArrowBack } from "react-icons/io";
import Radio_Swich from "../components/Radio_switch/Radio_Swich";

const Category = () => {
  const { category } = useParams();
  const { data, loading } = useFetchData(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${category}`);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // State variables to track sorting option and sorted movie data
  const [sortBy, setSortBy] = useState(queryParams.get("sort") || "popularity"); // Default to sorting by popularity
  const [sortedMovies, setSortedMovies] = useState(data?.results || []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(data, "Categories");
    // When data changes, update the sortedMovies with the original data
    setSortedMovies(data?.results || []);
  }, [data]);

  // Function to handle sorting based on the selected option
  const handleSort = (option) => {
    let sortedData = [...(data?.results || [])];

    switch (option) {
      case "popularity":
        sortedData.sort((a, b) => b.popularity - a.popularity);
        break;
      case "rating":
        sortedData.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "date":
        sortedData.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      default:
        break;
    }

    // Update the sort query parameter in the URL
    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.set("sort", option);
    const newUrl = `${location.pathname}?${newQueryParams.toString()}`;
    window.history.replaceState(null, null, newUrl);

    setSortBy(option);
    setSortedMovies(sortedData);
  };

  return (
    <div className='min-h-screen text-white container md:px-11 mx-auto h-full pt-[110px]'>
      <div className="mb-9">
        <div className="flex items-center pb-9 text-2xl max-sm:px-3">
          <Link to={'/'} className="cursor-pointer hover:text-blue-400">
            <IoIosArrowBack/>
          </Link>
          <div className="mx-auto h-full flex items-center">
            <h1 className="text-center text-3xl md:text-4xl font-bold">
              {genres.genres.find((item) => item.id === parseInt(category))?.name}
            </h1>
          </div>
        </div>
        <Hero popular={sortedMovies} /> {/* Use the sorted movies */}
      </div>
      <div className="px-11">
        <div className="flex justify-center mb-4">
          <div className=" ml-auto my-4">
            <Radio_Swich sortBy={sortBy} handleSort={handleSort}/>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-12 text-white justify-items-center flex-wrap justify-center ">
          {sortedMovies.map((item) => {
            return <Card movie={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;


{/* <button
            className={`mr-2 ${
              sortBy === "popularity" ? "bg-blue-600" : "bg-blue-400"
            } px-4 py-2 rounded-md`}
            onClick={() => handleSort("popularity")}
          >
            Sort by Popularity
          </button>
          <button
            className={`mr-2 ${
              sortBy === "rating" ? "bg-blue-600" : "bg-blue-400"
            } px-4 py-2 rounded-md`}
            onClick={() => handleSort("rating")}
          >
            Sort by Rating
          </button>
          <button
            className={`${
              sortBy === "date" ? "bg-blue-600" : "bg-blue-400"
            } px-4 py-2 rounded-md`}
            onClick={() => handleSort("date")}
          >
            Sort by Date
          </button> */}