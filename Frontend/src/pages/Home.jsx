import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>
            Lost Something? Found Something? We're Here to Help!
          </h1>
          <p className="hero-subtitle">
            Bridging the gap between lost and found through community collaboration and innovative technology.
          </p>
          <div className="hero-buttons">
            <a href="/find">
              <button className="hero-btn">
                Find Lost Item
              </button>
            </a>
            <a href="/post">
              <button className="hero-btn">
                Post Found Item
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">📝</div>
            <h3>Post</h3>
            <p>Report a lost or found item with details and photos.</p>
          </div>
          <div className="step">
            <div className="step-icon">🔍</div>
            <h3>Search</h3>
            <p>Browse through items posted by others in your area.</p>
          </div>
          <div className="step">
            <div className="step-icon">🤝</div>
            <h3>Connect</h3>
            <p>Contact the owner or finder to reunite with your item.</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-us">
        <div className="container">
          <h2>About Us</h2>
          <p>
            Our Lost and Found platform is dedicated to helping communities reunite with their lost items.
            We believe in the power of kindness and community support to make a positive impact.
          </p>
          <p>
            Whether you've lost something valuable or found an item that belongs to someone else,
            our platform makes it easy to connect and resolve these situations quickly and securely.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Lost and Found. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;
