import ImageGallery from '../ImageGallery/ImageGallery';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearDetail, getDetailHotel } from "../../redux/action/action.js";
// import ServicesHotel from "../ServicesHotel/ServicesHotel.jsx";
import CardRoom from "../CardRoom/CardRoom.jsx";
import Review from "../Review/Review.jsx";
import './HotelDetail.css'

const HotelDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const hotelDetail = useSelector((state) => state.reducerHotel.detailHotel);
  const { name, image, qualification, description, Locations, Rooms, Reviews } = hotelDetail

  //component did mount/update
  useEffect(() => {
    let active = true;
    setLoading(true);
    dispatch(getDetailHotel(id)).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [dispatch, id]);

  //component will unmount
  useEffect(() => {
    return () => dispatch(clearDetail())
  }, [dispatch])

  return (
    <div className="text-start">
      {!loading && hotelDetail.name ? (
        <>
          <ImageGallery key={id} images={image} name={name} className="hotelDetail-img" />
          <div className="hotelDetail-body">
            <h1 className="hotelDetail-title">{name}</h1>
            <h6>{Locations[0]?.city}, {Locations[0]?.department}, {Locations[0]?.state}</h6>
            <p>Score: {qualification} ✫</p>
            <p>{description}</p>
            <h2 className="mt-5">Available rooms</h2>
            <small>Note: the prices shown below are for one night. For more information, please read the room detail.</small>
            {Rooms.map((r) => (
              <CardRoom key={r.id} id={r.id} name={r.name} image={r.image} price={(r.price)} description={r.description} />
            ))}

            {!!Reviews.length && (
              <>
                <h2 className="mt-5">Reviews</h2>
                {Reviews.map(r => (
                  <Review key={r.id} id={r.id} name={r.name} rating={r.rating} comment={r.comment} />
                ))}
              </>
            )}
            <div className="d-grid gap-2 d-sm-block">
              <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">Back</button>
            </div>
          </div>
        </>
      ) : (
        <div className="container py-5" role="status">{loading ? <p>Loading hotel details. The demo server may take a moment to wake up…</p> : <><h1 className="h3">This hotel is not available</h1><p>The link may be outdated. Browse the current sample catalogue.</p><button className="btn btn-primary" onClick={() => navigate('/home')}>Browse hotels</button></>}</div>
      )}
    </div>
  );
};

export default HotelDetail;
