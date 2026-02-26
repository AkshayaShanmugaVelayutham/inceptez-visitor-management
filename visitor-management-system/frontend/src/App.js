import React, { useState, useEffect } from 'react';
import './App.css';
import inceptezIcon from './inceptez_icon.png';

function App() {
  const [currentPage, setCurrentPage] = useState('form'); // 'form' or 'records'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    purpose: '',
    meets_whom: '',
    comments: ''
  });
  
  const [visitors, setVisitors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    if (currentPage === 'records') {
      fetchVisitors();
    }
  }, [currentPage]);

  const fetchVisitors = async () => {
    try {
      const response = await fetch(`${API_URL}/visitors`);
      const data = await response.json();
      setVisitors(data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          purpose: '',
          meets_whom: '',
          comments: ''
        });
        
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this visitor record?')) {
      try {
        await fetch(`${API_URL}/visitors/${id}`, {
          method: 'DELETE'
        });
        fetchVisitors();
      } catch (error) {
        console.error('Error deleting visitor:', error);
      }
    }
  };

  return (
    <div className="app">
      <div className="background-pattern"></div>
      
      <div className="container">
        <header className="header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-text">
                <div className="logo-with-icon">
                  <img src={inceptezIcon} alt="Inceptez Icon" className="company-icon" />
                  <h1>Inceptez Technologies</h1>
                </div>
                <p>Visitors Entry Form</p>
              </div>
            </div>
            <div className="nav-buttons">
              <button 
                className={`nav-btn ${currentPage === 'form' ? 'active' : ''}`}
                onClick={() => setCurrentPage('form')}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H13V16H11V12H7V10H11V6H13V10H17V12Z" fill="currentColor"/>
                </svg>
                Visitor Registration
              </button>
              <button 
                className={`nav-btn ${currentPage === 'records' ? 'active' : ''}`}
                onClick={() => setCurrentPage('records')}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z" fill="currentColor"/>
                </svg>
                View Visitor Details
              </button>
            </div>
          </div>
        </header>

        {currentPage === 'form' ? (
          <div className="form-page">
            <div className="form-section centered">
              <div className="section-header">
                <h2>Visitor Registration</h2>
                <div className="header-line"></div>
              </div>

              <form onSubmit={handleSubmit} className="visitor-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <span className="label-icon">👤</span>
                    Visitor Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <span className="label-icon">📞</span>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <span className="label-icon">✉️</span>
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">
                    <span className="label-icon">📅</span>
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="purpose">
                    <span className="label-icon">🎯</span>
                    Purpose of Visit
                  </label>
                  <input
                    type="text"
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    placeholder="Enter purpose of visit"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="meets_whom">
                    <span className="label-icon">🤝</span>
                    Visitor Meets Whom
                  </label>
                  <input
                    type="text"
                    id="meets_whom"
                    name="meets_whom"
                    value={formData.meets_whom}
                    onChange={handleChange}
                    required
                    placeholder="Name of person they are meeting"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="comments">
                    <span className="label-icon">💬</span>
                    Comments
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Additional notes or special instructions..."
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <span className="btn-content">
                      <span className="spinner"></span>
                      Processing...
                    </span>
                  ) : (
                    <span className="btn-content">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                      </svg>
                      Submit
                    </span>
                  )}
                </button>
              </form>

              {showSuccess && (
                <div className="success-message">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                  </svg>
                  User details submitted successfully!
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="records-page">
            <div className="records-section">
              <div className="section-header">
                <h2>Visitor Records</h2>
                <div className="header-line"></div>
                <div className="record-count">{visitors.length} Total Records</div>
              </div>

              <div className="records-container">
                {visitors.length === 0 ? (
                  <div className="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                    </svg>
                    <p>No visitor records yet</p>
                    <span>Register your first visitor to get started</span>
                  </div>
                ) : (
                  <div className="records-list">
                    {visitors.map((visitor, index) => (
                      <div key={visitor.id} className="visitor-card" style={{animationDelay: `${index * 0.05}s`}}>
                        <div className="card-header">
                          <div className="visitor-info">
                            <h3>{visitor.name}</h3>
                            <span className="visitor-id">ID: #{visitor.id}</span>
                          </div>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(visitor.id)}
                            title="Delete record"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
                            </svg>
                          </button>
                        </div>
                        
                        <div className="card-details">
                          <div className="detail-item">
                            <span className="detail-label">Phone</span>
                            <span className="detail-value">{visitor.phone}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Email</span>
                            <span className="detail-value">{visitor.email}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Date</span>
                            <span className="detail-value">{visitor.date}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Purpose</span>
                            <span className="detail-value purpose-badge">{visitor.purpose}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Meets Whom</span>
                            <span className="detail-value">{visitor.meets_whom}</span>
                          </div>
                          {visitor.comments && (
                            <div className="detail-item full-width">
                              <span className="detail-label">Comments</span>
                              <span className="detail-value">{visitor.comments}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
