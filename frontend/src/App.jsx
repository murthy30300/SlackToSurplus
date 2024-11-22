import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserDash from './components/UserDash';
import Donate from './components/Donate';
import Request from './components/Request';
import Post from './components/Post';
import User from './components/User';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;