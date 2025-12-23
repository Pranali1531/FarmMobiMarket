import { useState, useMemo, useEffect } from "react";
import {
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Rating,
} from "@mui/material";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import DataTable from "@/examples/Tables/DataTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation, useNavigate } from "react-router-dom";
import DetailViewModal from "@/components/DetailViewModal";
import { useSelector } from "react-redux";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { getDesignationApi } from "@/api/designationMaster";
import { deleteDesignationApi } from "@/api/designationMaster";




export default function DesignationList({ onAdd, onEdit }) {
  const navigate = useNavigate();
const user = useSelector((state) => state.auth.user);
 
  const [loading, setLoading] = useState(false);
  
  const [designation, setDesignation] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedDesignation, setSelectedDesignation] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState({});

  // -------------------------
  //  FILTER LOGIC
  // -------------------------
  const filteredDesignations= useMemo(() => {
    let data =designation;

    if (searchText.trim() !== "") {
      data = data.filter((u) =>
        u.designationName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

 

    return data;
  }, [searchText, designation]);

  // PAGINATION CALC
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedDesignations = filteredDesignations.slice(startIndex, endIndex);

  // -------------------------
  // TABLE COLUMNS
  // -------------------------
  const columns = [
    { Header: "Designation Name", accessor: "designationName", width: "30%" },
    { Header: "Level", accessor: "level", width: "30%" },
    { Header: "Actions", accessor: "actions", width: "10%" },
  ];

  // -------------------------
  // ACTION MENU
  // -------------------------
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    // Toggle logic
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // -------------------------
  // TABLE ROWS
  // -------------------------
  const rows = paginatedDesignations.map((designation) => ({
    
   designationName: (
      <MDTypography variant="button" color="text">
        {designation.designationName}
      </MDTypography>
    ),

     level: (
      <MDTypography variant="button" color="text">
        {designation.level}
      </MDTypography>
    ),
    
    actions: (
      <>
        <IconButton
          onClick={(event) => {
            setSelectedDesignation(designation);
            console.log(designation);
            
            setAnchorEl(event.currentTarget);
          }}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>

   
          <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              onEdit(selectedDesignation);
              setAnchorEl(null);
            }}
          >
            Edit
          </MenuItem>
          

          <MenuItem onClick={() => {
              setAnchorEl(null);
              confirmDeleteSnackbar(selectedDesignation?.designationId,user.orgId);
            }}>Delete</MenuItem>
        </Menu>
      </>
    ),
  }));



  useEffect(() => {
      fetchUnitList();
    }, []);
  
    const fetchUnitList = async () => {
      setLoading(true);
      try {
        const params = {
          orgId: user.orgId,
        };
        const res = await getDesignationApi(params);
  
        const list = res?.data || [];
  
        setDesignation(list);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };



  const handleDelete = async (id,orgId) => {
      if (!id) return;
  
      try {
        const res = await deleteDesignationApi(id,orgId);
  
        enqueueSnackbar(res?.message || "Designation deleted successfully", {
          variant: "success",
        });
  
        fetchUnitList();
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    };

    const confirmDeleteSnackbar = (id,orgId) => {
        enqueueSnackbar("Are you sure you want to delete this Designation?", {
          variant: "default",
          persist: true,
          action: (snackbarId) => (
            <>
              <button
                onClick={() => {
                  handleDelete(id,orgId);
                  closeSnackbar(snackbarId);
                }}
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  marginRight: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
    
              <button
                onClick={() => closeSnackbar(snackbarId)}
                style={{
                  background: "#9e9e9e",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </>
          ),
        });
      };
  // ----------------------------------
  //  UI COMPONENT
  // ----------------------------------
  return (
    <>
      <Card sx={{ p: 3, mb: 4 }}>
        {/* ---------------- TOP FILTERS ---------------- */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={4}>
            <input
              type="text"
              placeholder=" Search Designation..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d5d5d5",
              }}
            />
          </Grid>
<Grid item xs={12} md={4}></Grid>
          

          <Grid item xs={12} md={4} textAlign="right">
            <button
              style={{
                background: "#4CAF50",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onAdd}
            >
              + Add Designation
            </button>
          </Grid>
        </Grid>

        {/* ---------------- THE TABLE ---------------- */}
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          entriesPerPage={false}
          isSorted={false}
        />

        {/* ---------------- BOTTOM FOOTER ---------------- */}
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2}
          sx={{ borderTop: "1px solid #eee" }}
        >
          {/* LEFT: Entries dropdown + showing text */}
          <MDBox display="flex" alignItems="center" gap={2}>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
              onFocus={(e) => (e.target.style.outline = "none")}
              onBlur={(e) => (e.target.style.outline = "none")}
            >
              {[5, 10, 15, 25, 50].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>

            <MDTypography variant="button" color="text">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredDesignations.length)} of{" "}
              {filteredDesignations.length} entries
            </MDTypography>
          </MDBox>

          {/* RIGHT: Pagination buttons */}
          <MDBox display="flex" alignItems="center" gap={1} mb={2}>
            {[
              ...Array(Math.ceil(filteredDesignations.length / entriesPerPage)).keys(),
            ].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  padding: "6px 12px",
                  background: currentPage === i + 1 ? "#0052cc" : "#fff",
                  color: currentPage === i + 1 ? "#fff" : "#333",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            ))}
          </MDBox>
        </MDBox>
      </Card>
      <DetailViewModal
        open={showDetail}
        onClose={() => setShowDetail(false)}
        data={detailData}
      />
    </>
  );
}
