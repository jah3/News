import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import ArticlePage from "../pages/ArticlePage.jsx";
import AdminPanelPage from "../pages/AdminPanelPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Navigate to={"/news"}/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/news" element={<ArticlePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/admin-panel" element={
                <ProtectedRoute>
                    <AdminPanelPage />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default AppRoutes;