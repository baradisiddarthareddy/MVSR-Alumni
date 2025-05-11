import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'; // Import your CSS file
import Comment from './components/Comment';
import Dashboard from './components/Dashboard';
import Editprofile from './components/Editprofile';
import Home from './components/Home';
import { Myprofile } from './components/Myprofile';
import { UploadForm } from './components/Myupload';
import Profile from './components/Profile';
import { RollNoProvider } from './components/RollNoContext';
import Setprofile from './components/Setprofile';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  
  return (
    <>
   
    <RollNoProvider>
        
      <Router>
       
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/getprofile/:rollNo" element={<Profile />} />
            <Route path="/setprofile" element={<Setprofile />} />
            <Route path="/myprofile" element={<Myprofile />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/editprofile/:profileid" element={<Editprofile />} />
    
          </Routes>
      </Router>
    </RollNoProvider>
    </>
  );
}

export default App;
