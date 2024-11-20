import { useState, useEffect } from "react";
import axiosIns from "@/axios";

const useFetch = (url, dependency, cb) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return; // Skip if URL is missing

    async function getData() {
      setIsLoading(true); // Reset loading state before fetching new data
      try {
        const response = await axiosIns.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        cb(true)
      }
    }
    getData();
  }, [url, dependency]); // Add `url` as a dependency

  return { data, isLoading, error };
};

export default useFetch;
