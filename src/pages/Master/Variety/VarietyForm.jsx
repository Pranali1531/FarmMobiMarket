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


export default function VarietyForm({ mode, varietyData, onBack }) {

  const user = useSelector((state) => state.auth.user);

  // ================= FORM STATE =================
  const [form, setForm] = useState({
    cropTypeId: "",
    cropId: "",
    varietyName: "",
    varietyCode: "",
    cropDuration: "",
    productionPerArea: "",
    productionUnitId: "",
    avgDaysToHarvest: "",
  });

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

  const handleSubmit = async () => {
    const payload = {
      cropTypeId: parseInt(form.cropTypeId),
      cropId: form.cropId,
      varietyName: form.varietyName,
      varietyCode: form.varietyCode,
      cropDuration: form.cropDuration,
      avgDaysToHarvest: form.avgDaysToHarvest,
      productionPerArea: form.productionPerArea,
      productionUnitId: parseInt(form.productionUnitId),


      status: "1",
      orgId: user.orgId,
    };
    if (mode === "add") {
      payload.createdBy = user.userId;
    }
    if (mode === "edit") {
      payload.varietyId = varietyData.varietyId;
      payload.modifiedBy = user.userId;
    }

    console.log(payload);

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



  useEffect(() => {
    if (mode === "edit" && varietyData) {


    //  console.log(varietyData);

      const filterdUnits = units?.filter((type) => type.unitTypeName == "Weight") || []
      setUnits(filterdUnits);

      setForm({
        cropTypeId: varietyData?.cropTypeId || "",
        cropId: varietyData?.cropId || "",
        varietyName: varietyData?.varietyName || "",
        varietyCode: varietyData?.varietyCode || "",
        cropDuration: varietyData?.cropDuration || "",
        productionPerArea: varietyData?.productionPerArea || "",
        productionUnitId: varietyData?.productionUnitId || "",
        avgDaysToHarvest: varietyData?.avgDaysToHarvest || "",
      })



    }
  }, [mode, varietyData])

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
            name="cropId"
            value={form.cropId}
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
            placeholder="Variety Number*"
            name="varietyCode"
            value={form.varietyCode}
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
            name="productionPerArea"
            value={form.productionPerArea}
            onChange={handleChange}
            style={inputStyle}
          />
        </Grid>



        <Grid item xs={12} md={6}>
          <MDTypography variant="caption" fontWeight="medium" >
            Unit
          </MDTypography>
          <select
            name="productionUnitId"
            value={form.productionUnitId}
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
            name="avgDaysToHarvest"
            value={form.avgDaysToHarvest}
            onChange={handleChange}
            style={inputStyle}
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
