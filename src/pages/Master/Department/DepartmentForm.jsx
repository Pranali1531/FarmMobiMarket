import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { departmentUpdateApi } from "@/api/departmentMaster";
import { departmentPostApi } from "@/api/departmentMaster";




export default function DepartmentForm({ mode, deptData, onBack }) {

    console.log(mode);
    const user = useSelector((state) => state.auth.user);


    // ================= FORM STATE =================
    const [form, setForm] = useState({
        departmentName:"",
    });


    // ================= HANDLERS =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


   
    const handleSubmit = async () => {
        const payload = {
            departmentName: form.departmentName,
            
            status: "1",
            orgId: user.orgId,
        };
        if (mode === "add") {
            payload.createdBy = user.userId;
        }
        if (mode === "edit") {
            payload.departmentId = deptData.departmentId;
            payload.modifiedBy = user.userId;
        }

        console.log(payload);

        try {
            const res =
                mode === "edit"
                    ? await departmentUpdateApi(payload)
                    : await departmentPostApi(payload);

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
        if (mode === "edit" && deptData) {
            console.log(deptData);
            setForm({
                departmentName: deptData?.departmentName,
            })
       }
    }, [mode, deptData])



    // ================= UI =================
    return (
        <Card sx={{ p: 4, mb: 4 }}>
            <MDTypography variant="h5" fontWeight="bold" mb={3}>
               Department Master
            </MDTypography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Department Name
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="Department Name *"
                        name="departmentName"
                        value={form.departmentName}
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
