import React from "react";

const Header = () => {
  return (
    <header>
      <div className="container header-section flex">
        <div className="header-left">
          <h1>Direction , Yours</h1>
          <p>SheSafe revolutionizes transportation safety by allowing users to choose their preferred route, ensuring a safer and more empowering journey.</p>
          <a href="mapsloc.html" className="primary-button get-started-btn">Free Trial</a>
        </div>
        <div className="header-right">
          <img className="imgcss" src="/assets/asset 2.jpg" alt="hero" />
        </div>
      </div>
    </header>
  );
};

export default Header;
