import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import API from "../utils/axios";
import { socket } from "../utils/socket";

const ReportSummary = () => {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    const res = await API.get("/orders/summary");
    setSummary(res.data);
  };

  useEffect(() => {
    fetchSummary();
    socket.on("order-updated", fetchSummary);
    socket.on("order-created", fetchSummary);
    return () => {
      socket.off("order-updated", fetchSummary);
      socket.off("order-created", fetchSummary);
    };
  }, []);

  if (!summary) return <Typography>Loading summary...</Typography>;

  return (
    <Box mt={4} mx={2}>
      <Typography variant="h5" mb={2}>
        Order Summary
      </Typography>
      <Typography>Total Orders: {summary.total}</Typography>
      <Typography>
        Placed: {summary.placed} | Dispatched: {summary.dispatched}
      </Typography>
      <Divider sx={{ my: 2 }} />
      {Object.entries(summary.boroughs).map(([borough, stats], idx) => (
        <Typography key={idx}>
          <strong>{borough}</strong>: Placed {stats.placed} | Dispatched{" "}
          {stats.dispatched}
        </Typography>
      ))}
    </Box>
  );
};

export default ReportSummary;
