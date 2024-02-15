import React, {useState} from "react";
import {Button, Dialog, DialogHeader, DialogBody, DialogFooter} from "@material-tailwind/react";

export function Modal({btnText, title, body, customClass, onConfirm, onDelete}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpen} variant="text" className={customClass ? customClass : ""}>
                {btnText}
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>
                    {title}
                </DialogHeader>
                <DialogBody>
                    {body}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            onDelete();
                            handleOpen();
                        }}
                        className="mr-1"
                    >
                        <span>Delete</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirm}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>

            </Dialog>
        </>
    );
}
