import React from "react";
import { motion } from "framer-motion";
import "./index.css";

export default function Card(props) {
    const { initX = 100, initY = 100 } = props;
    return (
        <motion.div
            initial={{ opacity: 0, x: initX, y: initY }} // 初始位置為左上
            animate={{ opacity: 1, x: 0, y: 0 }} // 目標位置為中心
            transition={{ duration: 5 }}
            className="card"
        >
            Card
        </motion.div>
    );
}
