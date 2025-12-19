import { Card, Grid, Icon } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AddUser({ mode, userData, onBack }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    role: userData?.role || "",
  });

  // const location = useLocation();

  // When coming from edit → user data exists
  // const userData = location.state?.userData;
  // // -------- Load data when editing --------
  // useEffect(() => {
  //   if (id && userData) {
  //     setForm(userData); // Pre-fill full form
  //   }
  // }, [id, userData]);

  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setProfile(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    if (id) {
      console.log("Editing user:", id, form);
    } else {
      console.log("Adding new user:", form);
    }
    navigate("/admin/users");
  };

  return (
    <Card sx={{ p: 4, mb: 4 }}>
      <MDTypography variant="h5" fontWeight="bold" mb={3}>
        {mode === "add" ? "Add User" : "Edit User"}
      </MDTypography>
      <MDBox mb={3} textAlign="center">
        <MDTypography variant="button" fontWeight="medium">
          Profile Photo
        </MDTypography>

        <MDBox
          mt={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {/* Wrapper for image + close icon */}
          <MDBox position="relative" display="inline-block">
            <label
              htmlFor="profile-upload"
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                overflow: "hidden",
                border: "2px solid #d5d5d5",
                background: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <MDTypography variant="button" color="text">
                  Upload
                </MDTypography>
              )}
            </label>

            {/* OUTSIDE TOP-RIGHT CLOSE BUTTON */}
            {preview && (
              <Icon
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeImage();
                }}
                sx={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#fff",
                  color: "#333",
                  borderRadius: "50%",
                  fontSize: "18px",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  padding: "2px",
                }}
              >
                close
              </Icon>
            )}
          </MDBox>

          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
        </MDBox>
      </MDBox>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Executive">Executive</option>
          </select>
        </Grid>

        <Grid item xs={12} md={6}>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </Grid>

        <Grid item xs={12} md={6}>
          <input
            type="number"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </Grid>

        <Grid item xs={12} textAlign="right">
          <button
            onClick={onBack}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {mode === "edit" ? "Update User" : "Create User"}
          </button>
        </Grid>
      </Grid>
    </Card>
  );
}
