import http from "./http";

export const LearningGroupApi = async (payload) => {
  const res = await http.post("/learningGroup/", payload);
  return res.data;
};

export const getLearningGroupApi = async (params) => {
  const res = await http.get("/learningGroup/", {
    params,
  });
  return res.data;
};

export const LearningImageUpload = async (file, folder) => {
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
};

export const deleteLearningGroupApi = async (learningGroupId) => {
  const res = await http.delete("/learningGroup/", {
    data: { learningGroupId },
  });
  return res.data;
};

export const updateLearningGroupApi = async (payload) => {
  const res = await http.patch("/learningGroup/", payload);
  return res.data;
};

export const LearningSubGroupApi = async (payload) => {
  const res = await http.post("/learningSubGroup/", payload);
  return res.data;
};

export const getLearningSubGroupApi = async (params) => {
  const res = await http.get("/learningSubGroup/", {
    params,
  });
  return res.data;
};

export const updateLearningSubGroupApi = async (payload) => {
  const res = await http.patch("/learningSubGroup/", payload);
  return res.data;
};

export const deleteLearningSubGroupApi = async (payload) => {
  const res = await http.delete("/learningSubGroup/", payload);
  return res.data;
};
