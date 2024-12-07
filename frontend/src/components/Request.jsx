import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import DataView from './DataView';
import Base from './Base';

function Request() {
  const [view, setView] = useState('donations');
  const [searchTerm, setSearchTerm] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, when: "beforeChildren" }
    }
  };

  return (
    <Base>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* <div className="mb-8">
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#E7CCCC] bg-white focus:ring-2 focus:ring-[#4C6CE7] focus:border-transparent transition-all duration-300"
          />
        </div> */}

        <Navbar view={view} setView={setView} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DataView view={view} searchTerm={searchTerm} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Base>
  );
}

export default Request;