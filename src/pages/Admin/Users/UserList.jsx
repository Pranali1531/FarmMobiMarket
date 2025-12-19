import { useState, useMemo } from "react";
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

export default function UserList({ onAdd, onEdit }) {
  const navigate = useNavigate();

  const initialUsers = [
    {
      userId: 1,
      avatar: "https://i.pravatar.cc/150?img=11",
      name: "Dhairyashil T",
      email: "dhairyashil.t@mail.com",
      role: "Admin",
      status: "active",
    },
    {
      userId: 2,
      avatar: "https://i.pravatar.cc/150?img=8",
      name: "Swapnil P",
      email: "swapnil.p@mail.com",
      role: "Manager",
      status: "inactive",
    },
    {
      userId: 3,
      avatar: "https://i.pravatar.cc/150?img=10",
      name: "Madhuri P",
      email: "madhuri.p@mail.com",
      role: "Executive",
      status: "pending",
    },
    {
      userId: 12,
      avatar: "https://i.pravatar.cc/150?img=17",
      name: "Akshay A",
      email: "akshaya@mail.com",
      role: "Executive",
      status: "active",
    },
    {
      userId: 4,
      avatar: "https://i.pravatar.cc/150?img=18",
      name: "Dhiraj K",
      email: "dhiraj.k@mail.com",
      role: "Executive",
      status: "inactive",
    },
    {
      userId: 5,
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Omkar M",
      email: "omkar.m@mail.com",
      role: "Executive",
      status: "active",
    },
    {
      userId: 6,
      avatar: "https://i.pravatar.cc/150?img=14",
      name: "Vinit K",
      email: "vinit.k@mail.com",
      role: "Executive",
      status: "pending",
    },
    {
      userId: 7,
      avatar: "https://i.pravatar.cc/150?img=20",
      name: "Sneha K",
      email: "sneha.k@mail.com",
      role: "Executive",
      status: "isActive",
    },
    {
      userId: 8,
      avatar: "https://i.pravatar.cc/150?img=21",
      name: "Ujjawala K",
      email: "ujjawala.k@mail.com",
      role: "Executive",
      status: "active",
    },
    {
      userId: 9,
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Sangram J",
      email: "sangram.j@mail.com",
      role: "Executive",
      status: "inactive",
    },
    {
      userId: 10,
      avatar: "https://i.pravatar.cc/150?img=18",
      name: "Abhijeet M",
      email: "abhijeet.m@mail.com",
      role: "Admin",
      status: "active",
    },
    {
      userId: 11,
      avatar: "https://i.pravatar.cc/150?img=54",
      name: "Vikram M",
      email: "vikram.m@mail.com",
      role: "Super Admin",
      status: "pending",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedUser, setSelectedUser] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState({});

  // -------------------------
  //  FILTER LOGIC
  // -------------------------
  const filteredUsers = useMemo(() => {
    let data = initialUsers;

    if (searchText.trim() !== "") {
      data = data.filter((u) =>
        u.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((u) => u.status === statusFilter);
    }

    return data;
  }, [searchText, statusFilter]);

  // PAGINATION CALC
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // -------------------------
  // TABLE COLUMNS
  // -------------------------
  const columns = [
    { Header: "User", accessor: "user", width: "30%" },
    { Header: "Email", accessor: "email", width: "30%" },
    { Header: "Rating", accessor: "rating", width: "10%" },
    { Header: "Status", accessor: "status", width: "10%" },
    { Header: "Actions", accessor: "actions", width: "10%" },
  ];

  // -------------------------
  // ACTION MENU
  // -------------------------
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("All");

  const items = ["All", "Published", "Scheduled", "Inactive"];

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
  const rows = paginatedUsers.map((user) => ({
    user: (
      <MDBox display="flex" alignItems="center" gap={2}>
        <Avatar src={user.avatar} alt={user.name} />
        <MDTypography variant="button" fontWeight="medium">
          {user.name}
        </MDTypography>
      </MDBox>
    ),
    email: (
      <MDTypography variant="button" color="text">
        {user.email}
      </MDTypography>
    ),
    rating: <Rating value={user.rating} readOnly size="small" />,
    status: (
      <MDBox
        px={1.5}
        py={0.5}
        borderRadius="8px"
        sx={{
          backgroundColor:
            user.status === "active"
              ? "#d4f6e7"
              : user.status === "inactive"
              ? "#fde2e2"
              : "#fff5d6",
          color:
            user.status === "active"
              ? "#0f8a54"
              : user.status === "inactive"
              ? "#c0392b"
              : "#d68910",
          fontSize: "12px",
          fontWeight: 500,
          textTransform: "capitalize",
          display: "inline-block",
        }}
      >
        {user.status}
      </MDBox>
    ),
    actions: (
      <>
        <IconButton
          onClick={(event) => {
            setSelectedUser(user);
            setAnchorEl(event.currentTarget);
          }}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              onEdit(selectedUser);
              handleClose();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDetailData(user);
              setShowDetail(true);
              handleClose();
            }}
          >
            View
          </MenuItem>

          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </>
    ),
  }));

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
              placeholder="🔍 Search user..."
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

          <Grid item xs={12} md={3}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
              }}
              onFocus={(e) => (e.target.style.outline = "none")}
              onBlur={(e) => (e.target.style.outline = "none")}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </Grid>

          <Grid item xs={12} md={5} textAlign="right">
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
              + Add User
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
              {Math.min(endIndex, filteredUsers.length)} of{" "}
              {filteredUsers.length} entries
            </MDTypography>
          </MDBox>

          {/* RIGHT: Pagination buttons */}
          <MDBox display="flex" alignItems="center" gap={1} mb={2}>
            {[
              ...Array(Math.ceil(filteredUsers.length / entriesPerPage)).keys(),
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
