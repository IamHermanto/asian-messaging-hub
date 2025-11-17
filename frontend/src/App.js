import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import Notification from './components/Notification';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function App() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/messages`);
      setMessages(response.data);
      setFilteredMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      showNotification('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    let filtered = messages;

    if (channelFilter !== 'ALL') {
      filtered = filtered.filter(msg => msg.channelType === channelFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.sender.includes(searchTerm) ||
        msg.recipient.includes(searchTerm)
      );
    }

    setFilteredMessages(filtered);
  }, [channelFilter, searchTerm, messages]);

  const stats = {
    total: messages.length,
    wechat: messages.filter(m => m.channelType === 'WECHAT').length,
    whatsapp: messages.filter(m => m.channelType === 'WHATSAPP').length,
    line: messages.filter(m => m.channelType === 'LINE').length
  };

  return (
    <div className="App">
      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <h1>Asian Messaging Hub</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Messages</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.wechat}</div>
          <div className="stat-label">WeChat</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.whatsapp}</div>
          <div className="stat-label">WhatsApp</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.line}</div>
          <div className="stat-label">LINE</div>
        </div>
      </div>

      <MessageForm onMessageSent={fetchMessages} showNotification={showNotification} apiUrl={API_URL} />

      <div className="filters-container">
        <div className="filter-group">
          <label>Filter by Channel:</label>
          <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}>
            <option value="ALL">All Channels</option>
            <option value="WECHAT">WeChat</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="LINE">LINE</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search messages, sender, or recipient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading messages...</p>
        </div>
      ) : (
        <MessageList 
          messages={filteredMessages} 
          onMessageDeleted={fetchMessages}
          showNotification={showNotification}
          apiUrl={API_URL}
        />
      )}
    </div>
  );
}

export default App;