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
import ROProfile from './rocomp/ROProfile';
import RecipieGenerator from './components/RecipieGenerator';
import AFoodOffer from './admin/AFoodOffer';
import AOrganization from './admin/AOrganization';
import APost from './admin/APost';
import AProfile from './admin/AProfile';
import AUrgentNeed from './admin/AUrgentNeed';
import AUser from './admin/AUser';
import ABase from './admin/ABase';


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
          <Route path="/User/:username" element={<User />} />
          <Route path="/openai" element={<RecipieGenerator/>}/>

          {/* <Route path="/ro/login" element={<ROLogin />} /> */}
          <Route path="/ro/dashboard" element={<RODashboard />} />
          <Route path="/ro/impact" element={<ROImpact />} />
          <Route path="/ro/history" element={<ROHistory />} />
          <Route path="/ro/urgent" element={<ROUrgent />} />
          <Route path="/ro/stories" element={<ROStories />} />
          <Route path="/ro/distribution" element={<RODistribution />} />
          <Route path="ro/logistics" element = {<ROLogistics/>}/>
          <Route path="ro/community" element = {<ROProfile/>}/>
          <Route path ="ro/requests" element = {<ROFoodRequests/>}/>
          <Route path="ro/orgprofile" element = {<ROProfile/>}/>

          <Route path ="admin" element = {<ABase/>}/>
          <Route path="admin/foodoffer" element = {<AFoodOffer/>}/>
          <Route path="admin/organization" element = {<AOrganization/>}/>
          <Route path="admin/post" element = {<APost/>}/>
          <Route path="admin/profile" element = {<AProfile/>}/>
          <Route path="admin/urgentneed" element = {<AUrgentNeed/>}/>
          <Route path ="admin/user" element={<AUser/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;