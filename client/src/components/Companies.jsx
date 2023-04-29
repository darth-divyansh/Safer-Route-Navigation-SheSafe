import React from "react";

const Companies = () => {
  const logos = ["asset 3.png","asset 4.png","asset 5.png","asset 6.png","asset 7.png","asset 8.png","asset 9.png"];

  return (
    <section className="companies-section">
      <div className="container">
        <div className="small-bold-text companies-header">
          The world’s best companies rely on SheSafe to make safer decisions.
        </div>
        <div className="logos flex">
          {logos.map((logo, idx) => (
            <img key={idx} className="logo" src={`/assets/${logo}`} alt="company" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
