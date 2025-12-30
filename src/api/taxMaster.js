import http from "./http";





export const getTaxApi = async (params) => {
  const res = await http.get("/tax/", {
    params,
  });
  return res.data;
};

export const deleteTaxApi = async (taxId,orgId) => {
  const res = await http.delete("/tax/", {
    data: { taxId,orgId },
  });
  return res.data;
};


export const taxPostApi = async (payload) => {
  const res = await http.post("/tax/", payload);
  return res.data;
};


export const taxUpdateApi = async (payload) => {
  const res = await http.patch("/tax/", payload);
  return res.data;
};