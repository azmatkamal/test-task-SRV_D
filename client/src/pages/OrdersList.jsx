import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
} from "@mui/material";
import API from "../utils/axios";
import { socket } from "../utils/socket";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [borough, setBorough] = useState("");

  const fetchOrders = async () => {
    const res = await API.get(
      `/orders` + (borough ? `?borough=${borough}` : "")
    );
    setOrders(res.data);
  };

  const handleDispatch = async (id) => {
    await API.patch(`/orders/${id}/status`, {
      status: "DISPATCHED",
    });
    socket.emit("order-updated");
  };

  useEffect(() => {
    fetchOrders();
  }, [borough]);

  useEffect(() => {
    socket.on("order-updated", fetchOrders);
    socket.on("order-created", fetchOrders);
    return () => {
      socket.off("order-updated", fetchOrders);
      socket.off("order-created", fetchOrders);
    };
  }, []);

  return (
    <Box mt={4} mx={2}>
      <Typography variant="h5" mb={2}>
        Orders List
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Borough</InputLabel>
          <Select
            value={borough}
            label="Select Borough"
            onChange={(e) => setBorough(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {["MANHATTAN", "BROOKLYN", "QUEENS", "BRONX", "STATEN_ISLAND"].map(
              (b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={() => setBorough("")}>
          Reset
        </Button>
      </Stack>
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 600 }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Dispensary</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Borough</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.dispensary}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.borough}</TableCell>
                <TableCell>
                  {order.status === "PLACED" && (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleDispatch(order.id)}
                    >
                      Dispatch
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default OrdersList;
