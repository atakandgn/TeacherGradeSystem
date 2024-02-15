import React from "react";
import {Footer} from "../Components/Footer/footer";
import {Sidebar} from "../Components/Sidebar/sidebar";
import {Toaster} from "react-hot-toast";
import {Card, Input, Typography} from "@material-tailwind/react";
import {Modal} from "../Components/Modal/modal";
import {PencilSquareIcon} from "@heroicons/react/24/outline";

const Layout = ({children}) => {
    return (
        <div className="relative flex flex-col h-[30vh]">
            <div className="flex flex-1">
                <Sidebar/>
                <div className="h-screen w-full bg-gray-200 p-4">{children}</div>
            </div>

            <Footer/>
            <Toaster position="top-right" reverseOrder={true} />
        </div>
    );
};

export default Layout;
