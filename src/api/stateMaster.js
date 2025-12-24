import http from "./http";





export const getStateApi = async (params) => {
  const res = await http.get("/stateLocation/", {
    params,
  });
  return res.data;
};

export const deleteStateApi = async (countryId,orgId) => {
  const res = await http.delete("/stateLocation/", {
    data: { countryId,orgId },
  });
  return res.data;
};


export const statePostApi = async (payload) => {
  const res = await http.post("/stateLocation/", payload);
  return res.data;
};


export const stateUpdateApi = async (payload) => {
  const res = await http.patch("/stateLocation/", payload);
  return res.data;
};