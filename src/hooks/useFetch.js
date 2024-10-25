import { useState, useEffect } from "react";
import axiosIns from "@/axios";

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axiosIns.get(url);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return { data, loading };
};

export default useFetch;
