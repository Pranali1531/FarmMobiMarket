import http from "./http";





export const getCountryApi = async (params) => {
  const res = await http.get("/countries/", {
    params,
  });
  return res.data;
};

export const deleteCountryApi = async (countryId,orgId) => {
  const res = await http.delete("/countries/", {
    data: { countryId,orgId },
  });
  return res.data;
};


export const countryPostApi = async (payload) => {
  const res = await http.post("/countries/", payload);
  return res.data;
};


export const countryUpdateApi = async (payload) => {
  const res = await http.patch("/countries/", payload);
  return res.data;
};