import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../api';
import { CLEAR_CART } from '../../redux/action/cartAction';
export default function Stripe() {
  const { cartRooms } = useSelector(state => state.reducerCart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirm = async event => {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const { data } = await axios.post(`${API_URL}/booking`, { cartRoom: cartRooms.map(room => ({ id: room.id, cartQuantity: room.cartQuantity, checkIn: room.checkIn, checkOut: room.checkOut })) });
      setConfirmed(data); dispatch({ type: CLEAR_CART });
      toast.success('Demo reservation confirmed. No payment was collected.');
    } catch (err) { setError(err.response?.data?.message || 'The reservation could not be confirmed. Please try again.'); }
    finally { setLoading(false); }
  };
  if (confirmed) return <section className="container my-5" style={{ maxWidth: 650 }}><div className="card p-4"><h1>Demo reservation confirmed</h1><p>No payment was collected. This is a portfolio demonstration.</p><p>Reference: {confirmed.id}</p><p>Total: USD {confirmed.cartTotalAmount}</p><button className="btn btn-primary" onClick={() => navigate('/profileusers/bookingHistory')}>View reservation history</button></div></section>;
  return <section className="container my-5" style={{ maxWidth: 650 }}><form className="card p-4" onSubmit={confirm}><h1>Demo reservation</h1><p className="alert alert-info">Portfolio demonstration. No card details, charges or real hotel reservations.</p>{cartRooms.map(room => <div key={room.id} className="border-bottom py-3"><h2 className="h5">{room.name}</h2><p>{room.checkIn} → {room.checkOut} · {room.cartQuantity} room(s)</p><p>USD {room.price} per room, per night. The server checks availability and calculates your total.</p></div>)}{!cartRooms.length && <p>Your cart is empty.</p>}{error && <p role="alert" className="alert alert-danger mt-3">{error}</p>}<button className="btn btn-primary mt-3" disabled={loading || !cartRooms.length}>{loading ? 'Confirming…' : 'Confirm demo reservation'}</button></form></section>;
}
