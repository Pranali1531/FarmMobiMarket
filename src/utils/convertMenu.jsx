import Icon from "@mui/material/Icon";
import React from "react";
export function convertMenuToSidenav(menu = []) {
  return menu.map((item) => ({
    type: "collapse",
    name: item.name,
    key: item.name.toLowerCase().replace(/\s+/g, "-"),
    icon: <Icon fontSize="small">{item.icon}</Icon>,
    collapse: item.children.map((child) => ({
      name: child.name,
      key: child.key,
      route: child.route,
    })),
  }));
}
