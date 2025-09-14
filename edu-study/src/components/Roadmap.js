// src/components/Roadmap.js
import React from "react";
import { motion } from "framer-motion";

const Roadmap = () => {
  return (
    <motion.div
      className="roadmap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="roadmap-header">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Learning Roadmap
        </motion.h2>
        <p>Based on your profile</p>
      </div>

      {/* All charts/graphs removed; keep styling and motion */}
      <motion.div
        className="roadmap-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p>This is where your roadmap content will be displayed.</p>
      </motion.div>
    </motion.div>
  );
};

export default Roadmap;