import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Message.css'; // or Popup.css, whichever you choose

const Popup = ({ isOpen, onClose, rollNo }) => {
  const [description, setDescription] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sender, setSender] = useState({
    name: '',
    branch: '',
    email: '',
    id: ''
  });

  // Load current user info once
  useEffect(() => {
    try {
      const info = JSON.parse(localStorage.getItem('Info') || '{}');
      setSender({
        name: info.name || '',
        branch: info.branch || '',
        email: info.email || '',
        id: info.id || ''
      });
    } catch {
      // invalid JSON
    }
  }, []);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!description.trim()) {
      setError('Please type a message before sending.');
      return;
    }
  
    const payload = {
      rollNo,
      id: sender.id,
      name: sender.name,
      email: sender.email,
      branch: sender.branch,
      description: description.trim()
    };
    console.log('→ payload:', payload);
  
    try {
      const res = await axios.post('http://localhost:3600/api/message', payload);
      console.log('← success response:', res.data);
      alert('Message sent!');
      onClose();
    } catch (err) {
      // log the raw response body
      console.error('← error response:', err.response?.data || err);
      const msg = err.response?.data?.message
                || err.response?.data?.errors
                || 'Failed to send. Please try again.';
      setError(msg);
    } finally {
      setSending(false);
    }  
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close popup"
        >
        </button>
        <h2>Send a Message to {rollNo}</h2>
        {error && <p className="popup-error">{error}</p>}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type your message here…"
          rows="5"
          disabled={sending}
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={sending}
        >
          {sending ? 'Sending…' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Popup;
