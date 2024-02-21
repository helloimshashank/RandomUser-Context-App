import React, { useEffect, useState } from 'react'

function usePost(url,payload) {
  const [data,setData]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
 useEffect(()=>{
     setLoading(true);
    axios.post(url,payload,{
        headers:{'content-type':"application/json"}
    }).then((res)=>setData(res.data))
    .catch((err)=>setError(err))
    .finally(()=>setLoading(false))
 },[url])
 return {data,loading,error}
}

export default usePost
