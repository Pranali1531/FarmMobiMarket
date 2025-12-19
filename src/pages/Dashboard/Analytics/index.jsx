/**
=========================================================
* Material Dashboard 2 React - Analytics Dashboard
=========================================================
*/

import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "@/components/MDBox";

// Dashboard components
import ReportsBarChart from "@/examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "@/examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "@/examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data sources (make sure these paths exist)
import reportsBarChartData from "@/layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "@/layouts/dashboard/data/reportsLineChartData";

// Dashboard widgets
import Projects from "@/layouts/dashboard/components/Projects";
import OrdersOverview from "@/layouts/dashboard/components/OrdersOverview";

export default function DashboardAnalytics() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        {/* Top Stats */}
        <Grid item xs={12} md={6} lg={3} mb={2}>
          <ComplexStatisticsCard
            color="dark"
            icon="weekend"
            title="Bookings"
            count={281}
            percentage={{
              color: "success",
              amount: "+55%",
              label: "than last week",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3} mb={3}>
          <ComplexStatisticsCard
            icon="leaderboard"
            title="Today's Users"
            count="2,300"
            percentage={{
              color: "success",
              amount: "+3%",
              label: "than last month",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <ComplexStatisticsCard
            color="success"
            icon="store"
            title="Revenue"
            count="₹34,000"
            percentage={{
              color: "success",
              amount: "+1%",
              label: "than yesterday",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <ComplexStatisticsCard
            color="primary"
            icon="person_add"
            title="Followers"
            count="+91"
            percentage={{
              color: "success",
              amount: "",
              label: "Just updated",
            }}
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} lg={7}>
          <ReportsBarChart
            title="Website Views"
            description="Last Campaign Performance"
            chart={reportsBarChartData}
          />
        </Grid>

        <Grid item xs={12} lg={5}>
          <ReportsLineChart
            title="Daily Sales"
            description={
              <>
                (<strong>+15%</strong>) increase in today's sales.
              </>
            }
            chart={sales}
          />
        </Grid>

        <Grid item xs={12} lg={5}  mt={2}>
          <ReportsLineChart
            color="success"
            title="Completed Tasks"
            description="Last Campaign Performance"
            chart={tasks}
           
          />
        </Grid>

        {/* Projects */}
        <Grid item xs={12} lg={7}>
          <Projects />
        </Grid>

        {/* Orders */}
        <Grid item xs={12} lg={5}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </MDBox>
  );
}
