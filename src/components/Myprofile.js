import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Popup from './Messages'; // make sure this path matches your file
import './Myprofile.css';
import './SideMessage.css'; // Add this line to import the CSS file

const groupMessagesById = (messages) => {
  return messages.reduce((acc, message) => {
    if (!acc[message.id]) acc[message.id] = [];
    acc[message.id].push(message);
    return acc;
  }, {});
};

export const Myprofile = () => {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState({ messages: [], posts: [] });
  const [expandedGroups, setExpandedGroups] = useState({});
  const [loading, setLoading] = useState(true);

  // Popup control
  const [showPopup, setShowPopup] = useState(false);
  const [targetRollNo, setTargetRollNo] = useState(''); // will now hold groupId

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!token) setToken(storedToken);

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          'http://localhost:3600/api/myprofile',
          { token: storedToken }
        );
        // ensure we have arrays
        setProfile(data.uploads || { messages: [], posts: [] });
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (storedToken) fetchProfile();
  }, [token]);

  const groupedMessages = Array.isArray(profile.messages)
    ? groupMessagesById(profile.messages)
    : {};

  const toggleGroup = (id) =>
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  // Now opens popup with the GROUP ID, not the individual rollNo
  const handleOpenPopup = (groupId) => {
    setTargetRollNo(groupId);
    setShowPopup(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="myprofilecontainer">
      <div className="myprofile-info">
        <div className="myprofile-header">
          {profile.image && (
            <img
              src={`http://localhost:3600/uploads/${profile.image}`}
              alt="Profile"
            />
          )}
          <div>
            <h1 className="capitalize">{profile.name || 'N/A'}</h1>
            <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
            <p><strong>Roll No:</strong> {profile.rollNo || 'N/A'}</p>
            <p><strong>Year:</strong> {profile.year || 'N/A'}</p>
            <p><strong>Branch:</strong> {profile.branch || 'N/A'}</p>
          </div>
        </div>

        <div className="myprofile-posts">
          <strong>Posts:</strong>
          <ul>
            {profile.posts.length > 0 ? (
              profile.posts.map((post, i) => (
                <li key={i} className="singlepost">
                  <div>{post.description}</div>
                  {post.image && (
                    <img
                      src={`http://localhost:3600/uploads/${post.image}`}
                      alt={post.description}
                      className="allpost-image"
                      width="200"
                    />
                  )}
                </li>
              ))
            ) : (
              <li>No posts available</li>
            )}
          </ul>
        </div>
      </div>

      <div className="myprofile-messages">
        <strong>Messages:</strong>
        {Object.keys(groupedMessages).length > 0 ? (
          Object.keys(groupedMessages).map((groupId) => (
            <div key={groupId}>
              <h4 onClick={() => toggleGroup(groupId)}>
                Group {groupId} {expandedGroups[groupId] ? '−' : '+'}
              </h4>
              {expandedGroups[groupId] && (
                <ul>
                  {groupedMessages[groupId].map((msg) => (
                    <li key={msg._id} className="message-item">
                      <div><strong>Name:</strong> {msg.name}</div>
                      <div><strong>Email:</strong> {msg.email}</div>
                      <div><strong>Branch:</strong> {msg.branch}</div>
                      <div><strong>Roll No:</strong> {msg.rollNo}</div>
                      <div><strong>Description:</strong> {msg.description}</div>
                      {/* pass groupId here */}
                      <button onClick={() => handleOpenPopup(groupId)}>
                        Message Him
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <div>No messages available</div>
        )}
      </div>

      {/* Popup now receives `rollNo={targetRollNo}` which is actually the groupId */}
      {showPopup && (
  <>
    <div className="sidebar-backdrop" onClick={() => setShowPopup(false)}></div>
    <div className={`side-message-panel ${showPopup ? 'open' : ''}`}>
      <div className="side-message-header">
        <h3>Send Message</h3>
        <button onClick={() => setShowPopup(false)} className="close-btn">×</button>
      </div>
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        rollNo={targetRollNo}
      />
    </div>
  </>
)}

      
    </div>
  );
};
