import React, { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [voice, setVoice] = useState("female");
  const [language, setLanguage] = useState("en");

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Settings</h2>

      <div style={{ marginTop: "1rem" }}>
        <label>Notification Settings:</label>
        <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
        <span style={{ marginLeft: "0.5rem" }}>{notifications ? "Enabled" : "Disabled"}</span>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Voice Preference:</label>
        <select value={voice} onChange={e => setVoice(e.target.value)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Language:</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button style={{ padding: "0.5rem 1rem", backgroundColor: "#38A169", color: "white", border: "none", borderRadius: "4px" }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;