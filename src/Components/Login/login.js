import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";

const teacherData = [
    {
        id: 101,
        name: "Atakan",
        surname: "Doğan",
        branch: "Software Engineer",
        password: "101",
    },
    {
        id: 102,
        name: "Buse",
        surname: "Yiğit",
        branch: "Computer Engineer",
        password: "102",
    },
];

export function Login({ setLoginData }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        const teacher = teacherData.find(
            (teacher) => teacher.id === parseInt(id, 10)
        );
        if (teacher && teacher.password === password) {
            const { password, ...teacherDataToStore } = teacher;
            localStorage.setItem("teacherData", JSON.stringify(teacherDataToStore));
            setLoginData(true);
            navigate("/");
        } else {
            toast.error("Invalid ID or password", { position: "top-center" });
        }
    };

    useEffect(() => {
        const storedTeacherData = localStorage.getItem("teacherData");
        if (storedTeacherData) {
            setLoginData(true);
        }
    }, [setLoginData]);

    return (
        <div className="flex justify-center items-center h-screen">
            <Toaster position="top-right" reverseOrder={true} />
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        label="ID"
                        size="lg"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <Input
                        label="Password"
                        size="lg"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="-ml-2.5">
                        <Checkbox
                            label="Remember Me"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" fullWidth onClick={handleLogin}>
                        Sign In
                    </Button>
                    <Typography
                        variant="small"
                        className="mt-6 flex justify-center"
                    >
                        Enter Identity Number and Password For Login
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
}
