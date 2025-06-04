import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import API from "../utils/axios";
import { socket } from "../utils/socket";

const ReportBatches = () => {
  const [batches, setBatches] = useState({});
  const [alerts, setAlerts] = useState([]);

  const fetchBatches = async () => {
    const res = await API.get("/routes/optimized");
    setBatches(res.data.optimized);
    setAlerts(res.data.alerts || []);
  };

  useEffect(() => {
    fetchBatches();
    socket.on("batch-updated", (data) => {
      setBatches(data.optimized);
      setAlerts(data.alerts || []);
    });
    return () => {
      socket.off("batch-updated");
    };
  }, []);

  return (
    <Box mt={4} mx={2}>
      <Typography variant="h5" mb={2}>
        Optimized Batches
      </Typography>

      {alerts.length > 0 && (
        <Box mb={2}>
          {alerts.map((msg, i) => (
            <Alert key={i} severity="warning" sx={{ mb: 1 }}>
              ⚠️ {msg}
            </Alert>
          ))}
        </Box>
      )}

      <Button variant="outlined" sx={{ mb: 2 }} onClick={fetchBatches}>
        Refresh Batches
      </Button>

      {Object.entries(batches).map(([borough, batchList], index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">
              {borough} — {batchList.length} batch(es)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {batchList.map((batch, idx) => (
              <Box key={idx} mb={2}>
                <Typography fontWeight="bold">Batch #{idx + 1}</Typography>
                <ul>
                  {batch.map((order) => (
                    <li key={order.id}>
                      {order.customer} — {order.dispensary}
                    </li>
                  ))}
                </ul>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ReportBatches;
