import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Drawer, Box, List, ListItem, ListItemText } from "@mui/material";

export default function MobileDrawer({ open, onClose, navItems }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 200 }} role="presentation" onClick={onClose}>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.label}
              component={RouterLink}
              to={item.path}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
