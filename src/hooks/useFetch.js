import { useState, useEffect } from "react";
import axiosIns from "@/axios";

const useFetch = (url) => {
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
      }
    }
    getData();
  }, [url]); // Add `url` as a dependency

  return { data, isLoading, error };
};

export default useFetch;
