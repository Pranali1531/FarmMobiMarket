import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

import { useSelector } from "react-redux";

import { taxUpdateApi } from "@/api/taxMaster";
import { taxPostApi } from "@/api/taxMaster";



export default function UnitForm({ mode, taxData, onBack }) {

    console.log(mode);

    const user = useSelector((state) => state.auth.user);


    // ================= FORM STATE =================
    const [form, setForm] = useState({
        taxName: "",
        taxPercentage: ""
    });




    // ================= HANDLERS =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    // useEffect(() => {
    //     fetchUnitTypes();

    // }, []);

    // const fetchUnitTypes = async () => {

    //     try {
    //         const params = {
    //             orgId: user.orgId,
    //         };
    //         const res = await getUnitSubTypeApi(params);
    //         const list = res?.data || [];


    //         setUnitTypes(filterdUnits);
    //     } catch (error) {
    //     } finally {

    //     }
    // };




    const handleSubmit = async () => {
        const payload = {


            taxName: form.taxName,
            taxPercentage: form.taxPercentage,

            status: "1",
            orgId: user.orgId,
            serviceId:"4"
        };
        if (mode === "add") {
            payload.createdBy = user.userId;
        }
        if (mode === "edit") {
            payload.taxId = taxData.taxId;
            payload.modifiedBy = user.userId;
        }

        console.log(payload);

        try {
            const res =
                mode === "edit"
                    ? await taxUpdateApi(payload)
                    : await taxPostApi(payload);

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
        if (mode === "edit" && taxData) {

            console.log(taxData);


            setForm({

                taxName: taxData?.taxName,
                taxPercentage: taxData?.taxPercentage,

            })



        }
    }, [mode, taxData])










    // ================= UI =================
    return (
        <Card sx={{ p: 4, mb: 4 }}>
            <MDTypography variant="h5" fontWeight="bold" mb={3}>
               Tax Master
            </MDTypography>

            <Grid container spacing={3}>
               


                
                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Tax Name
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="Tax Name"
                        name="taxName"
                        value={form.taxName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Tax Percentage
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="Enter taxPercentage  *"
                        name="taxPercentage"
                        value={form.taxPercentage}
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

