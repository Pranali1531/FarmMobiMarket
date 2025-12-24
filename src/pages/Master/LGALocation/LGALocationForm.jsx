import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { lgaUpdateApi } from "@/api/lgaMaster";
import { lgaPostApi } from "@/api/lgaMaster";



export default function LGALocationForm({ mode, stateData, onBack }) {

    console.log(mode);
    const user = useSelector((state) => state.auth.user);

    
    

    // ================= FORM STATE =================
    const [form, setForm] = useState({
        stateId:"",
        lga:"",
        
    });


    // ================= HANDLERS =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


   
    const handleSubmit = async () => {
        const payload = {
            stateId: form.stateId,
           lga: form.lga,
           
            
            status: "1",
            orgId: user.orgId,
        };
        if (mode === "add") {
            payload.createdBy = user.userId;
        }
        if (mode === "edit") {
            payload.stateId = stateData.stateId;
            payload.modifiedBy = user.userId;
        }

        console.log(payload);

        try {
            const res =
                mode === "edit"
                    ? await lgaUpdateApi(payload)
                    : await lgaPostApi(payload);

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
        if (mode === "edit" && stateData) {
            console.log(stateData);
            setForm({
                stateId: stateData?.stateId,
                lga: stateData?.lga,
                
            })
       }
    }, [mode, stateData])



    // ================= UI =================
    return (
        <Card sx={{ p: 4, mb: 4 }}>
            <MDTypography variant="h5" fontWeight="bold" mb={3}>
               LGA Location Master
            </MDTypography>
 <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        State
                    </MDTypography>
                    <select
                        name="stateId"
                        value={form.stateId}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select State</option>
                            <option value="1">Option 1</option>
                                <option value="2"> Option 2</option>
                                    <option value="3"> Option 3</option>
                       
                    </select>
                </Grid>

           
                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                       LGA Location
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="LGA Location *"
                        name="lga"
                        value={form.lga}
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
