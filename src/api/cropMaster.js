import http from "./http";

export const getCropTypeApi = async (params) => {
  const res = await http.get("/cropType/", {
    params,
  });
  return res.data;
};

export const getCropApi = async (params) => {
  const res = await http.get("/crop/", {
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

export const deleteCropApi = async (cropId) => {
  const res = await http.delete("/crop/", {
    data: { cropId },
  });
  return res.data;
};


export const CropPostApi = async (payload) => {
  const res = await http.post("/crop/", payload);
  return res.data;
};


export const cropUpdateApi = async (payload) => {
  const res = await http.put("/crop/", payload);
  return res.data;
};