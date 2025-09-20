import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./index.css";

const options = [
    { id: 1, text: "無懼未來的自己" },
    { id: 2, text: "勇於挑戰的自己" },
    { id: 3, text: "珍惜每天的自己" },
];
// option -> 左+header -> 右 -> 右 -> 左 -> 文字 -> title + option-header
export default function Options({ setStep, closeTitle, closeHeader }) {
    const [show, setShow] = useState(true);
    const [picked, setPicked] = useState(null);
    const [openOptions, setOpenOptions] = useState(false);
    const handleAnimationComplete = () => {
        console.log("animation complete");
        if (!openOptions && show) setOpenOptions(true);
        if (picked && !show && !openOptions) setStep(4);
    };
    const OptionListAnimationComplete = () => {
        console.log("option list animation");
        if (!openOptions && !show) closeHeader();
    };
    const TextAnimationComplete = () => {
        console.log("text animation");
        if (!openOptions && !show)
            setTimeout(() => {
                closeTitle();
            }, 5000);
    };
    const handlePickOption = (id, text) => {
        setPicked({ id, text });
    };
    useEffect(() => {
        if (picked?.id) {
            setShow(false);
            setOpenOptions(false);
        }
    }, [picked]);
    return (
        <>
            <div className="option-left-circle">
                <motion.div
                    className="circle"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: show ? 1 : 0 }}
                    transition={{ duration: 1, delay: !show ? 4 : 0 }}
                ></motion.div>
                <motion.div
                    className="circle"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: show ? 1 : 0 }}
                    transition={{ duration: 1, delay: !show ? 4 : 0 }}
                ></motion.div>
                <motion.div
                    className="big-circle"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: show ? 1 : 0 }}
                    transition={{ duration: 1, delay: !show ? 1 : 0 }}
                ></motion.div>
            </div>
            <motion.div
                className=""
                style={{ width: "100%", height: "40px", position: "relative" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1, scale: !show ? [1, 0.5, 0] : 1 }}
                transition={{
                    duration: 1,
                    times: !show ? [0, 0.2, 0.4] : 1,
                    delay: !show ? 6 : 0,
                }}
                onAnimationComplete={handleAnimationComplete}
            >
                <div className="option-body">
                    {picked && (
                        <motion.span
                            key={picked.text}
                            className="option-list-text"
                            initial={{ opacity: 0, scaleY: 1 }}
                            animate={{ opacity: 1, scaleY: show ? 1 : 0 }}
                            transition={{
                                duration: !show ? 1 : 0.3,
                                delay: !show ? 5 : 0,
                            }}
                            onAnimationComplete={TextAnimationComplete}
                        >
                            {picked.text.split("").map((char, index) => (
                                <motion.span
                                    key={`${picked.text}-${index}`}
                                    initial={{
                                        opacity: 0,
                                        x: -20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                        ease: "easeOut",
                                    }}
                                    style={{
                                        display: "inline-block",
                                    }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.span>
                    )}
                    <motion.div
                        className="option-list"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: openOptions ? "350px" : 0,
                            opacity: openOptions ? 1 : 0,
                        }}
                        transition={{
                            duration: 1,
                            delay: !openOptions ? 1 : 0,
                        }}
                        onAnimationComplete={OptionListAnimationComplete}
                    >
                        {options.map((option) => (
                            <React.Fragment key={option.id}>
                                <motion.button
                                    className="option"
                                    onClick={() =>
                                        handlePickOption(option.id, option.text)
                                    }
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: openOptions ? "90px" : "0px",
                                        opacity: openOptions ? 1 : 0,
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: !openOptions ? 1 : 0,
                                    }}
                                    style={{
                                        border:
                                            picked?.id === option.id
                                                ? "1px solid rgb(24, 155, 207)"
                                                : "none",
                                        color:
                                            picked?.id === option.id
                                                ? "rgb(24, 155, 207)"
                                                : "white",
                                        pointerEvents: picked?.id
                                            ? "none"
                                            : "auto",
                                    }}
                                >
                                    <motion.span
                                        initial={{ scaleY: 1 }}
                                        animate={{
                                            scaleY: !openOptions ? 0 : 1,
                                        }}
                                        transition={{
                                            duration: 1,
                                            delay: !openOptions ? 1 : 0,
                                        }}
                                    >
                                        {option.text}
                                    </motion.span>
                                </motion.button>
                                <motion.hr className="option-hr" />
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
            <div className="option-right-circle">
                <motion.div
                    className="big-circle"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: show ? 1 : 0 }}
                    transition={{ duration: 1, delay: !show ? 2 : 0 }}
                ></motion.div>
                <motion.div
                    className="circle"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: show ? 1 : 0 }}
                    transition={{ duration: 1, delay: !show ? 3 : 0 }}
                ></motion.div>
                <motion.div
                    className="circle"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: show ? 1 : 0 }}
                    transition={{ duration: 1, delay: !show ? 3 : 0 }}
                ></motion.div>
            </div>
        </>
    );
}
