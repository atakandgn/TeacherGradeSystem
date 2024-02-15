import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {Card, Typography, Button, Input} from "@material-tailwind/react";
import {ChevronDownIcon, ChevronUpIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {Modal} from "../Components/Modal/modal";

export const ListGrade = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [list, setList] = useState([
        {
            id: 1,
            name: "John Doe",
            subjects: [
                {id: 1, name: "Math", grade: 90},
                {id: 2, name: "Science", grade: 80},
                {id: 3, name: "English", grade: 70},
            ],
        },
        {
            id: 2,
            name: "Jane Doe",
            subjects: [
                {id: 1, name: "Math", grade: 85},
                {id: 2, name: "Science", grade: 75},
                {id: 3, name: "English", grade: 65},
            ],
        },
        {
            id: 3,
            name: "John Smith",
            subjects: [
                {id: 1, name: "Math", grade: 95},
                {id: 2, name: "Science", grade: 85},
                {id: 3, name: "English", grade: 75},
            ],
        },
    ]);
    const subjects = ["Name", "Math", "Science", "English"];


    const handleSortToggle = (column) => {
        setSortOrder((prevOrder) => (sortColumn === column ? (prevOrder === "asc" ? "desc" : "asc") : "asc"));
        setSortColumn(column);
    };


    const [editedStudentId, setEditedStudentId] = useState(null);

    const handleEdit = (studentId) => {
        // Handle the edit action here
        console.log(`Editing student with ID: ${studentId}`);
        setEditedStudentId(studentId);
    };
    const handleDelete = (studentId) => {
        setList((prevList) => prevList.filter((student) => student.id !== studentId));
    };

    const handleSubjectGradeChange = (studentId, subjectId, newGrade) => {
        // Check if the input is numeric and less than or equal to 100
        if (/^\d+$/.test(newGrade) && Number(newGrade) <= 100 || newGrade === "") {
            setList((prevList) => {
                const updatedList = prevList.map((student) => {
                    if (student.id === studentId) {
                        const updatedSubjects = student.subjects.map((subject) => {
                            if (subject.id === subjectId) {
                                return {...subject, grade: newGrade};
                            }
                            return subject;
                        });
                        return {...student, subjects: updatedSubjects};
                    }
                    return student;
                });
                return updatedList;
            });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const renderStudentTable = () => {
        const sortedList = [...list].sort((a, b) => {
            if (sortColumn === "Name") {
                const aValue = a.name;
                const bValue = b.name;
                return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                const aValue = a.subjects.find((subject) => subject.name === sortColumn)?.grade || 0;
                const bValue = b.subjects.find((subject) => subject.name === sortColumn)?.grade || 0;
                return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
            }
        });

        return (
            <table className="w-full border-collapse border-t border-r border-l border-gray-300 rounded-md">
                <thead>
                <tr className="bg-[#e0e0e0db]">
                    {subjects.map((subject, index) => (
                        <th key={index} className="border-b border-gray-300 p-2 text-start">
                            {subject}
                        </th>
                    ))}
                    <th className="border-b border-r border-gray-300 p-2 relative">
                        <span>Edit</span>
                        <button
                            className="ml-1 text-teal-500 absolute top-1/2 transform -translate-y-1/2"
                            onClick={() => handleSortToggle("Name")}
                        >
                        {sortColumn === "Name" && sortOrder === "asc" ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </button>
                    </th>
                </tr>
                </thead>

                <tbody>
                {sortedList.map((student, index) => (
                    <tr key={student.id}
                        className="hover:bg-[#e9eae8db] border-b border-gray-300 transition duration-300">
                        <td className="p-2">{student.name}</td>
                        {student.subjects.map((subject, sIndex) => (
                            <td key={subject.id}
                                className={`p-2 ${sIndex === subjects.length - 1 ? "border-r border-gray-300" : ""}`}>
                                {subject.grade}
                            </td>
                        ))}
                        <td className="p-2">
                            <Modal
                                customClass=" w-full flex items-center justify-center"
                                btnText={<PencilSquareIcon className="h-5 w-5 text-black"/>}
                                title={`Edit ${student.name}'s Grades`}
                                body={
                                    <div className="grid sm:grid-cols-2 grid-cols-1 justify-center items-center gap-4">
                                        {student.subjects.map((subject) => (
                                            <Input
                                                key={subject.id}
                                                variant="outlined"
                                                label={subject.name}
                                                placeholder="Enter grade"
                                                type="text"
                                                value={subject.grade}
                                                onChange={(e) => handleSubjectGradeChange(student.id, subject.id, e.target.value)}
                                            />
                                        ))}
                                    </div>
                                }
                                onConfirm={() => handleEdit(student.id)}
                                onDelete={() => handleDelete(student.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderStudentCards = () => {
        return list.map((student, index) => (
            <Card key={student.id}
                  className={`mb-4 ${index !== list.length - 1 ? "mb-4 border-b border-gray-300" : ""}`}>
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <Typography color="teal" variant="h5" className="mb-2">
                            {student.name}
                        </Typography>
                        <Modal
                            btnText={
                                <Typography color="blue-gray" variant="h6"
                                            className="hover:text-gray-900 transition duration-300 flex flex-row items-center gap-2">
                                    <PencilSquareIcon className="h-5 w-5 text-black"/>
                                    Edit
                                </Typography>}
                            title={`Edit ${student.name}'s Grades`}
                            body={
                                <div className="grid sm:grid-cols-2 grid-cols-1 justify-center items-center gap-4">
                                    {student.subjects.map((subject) => (
                                        <Input
                                            key={subject.id}
                                            variant="outlined"
                                            label={subject.name}
                                            placeholder="Enter grade"
                                            type="text"
                                            value={subject.grade}
                                            onChange={(e) => handleSubjectGradeChange(student.id, subject.id, e.target.value)}
                                        />
                                    ))}
                                </div>
                            }
                            onConfirm={() => handleEdit(student.id)}
                            onDelete={() => handleDelete(student.id)}
                        />
                    </div>

                    {student.subjects.map((subject, sIndex) => (
                        <div key={subject.id}
                             className={`flex items-center gap-4 mb-2 ${sIndex === student.subjects.length - 1 ? "" : "mb-2"}`}>
                            <Typography color="blue-gray" variant="lead">
                                {subject.name}:
                            </Typography>
                            <Typography color="blue-gray" variant="lead">
                                {subject.grade}
                            </Typography>
                        </div>
                    ))}
                </div>
            </Card>
        ));
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center gap-8 h-3/4 w-full">
                <div className="xl:w-1/2 lg:w-2/3 h-full">
                    <div className="flex flex-col items-center justify-center pb-4 text-center">
                        <Typography color="teal" variant="h1" className="sm:text-5xl text-3xl">
                            List of Grade
                        </Typography>
                        <Typography color="blue-gray" variant="lead" className="sm:text-2xl text-xl">
                            List of students and their grades. Click the pencil icon to edit.
                        </Typography>
                        <Link to="/add-grade">
                            <Typography color="gray" variant="small"
                                        className="hover:text-gray-900 transition duration-300">
                                Click here to new grade.
                            </Typography>
                        </Link>
                    </div>
                    {windowWidth <= 640 ? renderStudentCards() : renderStudentTable()}
                </div>
            </div>
        </Layout>
    );
};