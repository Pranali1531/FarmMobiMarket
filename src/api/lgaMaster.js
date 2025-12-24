import http from "./http";





export const getLgaLocationApi = async (params) => {
  const res = await http.get("/lgaLocation/", {
    params,
  });
  return res.data;
};

export const deleteLgaLocationApi = async (stateId,orgId) => {
  const res = await http.delete("/lgaLocation/", {
    data: { stateId,orgId },
  });
  return res.data;
};


export const lgaPostApi = async (payload) => {
  const res = await http.post("/lgaLocation/", payload);
  return res.data;
};


export const lgaUpdateApi = async (payload) => {
  const res = await http.patch("/lgaLocation/", payload);
  return res.data;
};