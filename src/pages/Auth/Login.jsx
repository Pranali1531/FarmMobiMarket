import { Card, Grid, TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";

import BasicLayout from "@/layouts/authentication/components/BasicLayout";
import bgImage from "@/assets/images/marketbg.png";
import { sendOtpApi, verifyOtpApi } from "@/api/auth";
import useApi from "@/hooks/useApi";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import { setMenu } from "@/store/menuSlice";

const staticMenuJson = [
  {
    name: "Dashboard",
    icon: "dashboard",
    children: [
      {
        name: "Overview",
        key: "overview",
        route: "/dashboard/overview",
        component: "DashboardOverview",
      },
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboard/analytics",
        component: "DashboardAnalytics",
      },
    ],
  },

  {
    name: "Admin",
    icon: "admin_panel_settings",
    children: [
      {
        name: "Users",
        key: "users",
        route: "/admin/users",
        component: "AdminUsers",
      },
      {
        name: "Roles",
        key: "roles",
        route: "/admin/roles",
        component: "AdminRoles",
      },
      {
        name: "Permissions",
        key: "permissions",
        route: "/admin/permissions",
        component: "AdminPermissions",
      },
    ],
  },
  {
    name: "Master",
    icon: "storage",
    children: [
      { name: "Crop", key: "crop", route: "/master/crop", component: "Crop" },
      {
        name: "Varieties",
        key: "varieties",
        route: "/master/varieties",
        component: "Variety",
      },

      {
        name: "Unit",
        key: "unit",
        route: "/master/units",
        component: "Unit",
      },

       {
        name: "Department",
        key: "department",
        route: "/master/departments",
        component: "Department",
      },

      {
        name: "Designation",
        key: "designation",
        route: "/master/designations",
        component: "Designation",
      },

      {
        name: "Country",
        key: "country",
        route: "/master/countries",
        component: "Country",
      },


      {
        name: "State",
        key: "state",
        route: "/master/states",
        component: "State",
      },

       {
        name: "LGALocation ",
        key: "lgalocation ",
        route: "/master/lgalocation",
        component: "LGALocation ",
      },

      {
        name: "DiseasePest",
        key: "diseasePest",
        route: "/master/diseasePests",
        component: "DiseasePest",
      },
      {
        name: "Products",
        key: "products",
        route: "/master/products",
        component: "MasterProducts",
      },
      {
        name: "Learnings Group",
        key: "learnings-group", 
        route: "/master/learningsGroup",  
        component: "MasterLearningsGroup",  
      },
      {
        name: "Learnings Sub Group",
        key: "learnings-sub-group", 
        route: "/master/learningsSubGroup",  
        component: "MasterLearningsSubGroup",  
      },
      {
        name: "Learning Video",
        key: "learnings-videos", 
        route: "/master/learningVideo",  
        component: "MasterLearningVideo",  
      },
      

    ],
  },
  {
    name: "Resource Center",
    icon: "agriculture",
    children: [
      {
        name: "Soil Data",
        key: "soil-data",
        route: "/agro/soil",
        component: "AgroSoilData",
      },
      {
        name: "Fertilizers",
        key: "fertilizers",
        route: "/agro/fertilizers",
        component: "AgroFertilizers",
      },
      {
        name: "Pest Control",
        key: "pest-control",
        route: "/agro/pest-control",
        component: "AgroPestControl",
      },
    ],
  },
  {
    name: "Market Centre",
    icon: "storefront",
    children: [
      {
        name: "Products",
        key: "products",
        route: "/market/products",
        component: "MarketProducts",
      },
      {
        name: "Orders",
        key: "orders",
        route: "/market/orders",
        component: "MarketOrders",
      },
    ],
  },
  {
    name: "Service Centre",
    icon: "build_circle",
    children: [
      {
        name: "Service List",
        key: "service-list",
        route: "/services/list",
        component: "ServiceList",
      },
      {
        name: "Service Requests",
        key: "service-requests",
        route: "/services/requests",
        component: "ServiceRequests",
      },
    ],
  },
];

