import React, {useState} from "react";
import Layout from "./Layout";
import {Select, Option, Typography, Input, Button} from "@material-tailwind/react";
import toast from "react-hot-toast";

export const AddGrade = () => {
    const [students, setStudents] = useState([
        {id: 1, name: "John Doe"},
        {id: 2, name: "Jane Doe"},
        {id: 3, name: "John Smith"},
    ]);

    const [subjects, setSubjects] = useState([
        {id: 1, name: "Math"},
        {id: 2, name: "Science"},
        {id: 3, name: "English"},
    ]);

    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [grade, setGrade] = useState("");

    const handleGradeChange = (event) => {
        const inputGrade = event.target.value;
        // Check if the input is numeric and less than or equal to 100
        if (/^\d+$/.test(inputGrade) && Number(inputGrade) <= 100 || inputGrade === "") {
            setGrade(inputGrade);
        }
    };

    const handleStudentChange = (value) => {
        setSelectedStudent(value);
    };

    const handleSubjectChange = (value) => {
        setSelectedSubject(value);
    };

    const handleAddGrade = () => {
        if (selectedStudent === "" || selectedSubject === "" || grade === "") {
            toast.error("Please fill in all the fields");
        } else {
            toast.success("Grade added successfully");
            setSelectedStudent("");
            setSelectedSubject("");
            setGrade("");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center gap-8 h-3/4 w-full">
                <div className="md:w-1/2 w-full flex flex-col gap-8">
                    <div className="flex flex-col items-center justify-center pb-4 text-center">
                        <Typography color="teal" variant="h1">
                            Add Grade
                        </Typography>
                        <Typography color="blue-gray" variant="lead">
                            Select Student and Subject to add grade
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-8 w-full">
                        <Select
                            variant="standard"
                            label="Select Student"
                            placeholder="Select Student"
                            value={selectedStudent}
                            onChange={(value) => handleStudentChange(value)}
                        >
                            {students.map((student) => (
                                <Option key={student.id} value={student.id}>
                                    {student.name}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            variant="standard"
                            label="Select Subject"
                            placeholder="Select Subject"
                            value={selectedSubject}
                            onChange={(value) => handleSubjectChange(value)}
                        >
                            {subjects.map((subject) => (
                                <Option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            variant="standard"
                            label="Enter Grade"
                            placeholder="Enter Grade"
                            type="text"
                            value={grade}
                            onChange={handleGradeChange}
                        />
                        <Button
                            color="teal"
                            buttonType="filled"
                            size="regular"
                            block={false}
                            rounded={false}
                            ripple="light"
                            onClick={handleAddGrade}
                        >
                            Add Grade
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
