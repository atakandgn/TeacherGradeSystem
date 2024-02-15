import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from "./Screens/Home";
import { useState, useEffect } from "react";
import { Login } from "./Components/Login/login";
import { AddGrade } from "./Screens/AddGrade";
import {ListGrade} from "./Screens/ListGrade";

function App() {
    const [loginData, setLoginData] = useState(() => {
        const storedTeacherData = localStorage.getItem("teacherData");
        return !!storedTeacherData;
    });

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "teacherData") {
                // Check if teacherData exists in localStorage
                const storedTeacherData = localStorage.getItem("teacherData");
                setLoginData(!!storedTeacherData);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    return (
        <Router>
            <Routes>
                {loginData ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/add-grades" element={<AddGrade />} />
                        <Route path="/list-grades" element={<ListGrade />} />
                    </>
                ) : (
                    <Route path="/login" element={<Login setLoginData={setLoginData} />} />
                )}
                {!loginData && <Route path="/*" element={<Navigate to="/login" />} />}
            </Routes>
        </Router>
    );
}

export default App;
