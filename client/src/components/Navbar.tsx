import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logoutUser } from "../store/slices/authSlice";
import appPermissions from "../constants/appPermissions";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, refreshToken, permissions } = useAppSelector(state => state.auth);

    const handleLogout = () => {
        if (refreshToken) {
            dispatch(logoutUser({refreshToken}));
        }
    };

    const doesUserHaveViePermission = permissions.includes(appPermissions.VIEW_USERS.name);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    Expense Tracker
                </Typography>
                <Box>
                    {!isAuthenticated ? (
                        <>
                            <Button color="inherit" onClick={() => navigate("/register")}>
                                Register
                            </Button>
                            <Button color="inherit" onClick={() => navigate("/login")}>
                                Login
                            </Button>
                        </>
                    ) : (
                        <>
                        { doesUserHaveViePermission && 
                            <Button color="inherit" onClick={() => navigate("/all-users")}>View All Users</Button>
                        }
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button> 
                        </>
                       
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
