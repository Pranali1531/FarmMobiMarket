import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// MUI
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

// Components
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";

function SidenavCollapse({ name, icon, collapse, open, onToggle }) {
  return (
    <>
      {/* Main menu item */}
      <ListItem
        onClick={onToggle}
        sx={({ palette }) => ({
          mt: 1,
          cursor: "pointer",
          borderRadius: "10px",
          px: 2,
          py: 1.2,
          display: "flex",

          alignItems: "center",
          transition: "all 0.2s ease",
          background: open ? "rgba(255,255,255,0.2)" : "transparent",
          "&:hover": {
            background: "rgba(255,255,255,0.12)",
          },
        })}
      >
        <ListItemIcon
          sx={{
            minWidth: "32px",
            "& svg, & span": {
              color: "white !important", // ← forces icon white
              fill: "white !important", // ← ensures filled icons are white
            },
          }}
        >
          {icon}
        </ListItemIcon>

        <ListItemText
          primary={
            <MDTypography
              variant="button"
              fontWeight={open ? "bold" : "regular"}
              color="white"
              sx={{ fontSize: "0.9rem" }}
            >
              {name}
            </MDTypography>
          }
        />

        {/* Arrow */}
        <Icon
          sx={{
            color: "white",
            fontSize: "20px",
            ml: "auto",
            transition: "0.25s ease",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          expand_more
        </Icon>
      </ListItem>

      {/* Submenus */}
      <Collapse in={open} timeout={200} unmountOnExit>
        <MDBox display="flex" flexDirection="column" ml={5} mt={0.5} mb={1}>
          {collapse?.map((item) => (
            <NavLink key={item.key} to={item.route}>
              {({ isActive }) => (
                <MDBox
                  px={1}
                  py={0.7}
                  mb={0.6}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  borderRadius="8px"
                  sx={{
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    transition: "0.15s ease",
                    color: isActive ? "#fff" : "#fff", // ← Active submenu text color
                    opacity: isActive ? 1 : 0.85,
                    background: isActive
                      ? "rgba(255,255,255,0.15)" // ← Active submenu background
                      : "transparent",
                    "&:hover": {
                      opacity: 1,
                      background: "rgba(255,255,255,0.12)",
                    },
                  }}
                >


                  {item.name}
                </MDBox>
              )}
            </NavLink>
          ))}
        </MDBox>
      </Collapse>
    </>
  );
}

SidenavCollapse.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  collapse: PropTypes.array,
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SidenavCollapse;
