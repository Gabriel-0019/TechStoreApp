import { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Box,
  CssBaseline,
  Divider,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { ListItemButton } from "@mui/material";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import MemoryIcon from "@mui/icons-material/Memory";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import BuildIcon from "@mui/icons-material/Build";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const drawerWidth = 240;
const collapsedWidth = 70;

export default function Navbar({ children }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [openMaintenance, setOpenMaintenance] = useState(false);

  const handleClickMaintenance = () => {
    setOpenMaintenance(!openMaintenance);
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/" },
    { text: "Iniciar Sesión", icon: <LoginIcon />, path: "/login" },
    { text: "Componentes", icon: <DevicesOtherIcon />, path: "/components" },
    { text: "Periféricos", icon: <MemoryIcon />, path: "/peripherals" },
    { text: "Accesorios", icon: <HeadphonesIcon />, path: "/accesories" },
    { text: "Celulares", icon: <SmartphoneIcon />, path: "/cellphones" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: "width 0.3s",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleToggle}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap>
            TechStore
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => (
            <Tooltip
              key={item.text}
              title={!open ? item.text : ""}
              placement="right"
            >
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
          <ListItemButton onClick={handleClickMaintenance}>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Mantenimiento" />
            {openMaintenance ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMaintenance} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/maintenance/categories")}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categorías" />
              </ListItemButton>
            </List>
          </Collapse>
          <Tooltip key={"logout"} title={"Cerrar Sesión"} placement="right">
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/logout")}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                {open && <ListItemText primary={"Cerrar Sesión"} />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin-left 0.3s",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
