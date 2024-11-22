import React from 'react';
import Donations from './Donations';
import MyDonations from './MyDonations';
import Requests from './Requests';
import MyRequests from './MyRequests';

function DataView({ view }) {
  switch (view) {
    case 'donations':
      return <Donations />;
    case 'myDonations':
      return <MyDonations />;
    case 'requests':
      return <Requests />;
    case 'myRequests':
      return <MyRequests />;
    default:
      return <div>Invalid view selected</div>;
  }
}

export default DataView;
