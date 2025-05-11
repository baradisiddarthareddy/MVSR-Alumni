// Profile.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "./Messages"; 
import "./Profile.css";

const Profile = () => {
  const [profiledata, setProfile]     = useState(null);
  const [isPopupOpen, setPopupOpen]   = useState(false);
  const { rollNo }                    = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3600/api/getotherprofile",
          { rollNo }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (rollNo) {
      fetchProfile();
    }
  }, [rollNo]);

  const handleOpenPopup  = () => setPopupOpen(true);
  const handleClosePopup = () => setPopupOpen(false);

  if (!profiledata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        {profiledata.uploads.image && (
          <img
            src={`http://localhost:3600/uploads/${profiledata.uploads.image}`}
            alt={profiledata.uploads.name || "Profile Image"}
            width="100"
          />
        )}
        <div className="profile-details">
          <h1>{profiledata.uploads.name}</h1>
          <p><strong>Branch:</strong> {profiledata.uploads.branch}</p>
          <p><strong>Year:</strong> {profiledata.uploads.year}</p>
          <p><strong>Email:</strong> {profiledata.uploads.email}</p>
        </div>
        <button className="msgbtn" onClick={handleOpenPopup}>
          Message Him
        </button>
      </div>

      <div className="uploads-section">
        <h2>Uploads</h2>
        {profiledata.uploads.posts.length === 0 ? (
          <p className="no-uploads">No uploads found</p>
        ) : (
          <ul>
            {profiledata.uploads.posts.map((upload) => (
              <li key={upload._id}>
                <p><strong>Description:</strong> {upload.description}</p>
                {upload.image && (
                  <img
                    src={`http://localhost:3600/uploads/${upload.image}`}
                    alt={upload.description}
                    width="200"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pass rollNo into Popup */}
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        rollNo={rollNo}
      />
    </div>
  );
};

export default Profile;
