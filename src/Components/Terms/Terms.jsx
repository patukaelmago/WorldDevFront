import React from 'react';
import { Link } from 'react-router-dom';
export default function Terms() {
  return <main className="container py-5" style={{maxWidth: 850}}><h1>Using the World Developers demo</h1><p className="text-muted">Updated November 7, 2026</p>
    <h2 className="h4 mt-4">A team project, shared as a portfolio</h2><p>World Developers was built collaboratively at Henry in 2022. Patricio Uskaer maintains this demonstration; the original team is credited on the About page.</p>
    <h2 className="h4 mt-4">What you can explore</h2><p>You can browse fictional hotels, rooms and IT events. The public superadmin demo lets you inspect administration dashboards with sample users and reservations. It is read-only: saving, deleting, uploading files and cancelling reservations are disabled.</p>
    <h2 className="h4 mt-4">No real bookings or payments</h2><p>Listed properties, availability and prices are sample data. Any reservation created through a personal account is a simulation, not a booking with a hotel. This version does not collect payment card details, charge money or send booking or marketing emails.</p>
    <h2 className="h4 mt-4">Responsible use</h2><p>Use the demo to explore the application and provide feedback. Do not attempt to access other people's accounts or disrupt the service. Sample data and features may change as the portfolio is updated.</p>
    <h2 className="h4 mt-4">Feedback</h2><p>You can report a problem through the <a href="https://github.com/patukaelmago/WorldDevFront/issues" target="_blank" rel="noreferrer">frontend repository</a>. Public issues should contain only information you want to share publicly.</p>
    <div className="d-flex gap-3 mt-4"><Link to="/login">Explore the demo</Link><Link to="/about">Project and team</Link><Link to="/privacy">Privacy information</Link></div>
  </main>;
}
