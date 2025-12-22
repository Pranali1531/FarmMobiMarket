import http from "./http";


export const getUnitSubTypeApi = async (params) => {
  const res = await http.get("/unitCategories/", {
    params,
  });
  return res.data;
};


export const getUnitsApi = async (params) => {
  const res = await http.get("/units/", {
    params,
  });
  return res.data;
};

export const deleteUnitApi = async (unitId,orgId) => {
  const res = await http.delete("/units/", {
    data: { unitId,orgId },
  });
  return res.data;
};


export const unitPostApi = async (payload) => {
  const res = await http.post("/units/", payload);
  return res.data;
};


export const unitUpdateApi = async (payload) => {
  const res = await http.patch("/units/", payload);
  return res.data;
};