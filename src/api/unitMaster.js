import http from "./http";

export const getUnitsApi = async (params) => {
  const res = await http.get("/units/", {
    params,
  });
  return res.data;
};