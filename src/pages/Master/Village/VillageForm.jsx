import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

import { useSelector } from "react-redux";
import { villageUpdateApi } from "@/api/VillageMaster";
import { villagePostApi } from "@/api/VillageMaster";
import { getLgaLocationApi } from "@/api/lgaMaster";

export default function VillageForm({ mode, villageData, onBack }) {
  console.log(mode);

  const user = useSelector((state) => state.auth.user);

  //   const [unitTypes, setUnitTypes] = useState([]);

  // ================= FORM STATE =================

  const [lgaList, setLgaList] = useState([]);
  const [form, setForm] = useState({
    lgaId: "",
    villageName: "",
    latitude: "",
    longitude: "",
  });

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchLgaList();
  }, []);

  const fetchLgaList = async () => {
    try {
      const params = {
        orgId: user.orgId,
      };
      const res = await getLgaLocationApi(params);
      const list = res?.data || [];

      setLgaList(list);
    } catch (error) {
    } finally {
    }
  };

  const handleSubmit = async () => {
    const payload = {
      lgaId: form.lgaId,
      villageName: form.villageName,
      latitude: form.latitude,
      longitude: form.longitude,

      status: "1",
      orgId: user.orgId,
    };
    if (mode === "add") {
      payload.createdBy = user.userId;
    }
    if (mode === "edit") {
      payload.lgaId = villageData.lgaId;
      payload.modifiedBy = user.userId;
    }

    console.log(payload);

    try {
      const res =
        mode === "edit"
          ? await villageUpdateApi(payload)
          : await villagePostApi(payload);

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

  useEffect(() => {
    if (mode === "edit" && villageData) {
      console.log(villageData);

      setForm({
        lgaId: villageData?.lgaId,
        villageName: villageData?.villageName,
        latitude: villageData?.latitude || "",
        longitude: villageData?.longitude || "",
      });
    }
  }, [mode, villageData]);

  // ================= UI =================
  return (
    <Card sx={{ p: 4, mb: 4 }}>
      <MDTypography variant="h5" fontWeight="bold" mb={3}>
        Village Master
      </MDTypography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium">
            LGA Id
          </MDTypography>
          <select
            name="lgaId"
            value={form.lgaId}
            onChange={handleChange}
            style={inputStyle}
          >
            <option variant="caption" value="">
              Select Lga
            </option>
            {lgaList?.map((c) => (
              <option key={c.lgaId} value={c.lgaId}>
                {c.lga}
              </option>
            ))}
          </select>
        </Grid>

        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium">
            Village Name
          </MDTypography>
          <input
            type="text"
            placeholder="Enter Village Name *"
            name="villageName"
            value={form.villageName}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium">
            Latitude
          </MDTypography>
          <input
            type="text"
            placeholder="Enter Latitude*"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium">
            Longitude
          </MDTypography>
          <input
            type="text"
            placeholder="Enter Longitude*"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </Grid>
      </Grid>

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
