import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
export default function Button(props) {
    const { onClick, children } = props;
    const [clicked, setClicked] = useState(false);
    const duration = 1;
    const delay = 0.3;
    const handleClick = () => {
        setClicked(true);
    };
    const handleAnimationComplete = () => {
        onClick();
    };
    return (
        <motion.button
            className="arc-button"
            onClick={handleClick}
            initial={{ opacity: 1 }}
            animate={{
                opacity: clicked ? 0 : 1,
            }}
            transition={{ duration }}
            onAnimationComplete={() => {
                if (clicked) {
                    handleAnimationComplete();
                }
            }}
        >
            <motion.div
                className="button-text"
                initial={{ scale: 1 }}
                animate={{
                    scale: clicked ? [1, 0.5, 0] : 1, // 外圓框縮小
                }}
                transition={{
                    duration,
                    delay: 0.2,
                    times: [0, 0.2, 0.4],
                }}
            >
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{
                        scaleY: clicked ? 0 : 1, // 外圓框縮小
                    }}
                    transition={{ duration: 0.1 }}
                >
                    {children}
                </motion.div>
            </motion.div>
            <motion.div
                className="button-border"
                initial={{ scale: 1 }}
                animate={{
                    scale: clicked ? [1, 0.6, 0] : 1,
                }}
                transition={{
                    duration,
                    times: [0, 0.2, 0.7],
                }}
            ></motion.div>
        </motion.button>
    );
}
