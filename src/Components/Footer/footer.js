import React from "react";
import {Link} from "react-router-dom";
import {CiInstagram, CiLinkedin} from "react-icons/ci";
import {FaGithubSquare} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";
export const Footer = () => {
    return (
            <footer className="bg-gray-50 border-t w-full">
                <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                    <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                        <div className="px-5 py-2">
                            <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
                                Home
                            </Link>
                        </div>
                        <div className="px-5 py-2">
                            <Link to="/add-grades" className="text-base text-gray-500 hover:text-gray-900">
                                Add Grades
                            </Link>
                        </div>

                        <div className="px-5 py-2">
                            <Link to="/list-grades" className="text-base text-gray-500 hover:text-gray-900">
                                List Grades
                            </Link>
                        </div>

                    </nav>
                    <div className="mt-8 flex justify-center space-x-6">

                        <Link to="/"  className="text-gray-400 hover:text-gray-500">
                            <CiInstagram className="h-6 w-6" />
                        </Link>

                        <Link to="/" className="text-gray-400 hover:text-gray-500">
                            <FaSquareXTwitter className="h-6 w-6" />
                        </Link>

                        <Link to="https://github.com/atakandgn" className="text-gray-400 hover:text-gray-500">
                            <FaGithubSquare className="h-6 w-6" />
                        </Link>

                        <Link to="/" className="text-gray-400 hover:text-gray-500">
                            <CiLinkedin className="h-6 w-6" />
                        </Link>
                    </div>
                    <p className="mt-8 text-center text-base text-gray-400">
                        &copy; 2024 Atakan Doğan. All rights reserved.
                    </p>
                </div>
        </footer>
    );
}