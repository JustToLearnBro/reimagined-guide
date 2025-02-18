import axios from 'axios'
import { useEffect, useState } from 'react';

const BASE_URL = 'https://api.themoviedb.org/3'
const token = import.meta.env.TMTB_AUTH



const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWUxY2Q0ZTI1MDhhOGE5MGQ2YmI0MmFhNjVmODhhMiIsInN1YiI6IjY0YzhjMmU2MWZhMWM4MDBiMGMxODQ4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DzcG0yj-kAk0W0FITT2ueckU8oJFfXb1xhS0VNnEvZA`
}

const useFetchData = (url, params,delay) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
  
    useEffect(() => {

      const fetchData = async () => {
          try {
          setLoading(true)
          const response = await axios.get(BASE_URL + url, {
            headers,
            params,
          });
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      if (delay) {
        setTimeout(()=>{
          fetchData()
          console.log('Delayed Request')
        },delay)
      }
      else{
        fetchData();
      }
    }, [url,params]);
  
    return { data, loading, error };
  };
  
  export default useFetchData;

  
  
  
  

