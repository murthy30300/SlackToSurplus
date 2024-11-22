import React, { useState } from 'react';
import Navbar from './Navbar';
import DataView from './DataView';
import Base from './Base';

function Request() {
  const [view, setView] = useState('donations');

  return (
    <Base>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navbar view={view} setView={setView} />
        <DataView view={view} />
      </div>
    </Base>
  );
}

export default Request;