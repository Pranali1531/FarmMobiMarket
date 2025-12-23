import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { designationUpdateApi } from "@/api/designationMaster";
import { designationPostApi } from "@/api/designationMaster";



export default function DesignationForm({ mode, designationData, onBack }) {

    console.log(mode);
    const user = useSelector((state) => state.auth.user);

     const [desgLevels, setdesgLevels] = useState([]);
    

    // ================= FORM STATE =================
    const [form, setForm] = useState({
        designationName:"",
        level:"",
    });


    // ================= HANDLERS =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


   
    const handleSubmit = async () => {
        const payload = {
            designationName: form.designationName,
           level: form.level,
            
            status: "1",
            orgId: user.orgId,
        };
        if (mode === "add") {
            payload.createdBy = user.userId;
        }
        if (mode === "edit") {
            payload.designationId = designationData.designationId;
            payload.modifiedBy = user.userId;
        }

        console.log(payload);

        try {
            const res =
                mode === "edit"
                    ? await designationUpdateApi(payload)
                    : await designationPostApi(payload);

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
        if (mode === "edit" && designationData) {
            console.log(designationData);
            setForm({
                designationName: designationData?.designationName,
                level: designationData?.level,
            })
       }
    }, [mode, designationData])



    // ================= UI =================
    return (
        <Card sx={{ p: 4, mb: 4 }}>
            <MDTypography variant="h5" fontWeight="bold" mb={3}>
               Designation Master
            </MDTypography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Designation Name
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="Designation Name *"
                        name="designationName"
                        value={form.designationName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </Grid>
               

                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Level
                    </MDTypography>
                    <select
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select Level</option>
                            <option value="1">Level 1</option>
                                <option value="2"> Level 2</option>
                                    <option value="3"> Level 3</option>
                       
                    </select>
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
