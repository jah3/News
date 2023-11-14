
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
    return (
        <BrowserRouter>
            <header></header>
            <main>
                <AppRoutes/>
            </main>
        </BrowserRouter>
    );
}

export default App;
