import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { imageUpload } from "@/api/cropMaster";
import { enqueueSnackbar } from "notistack";
import { resolveFileUrl } from "@/utils/fileUrl";
import { getUnitsApi } from "@/api/unitMaster";
import { useSelector } from "react-redux";
import { getCropTypeApi } from "@/api/cropMaster";
import { CropPostApi } from "@/api/cropMaster";
import { cropUpdateApi } from "@/api/cropMaster";


export default function CropForm({ mode, cropData, onBack }) {

  console.log(mode);

  const user = useSelector((state) => state.auth.user);

  const [units, setUnits] = useState([]);
  const [cropType, setCropType] = useState([]);



  useEffect(() => {
    fetchUnits();
    fetchCropTypes();
  }, []);

  const fetchUnits = async () => {

    try {
      const params = {
        orgId: user.orgId,
      };
      const res = await getUnitsApi(params);
      const list = res?.data || [];

      const filterdUnits = list?.filter((type) => type.unitTypeName == "Weight") || []
      setUnits(filterdUnits);
    } catch (error) {
    } finally {

    }
  };

  const fetchCropTypes = async () => {
    try {
      const params = {
        orgId: user.orgId,
      };
      const res = await getCropTypeApi(params);
      const list = res?.data || [];
      setCropType(list);
    } catch (error) {
    } finally {

    }
  }



  // ================= FORM STATE =================
  const [form, setForm] = useState({
    cropTypeId: "",
    cropName: "",
    cropCode: "",
    cropDuration: "",
    cropProduction: "",
    cropUnit: "",
    cropProfileUrl: "",
    multipleHarvestCycle: false,

  });

  // ================= IMAGE STATE =================

  const [preview, setPreview] = useState(null);

  // ================= DUMMY DROPDOWNS (API later) =================

  const crops = ["Wheat", "Rice", "Maize"];

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setForm({
      ...form,
      multipleHarvestCycle: e.target.checked,
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const folder = "crop";
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const data = await imageUpload(file, folder);
      if (data || data.url) {
        setForm((prev) => ({
          ...prev,
          cropProfileUrl: data.url,
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


  const handleSubmit = async () => {
    const payload = {
      cropTypeId: form.cropTypeId,
      cropName: form.cropName,
      cropCode: form.cropCode,
      cropDuration: form.cropDuration,
      productionPerArea: form.cropProduction,
      productionUnitId: form.cropUnit,
      cropProfileUrl: form.cropProfileUrl,
      multipleHarvestCycle: form.multipleHarvestCycle,
      status: "1",
      orgId: user.orgId,
    };
    if (mode === "add") {
      payload.createdBy = user.userId;
    }
    if (mode === "edit") {
      payload.cropId = cropData.cropId;
      payload.modifiedBy = user.userId;
    }

    console.log(payload);

    try {
      const res =
        mode === "edit"
          ? await cropUpdateApi(payload)
          : await CropPostApi(payload);

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


  useEffect(() => { }, [preview, form.cropProfileUrl]);

  useEffect(() => {
    if (mode === "edit" && cropData && !preview) {


      console.log(cropData);

      const filterdUnits = units?.filter((type) => type.unitTypeName == "Weight") || []
      setUnits(filterdUnits);

      setForm({
        cropTypeId: cropData?.cropTypeId || "",

        cropName: cropData?.cropName,
        cropCode: cropData?.cropCode || "",
        cropDuration: cropData?.cropDuration || "",
        cropProduction: cropData?.productionPerArea || "",
        cropUnit: cropData?.productionUnitId || "",
        cropProfileUrl: cropData?.cropProfileUrl || "",
        multipleHarvestCycle: cropData?.multipleHarvestCycle || false,


      })
      const imageUrl = resolveFileUrl(cropData.cropProfileUrl);
      setPreview(imageUrl);


    }
  }, [mode,cropData])










  // ================= UI =================
  return (
    <Card sx={{ p: 4, mb: 4 }}>
      <MDTypography variant="h5" fontWeight="bold" mb={3}>
        Crop Master
      </MDTypography>

      <Grid container spacing={3}>





        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Crop Type
          </MDTypography>
          <select
            name="cropTypeId"
            value={form.cropTypeId}
            onChange={handleChange}
            style={inputStyle}
         
          >
            <option value="">Select Crop Type</option>
            {cropType?.map((c) => (
              <option key={c.cropTypeId} value={c.cropTypeId}>
                {c.cropTypeName}
              </option>
            ))}
          </select>
        </Grid>

        {/* Title */}
        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Crop Name
          </MDTypography>
          <input
            type="text"
            placeholder="Crop Name *"
            name="cropName"
            value={form.cropName}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Crop Code
          </MDTypography>
          <input
            type="text"
            placeholder="Crop Code *"
            name="cropCode"
            value={form.cropCode}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </Grid>

        {/* Title */}
        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Crop Duration
          </MDTypography>
          <input
            type="text"
            placeholder="Crop Duration(Days) *"
            name="cropDuration"
            value={form.cropDuration}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Production/Area
          </MDTypography>
          <input
            type="text"
            placeholder="Production/Area *"
            name="cropProduction"
            value={form.cropProduction}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </Grid>



        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Crop Unit
          </MDTypography>
          <select
            name="cropUnit"
            value={form.cropUnit}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Unit</option>
            {units?.map((c) => (
              <option key={c.unitId} value={c.unitId}>
                {c.unitAbbreviation}
              </option>
            ))}
          </select>
        </Grid>

        <Grid item xs={12} md={6}>

          <MDTypography variant="caption" fontWeight="medium" >
            Multiple Harvest Cycle
          </MDTypography>
          <MDBox>
            <Checkbox checked={form.multipleHarvestCycle}
              onChange={handleCheckboxChange} />
          </MDBox>
        </Grid>
      </Grid>

      {/* IMAGE UPLOAD */}
      <MDBox mt={4}>
        <MDTypography variant="button" fontWeight="medium" mb={1}>
          Crop Image
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
