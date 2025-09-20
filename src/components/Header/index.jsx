import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import Logo from "../../assets/Logo.svg";
import "./index.css";
import { motion } from "framer-motion";
export default function Header({ show }) {
    const duration = 0.1;
    return (
        <motion.div
            className="header"
            initial={{ opacity: 1 }}
            animate={{
                opacity: show ? 1 : 0,
            }}
            transition={{ duration }}
        >
            <ReactSVG
                src={Logo}
                beforeInjection={(svg) => {
                    svg.setAttribute("width", "200px");
                    svg.setAttribute("height", "100px");
                }}
            />
        </motion.div>
    );
}
