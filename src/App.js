import React from "react";
import Timeline from "./Timeline";
import timelineItems from "./timelineItems";

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <div className="header-content">
          <svg
            className="timeline-icon"
            viewBox="0 0 120 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 20 L40 20 L60 20 M60 20 Q60 40 40 40 L20 40 M20 40 Q20 60 40 60 L60 60 M60 60 L80 60 L100 60"
              stroke="#ffffff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="6" fill="#ffffff" />
            <circle
              cx="40"
              cy="20"
              r="4"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="60"
              cy="20"
              r="4"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="20"
              cy="40"
              r="4"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="4"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="40"
              cy="60"
              r="4"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="4"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="100" cy="60" r="6" fill="#ffffff" />
          </svg>
          <h1>Timeline Pro</h1>
        </div>
        <p>Visualize and manage your projects with an interactive timeline</p>
      </div>
      <div className="app-main">
        <Timeline items={timelineItems} />
      </div>
    </div>
  );
}

export default App;
