import { Card, Grid, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";

import BasicLayout from "@/layouts/authentication/components/BasicLayout";
import bgImage from "@/assets/images/marketbg.png";

import useApi from "@/hooks/useApi";
import { updateProfileApi } from "@/api/auth";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const { request: updateProfile, loading } = useApi(updateProfileApi);

  const [form, setForm] = useState({
    name: "",
    email: user.email || "",
    phone: user.phoneNumber || "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      enqueueSnackbar("Please fill all fields", {
        variant: "warning",
      });

      return;
    }

    const payload = {
      empId: user.employeeId,
      employeeName: form.name,
      email: form.email,
      phoneNumber: form.phone,
      address: form.address,
      employeeCode: "",
      orgId: user.orgId,
     
    };

    //  createdBy: user.id,
    //   lastUpdatedBy: user.id,

    const res = await updateProfile(payload);

    if (!res) {
      enqueueSnackbar("Profile update failed", {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar("Profile updated successfully!", { variant: "success" });

    navigate("/dashboard/analytics");
  };

  return (
    <BasicLayout image={bgImage}>
      <Card
        sx={{
          width: "100%",
          maxWidth: "650px",
          p: 4,
          borderRadius: "20px",
          background: "#f4fff4",
          boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
        }}
      >
        <MDTypography variant="h4" fontWeight="bold" color="success" mb={3}>
          Complete Your Profile
        </MDTypography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Full Name"
              fullWidth
              value={form.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Phone Number"
              fullWidth
              value={form.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              fullWidth
              multiline
              rows={3}
              value={form.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: "40px",
                backgroundColor: "#0b6b12 !important",
                color: "#fff",
                fontSize: "18px",
              }}
              onClick={handleSubmit}
            >
              {loading ? "Saving..." : "Update Profile"}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </BasicLayout>
  );
}
