import React from 'react';
import axios from 'axios';

function MessageList({ messages, onMessageDeleted, showNotification, apiUrl }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`${apiUrl}/api/messages/${id}`);
        onMessageDeleted();
        showNotification('Message deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting message:', error);
        showNotification('Failed to delete message', 'error');
      }
    }
  };

  return (
    <div className="messages-section">
      <h2>Messages</h2>
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p>No messages yet. Send your first message above!</p>
        </div>
      ) : (
        <div>
          {messages.map((message) => (
            <div key={message.id} className="message-card">
              <div className="message-header">
                <span className={`channel-badge ${message.channelType.toLowerCase()}`}>
                  {message.channelType}
                </span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className="status-badge">{message.status}</span>
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(message.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="message-content">
                {message.content}
              </div>
              
              <div className="message-meta">
                <div className="meta-item">
                  <span className="meta-label">From:</span>
                  <span>{message.sender}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">To:</span>
                  <span>{message.recipient}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Language:</span>
                  <span>{message.language}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Time:</span>
                  <span>{new Date(message.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;