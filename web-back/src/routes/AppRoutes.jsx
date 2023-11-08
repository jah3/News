import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import ArticlePage from "../pages/ArticlePage.jsx";
import AdminPanelPage from "../pages/AdminPanelPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Navigate to={"/news"}/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/news" element={<ArticlePage/>}/>
            <Route path="/admin-panel" element={<AdminPanelPage/>}/>
        </Routes>
    );
}

export default AppRoutes;