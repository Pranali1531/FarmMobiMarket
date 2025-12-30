import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

import { useSelector } from "react-redux";


export default function VillageForm({ mode, villageData, onBack }) {

    console.log(mode);

    const user = useSelector((state) => state.auth.user);

    const [unitTypes, setUnitTypes] = useState([]);

    // ================= FORM STATE =================
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
            const res = await getUnitSubTypeApi(params);
            const list = res?.data || [];


            setUnitTypes(filterdUnits);
        } catch (error) {
        } finally {

        }
    };




    const handleSubmit = async () => {
        const payload = {
            unitTypeId: form.unitTypeId,
            unitAbbreviation: form.unitAbbr,
            unitName: form.unitName,
            conversionRatio: form.conversionRatio,
            isBaseUnit: form.isBaseUnit,

            status: "1",
            orgId: user.orgId,
        };
        if (mode === "add") {
            payload.createdBy = user.userId;
        }
        if (mode === "edit") {
            payload.unitId = villageData.unitId;
            payload.modifiedBy = user.userId;
        }

        console.log(payload);

        try {
            const res =
                mode === "edit"
                    ? await unitUpdateApi(payload)
                    : await unitPostApi(payload);

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
        if (mode === "edit" && villageData && !preview) {


            console.log(villageData);


            setForm({

                unitTypeId: villageData?.unitTypeId,
                unitAbbr: villageData?.unitAbbreviation,
                unitName: villageData?.unitName || "",
                conversionRatio: villageData?.conversionRatio || "",
                isBaseUnit: villageData?.isBaseUnit || "",



            })



        }
    }, [mode, villageData])










    // ================= UI =================
    return (
        <Card sx={{ p: 4, mb: 4 }}>
            <MDTypography variant="h5" fontWeight="bold" mb={3}>
                Village Master
            </MDTypography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        LGA Id
                    </MDTypography>
                    <select
                        name="lgaId"
                        value={form.lgaId}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select Unit</option>
                        
                    </select>
                </Grid>



                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
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
                    <MDTypography variant="caption" fontWeight="medium" >
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
                    <MDTypography variant="caption" fontWeight="medium" >
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
