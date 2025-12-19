import React, { useRef } from "react";
import { Card, Grid, IconButton, Button } from "@mui/material";
import MDTypography from "@/components/MDTypography";
import MDBox from "@/components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DetailViewModal = ({ open, onClose, data = {} }) => {
  if (!open) return null;

  const modalRef = useRef(null);

  const { avatar, image, attachments, ...fields } = data;

  const convertKey = (key) =>
    key
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());

  // ---------------- PDF Export (excluding buttons) ----------------
  const exportPDF = async () => {
    const original = modalRef.current;

    // Clone modal without buttons
    const clone = original.cloneNode(true);
    clone.querySelectorAll(".no-print").forEach((btn) => btn.remove());

    const temp = document.createElement("div");
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    temp.appendChild(clone);
    document.body.appendChild(temp);

    const canvas = await html2canvas(clone, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    document.body.removeChild(temp);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save(`${data?.name || "details"}.pdf`);
  };

  // ---------------- PRINT VIEW ----------------
  const printDetails = () => {
    const content = modalRef.current.cloneNode(true);
    content.querySelectorAll(".no-print").forEach((el) => el.remove());

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Details</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            img { border-radius: 8px; }
            .field-label { font-weight: bold; margin-top: 10px; }
            .field-value { background:#f4f6f9; padding:10px; border-radius:8px; margin-bottom: 10px; }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(3px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        zIndex: 3000,
      }}
      onClick={onClose}
    >
      <Card
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: "650px",
          maxHeight: "85vh",
          overflowY: "auto",
          borderRadius: "16px",
          p: 3,
          position: "relative",
        }}
      >
        {/* Close Button */}
        <IconButton
          className="no-print"
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Avatar */}
        {(avatar || image) && (
          <MDBox textAlign="center" mb={3}>
            <img
              src={avatar || image}
              alt="profile"
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #e0e0e0",
              }}
            />
          </MDBox>
        )}

        {/* Auto Grid */}
        <Grid container spacing={2}>
          {Object.entries(fields).map(([key, value]) => (
            <Grid item xs={12} md={6} key={key}>
              <MDTypography variant="caption" fontWeight="bold" mb={0.5}>
                {convertKey(key)}
              </MDTypography>
              <MDTypography
                variant="button"
                sx={{
                  background: "#f4f6f9",
                  padding: "10px",
                  borderRadius: "8px",
                  display: "block",
                }}
              >
                {String(value)}
              </MDTypography>
            </Grid>
          ))}
        </Grid>

        {/* Attachments */}
        {attachments?.length > 0 && (
          <MDBox mt={3}>
            <MDTypography variant="caption" fontWeight="bold">
              Attachments
            </MDTypography>

            {attachments.map((file, i) => (
              <MDBox
                key={i}
                sx={{
                  background: "#f4f6f9",
                  padding: "10px",
                  borderRadius: "8px",
                  mb: 1,
                }}
              >
                <a href={file.url} target="_blank" rel="noreferrer">
                  {file.name || `Attachment ${i + 1}`}
                </a>
              </MDBox>
            ))}
          </MDBox>
        )}

        {/* -------- BUTTONS AT BOTTOM (hidden in print/pdf) -------- */}
        <MDBox
          className="no-print"
          display="flex"
          justifyContent="flex-end"
          gap={2}
          mt={3}
          pt={2}
          sx={{ borderTop: "1px solid #eee" }}
        >
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={printDetails}
            sx={{
              borderColor: "#4caf50",
              color: "#4caf50",
              "&:hover": { borderColor: "#43a047", color: "#43a047" },
            }}
          >
            Print
          </Button>

          <Button
            variant="contained"
            startIcon={<PictureAsPdfIcon />}
            onClick={exportPDF}
            sx={{
              backgroundColor: "#b71c1c",
              color: "#fff",
              "&:hover": { backgroundColor: "#b71c1c" },
            }}
          >
            Export PDF
          </Button>
        </MDBox>
      </Card>
    </div>
  );
};

export default DetailViewModal;
