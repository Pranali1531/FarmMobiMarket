import { Card, Grid, Icon, Checkbox, FormGroup, Paper, FormControlLabel, TableContainer, TableHead, Table, TableCell, TableRow, TableBody, TextField, IconButton, TableFooter } from "@mui/material";
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { diseasePestUpdateApi } from "@/api/diseasePestMaster";
import { diseasePestPostApi } from "@/api/diseasePestMaster";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";




export default function DiseasePestForm({ mode, diseasePestData, onBack }) {

    console.log(mode);
    const user = useSelector((state) => state.auth.user);




    // ================= FORM STATE =================
    const [form, setForm] = useState({
        diseasePestType: "",
        diseasePestName: "",
    });


    // ================= HANDLERS =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleSubmit = async () => {
        const payload = {
            diseasePestType: form.diseasePestType,
            diseasePestName: form.diseasePestName,

            status: "1",
            orgId: user.orgId,
        };
        if (mode === "add") {
            payload.createdBy = user.userId;
        }
        if (mode === "edit") {
            payload.diseasePestId = diseasePestData.diseasePestId;
            payload.modifiedBy = user.userId;
        }

        console.log(payload);

        try {
            const res =
                mode === "edit"
                    ? await diseasePestUpdateApi(payload)
                    : await diseasePestPostApi(payload);

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
        if (mode === "edit" && diseasePestData) {
            console.log(diseasePestData);
            setForm({
                diseasePestType: diseasePestData?.diseasePestType,
                diseasePestName: diseasePestData?.diseasePestName,
            })
        }
    }, [mode, diseasePestData])

    const [symptoms, setSymptoms] = useState([
        { symptom: "" },
    ]);
    const handleSymptomChange = (index, value) => {
        const updated = [...symptoms];
        updated[index].symptom = value;
        setSymptoms(updated);
    };

    const addNewRow = () => {
        setSymptoms([...symptoms, { symptom: "" }]);
    };
    const removeRow = (index) => {
        setSymptoms((prev) => prev.filter((_, i) => i !== index));
    };




    // ================= UI =================
    return (
        <Card sx={{ p: 4, mb: 4 }}>
            <MDTypography variant="h5" fontWeight="bold" mb={3}>
                Disease/Pest Details
            </MDTypography>

            <Grid container spacing={3}>
                {/* <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Disease/Pest Name 
                    </MDTypography>
                    <input
                        type="text"
                        placeholder=" Name (Disease/Pest)*"
                        name="diseasePestName"
                        value={form.diseasePestName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </Grid> */}


                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Disease/Pest Type
                    </MDTypography>
                    <select
                        name="diseasePestType"
                        value={form.diseasePestType}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">  Disease/Pest Type </option>
                        <option value="1">Option 1</option>
                        <option value="2"> Option 2</option>
                        <option value="3"> Option 3</option>

                    </select>
                </Grid>

                <Grid item xs={12} md={6}>
                    <MDTypography variant="caption" fontWeight="medium" >
                        Disease/Pest Name
                    </MDTypography>
                    <select
                        name="diseasePestName"
                        value={form.diseasePestName}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value=""> Disease/Pest Name</option>
                        <option value="1">Option 1</option>
                        <option value="2"> Option 2</option>
                        <option value="3"> Option 3</option>

                    </select>
                </Grid>

                <Grid item xs={12}>
                    <MDTypography variant="h6" fontWeight="medium" mb={2}>
                        Plant Part Detail
                    </MDTypography>

                    <FormGroup>
                        <Grid container spacing={2}>
                            {[
                                "Root",
                                "Stem",
                                "Trunk",
                                "Branch",
                                "Leaf",
                                "Shoot",
                                "Flower",
                                "Fruit",
                                "Seed",
                                "Whole Plant",
                            ].map((part) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={part}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            border: "1px solid #e0e0e0",
                                            borderRadius: "10px",
                                            p: 0.4,
                                            display: "flex",
                                            alignItems: "center",
                                            transition: "0.2s",
                                            "&:hover": {
                                                borderColor: "#1976d2",
                                                backgroundColor: "#f5faff",
                                            },
                                        }}
                                    >
                                        <FormControlLabel
                                            sx={{ m: 0 }}
                                            control={<Checkbox color="primary" />}
                                            label={part}
                                        />
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </FormGroup>
                </Grid>

                <Grid xs={12} sm={6} md={6} lg={6} mx={5} mt={3} >
                    <MDTypography variant="h6" fontWeight="medium" mb={2}>
                        Symptoms Details
                    </MDTypography>

                    <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
                        <Table>



                            <TableBody>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell width="10%">
                                        <strong>Sr No</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Symptom</strong>
                                    </TableCell>
                                    <TableCell width="10%" align="center">
                                        <strong>Add</strong>
                                    </TableCell>
                                </TableRow>
                                {symptoms.map((row, index) => (
                                    <TableRow key={`${index}-${symptoms.length}`}>
                                        <TableCell>{index + 1}</TableCell>

                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder="Enter symptom"
                                                value={row.symptom}
                                                onChange={(e) =>
                                                    handleSymptomChange(index, e.target.value)
                                                }
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            {symptoms.length > 1 && (
                                                <IconButton
                                                    onClick={() => removeRow(index)}
                                                    sx={{ color: "#d32f2f" }}
                                                >
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <IconButton color="primary" onClick={addNewRow}>
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>



                        </Table>
                    </TableContainer>
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
