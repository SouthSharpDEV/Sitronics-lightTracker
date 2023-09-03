import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

interface Props {
  window?: () => Window;
  component: React.JSX.Element;
}

const drawerWidth = 240;
const navItems = ["Главная", "История запросов"];

export default function NavBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      style={{ backgroundColor: "#111318" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Light Tracker
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding style={{ textDecoration: "underline" }}>
            <ListItemButton sx={{ textAlign: "center" }} style={{ textDecoration: "underline" }}>
              <ListItemText primary={item} style={{ textDecoration: "underline" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return isVisible ? (
    <Box sx={{ display: "flex" }} style={{ backgroundColor: "#111318" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        style={{
          background: "linear-gradient(to right bottom, #2938B0, #8A52C2)",
          alignItems: "center",
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          {/* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Light Tracker
          </Typography> */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => navigate(item === "Главная" ? "/" : "requestHistory")}
                key={item}
                sx={{
                  color: "#fff",
                  fontSize: "20px",
                  paddingRight: "134px",
                  paddingLeft: "134px",
                }}
                style={{ textDecoration: "underline", textTransform: "none" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          style={{ backgroundColor: "#111318" }}>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" style={{ backgroundColor: "#111318", margin: "auto" }}>
        <Toolbar />
        {props.component}
      </Box>
      <Typography
        style={{
          color: "#8F8F8F",
          fontSize: "14px",
          marginBottom: "15px",
          bottom: 20,
          position: "absolute",
          textAlign: "center",
        }}>
        Сервис разработан командой “SouthSharpe” ДГТУ
      </Typography>
    </Box>
  ) : (
    <></>
  );
}
