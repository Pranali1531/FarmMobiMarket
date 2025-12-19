import { useState, useMemo } from "react";
import {
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import DataTable from "@/examples/Tables/DataTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function LearningVideoList({ onAdd, onEdit }) {

  // ================= BACKEND DATA (DUMMY) =================
  const initialVideos = [
    {
      id: 1,
      logo: "https://i.pravatar.cc/150?img=11",
      subGroup: "Composting",
      group: "Organic Farming",
      createdBy: "Admin",
      createdDate: "2025-01-10",
    },
    {
      id: 2,
      logo: "https://i.pravatar.cc/150?img=8",
      subGroup: "Soil Testing",
      group: "Soil Training",
      createdBy: "Sangram",
      createdDate: "2025-01-12",
    },
  ];

  // ================= STATES =================
  const [searchText, setSearchText] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // ================= FILTER =================
  const filteredVideos = useMemo(() => {
    let data = initialVideos;

    if (searchText.trim() !== "") {
      data = data.filter((v) =>
        v.subGroup.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  }, [searchText]);

  // ================= PAGINATION =================
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredVideos.slice(startIndex, endIndex);

  // ================= TABLE COLUMNS =================
  const columns = [
    { Header: "Learning Video", accessor: "video", width: "30%" },
    { Header: "Learning Subgroup", accessor: "subGroup", width: "20%" },
    { Header: "Learning Group", accessor: "group", width: "20%" },
    { Header: "Created Date", accessor: "date", width: "15%" },
    { Header: "Created By", accessor: "createdBy", width: "15%" },
    { Header: "Actions", accessor: "actions", width: "10%" },
  ];

  // ================= TABLE ROWS =================
  const rows = paginatedData.map((item) => ({
    video: (
      <MDBox display="flex" alignItems="center" gap={2}>
        <Avatar src={item.logo} />
        <MDTypography variant="button" fontWeight="medium">
          Learning Video
        </MDTypography>
      </MDBox>
    ),

    subGroup: (
      <MDTypography variant="button" color="text">
        {item.subGroup}
      </MDTypography>
    ),

    group: (
      <MDTypography variant="button" color="text">
        {item.group}
      </MDTypography>
    ),

    date: (
      <MDTypography variant="button" color="text">
        {item.createdDate}
      </MDTypography>
    ),

    createdBy: (
      <MDTypography variant="button" color="text">
        {item.createdBy}
      </MDTypography>
    ),

    actions: (
      <>
        <IconButton
          size="small"
          onClick={(event) => {
            setSelectedItem(item);
            setAnchorEl(event.currentTarget);
          }}
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
              onEdit(selectedItem);
              setAnchorEl(null);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            Delete
          </MenuItem>
        </Menu>
      </>
    ),
  }));

  return (
    <Card sx={{ p: 3, mb: 4 }}>
      {/* TOP SEARCH */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <input
            type="text"
            placeholder="Search learning video..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d5d5d5",
            }}
          />
        </Grid>

        <Grid item xs={12} md={8} textAlign="right">
          <button
            onClick={onAdd}
            style={{
              background: "#4CAF50",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Add Learning Video
          </button>
        </Grid>
      </Grid>

      {/* TABLE */}
      <DataTable
        table={{ columns, rows }}
        showTotalEntries={false}
        entriesPerPage={false}
        isSorted={false}
      />

      {/* FOOTER */}
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        sx={{ borderTop: "1px solid #eee" }}
      >
        <MDTypography variant="button" color="text">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredVideos.length)} of{" "}
          {filteredVideos.length} entries
        </MDTypography>
      </MDBox>
    </Card>
  );
}
