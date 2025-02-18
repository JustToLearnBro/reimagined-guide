// src/utils/useFilters.js
import { useState, useEffect } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState({
    include_adult: false,
    include_video: false,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
    primary_release_year: 2020,
    region: "IN",
    vote_average_gte: 7,
    vote_average_lte: 10,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
    const queryString = searchParams.toString();
    // Replace the following line with your logic for making the API request with the updated filters
    console.log("API Request with filters:", queryString);
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  return { filters, updateFilter };
};

export default useFilters;
