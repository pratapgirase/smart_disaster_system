
import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");

  const menuItems = [
    "Dashboard",
    "Disaster Alerts",
    "Weather",
    "Disaster Map",
    "Profile",
  ];

  
async function handleRegister(e) {
  e.preventDefault();
  setMessage("");

  if (!fullName.trim() || !registerEmail.trim()) {
    setMessage("Please enter your name and email.");
    return;
  }

  if (registerPassword !== confirmPassword) {
    setMessage("Passwords do not match!");
    return;
  }

  if (registerPassword.length < 6) {
    setMessage("Password must be at least 6 characters.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8080/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: registerEmail.trim(),
          password: registerPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Registration failed.");
      return;
    }

    setLoginEmail(registerEmail.trim());
    setLoginPassword("");
    setRegisterPassword("");
    setConfirmPassword("");
    setShowRegister(false);
    setMessage("Registration successful! Please log in.");
  }  catch (error) {
  console.error("Registration error:", error);
  setMessage("Error: " + error.message);
}
}


  function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    
    if (!loginEmail.trim() || !loginPassword) {
      setMessage("Please enter your email and password.");
      return;
    }

    setIsLoggedIn(true);
    setActivePage("Dashboard");
    setMessage("");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setShowRegister(false);
    setLoginPassword("");
    setMessage("");
  }

  return (
    <>
      {!isLoggedIn ? (
        <div className="login-page">
          {showRegister ? (
            <form className="login-card" onSubmit={handleRegister}>
              <div className="login-logo">🌍</div>
              <h1>Create Account</h1>
              <p>Register to access your safety dashboard</p>

              {message && (
                <p className="form-message" role="alert">
                  {message}
                </p>
              )}

              <label htmlFor="register-name">Full Name</label>
              <input
                id="register-name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <label htmlFor="register-email">Email Address</label>
              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />

              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                placeholder="Create a password (minimum 6 characters)"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                minLength={6}
                required
              />

              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
              />

              <button type="submit" className="login-button">
                Create Account
              </button>

              <button
                type="button"
                className="register-link"
                onClick={() => {
                  setShowRegister(false);
                  setMessage("");
                }}
              >
                Already have an account? Login
              </button>

              <p className="login-demo-note">
                Demo registration only. Account details are not saved.
              </p>
            </form>
          ) : (
            <form className="login-card" onSubmit={handleLogin}>
              <div className="login-logo">🌍</div>
              <h1>DisasterAlert</h1>
              <p>Sign in to access your safety dashboard</p>

              {message && (
                <p className="form-message" role="status">
                  {message}
                </p>
              )}

              <button
                type="button"
                className="register-link"
                onClick={() => {
                  setShowRegister(true);
                  setMessage("");
                }}
              >
                Don't have an account? Register
              </button>

              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />

              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />

              <button type="submit" className="login-button">
                Login to Dashboard
              </button>

              <p className="login-demo-note">
                Demo login only. Credentials are not verified yet.
              </p>
            </form>
          )}
        </div>
      ) : (
        <div className="app-container">
          <aside className="sidebar">
            <div className="brand">
              <span className="brand-icon">🌍</span>
              <div>
                <h2>DisasterAlert</h2>
                <p>Safety &amp; Response</p>
              </div>
            </div>

            <div className="menu-label">MAIN MENU</div>

            <nav>
              {menuItems.map((item) => (
                <button
                  key={item}
                  className={`menu-item ${
                    activePage === item ? "active" : ""
                  }`}
                  onClick={() => setActivePage(item)}
                >
                  <span>
                    {{
                      Dashboard: "▦",
                      "Disaster Alerts": "⚠",
                      Weather: "☁",
                      "Disaster Map": "⌖",
                      Profile: "👤",
                    }[item]}
                  </span>
                  {item}
                </button>
              ))}
            </nav>

            <div className="sidebar-bottom">
              <div className="safety-icon">🛡️</div>
              <h3>Stay Prepared</h3>
              <p>Stay informed. Stay safe.</p>
            </div>

            <div className="sidebar-footer">
              Smart Disaster Alert System
            </div>
          </aside>

          <main className="main-content">
            <header className="topbar">
              <div>
                <p className="breadcrumb">Pages / {activePage}</p>
                <h1>{activePage}</h1>
              </div>

              <div className="topbar-right">
                <span className="status-dot"></span>
                <span className="live-text">System Online</span>
                <div className="avatar">U</div>
                <button
                  type="button"
                  className="outline-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </header>

            {activePage === "Dashboard" && (
              <>
                <section className="welcome-section">
                  <div>
                    <p className="eyebrow">
                      DISASTER MONITORING CENTER
                    </p>
                    <h2>Welcome to your Safety Dashboard</h2>
                    <p>
                      Monitor disaster alerts and stay informed about
                      potential risks.
                    </p>
                  </div>
                  <div className="welcome-icon">🌐</div>
                </section>

                <section className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-top">
                      <span>Total Alerts</span>
                      <span className="stat-icon blue">⚠</span>
                    </div>
                    <h2>--</h2>
                    <p>Alerts reported</p>
                  </div>

                  <div className="stat-card">
                    <div className="stat-top">
                      <span>Active Alerts</span>
                      <span className="stat-icon orange">◉</span>
                    </div>
                    <h2>--</h2>
                    <p>Currently active</p>
                  </div>

                  <div className="stat-card">
                    <div className="stat-top">
                      <span>Critical Alerts</span>
                      <span className="stat-icon red">!</span>
                    </div>
                    <h2>--</h2>
                    <p>Require attention</p>
                  </div>

                  <div className="stat-card">
                    <div className="stat-top">
                      <span>System Status</span>
                      <span className="stat-icon green">✓</span>
                    </div>
                    <h2 className="online-heading">Online</h2>
                    <p>Dashboard available</p>
                  </div>
                </section>

                <section className="content-grid">
                  <div className="panel alerts-panel">
                    <div className="panel-heading">
                      <div>
                        <h3>Recent Disaster Alerts</h3>
                        <p>Latest reported incidents</p>
                      </div>
                      <button
                        className="outline-button"
                        onClick={() => setActivePage("Disaster Alerts")}
                      >
                        View All →
                      </button>
                    </div>

                    <div className="empty-state">
                      <div className="empty-icon">📡</div>
                      <h3>No alerts displayed yet</h3>
                      <p>
                        Live alert data will appear here when
                        connected to the backend.
                      </p>
                    </div>
                  </div>

                  <div className="panel preparedness-panel">
                    <h3>Emergency Preparedness</h3>
                    <p className="panel-subtitle">
                      Be ready before disaster strikes.
                    </p>

                    <div className="tip-item">
                      <span className="tip-icon">🎒</span>
                      <div>
                        <strong>Emergency Kit</strong>
                        <p>
                          Keep water, food and first-aid supplies ready.
                        </p>
                      </div>
                    </div>

                    <div className="tip-item">
                      <span className="tip-icon">📱</span>
                      <div>
                        <strong>Stay Informed</strong>
                        <p>
                          Follow official local emergency instructions.
                        </p>
                      </div>
                    </div>

                    <div className="tip-item">
                      <span className="tip-icon">📍</span>
                      <div>
                        <strong>Know Your Route</strong>
                        <p>
                          Identify nearby safe places and evacuation routes.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activePage === "Disaster Alerts" && (
              <section className="alerts-section">
                <h2>🚨 Disaster Alerts</h2>
                <p>
                  Stay informed about potential emergency situations.
                </p>

                <div className="alert-card">
                  <span className="alert-badge critical">CRITICAL</span>
                  <h3>Flood Alert</h3>
                  <p><strong>Location:</strong> Mumbai, Maharashtra</p>
                  <p>
                    Sample alert: possible flooding in low-lying areas.
                  </p>
                </div>

                <div className="alert-card">
                  <span className="alert-badge warning">WARNING</span>
                  <h3>Heavy Rainfall</h3>
                  <p><strong>Location:</strong> Pune, Maharashtra</p>
                  <p>
                    Sample alert: follow official weather updates.
                  </p>
                </div>

                <div className="alert-card">
                  <span className="alert-badge info">INFO</span>
                  <h3>Emergency Preparedness</h3>
                  <p><strong>Location:</strong> Nashik, Maharashtra</p>
                  <p>
                    Keep emergency supplies and contact numbers ready.
                  </p>
                </div>
              </section>
            )}

            {activePage === "Weather" && (
              <section className="weather-section">
                <h2>🌦️ Weather Overview</h2>
                <p>Sample weather information for the dashboard demo.</p>

                <div className="weather-grid">
                  <div className="weather-card">
                    <span>🌡️</span>
                    <p>Temperature</p>
                    <h3>28°C</h3>
                  </div>
                  <div className="weather-card">
                    <span>💧</span>
                    <p>Humidity</p>
                    <h3>65%</h3>
                  </div>
                  <div className="weather-card">
                    <span>💨</span>
                    <p>Wind Speed</p>
                    <h3>12 km/h</h3>
                  </div>
                  <div className="weather-card">
                    <span>🌧️</span>
                    <p>Weather Status</p>
                    <h3>Rainy</h3>
                  </div>
                </div>

                <div className="weather-notice">
                  <h3>⚠️ Safety Reminder</h3>
                  <p>
                    These are sample values, not live forecasts.
                    Check official weather updates before travelling.
                  </p>
                </div>
              </section>
            )}

            {activePage === "Disaster Map" && (
              <section className="map-section">
                <h2>🗺️ Disaster Monitoring Map</h2>
                <p>Sample disaster locations for demonstration.</p>

                <div className="map-placeholder">
                  <span className="map-icon">📍</span>
                  <h3>Disaster Location Overview</h3>
                  <p>Interactive map integration will be added later.</p>
                </div>

                <div className="location-list">
                  <div className="location-card">
                    <div>
                      <h3>📍 Mumbai, Maharashtra</h3>
                      <p>Flood Alert · Sample location</p>
                    </div>
                    <span className="location-status critical-status">
                      Critical
                    </span>
                  </div>

                  <div className="location-card">
                    <div>
                      <h3>📍 Pune, Maharashtra</h3>
                      <p>Heavy Rainfall · Sample location</p>
                    </div>
                    <span className="location-status warning-status">
                      Warning
                    </span>
                  </div>

                  <div className="location-card">
                    <div>
                      <h3>📍 Nashik, Maharashtra</h3>
                      <p>Weather Monitoring · Sample location</p>
                    </div>
                    <span className="location-status safe-status">
                      Monitoring
                    </span>
                  </div>
                </div>
              </section>
            )}

            {activePage === "Profile" && (
              <section className="profile-section">
                <h2>👤 My Profile</h2>
                <p>Demo account information.</p>

                <div className="profile-card">
                  <div className="profile-avatar">U</div>
                  <h3>Demo User</h3>
                  <p className="profile-role">Registered User</p>

                  <div className="profile-details">
                    <div>
                      <span>Full Name</span>
                      <strong>Demo User</strong>
                    </div>
                    <div>
                      <span>Email Address</span>
                      <strong>{loginEmail || "user@example.com"}</strong>
                    </div>
                    <div>
                      <span>Account Type</span>
                      <strong>User</strong>
                    </div>
                    <div>
                      <span>Account Status</span>
                      <strong className="profile-active">
                        Demo Profile
                      </strong>
                    </div>
                  </div>

                  <p className="profile-note">
                    Profile information is sample data for now.
                  </p>
                </div>
              </section>
            )}

            <footer className="page-footer">
              Smart Disaster Alert System · Stay alert, stay safe.
            </footer>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
