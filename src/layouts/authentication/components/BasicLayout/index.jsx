
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "@/components/MDBox";

// Material Dashboard 2 React example components
import DefaultNavbar from "@/examples/Navbars/DefaultNavbar";
import PageLayout from "@/examples/LayoutContainers/PageLayout";

// Authentication pages components
import Footer from "@/layouts/authentication/components/Footer";

function BasicLayout({ image, children }) {
  return (
    <PageLayout>
      
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
     <MDBox
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100vh"
  width="100%"
  sx={{
    px: 2,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* REMOVE THE OLD CONTAINER LIMIT and keep only children */}
  <MDBox width="100%" maxWidth="400px">   {/* <- Increase page width */}
    {children}
  </MDBox>
</MDBox>

    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
