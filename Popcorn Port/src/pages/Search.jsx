// src/components/Search.js
import { useEffect, useState } from "react";
import Card from "../components/Card";
import useFetchData from "../utils/api";
import genres from "../utils/genres";
import { generateYearRange } from "../utils/getyear";
import Loader from "../components/Loader/Loader";
import ReactPaginate from 'react-paginate';

// Css
import './Search.css'
import { useParams } from "react-router-dom";

const Rating = [
    4, 5, 6, 7, 8
]



const Search = () => {
    const param = useParams()


    const queryParameters = new URLSearchParams(window.location.search);
    const [currentPage, setCurrentPage] = useState(1);
    const buildApiUrl = (filters = {}) => {
        const baseUrl = "/discover/movie";
        const defaultParams = {
            include_adult: false,
            include_video: false,
            language: "en-US",
            
            "vote_count.gte": 2,
            page: currentPage,

        };

        if (filters["vote_average.gte"]) {
            defaultParams["vote_count.gte"] = 200;
        }
        const queryParams = new URLSearchParams({
            ...defaultParams,
            ...filters,
        });
        return `${baseUrl}?${queryParams.toString()}`;
    };


    const [filters, setFilters] = useState({
        primary_release_year: queryParameters.get("primary_release_year") || "",
        with_origin_country: queryParameters.get("with_origin_country") || "",
        vote_average_gte: queryParameters.get("vote_average_gte") || "",
        with_text_query: queryParameters.get("with_text_query") || "",
        with_genres: queryParameters.get("with_genres") || "",
        with_original_language: queryParameters.get("with_original_language") || "",

    });


    const { data, loading } = useFetchData(buildApiUrl(filters));
    useEffect(() => {
        const value = queryParameters.get("with_text_query")
        // handleSubmit()
        setFilters((prevFilters) => ({
            ...prevFilters,
            'with_text_query': value,
        }));

    }, [param]);


    function handleSubmit() {
        const url = `http://localhost:5173/search?${new URLSearchParams(filters).toString()}`;
        window.history.replaceState(null, "", url);
    }

    // Function to build the API URL with filters

    const { data: a } = useFetchData('/configuration/countries?language=en-US')
    const { data: lang } = useFetchData('/configuration/languages')

    // Function to fetch available years and regions (you can customize this according to your API data)
    const fetchAvailableOptions = async () => {
        // Fetch years and regions from your API
        const availableYears = generateYearRange(1930)
        // Replace with data from your API
        setAvailableYears(availableYears);

        setAvailableRegions(a);
    };

    useEffect(() => {
        fetchAvailableOptions();
    }, [a]);

    const [availableYears, setAvailableYears] = useState([]);
    const [availableRegions, setAvailableRegions] = useState([]);


    const handleFilterChange = async (e) => {
        const { name, value } = e.target;

        // Handle the case where the parameter name needs to be modified
        const paramName = name === 'vote_average_gte' ? 'vote_average.gte' : name;
        console.log(name, value);

        setFilters((prevFilters) => ({
            ...prevFilters,
            [paramName]: value,
        }));


        handleSubmit()


    };


    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log(
            `User requested page number ${event.selected + 1}, which is offset`
        );

        setCurrentPage(event.selected + 1)

    };

    const totalPages = Math.min(data?.total_pages, 500);
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handleLastClick = () => {
        setCurrentPage(totalPages);
    };


    return (
        <div className="min-h-screen text-black container md:px-11 mx-auto h-full pt-[110px]">
            <div className="px-11  ">

                <div className=" mb-12  flex justify-center items-center flex-col">
                    <div className=" w-full  mb-10 bg-black">
                        <input
                            type="text"
                            className=" w-full  py-6 text-white focus:border-green-500  px-5 rounded-md bg-[hsl(215,84%,20%)]"
                            name="with_text_query"
                            value={filters.with_text_query}
                            onChange={handleFilterChange}
                            placeholder="Search"
                        />
                    </div>

                    <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 ">
                        <div className="">
                            <p className=" text-gray-300 mb-2 ">Release Year</p>
                            <select name="primary_release_year" className=" w-full  px-2 py-4 text-white rounded-md bg-[hsl(215,84%,20%)]" value={filters.primary_release_year} onChange={handleFilterChange}>
                                <option value="">All</option>
                                {availableYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div>
                            <p className=" text-gray-300 mb-2 "> Country</p>
                            <select name="with_origin_country" className=" px-2 py-4 w-full text-white rounded-md bg-[hsl(215,84%,20%)]" value={filters.with_origin_country} onChange={handleFilterChange}>
                                <option value="">All</option>
                                {availableRegions?.map((region) => (
                                    <option key={region.iso_3166_1} value={region.iso_3166_1}>
                                        {region.english_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p className="text-gray-300 mb-2"> Rating:</p>
                            <select
                                type="text"
                                name="vote_average_gte"
                                className=" px-4 py-4 text-white w-full rounded-md bg-[hsl(215,84%,20%)]"
                                value={filters.vote_average_gte}
                                onChange={handleFilterChange}

                            >
                                <option value="">Rating</option>
                                {Rating.map((item) => (
                                    <option key={item} value={item}>
                                        {item}+
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="">
                            <p className=" text-gray-300 mb-2 ">Genre</p>
                            <select name="with_genres" className="  px-2 py-4 w-full text-white rounded-md bg-[hsl(215,84%,20%)]" value={filters.with_genres} onChange={handleFilterChange}>
                                <option value="">All</option>
                                {genres.genres.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="">
                            <p className=" text-gray-300 mb-2 ">Language</p>
                            <select name="with_original_language" className="  px-2 py-4 w-full text-white rounded-md bg-[hsl(215,84%,20%)]" value={filters.with_original_language} onChange={handleFilterChange}>
                                <option value="">All</option>

                                {lang?.map((item) => (
                                    <option key={item.iso_639_1} value={item.iso_639_1}>
                                        {item.english_name}
                                    </option>
                                ))}
                            </select>
                        </div>



                    </div>

                </div>




                <div className=" text-white flex flex-col w-full justify-center mt-24">
                    <p className=" text-center mb-7 text-xl">{data?.total_results} Movies Found</p>

                    {data?.results.length > 1 ? <><ReactPaginate
                        breakLabel="......"
                        nextLabel="Next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={data?.total_pages < 499 ? data?.total_pages : 499}
                        previousLabel=" Previous"
                        renderOnZeroPageCount={1}
                        marginPagesDisplayed={1}
                        forcePage={currentPage - 1}

                        containerClassName="pagination"
                        pageLinkClassName="page-num"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num"
                        activeLinkClassName="active"
                    />
                    </> : ''}



                </div>

                {loading ? <div className=" flex justify-center items-center"><Loader /></div> :

                    data?.results.length < 1 ?
                        <div className=" flex text-white h-full justify-center items-center w-full">
                            No Data Found
                        </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 min-h-[500px] gap-12 text-white justify-items-center flex-wrap justify-center">
                            {data?.results?.map((item) => {
                                return <Card movie={item} key={item.id} />;
                            })}
                        </div>}



            </div>

            <div className=" flex mx-auto my-5 text-white w-full justify-center  gap-3">
                <button className="border-[hsl(215,84%,20%)] px-3 py-3 border-solid border-2 disabled:hidden " disabled={currentPage < 2} onClick={currentPage > 1 ? () => { setCurrentPage(prev => prev - 1) } : ''}>Prev</button>
                <button className="border-[hsl(215,84%,20%)] px-3 py-3 border-solid border-2 disabled:bg-black disabled:hidden" disabled={currentPage >= totalPages} onClick={handleNextClick}>Next </button>
                <button className="border-[hsl(215,84%,20%)] px-3 py-3 border-solid border-2 disabled:hidden" disabled={currentPage >= totalPages} onClick={handleLastClick}>Last</button>

            </div>
        </div>
    );
};

export default Search;

