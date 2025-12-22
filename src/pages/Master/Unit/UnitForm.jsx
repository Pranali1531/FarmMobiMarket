import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

import { useSelector } from "react-redux";
import { unitUpdateApi } from "@/api/unitMaster";
import { unitPostApi } from "@/api/unitMaster";
import { getUnitSubTypeApi } from "@/api/unitMaster";



export default function UnitForm({ mode, unitData, onBack }) {

    console.log(mode);

    const user = useSelector((state) => state.auth.user);

    const [unitTypes, setUnitTypes] = useState([]);

    // ================= FORM STATE =================
    const [form, setForm] = useState({
        unitTypeId: "",
        unitAbbr: "",
        unitName: "",
        conversionRatio: "",
        isBaseUnit: "",


    });




    // ================= HANDLERS =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        fetchUnitTypes();

    }, []);

    const fetchUnitTypes = async () => {

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
            payload.unitId = unitData.unitId;
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
        if (mode === "edit" && unitData && !preview) {


            console.log(unitData);


            setForm({

                unitTypeId: unitData?.unitTypeId,
                unitAbbr: unitData?.unitAbbreviation,
                unitName: unitData?.unitName || "",
                conversionRatio: unitData?.conversionRatio || "",
                isBaseUnit: unitData?.isBaseUnit || "",



            })



        }
    }, [mode, unitData])










    // ================= UI =================
    return (
        <Card sx={{ p: 4, mb: 4 }}>
            <MDTypography variant="h5" fontWeight="bold" mb={3}>
                Unit Master
            </MDTypography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Unit Type
                    </MDTypography>
                    <select
                        name="unitTypeId"
                        value={form.unitTypeId}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select Unit</option>
                        {unitTypes?.map((c) => (
                            <option key={c.unitTypeId} value={c.unitTypeId}>
                                {c.unitTypeName}
                            </option>
                        ))}
                    </select>
                </Grid>



                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Unit Abbreviation
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="Unit Abbreviation *"
                        name="unitAbbr"
                        value={form.unitAbbr}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Unit Name
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="Unit Name*"
                        name="unitName"
                        value={form.unitName}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Conversion Ratio
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="Conversion Ratio *"
                        name="conversionRatio"
                        value={form.conversionRatio}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Base Unit
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="Base Unit *"
                        name="baseUnit"
                        value={form.baseUnit}
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
