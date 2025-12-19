import { useState } from "react";

const useApi = (apiFn) => {
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    try {
      const res = await apiFn(...args);
      return res;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading };
};

export default useApi;
