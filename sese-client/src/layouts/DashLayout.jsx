import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { 
    LayoutDashboard, 
    FileText, 
    Users, 
    Menu, 
    X, 
    Search as SearchIcon, 
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InputBase from "@mui/material/InputBase";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 280;

const dashboardNavItems = [
    {
        label: "Overview",
        title: "Dashboard Overview",
        to: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Reports",
        title: "Data Visualization",
        to: "/dashboard/reports",
        icon: FileText,
    },
    {
        label: "Users",
        title: "User Management",
        to: "/dashboard/users",
        icon: Users,
    },
];

const SidebarContainer = styled(MuiDrawer)(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
        backgroundColor: "rgba(250, 250, 250, 0.8)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid #000",
        boxShadow: "none",
        ...(!open && {
            width: theme.spacing(9),
            borderRight: "1px solid rgba(0,0,0,0.1)",
        }),
    },
}));

const MainContent = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
        padding: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(6),
    },
    backgroundColor: "#fafafa",
    minHeight: "100vh",
}));

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    border: "1px solid #000",
    backgroundColor: "transparent",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

import useMediaQuery from "@mui/material/useMediaQuery";

const DashLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(!isMobile);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const currentItem = dashboardNavItems.find(item => item.to === location.pathname) || dashboardNavItems[0];

    const toggleDrawer = () => setOpen(!open);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fafafa' }}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: (open || isMobile) ? 'space-between' : 'center', height: 80 }}>
                {(open || isMobile) && (
                    <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'black' }}>
                        CORE.BASE
                    </Typography>
                )}
                {!isMobile && (
                    <IconButton onClick={toggleDrawer} sx={{ color: '#000' }}>
                        {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </IconButton>
                )}
                {isMobile && (
                    <IconButton onClick={handleDrawerToggle} sx={{ color: '#000' }}>
                        <X size={20} />
                    </IconButton>
                )}
            </Box>
            <Divider sx={{ mx: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
            <List sx={{ px: 2, py: 4 }}>
                {dashboardNavItems.map(({ label, to, icon: Icon }) => {
                    const isActive = to === "/dashboard" 
                        ? location.pathname === "/dashboard" || location.pathname === "/dashboard/"
                        : location.pathname.startsWith(to);
                    
                    return (
                        <ListItem key={to} disablePadding sx={{ display: "block", mb: 1 }}>
                            <ListItemButton
                                component={Link}
                                to={to}
                                onClick={() => isMobile && setMobileOpen(false)}
                                sx={{
                                    minHeight: 48,
                                    px: 2.5,
                                    justifyContent: (open || isMobile) ? "initial" : "center",
                                    bgcolor: isActive ? 'black !important' : 'transparent',
                                    color: isActive ? '#fff !important' : '#000',
                                    '&:hover': {
                                        bgcolor: isActive ? 'black' : 'rgba(0,0,0,0.05)',
                                    },
                                    transition: 'all 0.2s ease',
                                    // Ensure all children inherit the color
                                    '& *': {
                                        color: isActive ? '#fff !important' : 'inherit'
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: (open || isMobile) ? 3 : "auto",
                                        justifyContent: "center",
                                        color: 'inherit'
                                    }}
                                >
                                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                </ListItemIcon>
                                <AnimatePresence>
                                    {(open || isMobile) && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            style={{ color: isActive ? '#fff' : 'inherit' }}
                                        >
                                            <ListItemText 
                                                primary={label} 
                                                primaryTypographyProps={{ 
                                                    fontWeight: isActive ? 950 : 600,
                                                    fontSize: '0.9rem',
                                                    letterSpacing: '0.05em',
                                                    sx: { color: isActive ? '#fff !important' : 'inherit' }
                                                }} 
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Box sx={{ mt: 'auto', p: open ? 2 : 1, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<LogOut size={18} />}
                    onClick={() => navigate("/")}
                    sx={{ 
                        justifyContent: (open || isMobile) ? 'flex-start' : 'center',
                        bgcolor: 'black',
                        color: 'white',
                        borderRadius: 0,
                        height: 48,
                        minWidth: 0,
                        '& .MuiButton-startIcon': { 
                            mr: (open || isMobile) ? 1.5 : 0,
                            ml: (open || isMobile) ? 0 : 0
                        },
                        '&:hover': {
                            bgcolor: '#333'
                        }
                    }}
                >
                    {(open || isMobile) && (
                        <Typography variant="button" sx={{ fontSize: '0.75rem', fontWeight: 900 }}>
                            LOGOUT
                        </Typography>
                    )}
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", bgcolor: "#fafafa", minHeight: '100vh' }}>
            {/* Sidebar for Desktop */}
            {!isMobile ? (
                <SidebarContainer variant="permanent" open={open}>
                    {drawerContent}
                </SidebarContainer>
            ) : (
                <MuiDrawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </MuiDrawer>
            )}

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { xs: '100%', md: `calc(100% - ${open ? drawerWidth : 72}px)` } }}>
                <MuiAppBar position="sticky" sx={{ bgcolor: 'rgba(250,250,250,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.1)', zIndex: 1200 }}>
                    <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {isMobile && (
                                <IconButton onClick={handleDrawerToggle} sx={{ color: 'black', mr: 1 }}>
                                    <Menu size={24} />
                                </IconButton>
                            )}
                            <Typography variant="h6" color="black" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: { xs: '0.8rem', md: '1.1rem' } }}>
                                {currentItem.title}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon size={18} color="#71717a" />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search Console..."
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                        </Box>
                    </Toolbar>
                </MuiAppBar>

                <MainContent>
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </MainContent>
            </Box>
        </Box>
    );
};

export default DashLayout;