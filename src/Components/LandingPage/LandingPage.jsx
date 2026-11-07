import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

function LandingPage() {
  return (
    <>
      {/* <Nav /> */}
      <div>
        <img className='landingPage-img' src="https://images.unsplash.com/photo-1543489822-c49534f3271f" alt="Hotel" />
        <div className='landingPage-welcome'>
          <img className='landingPage-welcome-img' src="https://images.unsplash.com/photo-1512686096451-a15c19314d59" alt="" />
          <main className='landingPage-welcome-body'>
            <h1 className='landingpage-title'>
              Welcome to
              <br />
              World Developers
            </h1>
            <p>
            Discover the hotel, coworking and IT events platform we built as a team at Henry in 2022.
            </p>
            <p>
            Restored in 2026 as a portfolio demo. Browse fictional properties and explore the superadmin dashboards with read-only access. No real bookings or payments.
            </p>

            <Link to="/home">
              <button className='landingpage-btn'>See hotels</button>
            </Link>
            <Link className="btn btn-outline-secondary align-self-end" to="/login">Explore superadmin demo</Link>
            <Link to="/about">Meet the original team and see what changed →</Link>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default LandingPage;
