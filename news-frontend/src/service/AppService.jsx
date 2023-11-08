// AppService.js
import Cookies from 'js-cookie';
import AXIOS from "../service/AxiosService.jsx";
const AppService = {

    handleButtonClick: (setUserNotFound) => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        AXIOS.post('/user', { username, password })
            .then(response => {
                console.log('User created:', response.data);
                // Set a cookie that expires in 1 minutes
                Cookies.set('userLoggedIn', 'true', { expires: 1/1440 });
                window.location.href = '/admin-panel';
            })
            .catch(error => {
                console.error('There was an error!', error);
                setUserNotFound(true); // Set the user not found error state
            });
    },

    deleteArticle: async (title, setArticles) => {
        try {
            const encodedTitle = encodeURIComponent(title);
            const response = await AXIOS.delete(`/api/delete/article/${encodedTitle}`);

            if (response.status === 200) {
                // Use a functional update to ensure you have the most recent state
                setArticles(currentArticles => currentArticles.filter(article => article.title !== title));
            }
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    },

    handleSubmit: async (event, { title, content, selectedFile, setArticles, setTitle, setContent, setSelectedFile }) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('articleRequest', new Blob([JSON.stringify({ title, content })], {
            type: "application/json"
        }));
        formData.append('image', selectedFile);

        try {
            const response = await AXIOS.post('/create-article', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const newArticle = response.data;
            setArticles(prevArticles => [newArticle, ...prevArticles]);

            setTitle('');
            setContent('');
            setSelectedFile(null);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }
};

export default AppService;
