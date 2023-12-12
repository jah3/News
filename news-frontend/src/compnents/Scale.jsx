import { useEffect } from 'react';

const Scale = () => {
    useEffect(() => {
        const adjustZoom = () => {
            if (window.devicePixelRatio === 1.25) {
                document.documentElement.style.zoom = '0.8';
            }
        };

        const adjustMainContentTop = () => {
            const mainContent = document.querySelector('.main-content');
            if (!mainContent) return;

            if (window.devicePixelRatio === 1.25) {
                mainContent.style.top = '110%';
            } else if (window.innerWidth <= 1300) {
                mainContent.style.top = '130%';
            } else {
                mainContent.style.top = '85%';
            }
        };

        adjustZoom();
        adjustMainContentTop();

        document.addEventListener('DOMContentLoaded', adjustMainContentTop);

        // Cleanup listener when the component is unmounted
        return () => {
            document.removeEventListener('DOMContentLoaded', adjustMainContentTop);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default Scale;
