import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
import CardImage from "../CardImage";

const checkedColor = "#24d8e9";

export default function Card(props) {
    const {
        buttonText,
        checked,
        display,
        onClick,
        svgImage,
        setStep,
        endpointX,
        endpointY,
    } = props;
    const [startBorderAnimation, setStartBorderAnimation] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const [pickOut, setPickOut] = useState(false);
    const cardRef = useRef(null);
    const borderColor = checked ? checkedColor : "#FFFFFF";
    const handleCardAnimation = () => {
        if (!startBorderAnimation) setStartBorderAnimation(true);
        if (cardRef) cardRef.current.style.pointerEvents = "auto";
        if (cardRef && !display) cardRef.current.style.pointerEvents = "none";
        if (pickOut) {
            setTimeout(() => {
                setStep();
            }, 4000);
        }
    };

    const moveToCenter = () => {
        const cardRect = cardRef.current.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        const containerRect = document
            .querySelector(".card-container")
            ?.getBoundingClientRect();

        if (!containerRect) {
            console.warn("找不到 .card-container 元素");
            return { x: 0, y: 0 };
        }

        // 計算 card-container 的中心點
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;

        // 計算需要移動的距離（相對於當前卡片位置）+ 已經移動過的距離(endPoint)
        const targetX = containerCenterX - cardCenterX + endpointX;
        const targetY = containerCenterY - cardCenterY + endpointY;

        return { x: targetX, y: targetY };
    };

    useEffect(() => {
        setTimeout(() => {
            setEnableButton(true);
        }, 500);
    }, []);

    useEffect(() => {
        if (display && checked) {
            setTimeout(() => {
                setPickOut(true);
            }, 1000);
        }
    }, [display, checked]);

    return (
        <motion.div
            // 改變定點位置從InitX,InitY帶值
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{
                opacity: !display ? 0 : 1,
                x: !pickOut ? endpointX : moveToCenter().x,
                y: !pickOut ? endpointY : moveToCenter().y,
            }}
            transition={{ duration: display ? 2 : !pickOut ? 1 : 0.5 }}
            className="card"
            onAnimationComplete={handleCardAnimation}
            style={{ borderColor }}
            onClick={() => onClick(buttonText)}
            ref={cardRef}
        >
            {startBorderAnimation && (
                <CardImage
                    svgImage={svgImage}
                    color={borderColor}
                    pickOut={pickOut}
                />
            )}
            <CardButton
                enableButton={enableButton}
                buttonText={buttonText}
                checked={checked}
            />
            <motion.div className="card-border" style={{ borderColor }}>
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 120 170"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: "absolute", top: 0, left: 0 }}
                >
                    <motion.path
                        d="M0,0 H120 V170 H0 Z"
                        fill="none"
                        stroke={borderColor}
                        strokeWidth="3"
                        strokeDasharray="130"
                        strokeDashoffset="520"
                        animate={
                            startBorderAnimation && {
                                strokeDashoffset: 0,
                            }
                        }
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
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
                    backgroundColor: checked ? checkedColor : "transparent",

                    borderColor: checked ? checkedColor : "#FFFFFF",
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
                style={{ borderColor: checked ? checkedColor : "#FFFFFF" }}
            ></motion.div>
        </motion.button>
    );
};
