import React, { useState } from 'react';
import axios from 'axios';

function MessageForm({ onMessageSent, showNotification, apiUrl }) {
  const [formData, setFormData] = useState({
    content: '',
    channelType: 'WECHAT',
    language: 'EN',
    sender: '',
    recipient: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/messages`, formData);
      onMessageSent();
      showNotification('Message sent successfully!', 'success');
      setFormData({
        content: '',
        channelType: 'WECHAT',
        language: 'EN',
        sender: '',
        recipient: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      showNotification('Failed to send message', 'error');
    }
  };

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Channel</label>
          <select 
            value={formData.channelType}
            onChange={(e) => setFormData({...formData, channelType: e.target.value})}
          >
            <option value="WECHAT">WeChat</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="LINE">LINE</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Language</label>
          <select 
            value={formData.language}
            onChange={(e) => setFormData({...formData, language: e.target.value})}
          >
            <option value="EN">English</option>
            <option value="ZH">Chinese</option>
            <option value="JA">Japanese</option>
            <option value="KO">Korean</option>
          </select>
        </div>

        <div className="form-group">
          <label>Sender</label>
          <input
            type="text"
            placeholder="Enter sender phone number"
            value={formData.sender}
            onChange={(e) => setFormData({...formData, sender: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Recipient</label>
          <input
            type="text"
            placeholder="Enter recipient phone number"
            value={formData.recipient}
            onChange={(e) => setFormData({...formData, recipient: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            placeholder="Type your message here..."
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="send-button">Send Message</button>
      </form>
    </div>
  );
}

export default MessageForm;