import React, {useState, useEffect} from "react";
import {motion, useAnimation} from "framer-motion";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix, Button,
} from "@material-tailwind/react";
import {
    Bars3Icon,
} from "@heroicons/react/24/solid";
import {
    AcademicCapIcon,
    ArrowLeftStartOnRectangleIcon,
    FolderPlusIcon,
    HomeIcon
} from "@heroicons/react/24/outline";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [teacherInfo, setTeacherInfo] = useState({
        name: "",
        surname: "",
        branch: "",
    });
    const controls = useAnimation();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleResize = () => {
        const mediumScreen = window.innerWidth <= 768;
        setIsSidebarOpen(!mediumScreen);
    };

    const handleLogout = () => {
        localStorage.removeItem("teacherData");
        window.location.href = "/login";
    };

    useEffect(() => {
        // Retrieve teacher data from localStorage
        const storedTeacherData = localStorage.getItem("teacherData");
        if (storedTeacherData) {
            const teacherData = JSON.parse(storedTeacherData);
            // Update the state with teacher data
            setTeacherInfo({
                name: teacherData.name,
                surname: teacherData.surname,
                branch: teacherData.branch,
            });
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        controls.start({
            width: isSidebarOpen ? 240 : 0,
            transition: {duration: 0.3},
        });
    }, [isSidebarOpen, controls]);

    useEffect(() => {
        handleResize();
    }, []);

    return (
        <div className="relative">
            {isSidebarOpen && (
                <motion.div
                    className="bg-white z-50 overflow-hidden border-r h-full"
                    style={{width: controls.width}}
                    initial={{x: "-100%"}}
                    animate={{x: isSidebarOpen ? "0%" : "-100%"}}
                    transition={{duration: 0.3}}
                >
                    <Card className="h-full p-4 shadow-xl shadow-blue-gray-900/5">
                        <div className="mb-2 p-4 flex justify-between items-center border-b">
                            <div className="flex flex-col gap-1">
                                <Typography variant="h5" color="blue-gray">
                                    {teacherInfo.name} {teacherInfo.surname}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    {teacherInfo.branch}
                                </Typography>
                            </div>
                            <Bars3Icon
                                className="h-6 w-6 cursor-pointer"
                                onClick={toggleSidebar}
                            />
                        </div>
                        <div className="flex flex-col justify-between h-full gap-4">
                            <List>
                                <Link to="/">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <HomeIcon className="h-5 w-5"/>
                                        </ListItemPrefix>
                                        Home
                                    </ListItem>
                                </Link>
                                <Link to="/add-grades">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <FolderPlusIcon className="h-5 w-5"/>
                                        </ListItemPrefix>
                                        Add Grades
                                    </ListItem>
                                </Link>
                                <Link to="/list-grades">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <AcademicCapIcon className="h-5 w-5"/>
                                        </ListItemPrefix>
                                        List Grades
                                    </ListItem>
                                </Link>
                            </List>
                            <List>
                                <ListItem onClick={handleLogout}>
                                    <ListItemPrefix>
                                        <ArrowLeftStartOnRectangleIcon className="h-5 w-5"/>
                                    </ListItemPrefix>
                                    Log Out
                                </ListItem>
                            </List>
                        </div>
                    </Card>
                </motion.div>
            )}
            {!isSidebarOpen && (
                <div className="flex flex-col h-full py-3 gap-4 px-1">
                    <Button onClick={toggleSidebar} variant="filled" color="blue-gray" className="!px-3 !py-3">
                    <Bars3Icon
                        className="h-6 w-6 cursor-pointer z-50 "
                    />
                    </Button>
                    <div className="flex flex-col justify-between h-full gap-4">
                        <div className="flex flex-col gap-2  ">
                            <Link to="/">
                                <Button variant="outlined" className="!px-3 !py-3">
                                    <HomeIcon className="h-5 w-5"/>
                                </Button>
                            </Link>
                            <Link to="/add-grade">
                                <Button variant="outlined" className="!px-3 !py-3">
                                    <FolderPlusIcon className="h-5 w-5"/>
                                </Button>
                            </Link>
                            <Link to="/list-grade">
                                <Button variant="outlined" className="!px-3 !py-3">
                                    <AcademicCapIcon className="h-5 w-5"/>
                                </Button>
                            </Link>
                        </div>

                            <Button variant="outlined" onClick={handleLogout} className="!px-3 !py-3">
                                <ArrowLeftStartOnRectangleIcon className="h-5 w-5"/>
                            </Button>
                    </div>
                </div>
            )}
            {isSidebarOpen && (
                <div className="bg-black bg-opacity-50" onClick={toggleSidebar}></div>
            )}
        </div>
    );
}
