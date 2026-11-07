import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
export default function Footer() {
  return <footer className="footer text-white">
    <div className="footer-container container">
      <div className="row g-4">
        <div className="col-lg-5"><h2 className="h6 fw-bold text-uppercase mb-3">World Developers · Work & Relax</h2><p>A hotel and IT events application built by a team of eight at Henry in 2022. Restored and maintained by Patricio Uskaer as a portfolio demonstration.</p><Link to="/about" className="text-white">Meet the original team</Link></div>
        <div className="col-lg-3 col-sm-6"><h2 className="h6 fw-bold text-uppercase mb-3">Explore</h2><ul className="list-unstyled">{[['/', 'Home'], ['/home', 'Hotels & rooms'], ['/home/Events', 'IT events'], ['/login', 'Superadmin demo']].map(([path, label]) => <li className="mb-2" key={path}><Link to={path} className="footer-link text-white">{label}</Link></li>)}</ul></div>
        <div className="col-lg-4 col-sm-6"><h2 className="h6 fw-bold text-uppercase mb-3">Portfolio demo</h2><p>Fictional properties and reservations. No real accommodation, charges or promotional emails.</p><p className="small">Sample contact: demo@worlddevelopers.example<br />+54 000 000-0000 (demo)</p><div className="d-flex flex-wrap gap-3"><a href="https://github.com/patukaelmago/WorldDevFront" className="text-white" target="_blank" rel="noreferrer">Frontend source</a><a href="https://github.com/patukaelmago/WorldDevBack" className="text-white" target="_blank" rel="noreferrer">Backend source</a></div></div>
      </div>
      <div className="py-4 mt-3 border-top d-flex flex-wrap justify-content-between gap-2"><p className="small mb-0">© {new Date().getFullYear()} World Developers · Original Henry team project</p><div className="d-flex gap-3"><Link className="text-white" to="/terms">Demo terms</Link><Link className="text-white" to="/privacy">Privacy</Link></div></div>
    </div>
  </footer>;
}
