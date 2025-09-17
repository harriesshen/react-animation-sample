import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
import CardImage from "../CardImage";

export default function Card(props) {
    const {
        initX = 100,
        initY = 100,
        buttonText,
        checked,
        display,
        onClick,
        svgImage,
    } = props;
    const [startBorderAnimation, setStartBorderAnimation] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const [pickOut, setPickOut] = useState(false);
    const cardRef = useRef(null);
    const borderColor = checked ? "#1885ebff" : "#FFFFFF";
    const handleCardAnimation = () => {
        if (!startBorderAnimation) setStartBorderAnimation(true);
        if (cardRef) cardRef.current.style.pointerEvents = "auto";
        if (cardRef && !display) cardRef.current.style.pointerEvents = "none";
    };

    const moveToCenter = () => {
        const rect = cardRef.current.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const targetX = screenCenterX - cardCenterX;
        const targetY = screenCenterY - cardCenterY;

        // 更新目標位置
        return { x: targetX, y: targetY };
    };

    useEffect(() => {
        setTimeout(() => {
            setEnableButton(true);
        }, 4000);
    }, []);

    useEffect(() => {
        if (display && checked) {
            setTimeout(() => {
                setPickOut(true);
            }, 5000);
        }
    }, [display, checked]);

    return (
        <motion.div
            initial={{ opacity: 0, x: initX, y: initY }}
            animate={{
                opacity: !display ? 0 : 1,
                x: !pickOut ? 0 : moveToCenter().x,
                y: !pickOut ? 0 : moveToCenter().y,
            }}
            transition={{ duration: 5 }}
            className="card"
            onAnimationComplete={handleCardAnimation}
            style={{ borderColor }}
            onClick={() => onClick(buttonText)}
            ref={cardRef}
            // onAnimationStart={() => {
            // }}
        >
            <CardImage svgImage={svgImage} />
            <CardButton
                enableButton={enableButton}
                buttonText={buttonText}
                checked={checked}
                // onClick={() => onClick(buttonText)}
            />
            <motion.div className="card-border" style={{ borderColor }}>
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 110 160"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: "absolute", top: 0, left: 0 }}
                >
                    <motion.path
                        d="M0,0 H110 V160 H0 Z" // 定義方格的路徑
                        fill="none"
                        stroke={borderColor} // 設置顏色
                        strokeWidth="3"
                        strokeDasharray="130" // 路徑的長度 130,580
                        strokeDashoffset="520" // 初始偏移量，開始時不可見
                        animate={
                            startBorderAnimation && {
                                strokeDashoffset: 0, // 讓線條逐步顯示
                            }
                        }
                        transition={{
                            duration: 4, // 動畫持續時間
                            repeat: Infinity, // 無限循環
                            repeatType: "loop",
                            ease: "linear", // 線性過渡
                        }}
                    />
                </motion.svg>
            </motion.div>
        </motion.div>
    );
}

const CardButton = ({ enableButton, buttonText, onClick, checked }) => {
    const duration = 1;
    return (
        <motion.button className="card-button" initial={{ opacity: 1 }}>
            <div
                className="button-text"
                style={{
                    color: checked ? "#000000" : "#FFFFFF",
                }}
            >
                {buttonText}
            </div>

            <motion.div
                className="inner-border"
                initial={{ scaleY: 0 }}
                animate={{
                    scaleY: enableButton ? 1 : 0,
                }}
                transition={{
                    duration,
                }}
                style={{
                    backgroundColor: checked ? "#1885ebff" : "transparent",

                    borderColor: checked ? "#1885ebff" : "#FFFFFF",
                }}
            ></motion.div>

            <motion.div
                className="outer-border"
                initial={{ scaleY: 0 }}
                animate={{
                    scaleY: enableButton ? 1 : 0,
                }}
                transition={{
                    duration,
                }}
                style={{ borderColor: checked ? "#1885ebff" : "#FFFFFF" }}
            ></motion.div>
        </motion.button>
    );
};
