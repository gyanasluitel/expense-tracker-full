import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import appPermissions from "./constants/appPermissions";

const Router = () => {
    return (
        <Routes>
            <Route index element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<></>} />
            <Route 
                path="/all-users" 
                element={
                    <ProtectedRoute requiredPermissions={[appPermissions.VIEW_USERS.name]}>
                        <h1>Hola, this is all users</h1>
                    </ProtectedRoute>
                } 
            />

            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    )
}

export default Router;