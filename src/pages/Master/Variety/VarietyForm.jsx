import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { imageUpload } from "@/api/cropMaster";
import { enqueueSnackbar } from "notistack";
import { resolveFileUrl } from "@/utils/fileUrl";
import { getUnitsApi } from "@/api/unitMaster";
import { getCropTypeApi } from "@/api/cropMaster";
import { VarietyUpdateApi } from "@/api/varietyMaster";
import { VarietyPostApi } from "@/api/varietyMaster";
import { useSelector } from "react-redux";
import { getCropApi } from "@/api/cropMaster";


export default function VarietyForm({ mode, cropData, onBack }) {


  //console.log(mode);

  const user = useSelector((state) => state.auth.user);

  // ================= FORM STATE =================
  const [form, setForm] = useState({
    cropTypeId: "",
    cropName: "",
    varietyName: "",
    cropCode: "",
    cropDuration: "",
    cropProduction: "",
    cropUnit: "",
    avgDays: "",
    cropProfileUrl: "",
    multipleHarvestCycle: false,

  });

  // ================= IMAGE STATE =================
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(cropData?.cropProfileUrl || null);

  const [units, setUnits] = useState([]);
  const [cropType, setCropType] = useState([]);
  const [crops, setCrops] = useState([]);
    const [filtredCrops, setFiltredCrops] = useState([]);





  useEffect(() => {
    fetchUnits();
    fetchCropTypes();
    fetchCrops();
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

  const fetchCrops = async () => {
    try {
      const params = {
        orgId: user.orgId,
      };
      const res = await getCropApi(params);
      const list = res?.data || [];

      setCrops(list);
    } catch (error) {
    } finally {

    }
  }

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
    const folder = "variety";
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
      cropId: form.cropId,
      varietyName: form.varietyName,
      varityNo: form.varityCode,
      cropDuration: form.cropDuration,
      avgDaysToHarvest:form.avgDaysToHarvest,
      productionPerArea: form.cropProduction,
      productionUnitId: form.cropUnit,
      avgDays: form.avgDays,
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

  //  console.log(payload);

    try {
      const res =
        mode === "edit"
          ? await VarietyUpdateApi(payload)
          : await VarietyPostApi(payload);

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


  //    console.log(cropData);

      const filterdUnits = units?.filter((type) => type.unitTypeName == "Weight") || []
      setUnits(filterdUnits);

      setForm({
        cropTypeId: cropData?.cropTypeId || "",
        varietyName: cropData?.varietyName || "",
        cropName: cropData?.cropName || "",
        cropCode: cropData?.cropCode || "",
        cropDuration: cropData?.cropDuration || "",
        cropProduction: cropData?.productionPerArea || "",
        cropUnit: cropData?.productionUnitId || "",
        avgDays: cropData?.avgDays || "",
        cropProfileUrl: cropData?.cropProfileUrl || "",
        multipleHarvestCycle: cropData?.multipleHarvestCycle || false,


      })
      const imageUrl = resolveFileUrl(cropData.cropProfileUrl);
      setPreview(imageUrl);


    }
  }, [mode, cropData])

  useEffect(() => {

    const filterdCrops = crops.filter((itm) => itm.cropTypeId == form.cropTypeId)

 //   console.log(filterdCrops);
    setFiltredCrops(filterdCrops);

  }, [form.cropTypeId])



  // ================= UI =================
  return (
    <Card sx={{ p: 4, mb: 4 }}>
      <MDTypography variant="h5" fontWeight="bold" mb={3}>
        Variety Details
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
            Crop
          </MDTypography>
          <select
            name="cropName"
            value={form.cropName}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Crop</option>
            {filtredCrops?.map((c) => (
              <option key={c.cropId} value={c.cropId}>
                {c.cropName}
              </option>
            ))}
          </select>
        </Grid>

        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Variety Name
          </MDTypography>
          <input
            type="text"
            placeholder="Variety Name *"
            name="varietyName"
            value={form.varietyName}
            onChange={handleChange}
            style={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Variety Code
          </MDTypography>
          <input
            type="text"
            placeholder="Variety Code *"
            name="cropCode"
            value={form.cropCode}
            onChange={handleChange}
            style={inputStyle}
          />
        </Grid>

        {/* Title */}
        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Duration
          </MDTypography>
          <input
            type="text"
            placeholder="Crop Duration(Days) *"
            name="cropDuration"
            value={form.cropDuration}
            onChange={handleChange}
            style={inputStyle}
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
          />
        </Grid>



        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Unit
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
            Avg Days To Harvest
          </MDTypography>
          <input
            type="text"
            placeholder="Avg Days To Harvest *"
            name="avgDays"
            value={form.avgDays}
            onChange={handleChange}
            style={inputStyle}
          />
        </Grid>
        <Grid item xs={12} md={6}>

          <MDTypography variant="caption" fontWeight="medium" >
            Multiple Harvest Cycle
          </MDTypography>
          <MDBox>
            <Checkbox />
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
