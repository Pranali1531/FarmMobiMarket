// import DashboardOverview from "@/pages/Dashboard/Overview";
// import DashboardAnalytics from "@/pages/Dashboard/Analytics";
// import React from "react";
// import AdminUsers from "@/pages/Admin/Users";
// import AdminRoles from "@/pages/Admin/Roles";
// import AdminPermissions from "@/pages/Admin/Permissions";

// // Add new components only here
// const componentMap = {
//   DashboardOverview,
//   DashboardAnalytics,
//   AdminUsers,
//   AdminRoles,
//   AdminPermissions,
// };

// export default function resolveComponent(name) {
//   return componentMap[name] ?? (() => <div>Coming Soon...</div>);
// }
import DashboardOverview from "@/pages/Dashboard/Overview";
import DashboardAnalytics from "@/pages/Dashboard/Analytics";

import AdminUsers from "@/pages/Admin/Users";
import AdminRoles from "@/pages/Admin/Roles";
import AdminPermissions from "@/pages/Admin/Permissions";

import AgroSoilData from "@/pages/ResourceCenter/SoilData";
import AgroFertilizers from "@/pages/ResourceCenter/Fertilizers";
import AgroPestControl from "@/pages/ResourceCenter/PestControl";

import MarketProducts from "@/pages/MarketCentre/Products";
import MarketOrders from "@/pages/MarketCentre/Orders";

import ServiceList from "@/pages/ServiceCentre/ServiceList";
import ServiceRequests from "@/pages/ServiceCentre/Requests";

import MasterProducts from "@/pages/Master/Products";
import MasterLearningsGroup from "@/pages/Master/LearningGroup";
import MasterLearningsSubGroup from "@/pages/Master/LearningSubGroup";
import MasterLearningVideo from "@/pages/Master/LearningVideo";
import Crop from "@/pages/Master/Crop";
import Variety from "@/pages/Master/Variety";
import Unit from "@/pages/Master/Unit";
import Department from "@/pages/Master/Department";
import Designation from "@/pages/Master/Designation";
import DiseasePest from "@/pages/Master/DiseasePest";
import Country from "@/pages/Master/Country";
import State from "@/pages/Master/State";

import LGALocation from "@/pages/Master/LGALocation";
import Village from "@/pages/Master/Village";
import Tax from "@/pages/Master/Tax";

const componentMap = {
  DashboardOverview,
  DashboardAnalytics,

  AdminUsers,
  AdminRoles,
  AdminPermissions,

  AgroSoilData,
  AgroFertilizers,
  AgroPestControl,

  MarketProducts,
  MarketOrders,

  ServiceList,
  ServiceRequests,

  MasterProducts,
  MasterLearningsGroup,
  MasterLearningsSubGroup,
  MasterLearningVideo,
  Crop,
  Variety,
  Unit,
  Department,
  Designation,
  DiseasePest,
  Country,
  State,
  LGALocation,
  Village,
  Tax
};
const ComingSoon = () => <div>Coming Soon...</div>;

export default function resolveComponent(name) {
  if (!name) return null;
  return componentMap[name] || null;
}
