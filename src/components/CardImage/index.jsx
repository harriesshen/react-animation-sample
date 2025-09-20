import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function CardImage(props) {
    const { svgImage, color, svgWidth, pickOut } = props;
    const [show, setShow] = useState(true);
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
    useEffect(() => {
        if (pickOut) setShow(false);
    }, [pickOut]);
    const strokeColor = useMemo(() => color || "#FFFFFF", [color]);
    const strokeWidth = useMemo(() => svgWidth || 6, [svgWidth]);

    return (
        <motion.svg
            viewBox={svgInfo.viewBox}
            initial={{ opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 3, delay: !show ? 3 : 0 }}
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
                    animate={{
                        pathLength: !pickOut ? 1 : 0,
                    }}
                    transition={{
                        delay: !pickOut ? 0.5 : 0,
                        duration: !pickOut ? 2 : 5,
                        ease: "linear",
                    }}
                />
            ))}
        </motion.svg>
    );
}
