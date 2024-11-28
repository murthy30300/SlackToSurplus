import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserDash from './components/UserDash';
import Donate from './components/Donate';
import Request from './components/Request';
import Post from './components/Post';
import User from './components/User';
import RODashboard from './rocomp/RODashBoard';
import ROLogin from './rocomp/ROLogin';
import ROImpact from './rocomp/ROImpact';
import RODistribution from './rocomp/RODistribution'
import ROHistory from './rocomp/ROHistory';
import ROStories from './rocomp/ROStories';
import ROUrgent from './rocomp/ROUrgent';
import ROLogistics from './rocomp/ROLogistics';
import ROCommunity from './rocomp/ROCommunity';
import ROFoodRequests from './rocomp/ROFoodRequests';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserDash" element={<UserDash />} />
          <Route path="/Donate" element={<Donate />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/User" element={<User />} />

          <Route path="/ro/login" element={<ROLogin />} />
          <Route path="/ro/dashboard" element={<RODashboard />} />
          <Route path="/ro/impact" element={<ROImpact />} />
          <Route path="/ro/history" element={<ROHistory />} />
          <Route path="/ro/urgent" element={<ROUrgent />} />
          <Route path="/ro/stories" element={<ROStories />} />
          <Route path="/ro/distribution" element={<RODistribution />} />
          <Route path="ro/logistics" element = {<ROLogistics/>}/>
          <Route path="ro/community" element = {<ROCommunity/>}/>
          <Route path ="ro/requests" element = {<ROFoodRequests/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;