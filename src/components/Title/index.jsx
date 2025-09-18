import React from "react";
import "./index.css";
import { motion } from "framer-motion";
export default function Title({ show, children }) {
    const duration = 0.1;

    return (
        <motion.div
            className="title"
            initial={{ opacity: 1 }}
            animate={{
                opacity: show ? 1 : 0,
            }}
            transition={{ duration }}
        >
            {children}
        </motion.div>
    );
}
