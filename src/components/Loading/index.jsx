import React from "react";
import { motion } from "framer-motion";
import "./index.css";

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="loader"></div>
            </div>

            {/* 載入文字 */}
            <motion.div
                className="loading-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                即將為您的獨特揭曉...
            </motion.div>
        </div>
    );
}
