import { Card, Grid, Icon } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LearningImageUpload } from "@/api/learningMaster";
import { getLearningSubGroupApi } from "@/api/learningMaster";
import { getLearningGroupApi } from "@/api/learningMaster";
import { updateLearningSubGroupApi } from "@/api/learningMaster";
import { LearningSubGroupApi } from "@/api/learningMaster";
import { enqueueSnackbar } from "notistack";
import { resolveFileUrl } from "@/utils/fileUrl";

export default function LearningSubGroupForm({ mode, subGroupData, onBack }) {
  const [form, setForm] = useState({
    learningGroupId: "",
    learningSubGroupName: "",
    subGroupThumbnailUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [preview, setPreview] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLearningGroups();
  }, []);

  const fetchLearningGroups = async () => {
    setLoading(true);
    try {
      const params = {
        orgId: user.orgId,
      };
      const res = await getLearningGroupApi(params);

      const list = res?.data || [];

      setGroups(list);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const folder = "lsg";
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const data = await LearningImageUpload(file, folder);
      console.log(data);

      if (data || data.url) {
        //  setImage(data.url);

        setForm((prev) => ({
          ...prev,
          subGroupThumbnailUrl: data.url,
        }));
        resolveFileUrl(data.url);
        enqueueSnackbar("Image upload successfully", { variant: "success" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Image upload failed", { variant: "error" });
    }
  };

  const handleSubmit = async () => {
    // if (!form.learningGroupId || !form.subGroupThumbnailUrl || !form.learningSubGroupName) {
    //   enqueueSnackbar("Please fill all fields", { variant: "warning" });
    //   return;
    // }

    const payload = {
      learningGroupId: form.learningGroupId,
      learningSubGroupName: form.learningSubGroupName,
      subGroupThumbnailUrl: form.subGroupThumbnailUrl,
      status: "1",
      orgId: user.orgId,
    };
    if (mode === "add") {
      payload.createdBy = user.id;
    }
    if (mode === "edit") {
      payload.learningSubGroupId = subGroupData.learningSubGroupId;
      payload.modifiedBy = user.id;
    }
    console.log(payload);
    
    try {
      const res =
        mode === "edit"
          ? await updateLearningSubGroupApi(payload)
          : await LearningSubGroupApi(payload);

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

  if (mode === "edit" && subGroupData && !preview) {
    console.log(subGroupData);

    setForm({
      learningGroupId: subGroupData.learningGroupId,
      learningSubGroupName: subGroupData.learningSubGroupName,
      subGroupThumbnailUrl: subGroupData.subGroupThumbnailUrl,
    });
    const imageUrl = resolveFileUrl(subGroupData.subGroupThumbnailUrl);
    setPreview(imageUrl);
  }

  return (
    <Card sx={{ p: 4 }}>
      <MDTypography variant="h5" fontWeight="bold" mb={3}>
        Learning Sub Group
      </MDTypography>

      <Grid container spacing={3}>
        {/* Learning Group Dropdown */}
        <Grid item xs={12} md={6}>
           
          <select
            value={form.learningGroupId}
            name="learningGroupId"
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="">Learning Group</option>
            {groups?.map((g) => (
              <option key={g.learningGroupId} value={g.learningGroupId}>
                {g.learningGroupName}
              </option>
            ))}
          </select>
        </Grid>

        {/* Sub Group Name */}
        <Grid item xs={12} md={6}>
          <input
            type="text"
            placeholder="Learning Sub Group Name"
            name="learningSubGroupName"
            value={form.learningSubGroupName}
            onChange={handleChange}
            style={inputStyle}
          />
        </Grid>
      </Grid>

      {/* IMAGE UPLOAD */}
      <MDBox mt={4} mb={3} textAlign="left">
        <MDBox
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
          component="label"
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <Icon fontSize="large">cloud_upload</Icon>
          )}
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </MDBox>
      </MDBox>

      {/* BUTTONS */}
      <MDBox textAlign="right">
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
};

const btnSave = {
  padding: "10px 20px",
  borderRadius: "8px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
};
