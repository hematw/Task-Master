import { useState, useEffect } from "react";
import axiosIns from "@/axios";

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axiosIns.get(url);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    getData();
  }, []);

  return { data, isLoading, error };
};

export default useFetch;
