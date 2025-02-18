import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import useFetchData from "../utils/api";
import Card from "../components/Card";
import Hero from "../components/Hero";
import genres from "../utils/genres";
import { IoIosArrowBack } from "react-icons/io";
import Radio_Swich from "../components/Radio_switch/Radio_Swich";
import NoPage from "./404page";

// Move the baselink function outside the component
const getBaselink = (id) => {
    switch (id) {
        case 'popular':
            return '/movie/popular';
        case 'trending':
            return '/trending/movie/day?language=en-US';

        case 'theatres':
            return '/movie/now_playing?language=en-US&page=1'

        case 'upcoming':
            return '/movie/upcoming?language=en-US&page=2'
        
        case 'top':
            return '/movie/top_rated?language=en-US&page=1'
        
        case 'old':
            return '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=1980&primary_release_date.lte=1990-01-01&sort_by=primary_release_date.asc&with_origin_country=IN&with_original_language=hi'
        
        case 'indian' :
            return '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&with_origin_country=IN&with_original_language=hi'

        case 'punjabi':
            return '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=IN&with_original_language=pa'
        
        case 'earning':
            return '/discover/movie?language=en-US&page=1&sort_by=revenue.desc'

        
        default:
            return 0;
    }
};

const Special = () => {
    
    const { id } = useParams();
    const baselink = getBaselink(id); 
    

    const { data, loading } = useFetchData(baselink); 


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    if (baselink === 0) {
        return <NoPage/>
    }
    return (
        <div className='min-h-screen text-white container md:px-11 mx-auto h-full pt-[110px]'>
            <div className="mb-9">
                <div className="flex items-center pb-9 text-2xl max-sm:px-3">
                    <Link to={'/'} className="cursor-pointer hover:text-blue-400">
                        <IoIosArrowBack />
                       
                    </Link>
                    <div className="mx-auto h-full flex items-center">
                        <h1 className="text-center capitalize text-3xl md:text-4xl font-bold">
                            {id} Movies
                        </h1>
                    </div>
                </div>
                <Hero popular={data?.results} /> 
            </div>
            <div className="px-11">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-12 text-white justify-items-center flex-wrap justify-center ">
                    {data?.results.map((item) => {
                        return <Card movie={item} key={item.id} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Special;