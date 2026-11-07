import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

const team = ['Maira Fernanda Bravo Madrid', 'Maria de los Angeles Gallardo', 'Alexis Franco Llopard', 'Alfredo Patricio Uskaer', 'Paula Daiana Yedro Infante', 'Oliver Sebastian Borda Mahecha', 'Ana Sol Maldonado', 'Hernan Javier Rinaldi'];
export default function AboutUs() {
  return <main className="container wd-about py-5">
    <header className="wd-about-intro p-4 p-md-5 rounded-4">
      <p className="text-uppercase fw-bold small">Henry · Team project · 2022</p>
      <h1>Built together. Ready to explore again.</h1>
      <p className="lead">World Developers brings hotel stays, coworking and IT events into one web application. Eight classmates built the original Full Stack project during the Henry bootcamp in 2022.</p>
      <p>This is a portfolio demonstration with fictional hotels, events and reservations. It does not offer real accommodation or accept payments.</p>
      <div className="d-flex flex-wrap gap-3"><Link className="btn btn-primary" to="/login">Explore the superadmin demo</Link><Link className="btn btn-outline-secondary" to="/home">Browse sample hotels</Link></div>
    </header>
    <section className="my-5" aria-labelledby="team-heading">
      <h2 id="team-heading">The original team</h2>
      <p>The original project was a shared effort. Its authorship belongs to the eight members below; this maintained version preserves that credit.</p>
      <ul className="wd-team-grid">{team.map(name => <li key={name}>{name}</li>)}</ul>
    </section>
    <section className="row g-4 mb-5">
      <div className="col-md-6"><div className="border rounded p-4 h-100"><h2 className="h4">The 2022 project</h2><p>The team developed the hotel catalogue, rooms, IT events, user accounts, favourites, reservation flow and administration dashboards. The original scope included Stripe payments and Cloudinary image uploads.</p><p className="mb-0">JavaScript · React · Redux · Node.js · Express · PostgreSQL · Sequelize · Firebase · Bootstrap</p></div></div>
      <div className="col-md-6"><div className="border rounded p-4 h-100"><h2 className="h4">The maintained version · 2026</h2><p>Patricio Uskaer restored the frontend and API, moved the catalogue to a separate database, reconnected authentication and added a public superadmin preview with read-only access.</p><p className="mb-0">The current checkout is a simulation. The public demo shows fictional users and reservations, and cannot save changes or perform payments.</p></div></div>
    </section>
    <section className="my-5" aria-labelledby="explore-heading"><h2 id="explore-heading">Explore World Developers</h2><div className="row g-3">
      {[['Hotels & rooms', 'Browse sample properties and open their current rooms.', '/home'], ['IT events', 'Explore technology events associated with the sample hotels.', '/home/Events'], ['Admin dashboards', 'Use the prefilled demo login to inspect the dashboards in read-only mode.', '/login']].map(([title, text, path]) => <div className="col-md-4" key={path}><div className="border rounded p-4 h-100"><h3 className="h5">{title}</h3><p>{text}</p><Link to={path}>Explore {title.toLowerCase()} →</Link></div></div>)}
    </div></section>
    <section className="border-top pt-4"><h2 className="h4">Source code</h2><p>Explore the maintained repositories, including the original project history and team credits.</p><div className="d-flex flex-wrap gap-3"><a href="https://github.com/patukaelmago/WorldDevFront" target="_blank" rel="noreferrer">Frontend on GitHub</a><a href="https://github.com/patukaelmago/WorldDevBack" target="_blank" rel="noreferrer">Backend on GitHub</a></div></section>
  </main>;
}
