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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyIcon from "@mui/icons-material/Key";
import SettingsIcon from "@mui/icons-material/Settings";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CategoryIcon from "@mui/icons-material/Category";
import { useAuth } from "../../../hooks/useAuth";

const drawerWidth = 240;
const collapsedWidth = 70;

export default function Navbar({ children }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [openMaintenance, setOpenMaintenance] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/" },
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
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Tooltip title={"Perfil"} placement="left">
              <MenuItem onClick={() => handleNavigate("/profile")}>
                <AccountBoxIcon />
                Perfil
              </MenuItem>
            </Tooltip>
            {user?.success !== true && (
              <Tooltip title={"Iniciar Sesión"} placement="left">
                <MenuItem onClick={() => handleNavigate("/login")}>
                  <LoginIcon />
                  Iniciar Sesión
                </MenuItem>
              </Tooltip>
            )}

            <Tooltip title={"Cambiar contraseña"} placement="left">
              <MenuItem onClick={() => handleNavigate("/forgotpassword")}>
                <KeyIcon />
                Cambiar contraseña
              </MenuItem>
            </Tooltip>
            {user?.success !== true && (
              <Tooltip title={"Registrarse"} placement="left">
                <MenuItem onClick={() => handleNavigate("/register")}>
                  <HowToRegIcon />
                  Registrarse
                </MenuItem>
              </Tooltip>
            )}
            <Tooltip title={"Mantenimiento"} placement="left">
              <MenuItem onClick={() => setOpenMaintenance(!openMaintenance)}>
                <BuildIcon />
                Mantenimiento
                {openMaintenance ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>
            </Tooltip>

            {openMaintenance && (
              <Box sx={{ pl: 4 }}>
                <Tooltip title={"Categorías"} placement="left">
                  <MenuItem
                    onClick={() => handleNavigate("/maintenance/categories")}
                  >
                    <CategoryIcon />
                    Categories
                  </MenuItem>
                </Tooltip>
              </Box>
            )}
            <Tooltip title={"Configuración"} placement="left">
              <MenuItem onClick={() => handleNavigate("/settings")}>
                <SettingsIcon />
                Configuración
              </MenuItem>
            </Tooltip>
            {user?.success === true && (
              <Tooltip title={"Cerrar Sesión"} placement="left">
                <MenuItem onClick={() => logout()}>
                  <LogoutIcon />
                  Cerrar Sesión
                </MenuItem>
              </Tooltip>
            )}
          </Menu>
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
