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
                // Set a cookie that expires in 10 minutes
                Cookies.set('userLoggedIn', 'true', { expires: 1/144 });
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

    handleSubmit: async (event, { title, content, selectedFiles, setArticles, setTitle, setContent, setSelectedFiles }) => {
        event.preventDefault();

        const cropImage = async (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (readerEvent) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        // Desired output size
                        canvas.width = 800;
                        canvas.height = 555;

                        // Calculate the scaling factor to fill the canvas size
                        // This assumes you want to fill the height and width completely
                        const scaleX = img.width / canvas.width;
                        const scaleY = img.height / canvas.height;
                        const scale = Math.min(scaleX, scaleY);

                        // Calculate the top-left corner of the source image to start drawing from
                        const x = (img.width - scale * canvas.width) / 2;
                        const y = (img.height - scale * canvas.height) / 2;

                        // Draw the image onto the canvas, cropping as needed
                        ctx.drawImage(img, x, y, scale * canvas.width, scale * canvas.height, 0, 0, canvas.width, canvas.height);

                        // Convert the canvas to a Blob
                        canvas.toBlob(blob => {
                            if (blob) {
                                resolve(blob);
                            } else {
                                reject(new Error('Canvas to Blob conversion failed'));
                            }
                        }, 'image/jpeg');
                    };
                    img.src = readerEvent.target.result;
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(file);
            });
        };


        let formData = new FormData();
        formData.append('articleRequest', new Blob([JSON.stringify({ title, content })], {
            type: "application/json"
        }));

        if (selectedFiles) {
            const croppedImagesPromises = Array.from(selectedFiles).map(file => cropImage(file));
            try {
                const croppedImages = await Promise.all(croppedImagesPromises);
                croppedImages.forEach(croppedImage => {
                    formData.append('images', croppedImage);
                });
            } catch (error) {
                console.error('Error cropping images:', error);
                return;
            }
        }

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
            setSelectedFiles([]);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }
};

export default AppService;
