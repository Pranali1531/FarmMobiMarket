import http from "./http";

export const getVillageApi = async (params) => {
  const res = await http.get("/village/", {
    params,
  });
  return res.data;
};

export const deleteVillageApi = async (lgaId, orgId) => {
  const res = await http.delete("/village/", {
    data: { lgaId, orgId },
  });
  return res.data;
};

export const villagePostApi = async (payload) => {
  const res = await http.post("/village/", payload);
  return res.data;
};

export const villageUpdateApi = async (payload) => {
  const res = await http.patch("/village/", payload);
  return res.data;
};
