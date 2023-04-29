import React from "react";

const Features = () => {
  const featureList = [
    { img: "asset 11.svg", title: "Crime Rate Analysis", desc: "Evaluate areas based on crime statistics." },
    { img: "asset 13.svg", title: "Customizable Routes", desc: "Allow users to select preferred paths." },
    { img: "asset 14.png", title: "Real-Time Updates", desc: "Provide current information for route selection" },
    { img: "asset 15.png", title: "Risk Assessment", desc: "Analyze potential dangers along chosen routes." },
    { img: "asset 16.svg", title: "Emergency Service Accessibility", desc: "Consider proximity to hospitals, police, and fire stations." },
    { img: "asset 17.png", title: "Safety Recommendations", desc: "Offer suggestions for safer travel options." }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-header">
          <h2 className="features-heading-text">Ensuring Safer Rides</h2>
        </div>
        <div className="features-area flex">
          {featureList.map((f, i) => (
            <div key={i} className="features-card flex">
              <img src={`/assets/${f.img}`} alt={f.title} />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
