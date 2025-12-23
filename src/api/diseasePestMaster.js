import http from "./http";





export const getDiseasePestApi = async (params) => {
  const res = await http.get("/pestDisease/", {
    params,
  });
  return res.data;
};

export const deleteDiseasePestApi = async (diseasePestId,orgId) => {
  const res = await http.delete("/pestDisease/", {
    data: { diseasePestId,orgId },
  });
  return res.data;
};


export const diseasePestPostApi = async (payload) => {
  const res = await http.post("/pestDisease/", payload);
  return res.data;
};


export const diseasePestUpdateApi = async (payload) => {
  const res = await http.patch("/pestDisease/", payload);
  return res.data;
};