export default function Login() {
  const {
    request: sendOtpRequest,
    loading: sendingOtp,
    error: sendOtpError,
  } = useApi(sendOtpApi);

  const {
    request: verifyOtpRequest,
    loading: verifyingOtp,
    error: verifyOtpError,
  } = useApi(verifyOtpApi);

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: "",
  });

  // OTP state
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // --------------- TIMER LOGIC ---------------
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    }
    if (timer === 0) setCanResend(true);
  }, [timer, step]);

  // --------------- Input Change ---------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --------------- Send OTP ---------------
  const sendOtp = async () => {
    if (!form.email)
      return enqueueSnackbar("Please enter your username/mobile", {
        variant: "warning",
      });

    const payload = { userName: form.email };

    const res = await sendOtpRequest(payload);

    if (!res) {
      enqueueSnackbar(sendOtpError || "Failed to send OTP", {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar("OTP sent successfully!", { variant: "success" });

    setStep(2);
    setTimer(30);
    setCanResend(false);
  };

  // --------------- OTP Input Handling ---------------
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpBack = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // --------------- Verify OTP ---------------
  const verifyOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6)
      return enqueueSnackbar("Please enter a valid 6-digit OTP", {
        variant: "warning",
      });

    const payload = {
      userName: form.email,
      otp: finalOtp,
    };

    const res = await verifyOtpRequest(payload);

    if (!res) {
      enqueueSnackbar(verifyOtpError || "Invalid OTP. Try again.", {
        variant: "error",
      });
      return;
    }
   // console.log(res);
    dispatch(loginSuccess(res.data));
    dispatch(setMenu(staticMenuJson));

    enqueueSnackbar("OTP Verified Successfully!", { variant: "success" });
    const { isNewUser } = res.data;

    // If user must complete profile
    if (isNewUser) {
      navigate("/auth/completeProfile");
      return;
    }
    navigate("/dashboard/analytics");
  };

  const resendOtp = () => {
    setOtp(new Array(6).fill(""));
    setTimer(60);
    setCanResend(false);
    enqueueSnackbar("A new OTP has been sent!", { variant: "info" });
  };

  return (
    <BasicLayout image={bgImage}>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ position: "relative", overflow: "hidden" }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: "650px", // Now it will work
            p: 4,
            borderRadius: "20px",
            background: "#f4fff4",
            boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
          }}
        >
          <MDTypography variant="h4" fontWeight="bold" color="success" mb={3}>
            Welcome!
          </MDTypography>

          {/* ----------------------------------------------------
                      STEP 1 : ENTER USERNAME
          ---------------------------------------------------- */}
          {step === 1 && (
            <>
              <MDTypography
                variant="button"
                fontWeight="medium"
                color="text"
                sx={{ mb: 1, display: "block" }}
              >
                Enter your username or mobile number
              </MDTypography>

              <TextField
                name="email"
                fullWidth
                variant="standard"
                value={form.email}
                onChange={handleChange}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    borderBottom: "1px solid #ccc",
                    pb: "6px",
                    fontSize: "16px",
                    mt: 1,
                    mb: 3,
                  },
                }}
              />

              {/* <MDTypography
                variant="button"
                color="info"
                sx={{ mt: 1, mb: 3, cursor: "pointer" }}
                onClick={() => navigate("/auth/forgot-password")}
              >
                Forgot Password?
              </MDTypography> */}

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: "40px",
                  backgroundColor: "#0b6b12",
                  color: "#fff",
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: "#0b6b12 !important",
                  },
                  "&:focus": {
                    backgroundColor: "#0b6b12 !important",
                    outline: "none",
                  },
                  "&:active": {
                    backgroundColor: "#0b6b12 !important",
                  },
                }}
                onClick={sendOtp}
              >
                {sendingOtp ? (
                  <MDBox
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <CircularProgress size={22} sx={{ color: "white !important" }} />
                    Loading...
                  </MDBox>
                ) : (
                  "Send OTP"
                )}
              </Button>

              {/* <MDTypography
                variant="button"
                color="text"
                textAlign="center"
                mt={3}
              >
                New Here?{" "}
                <span
                  style={{ color: "#0b6b12", cursor: "pointer" }}
                  onClick={() => navigate("/auth/register")}
                >
                  Create Account!
                </span>
              </MDTypography> */}
            </>
          )}

          {/* ----------------------------------------------------
                      STEP 2 : ENTER OTP
          ---------------------------------------------------- */}
          {step === 2 && (
            <>
              <MDTypography variant="h5" fontWeight="medium" mb={1}>
                Type your 6 digit security code
              </MDTypography>

              <MDTypography variant="button" color="text" mb={3}>
                OTP sent to <b>{form.email}</b>
              </MDTypography>

              <Grid container spacing={2} justifyContent="center">
                {otp.map((digit, idx) => (
                  <Grid item key={idx}>
                    <TextField
                      id={`otp-${idx}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      onKeyDown={(e) => handleOtpBack(e, idx)}
                      variant="outlined"
                      inputProps={{
                        maxLength: 1,
                        style: {
                          width: "40px", // ⬅ small width
                          height: "40px", // ⬅ small square boxes
                          padding: 0,
                          textAlign: "center",
                          fontSize: "20px",
                          borderRadius: "10px",
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Resend OTP or timer */}
              <MDTypography
                variant="button"
                mt={2}
                mb={3}
                textAlign="center"
                display="block"
              >
                {canResend ? (
                  <span
                    style={{ color: "#0b6b12", cursor: "pointer" }}
                    onClick={resendOtp}
                  >
                    Resend OTP
                  </span>
                ) : (
                  <>Resend OTP in {timer}s</>
                )}
              </MDTypography>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: "40px",
                  backgroundColor: "#0b6b12",
                  color: "#fff",
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: "#0b6b12 !important",
                  },
                  "&:focus": {
                    backgroundColor: "#0b6b12 !important",
                    outline: "none",
                  },
                  "&:active": {
                    backgroundColor: "#0b6b12 !important",
                  },
                }}
                onClick={verifyOtp}
              >
                {verifyingOtp ? (
                  <MDBox
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <CircularProgress size={22} sx={{ color: "white" }} />
                    Loading...
                  </MDBox>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <MDTypography
                variant="button"
                textAlign="center"
                mt={3}
                sx={{ cursor: "pointer", color: "#0b6b12" }}
                onClick={() => setStep(1)}
              >
                ← Change Mobile / Email
              </MDTypography>
            </>
          )}
        </Card>
      </MDBox>
    </BasicLayout>
  );
}
