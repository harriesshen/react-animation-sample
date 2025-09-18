import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
// import demo1Raw from "../../assets/demo1.svg?raw";

export default function CardImage(props) {
    const { svgImage, color, svgWidth } = props;
    const [svgInfo, setSvgInfo] = useState({
        viewBox: "0 0 864 864",
        paths: [],
    });

    useEffect(() => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgImage, "image/svg+xml");
            const svgEl = doc.querySelector("svg");
            const viewBox = svgEl?.getAttribute("viewBox") || "0 0 864 864";
            const dList = Array.from(doc.querySelectorAll("path"))
                .map((p) => p.getAttribute("d"))
                .filter(Boolean);
            setSvgInfo({ viewBox, paths: dList });
        } catch (e) {
            setSvgInfo((prev) => prev);
        }
    }, []);
    console.log("color", color);
    const strokeColor = useMemo(() => color || "#FFFFFF", [color]);
    const strokeWidth = useMemo(() => svgWidth || 6, [svgWidth]);

    return (
        <motion.svg
            viewBox={svgInfo.viewBox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", height: "100%", display: "block" }}
        >
            {svgInfo.paths.map((d, index) => (
                <motion.path
                    key={index}
                    d={d}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 2,
                        ease: "linear",
                    }}
                />
            ))}
        </motion.svg>
    );
}
