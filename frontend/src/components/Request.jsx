import React, { useState } from 'react';
import Navbar from './Navbar';
import DataView from './DataView';

function Request() {
  const [view, setView] = useState('donations');

  return (
    <div style={styles.container}>
      <Navbar view={view} setView={setView} />
      <DataView view={view} />
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
};

export default Request;
