import { useEffect, useState } from "react";
import axios from "axios";
function useFetch(url){
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    useEffect(()=>{
        setLoading(true)
        axios.get(url)
        .then((resp)=>{setData(resp.data)})
        .catch((err)=>{setError(err)})
        .finally(()=>{setLoading(false)})
    },[url]);
    const refetch =()=>{
        setLoading(true)
        axios.get(url)
        .then((resp)=>{setData(resp.data)})
        .catch((err)=>{setError(err)})
        .finally(()=>{setLoading(false)})
    }
return {data,loading,error,refetch}
}
export default useFetch