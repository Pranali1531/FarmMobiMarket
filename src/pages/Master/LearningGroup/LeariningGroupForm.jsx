import { Card, Grid, Icon } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useState, useEffect } from "react";
import { LearningGroupApi } from "@/api/learningMaster";


import useApi from "@/hooks/useApi";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { resolveFileUrl } from "@/utils/fileUrl";
import { updateLearningGroupApi } from "@/api/learningMaster";
import { LearningImageUpload } from "@/api/learningMaster";

export default function LearningGroupForm({ mode, groupData, onBack }) {
  const [form, setForm] = useState({
    learningGroupName: "",
    groupThumbnailUrl: "",
  });

  const [preview, setPreview] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
  const  folder="lg";
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const data = await LearningImageUpload(file,folder);
      if (data || data.url) {
        setForm((prev) => ({
          ...prev,
          groupThumbnailUrl: data.url,
        }));
        resolveFileUrl(data.url);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Image upload failed", { variant: "error" });
    }
  };

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const { request: postLearningGroup, loading } = useApi(LearningGroupApi);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.learningGroupName || !form.groupThumbnailUrl) {
      enqueueSnackbar("Please fill all fields", { variant: "warning" });
      return;
    }

    const payload = {
      learningGroupName: form.learningGroupName,
      groupThumbnailUrl: form.groupThumbnailUrl,
      status: "1",
      orgId: user.orgId,
    };
    if (mode === "add") {
      payload.createdBy = user.id;
    }
    if (mode === "edit") {
      payload.learningGroupId = groupData.learningGroupId;
      payload.modifiedBy = user.id;
    }
    try {
      const res =
        mode === "edit"
          ? await updateLearningGroupApi(payload)
          : await LearningGroupApi(payload);

      enqueueSnackbar(
        res?.message || res?.errorMessage || "Saved successfully",
        {
          variant: "success",
        }
      );

      onBack();
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  useEffect(() => {}, [preview, form.groupThumbnailUrl]);

  if (mode === "edit" && groupData && !preview) {
    setForm({
      learningGroupName: groupData.learningGroupName,
      groupThumbnailUrl: groupData.groupThumbnailUrl,
    });
    const imageUrl = resolveFileUrl(groupData.groupThumbnailUrl);
    setPreview(imageUrl);
  }

  return (
    <Card sx={{ p: 4 }}>
      <MDTypography variant="h5" mb={3}>
        {mode === "add" ? "Add Learning Group" : "Edit Learning Group"}
      </MDTypography>

      {/* IMAGE */}
      <MDBox textAlign="center" mb={3}>
        <label htmlFor="upload">
          <MDBox
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "2px dashed #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              mx: "auto",
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
          </MDBox>
        </label>
        <input id="upload" type="file" hidden onChange={handleUpload} />
      </MDBox>

      {/* GROUP NAME */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <input
            placeholder="Group Name"
            name="learningGroupName"
            value={form.learningGroupName}
            onChange={handleChange}
            style={inputStyle}
          />
        </Grid>

        <Grid item xs={12} textAlign="right">
          <button onClick={onBack} style={btnCancel}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={btnSave}>
            Save
          </button>
        </Grid>
      </Grid>
    </Card>
  );
}

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
};

const btnSave = {
  padding: "10px 20px",
  borderRadius: "8px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
};
