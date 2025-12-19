import { useState, useEffect, useMemo } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Card, Grid, IconButton, Menu, MenuItem, Avatar } from "@mui/material";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import DataTable from "@/examples/Tables/DataTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getLearningGroupApi } from "@/api/learningMaster";
import { useSelector } from "react-redux";
import { resolveFileUrl } from "@/utils/fileUrl";
import { deleteLearningGroupApi } from "@/api/learningMaster";

export default function LearningGroupList({ onAdd, onEdit }) {
  const user = useSelector((state) => state.auth.user);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLearningGroups();
  }, []);

  const fetchLearningGroups = async () => {
    setLoading(true);
    try {
      const params = {
        orgId: user.orgId,
      };
      const res = await getLearningGroupApi(params);

      const list = res?.data || [];

      setGroups(list);
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
  const [selectedGroup, setSelectedGroup] = useState(null);

  // ================= FILTER =================
  const filteredGroups = useMemo(() => {
    let data = groups || [];

    if (searchText.trim() !== "") {
      data = data.filter((g) =>
        g.learningGroupName?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  }, [groups, searchText]);

  // ================= PAGINATION =================
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedGroups = filteredGroups.slice(startIndex, endIndex);

  // ================= TABLE COLUMNS =================
  const columns = [
    { Header: "Learning Group", accessor: "group", width: "35%" },
    { Header: "Created Date", accessor: "date", width: "20%" },
    { Header: "Created By", accessor: "createdBy", width: "20%" },
    { Header: "Actions", accessor: "actions", width: "10%" },
  ];

  // ================= TABLE ROWS =================
  const rows = paginatedGroups.map((group) => ({
    group: (
      <MDBox display="flex" alignItems="center" gap={2}>
        <Avatar
          src={resolveFileUrl(group.groupThumbnailUrl)}
          alt={group.learningGroupName}
        />
        <MDTypography variant="button" fontWeight="medium">
          {group.learningGroupName}
        </MDTypography>
      </MDBox>
    ),

    date: (
      <MDTypography variant="button" color="text">
        {group.createdDate || "-"}
      </MDTypography>
    ),

    createdBy: (
      <MDTypography variant="button" color="text">
        {group.createdByName || "-"}
      </MDTypography>
    ),

    actions: (
      <>
        <IconButton
          size="small"
          onClick={(event) => {
            setSelectedGroup(group);
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
              onEdit(selectedGroup);
              setAnchorEl(null);
            }}
          >
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              confirmDeleteSnackbar(selectedGroup?.learningGroupId);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </>
    ),
  }));

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      const res = await deleteLearningGroupApi(id);

      enqueueSnackbar(res?.message || "Learning Group deleted successfully", {
        variant: "success",
      });

      fetchLearningGroups();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const confirmDeleteSnackbar = (id) => {
    enqueueSnackbar("Are you sure you want to delete this Learning Group?", {
      variant: "default",
      persist: true,
      action: (snackbarId) => (
        <>
          <button
            onClick={() => {
              handleDelete(id);
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

  // ================= UI =================
  return (
    <Card sx={{ p: 3, mb: 4 }}>
      {/* TOP FILTER BAR */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <input
            type="text"
            placeholder="Search Learning Group..."
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
            + Add Learning Group
          </button>
        </Grid>
      </Grid>

      {/* TABLE */}
      {loading ? (
        <MDTypography textAlign="center">Loading...</MDTypography>
      ) : (
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          entriesPerPage={false}
          isSorted={false}
        />
      )}

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
            {Math.min(endIndex, filteredGroups.length)} of{" "}
            {filteredGroups.length} entries
          </MDTypography>
        </MDBox>

        <MDBox display="flex" gap={1}>
          {[
            ...Array(Math.ceil(filteredGroups.length / entriesPerPage)).keys(),
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
