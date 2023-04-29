import React from "react";

const BigFeatures = () => {
  const data = [
    {
      img: "asset 18.png",
      title: "SignUp",
      desc: "Before accessing SheSafe's features and personalized services, users are required to create an account, providing necessary information for authentication and customization."
    },
    {
      img: "asset 21.png",
      title: "Uses Google Maps API",
      desc: "SheSafe harnesses the power of Google Maps API, tapping into its vast repository of location data and advanced mapping capabilities to offer accurate and reliable route optimization, ensuring users can navigate safely and efficiently."
    },
    {
      img: "asset 24.png",
      title: "Route Selection",
      desc: "Users choose routes based on safety recommendations and customizable preferences, prioritizing safety and personal preferences for an enhanced travel experience."
    }
  ];

  return (
    <>
      <section className="features-section">
        <div className="features-header">
          <h2 className="features-heading-text">How It Works</h2>
        </div>
      </section>

      {data.map((f, i) => (
        <section key={i} className="big-feature-section">
          <div className={`container flex ${i === 0 ? "big-feature-containertop" : i === 1 ? "big-feature-container" : "big-feature-containerbot"}`}>
            <div className="feature-img">
              <img src={`/assets/${f.img}`} alt={f.title} className="imgcss" />
            </div>
            <div className="feature-desc flex">
              <h2>{f.title}</h2>
              <p>{f.desc}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default BigFeatures;
