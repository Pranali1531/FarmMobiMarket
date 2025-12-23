import http from "./http";





export const getDepartmentApi = async (params) => {
  const res = await http.get("/department/", {
    params,
  });
  return res.data;
};

export const deleteDepartmentApi = async (departmentId,orgId) => {
  const res = await http.delete("/department/", {
    data: { departmentId,orgId },
  });
  return res.data;
};


export const departmentPostApi = async (payload) => {
  const res = await http.post("/department/", payload);
  return res.data;
};


export const departmentUpdateApi = async (payload) => {
  const res = await http.patch("/department/", payload);
  return res.data;
};