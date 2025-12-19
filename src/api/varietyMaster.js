import http from "./http";

export const getVarietyApi = async (params) => {
  const res = await http.get("/variety/", {
    params,
  });
  return res.data;
};

export const getCropTypeApi = async (params) => {
  const res = await http.get("/cropType/", {
    params,
  });
  return res.data;
};

export const imageUpload = async (file, folder) => {
  const formData = new FormData();
  const timeStamp = new Date().valueOf();

  formData.append("fileUpload", file, file.name);

  const res = await http.post(
    `/file/${folder}/${timeStamp}${file.name}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

export const deleteVarietyApi = async (varietyId) => {
  const res = await http.delete("/variety/", {
    data: { varietyId },
  });
  return res.data;
};

export const VarietyPostApi = async (payload) => {
  const res = await http.post("/variety/", payload);
  return res.data;
};


export const VarietyUpdateApi = async (payload) => {
  const res = await http.put("/variety/", payload);
  return res.data;
};