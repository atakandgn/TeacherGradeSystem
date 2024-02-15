import React from "react";
import Layout from "./Layout";
import gradeBg from "../Assets/gradeBg.svg";
import { Typography } from "@material-tailwind/react";

export const Home = () => {
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center gap-8 h-full w-full">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center object-contain"
                    style={{ backgroundImage: `url(${gradeBg})`, filter: "brightness(70%)" }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center pb-4 text-center">
                    <div className="relative z-20">
                        <Typography color="teal" variant="h1">
                            Welcome to Grade Management System
                        </Typography>
                        <Typography color="blue-gray" variant="lead">
                            Select an option from the sidebar to get started
                        </Typography>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
