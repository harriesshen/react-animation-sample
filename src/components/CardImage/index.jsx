import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ReactSVG } from "react-svg";
import demo1 from "../../assets/demo1.svg";
export default function CardImage(props) {
    const [pathLengths, setPathLengths] = useState([]);
    const pathRefs = useRef([]);

    const handleSvgLoad = () => {
        console.log("svg load");
        // 這裡的 pathRefs 當前指向已加載的所有 path 元素
        const paths = pathRefs.current;
        const lengths = paths.map((path) => path.getTotalLength());
        setPathLengths(lengths); // 只在 SVG 加載完畢後更新一次
    };
    useEffect(() => {
        console.log("pathLengths", pathLengths);
    }, [pathLengths]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >
            <ReactSVG
                src={demo1} // 你的 SVG 文件路徑
                beforeInjection={(svg) => {
                    const paths = svg.querySelectorAll("path");
                    paths.forEach((path, index) => {
                        path.style.strokeDasharray = path.getTotalLength();
                        path.style.strokeDashoffset = path.getTotalLength();
                    });
                }}
                onLoad={handleSvgLoad}
            >
                {/* 只在 pathLengths 更新時重新渲染動畫 */}
                {pathLengths.map((length, index) => (
                    <motion.path
                        key={index}
                        ref={(el) => (pathRefs.current[index] = el)} // 參照每個 path
                        fill="red"
                        stroke="red"
                        strokeWidth="2"
                        strokeDasharray={length} // 設置 strokeDasharray 為路徑長度
                        strokeDashoffset={length} // 初始偏移，讓路徑隱藏
                        animate={{
                            strokeDashoffset: 0, // 動畫過程中逐漸顯示路徑
                        }}
                        transition={{
                            duration: 3,
                            delay: index * 0.5, // 每個 path 依次顯示
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </ReactSVG>
        </motion.div>
    );
}
