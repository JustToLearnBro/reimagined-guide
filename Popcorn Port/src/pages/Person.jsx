import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../utils/api";
import Card from "../components/Card";

const Person = () => {
    const { personid } = useParams();
    const { data, loading } = useFetchData(
        `/person/${personid}?append_to_response=movie_credits%2Cimages&language=en-US`
    );

    // State variable to track the current sort option
    const [sortOption, setSortOption] = useState("popularity");

    // Function to merge and sort movies by popularity in descending order
    const sortMoviesByPopularity = (movies) => {
        const castAndCrew = [...movies.cast, ...movies.crew];
        const uniqueMovies = Array.from(new Set(castAndCrew.map(movie => movie.id)))
            .map(id => castAndCrew.find(movie => movie.id === id));
        return uniqueMovies.sort((a, b) => b.popularity - a.popularity);
    }

    // Function to sort movies by release date in ascending order
    const sortMoviesByDate = (movies) => {
        const castAndCrew = [...movies.cast, ...movies.crew];
        const uniqueMovies = Array.from(new Set(castAndCrew.map(movie => movie.id)))
            .map(id => castAndCrew.find(movie => movie.id === id));
        return uniqueMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    // Function to sort movies by rating in descending order
    const sortMoviesByRating = (movies) => {
        const castAndCrew = [...movies.cast, ...movies.crew];
        const uniqueMovies = Array.from(new Set(castAndCrew?.map(movie => movie.id)))
            .map(id => castAndCrew.find(movie => movie?.id === id));
        return uniqueMovies.sort((a, b) => b.vote_average - a.vote_average);
    }

    // Function to handle the user's sort option selection
    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
    }

    let sortedMovies = [];
    if (data && data.movie_credits) {
        if (sortOption === "popularity") {
            sortedMovies = sortMoviesByPopularity(data.movie_credits);
        } else if (sortOption === "date") {
            sortedMovies = sortMoviesByDate(data.movie_credits);
        } else if (sortOption === "rating") {
            sortedMovies = sortMoviesByRating(data.movie_credits);
        }
    }

    return (
        <div className="min-h-screen text-white container px-11 mx-auto h-full pt-[110px]">


            {loading ? (
                <div>Loading....</div>

            ) : (
                sortedMovies.length > 0 ? (
                    <>
                        <div className=" flex justify-between flex-col sm:flex-row items-center">
                            <h1 className=" text-3xl md:text-4xl my-6 text-center">Movies of {data?.name}:</h1>
                            {console.log(data)}
                            <div>
                                <label className=" flex  gap-3 items-center">
                                    Sort by:
                                    <select value={sortOption} className="text-black" onChange={handleSortOptionChange}>
                                        <option value="popularity">Popularity</option>
                                        <option value="date">Date</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5  gap-12 text-white justify-items-center flex-wrap justify-center">
                        
                            {sortedMovies.map((movie) => {
                                return (
                                    <>
                                    <Card key={movie.id} movie={movie}></Card>
                                    </>
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <p>No movies found for Person.</p>
                )
            )}
        </div>
    )
}

export default Person
