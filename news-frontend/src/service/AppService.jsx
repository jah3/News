import AXIOS from "../service/AxiosService.jsx";

const AppService = {
    registerButton: (setUserAlreadyExists, navigate) => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;

        AXIOS.post('/auth/register', { username, password, email })
            .then(response => {
                navigate('/login');
            })
            .catch(error => {
                if (error.response && (error.response.status === 409 || error.response.status === 403)) {
                    setUserAlreadyExists(true);
                } else {
                    console.error('An error occurred during registration:', error);
                }
            });
    },

    handleButtonClick: (setUserNotFound) => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        AXIOS.post('/auth/authentication', { username, password })
            .then(response => {
                const email = response.data.email;
                console.log('Email:', email);

                localStorage.setItem('userEmail', email);
                window.location.href = '/admin-panel';
            })
            .catch(error => {
                if (error.response && error.response.status === 409 || error.response.status === 403) {
                    setUserNotFound(true);
                } else {
                    console.error('An error occurred during registration:', error);
                }
            });
    },

    deleteArticle: async (title, setArticles) => {
        try {
            const encodedTitle = encodeURIComponent(title);
            const response = await AXIOS.delete(`/delete/article/${encodedTitle}`);

            if (response.status === 200) {
                setArticles(currentArticles => currentArticles.filter(article => article.title !== title));
            }
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    },

    handleSubmit: async (event, {
        title,
        content,
        tag,
        selectedFiles,
        setArticles,
        setTitle,
        setContent,
        setSelectedFiles
    }) => {
        event.preventDefault();

        const cropImage = async (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (readerEvent) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        canvas.width = 800;
                        canvas.height = 555;

                        const scaleX = img.width / canvas.width;
                        const scaleY = img.height / canvas.height;
                        const scale = Math.min(scaleX, scaleY);

                        const x = (img.width - scale * canvas.width) / 2;
                        const y = (img.height - scale * canvas.height) / 2;

                        ctx.drawImage(img, x, y, scale * canvas.width, scale * canvas.height, 0, 0, canvas.width, canvas.height);

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
        formData.append('articleRequest', new Blob([JSON.stringify({ title, content, tag })], {
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
            const response = await AXIOS.post('/redis/create-article', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const newArticle = response.data;
            setArticles(prevArticles => [newArticle, ...prevArticles]);

            // Reset the form states
            setTitle('');
            setContent('');
            setSelectedFiles([]);
            setTag('');
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

};

export default AppService;
