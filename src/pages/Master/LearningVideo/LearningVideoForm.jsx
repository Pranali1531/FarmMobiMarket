import { Card, Grid, Icon } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useState } from "react";

export default function LearningVideoForm({ mode, userData, onBack }) {

  // ================= FORM STATE =================
  const [form, setForm] = useState({
    learningGroup: userData?.learningGroup || "",
    learningSubGroup: userData?.learningSubGroup || "",
    crop: userData?.crop || "",
    title: userData?.title || "",
    description: userData?.description || "",
    uri: userData?.uri || "",
    duration: userData?.duration || "",
  });

  // ================= IMAGE STATE =================
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(userData?.thumbnail || null);

  // ================= DUMMY DROPDOWNS (API later) =================
  const learningGroups = ["Organic Farming", "Soil Training"];
  const learningSubGroups = ["Composting", "Soil Testing"];
  const crops = ["Wheat", "Rice", "Maize"];

  // ================= HANDLERS =================
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      thumbnail,
    };

    console.log(
      mode === "edit" ? "Update Learning Video" : "Create Learning Video",
      payload
    );

    onBack();
  };

  // ================= UI =================
  return (
    <Card sx={{ p: 4, mb: 4 }}>
      <MDTypography variant="h5" fontWeight="bold" mb={3}>
        Learning Video
      </MDTypography>

      <Grid container spacing={3}>
        {/* Learning Group */}
        <Grid item xs={12} md={6}>
          <select
            value={form.learningGroup}
            onChange={(e) => handleChange("learningGroup", e.target.value)}
            style={inputStyle}
          >
            <option value="">Learning Group *</option>
            {learningGroups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Grid>

        {/* Learning Sub Group */}
        <Grid item xs={12} md={6}>
          <select
            value={form.learningSubGroup}
            onChange={(e) => handleChange("learningSubGroup", e.target.value)}
            style={inputStyle}
          >
            <option value="">Learning Sub Group *</option>
            {learningSubGroups.map((sg) => (
              <option key={sg} value={sg}>
                {sg}
              </option>
            ))}
          </select>
        </Grid>

        {/* Crop */}
        <Grid item xs={12} md={6}>
          <select
            value={form.crop}
            onChange={(e) => handleChange("crop", e.target.value)}
            style={inputStyle}
          >
            <option value="">Crop</option>
            {crops.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Grid>

        {/* Title */}
        <Grid item xs={12} md={6}>
          <input
            type="text"
            placeholder="Title *"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            style={inputStyle}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12} md={6}>
          <input
            type="text"
            placeholder="Description *"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            style={inputStyle}
          />
        </Grid>

        {/* URI */}
        <Grid item xs={12} md={6}>
          <input
            type="text"
            placeholder="URI *"
            value={form.uri}
            onChange={(e) => handleChange("uri", e.target.value)}
            style={inputStyle}
          />
        </Grid>

        {/* Duration */}
        <Grid item xs={12} md={6}>
          <input
            type="text"
            placeholder="Duration *"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            style={inputStyle}
          />
        </Grid>
      </Grid>

      {/* IMAGE UPLOAD */}
      <MDBox mt={4}>
        <MDTypography variant="button" fontWeight="medium" mb={1}>
          Thumbnail
        </MDTypography>

        <MDBox
          component="label"
          sx={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "2px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Icon fontSize="large">cloud_upload</Icon>
          )}
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </MDBox>
      </MDBox>

      {/* BUTTONS */}
      <MDBox mt={4} textAlign="right">
        <button onClick={onBack} style={btnCancel}>
          Cancel
        </button>
        <button onClick={handleSubmit} style={btnSave}>
          Save
        </button>
      </MDBox>
    </Card>
  );
}

// ================= STYLES =================
const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btnCancel = {
  padding: "10px 20px",
  marginRight: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
};

const btnSave = {
  padding: "10px 20px",
  borderRadius: "8px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
