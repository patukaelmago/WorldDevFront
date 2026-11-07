import React from 'react';
import { Link } from 'react-router-dom';
export default function Privacy() {
  return <main className="container py-5" style={{maxWidth: 850}}><h1>Privacy in this portfolio demo</h1><p className="text-muted">Updated November 7, 2026</p>
    <h2 className="h4 mt-4">Public demo access</h2><p>The published demo login opens a read-only preview. Its users, email addresses and reservations are fabricated. It does not provide access to personal account records. The demo selection is stored in your browser's session storage and can be cleared with “Salir del demo”.</p>
    <h2 className="h4 mt-4">Personal accounts</h2><p>If you register or sign in with a personal account, Firebase Authentication manages sign-in. The application uses your account identifier and email address, and may receive your display name and profile photo when signing in with Google.</p><p>The backend stores profile fields you submit, your favourites and any simulated reservations you create. Authentication tokens are sent to the API to check your identity and permissions. Passwords are handled by Firebase Authentication, rather than stored in the application's profile database.</p>
    <h2 className="h4 mt-4">Browser storage and services</h2><p>Firebase uses browser storage to maintain authentication. The application stores the shopping cart locally and the public demo selection for the current tab. The frontend runs on Vercel, the API on Render and the application database on Neon. Firebase is used for authentication. Hotel illustrations may load from external image providers.</p>
    <h2 className="h4 mt-4">Payments and emails</h2><p>This deployment does not ask for payment card details, process real payments or send promotional emails. There is no newsletter subscription form.</p>
    <h2 className="h4 mt-4">Questions and account information</h2><p>To ask about a personal account or its removal, contact the maintainer through <a href="https://www.linkedin.com/in/patricio-uskaer/" target="_blank" rel="noreferrer">Patricio Uskaer's LinkedIn profile</a>. Use the repository issues for public technical feedback.</p>
    <Link className="d-inline-block mt-4" to="/login">Back to login</Link>
  </main>;
}
