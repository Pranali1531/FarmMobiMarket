import http from "./http";

export const sendOtpApi = async (payload) => {
  const res = await http.post("/sendOTP/", payload);
  return res.data;
};

export const verifyOtpApi = async (payload) => {
  const res = await http.post("/verifyOTP/", payload);
  return res.data;
};

export const registerApi = async (payload) => {
  const res = await http.post("/auth/register/", payload);
  return res.data;
};

export const updateProfileApi = async (payload) => {
  const res = await http.put("/employeeDetail/", payload);
  return res.data;
};


export const getProfileApi = async (params) => {
  const res = await http.get("/employeeDetail/", {
    params,
  });
  return res.data;
};


// export const getUserByIdApi = async (userId) => {
//   const res = await http.get("/users/", {
//     params: { id: userId },
//   });
//   return res.data;
// };

// export const getUserByIdApi = async (userId) => {
//   const res = await http.get("/users/", {
//     params: { id: userId },
//   });
//   return res.data;
// };

// export const getProfileApi = async (params) => {
//   const res = await http.get("/profile/", {
//     params,
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
//   return res.data;
// };
