import React, {useEffect, useState} from 'react';
import '../style/AdminPanelStyle.css'; // You may need to adjust the import statement based on your project structure
import {
    List,
    PeopleFill,
    HouseDoorFill,
    GearFill, DoorClosedFill, HouseFill, HourglassSplit
} from 'react-bootstrap-icons';
import AXIOS from "../service/AxiosService.jsx";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


function Sidebar({onTabChange}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail');
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/news');
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await AXIOS.get('/users'); // Replace with your actual endpoint
                // Assuming response.data is an array of user objects
                const userDtos = response.data.map(user => ({
                    username: user.username, // Replace 'username' with the actual property name
                    email: user.email // Replace 'email' with the actual property name
                }));
                setUsers(userDtos);

                if (window.innerWidth < 768) {
                    setIsSidebarOpen(false); // Close the sidebar on mobile devices
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <button className={`sidebar-toggle ${isSidebarOpen ? 'toggle-active' : ''}`} onClick={toggleSidebar}>
                <List/>
            </button>
            <div className={`sidebar-container ${isSidebarOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <div className="brand-logo">
                        <img
                            src="https://play-lh.googleusercontent.com/bg-VhuZhJDnq8_RFolfEH1lDAUc0CYOggn61meBWTSx-dBdlG6EMbJnctc_vKwNd2PI=w240-h480-rw"
                            alt="Brand Logo"/>
                        <a className="username">
                            {email}</a>
                    </div>
                </div>
                <div className="sidebar-body">
                    <div> {/* This div wraps the non-logout links */}
                        <a href="/news" className="nav-link" onClick={() => onTabChange('settings')}>
                            <HouseFill className="nav-icon"/>
                            <span className="nav-title">Home</span>
                        </a>
                        <a href="#" className="nav-link" onClick={() => onTabChange('home')}>
                            <HouseDoorFill className="nav-icon"/>
                            <span className="nav-title">Add new article</span>
                        </a>
                        <a href="#" className="nav-link" onClick={() => onTabChange('users')}>
                            <PeopleFill className="nav-icon"/>
                            <span className="nav-title">Users</span>
                        </a>
                        <a href="#" className="nav-link" onClick={() => onTabChange('settings')}>
                            <HourglassSplit className="nav-icon"/>
                            <span className="nav-title">Pending article</span>
                        </a>

                        {/* Add more nav links or submenus here */}
                    </div>
                    <div> {/* This div is for the logout link */}
                        <a className="nav-link" onClick={handleLogout} href="#">
                            <DoorClosedFill className="nav-icon"/>
                            <span className="nav-title">Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
