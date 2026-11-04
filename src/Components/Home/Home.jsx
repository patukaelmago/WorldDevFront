import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotels, setActualPage, setMaxPageNumber, setMinPageNumber } from "../../redux/action/action";

import CardHotels from "../CardHotels/CardHotels";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const hotels = useSelector(state => state.reducerHotel.hotels)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const retry = () => {
    setLoading(true); setError('');
    dispatch(getHotels()).catch(() => setError('The catalogue could not be loaded. Please try again.')).finally(() => setLoading(false));
  };

  //pagination
  const actualPage = useSelector(state => state.reducerPagination.actualPage)
  const hotelsPerPage = 8
  const indexOfLastHotel = actualPage * hotelsPerPage //last hotel per page
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage //1st hotel per page
  const actualHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel)
  //minPageNumber y maxPageNumber son para hacer el paginado más tikito y que quede lindo, uso ambos para hacer un slice y renderizar sólo ese pedazo
  const minPageNumber = useSelector(state => state.reducerPagination.minPageNumber)
  const maxPageNumber = useSelector(state => state.reducerPagination.maxPageNumber)

  const pages = (pageNumber) => {
    dispatch(setActualPage(pageNumber))
    if(pageNumber >= maxPageNumber) {
      dispatch(setMinPageNumber(minPageNumber+4))
      dispatch(setMaxPageNumber(maxPageNumber+4))
    } else if(pageNumber <= minPageNumber+1 && pageNumber !== 1) {
      dispatch(setMinPageNumber(minPageNumber-4))
      dispatch(setMaxPageNumber(maxPageNumber-4))
    }
  };

  useEffect(() => {
    //dispacho la action solo si mi estado está vacío (cuando entro x 1ra vez a la pag)
    dispatch(getHotels()).catch(() => setError('The catalogue could not be loaded. Please try again.')).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <p className="container py-5" role="status">Loading the hotel catalogue. The server may take a moment to wake up…</p>;
  if (error) return <div className="container py-5" role="alert"><p>{error}</p><button className="btn btn-primary" onClick={retry}>Try again</button></div>;
  return (
    <>
      <CardHotels hotels={hotels} actualHotels={actualHotels} />
      <Pagination hotels={hotels} hotelsPerPage={hotelsPerPage} pages={pages} />
    </>
  );
};

export default Home;
