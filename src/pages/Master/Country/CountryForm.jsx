import { Card, Grid, Icon, Checkbox } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { countryPostApi } from "@/api/countryMaster";
import { countryUpdateApi } from "@/api/countryMaster";



export default function CountryForm({ mode, countryData, onBack }) {

    console.log(mode);
    const user = useSelector((state) => state.auth.user);

    
    

    // ================= FORM STATE =================
    const [form, setForm] = useState({
        currencyId:"",
        countryName:"",
    });


    // ================= HANDLERS =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


   
    const handleSubmit = async () => {
        const payload = {
            currencyId: form.currencyId,
           countryName: form.countryName,
            
            status: "1",
            orgId: user.orgId,
        };
        if (mode === "add") {
            payload.createdBy = user.userId;
        }
        if (mode === "edit") {
            payload.currencyId = countryData.currencyId;
            payload.modifiedBy = user.userId;
        }

        console.log(payload);

        try {
            const res =
                mode === "edit"
                    ? await countryUpdateApi(payload)
                    : await countryPostApi(payload);

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
        if (mode === "edit" && countryData) {
            console.log(countryData);
            setForm({
                currencyId: countryData?.currencyId,
                countryName: countryData?.countryName,
            })
       }
    }, [mode, countryData])



    // ================= UI =================
    return (
        <Card sx={{ p: 4, mb: 4 }}>
            <MDTypography variant="h5" fontWeight="bold" mb={3}>
               Country Master
            </MDTypography>
 <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Currency
                    </MDTypography>
                    <select
                        name="currencyId"
                        value={form.currencyId}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select Currency</option>
                            <option value="1">Option 1</option>
                                <option value="2"> Option 2</option>
                                    <option value="3"> Option 3</option>
                       
                    </select>
                </Grid>

           
                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Country Name
                    </MDTypography>
                    <input
                        type="text"
                        placeholder="Country Name *"
                        name="countryName"
                        value={form.countryName}
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
