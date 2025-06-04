import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import API from "../utils/axios";
import { socket } from "../utils/socket";

const CreateOrder = () => {
  const [form, setForm] = useState({
    customer: "",
    dispensary: "",
    borough: "",
  });
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/orders", {
        ...form,
        status: "PLACED",
      });
      socket.emit("order-created", res.data);
      setForm({ customer: "", dispensary: "", borough: "" });
      setSuccess("Order successfully created!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Failed to create order", err);
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h5" mb={2}>
        Create New Order
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Customer"
            name="customer"
            value={form.customer}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Dispensary"
            name="dispensary"
            value={form.dispensary}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel>Borough</InputLabel>
            <Select
              name="borough"
              value={form.borough}
              onChange={handleChange}
              label="Borough"
            >
              {[
                "MANHATTAN",
                "BROOKLYN",
                "QUEENS",
                "BRONX",
                "STATEN_ISLAND",
              ].map((b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Submit Order
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateOrder;
