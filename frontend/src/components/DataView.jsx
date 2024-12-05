import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Donations from './Donations';
import MyDonations from './MyDonations';
import Requests from './Requests';
import MyRequests from './MyRequests';

function DataView({ view }) {
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const renderView = () => {
    switch (view) {
      case 'donations':
        return <Donations key="donations" />;
      case 'myDonations':
        return <MyDonations key="myDonations" />;
      case 'requests':
        return <Requests key="requests" />;
      case 'myRequests':
        return <MyRequests key="myRequests" />;
      default:
        return (
          <div className="text-center p-8">
            <p className="text-[#4A4A4A]">Invalid view selected</p>
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3 }}
      >
        {renderView()}
      </motion.div>
    </AnimatePresence>
  );
}

export default DataView;