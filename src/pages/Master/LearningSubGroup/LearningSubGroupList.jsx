import { useState, useEffect, useMemo } from "react";
import { Card, Grid, IconButton, Menu, MenuItem, Avatar } from "@mui/material";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import DataTable from "@/examples/Tables/DataTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getLearningSubGroupApi } from "@/api/learningMaster";
import { useSelector } from "react-redux";
import { resolveFileUrl } from "@/utils/fileUrl";

export default function LearningSubGroupList({ onAdd, onEdit }) {
  const user = useSelector((state) => state.auth.user);
  const [subGroups, setSubGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLearningSubGroups();
  }, []);

  const fetchLearningSubGroups = async () => {
    setLoading(true);
    try {
      const params = {
        orgId: user.orgId,
      };
      const res = await getLearningSubGroupApi(params);

      const list = res?.data || [];
      console.log(list);

      setSubGroups(list);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // ================= STATES =================
  const [searchText, setSearchText] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // ================= FILTER =================
  const filteredSubGroups = useMemo(() => {
    let data = subGroups;

    if (searchText.trim() !== "") {
      data = data.filter(
        (s) =>
          s.learningSubGroupName
            ?.toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          s.learningGroupName?.toLowerCase().includes(searchText?.toLowerCase())
      );
    }

    return data;
  }, [subGroups, searchText]);

  // ================= PAGINATION =================
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredSubGroups.slice(startIndex, endIndex);

  // ================= TABLE COLUMNS =================
  const columns = [
    { Header: "Learning Subgroup", accessor: "subgroup", width: "30%" },
    { Header: "Learning Group", accessor: "group", width: "20%" },
    { Header: "Created Date", accessor: "date", width: "15%" },
    { Header: "Created By", accessor: "createdBy", width: "15%" },
    { Header: "Actions", accessor: "actions", width: "10%" },
  ];

  // ================= TABLE ROWS =================
  const rows = paginatedData.map((item) => ({
    subgroup: (
      <MDBox display="flex" alignItems="center" gap={2}>
        <Avatar
          src={resolveFileUrl(item.subGroupThumbnailUrl)}
          alt={item.learningSubGroupName}
        />
        <MDTypography variant="button" fontWeight="medium">
          {item.learningSubGroupName}
        </MDTypography>
      </MDBox>
    ),

    group: (
      <MDTypography variant="button" color="text">
        {item.learningGroupName}
      </MDTypography>
    ),

    date: (
      <MDTypography variant="button" color="text">
        {item.createdDate}
      </MDTypography>
    ),

    createdBy: (
      <MDTypography variant="button" color="text">
        {item.createdByName}
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

          <MenuItem onClick={() => setAnchorEl(null)}>Delete</MenuItem>
        </Menu>
      </>
    ),
  }));

  // ================= UI =================
  return (
    <Card sx={{ p: 3, mb: 4 }}>
      {/* TOP SEARCH BAR */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <input
            type="text"
            placeholder="Search Learning Subgroup..."
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
            + Add Learning Subgroup
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

      {/* PAGINATION FOOTER */}
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        sx={{ borderTop: "1px solid #eee" }}
      >
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
          >
            {[5, 10, 25, 50].map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>

          <MDTypography variant="button" color="text">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredSubGroups.length)} of{" "}
            {filteredSubGroups.length} entries
          </MDTypography>
        </MDBox>

        <MDBox display="flex" gap={1}>
          {[
            ...Array(
              Math.ceil(filteredSubGroups.length / entriesPerPage)
            ).keys(),
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
  );
}
