import http from "./http";





export const getDesignationApi = async (params) => {
  const res = await http.get("/designation/", {
    params,
  });
  return res.data;
};

export const deleteDesignationApi = async (designationId,orgId) => {
  const res = await http.delete("/designation/", {
    data: { designationId,orgId },
  });
  return res.data;
};


export const designationPostApi = async (payload) => {
  const res = await http.post("/designation/", payload);
  return res.data;
};


export const designationUpdateApi = async (payload) => {
  const res = await http.patch("/designation/", payload);
  return res.data;
};