import AXIOS from "../service/AxiosService.jsx";
import {Button} from "antd";

const HomePage = () => {

    return (
        <div>
            <h1>HOME</h1>
            <Button onClick={() => AXIOS.get('/articles').then(response => console.log(response.data))}>View Articles</Button>
        </div>
    );
};

export default HomePage;