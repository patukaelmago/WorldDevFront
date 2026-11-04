import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../api';
export default function RegisterAdmin() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  async function submit(event) {
    event.preventDefault(); setSaving(true); setMessage('');
    try { await axios.post(`${API_URL}/users/admins`, { email }); setMessage('Administrator access granted.'); setEmail(''); }
    catch (error) { setMessage(error.response?.data?.message || 'The change could not be saved.'); }
    finally { setSaving(false); }
  }
  return <section className="container my-5" style={{maxWidth:600}}><Link to="/profileSuperAdmin">Back</Link><form className="card p-4 mt-3" onSubmit={submit}><h1 className="h3">Add administrator</h1><p>The person must first sign in to this app. Enter their existing account email to grant administrator access.</p><label htmlFor="admin-email">Email</label><input id="admin-email" className="form-control my-2" type="email" required value={email} onChange={event=>setEmail(event.target.value)} /><button className="btn btn-primary" disabled={saving}>{saving?'Saving…':'Grant administrator access'}</button>{message&&<p role="status" className="mt-3">{message}</p>}</form></section>;
}
