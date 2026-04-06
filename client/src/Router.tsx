import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Router = () => {
    return (
        <Routes>
            <Route index element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<></>} />

            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    )
}

export default Router;