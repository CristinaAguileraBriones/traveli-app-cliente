import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import service from "../../service/config.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 
import { OverlayTrigger, Tooltip } from 'react-bootstrap'; 
import './Hotel.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Hotel() {
  const [isLoggedIn, setLoggedIn] = useState(true)
  const [searchTerm, setSearchTerm] = useState(''); 
  const [hotel, setHotel] = useState([]);  
  const [activeIndexes, setActiveIndexes] = useState({}); 
  const [favorites, setFavorites] = useState({}); 
  const navigate = useNavigate();
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    service.get('/alojamiento')  
      .then(response => {
        setHotel(response.data); 
        
        console.log(response.data);
        
       
        const initialIndexes = response.data.reduce((acc, hotel) => {
          acc[hotel._id] = 0;
          return acc;
        }, {});
        setActiveIndexes(initialIndexes);

        const initialFavorites = response.data.reduce((acc, hotel) => {
          acc[hotel._id] = false;
          return acc;
        }, {});
        setFavorites(initialFavorites);
      })
      
      .catch(error => {
        console.error('Error al obtener los hoteles favoritos:', error);
      });
      
  }, []);

  const handleNext = (hotelId) => {
    setActiveIndexes(prevIndexes => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] + 1) % hotel.find(h => h._id === hotelId).image.length
    }));
  };

  const handlePrev = (hotelId) => {
    setActiveIndexes(prevIndexes => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] - 1 + hotel.find(h => h._id === hotelId).image.length) % hotel.find(h => h._id === hotelId).image.length
    }));
  };

  const handleReserve = (hotelId) => {
    navigate(`/reservas/${hotelId}`);
  };

  const toggleFavorite = async (hotelId) => {
    if(!isLoggedIn){
      navigate("/login")
      return
    }

    try {
      if(favorites[hotelId]){
        await service.delete(`/user/profile/favoritos/${hotelId}`)
      } else{
        await service.post(`/user/profile/favoritos/${hotelId}`)

        
      }

    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [hotelId]: !prevFavorites[hotelId]
    }));
  } catch (error) {
    console.error('Error al actualizar favoritos:', error.response ? error.response.data : error);
  }
    
  };

  const filteredHotels = hotel.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hotel-page">
      <h1>Encuentra tu Hotel</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre o ubicación"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="hotel-cards">
        {filteredHotels.map(hotel => (
          <div key={hotel._id} className="hotel-card">
            <div id={`carousel-${hotel._id}`} className="carousel slide">
              <div className="carousel-inner">
                {hotel.image.map((img, index) => (
                  <div 
                    key={index} 
                    className={`carousel-item ${activeIndexes[hotel._id] === index ? 'active' : ''}`}
                  >
                    <img src={img} className="d-block w-100 hotel-image" alt={hotel.name} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" onClick={() => handlePrev(hotel._id)}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" onClick={() => handleNext(hotel._id)}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <h3>{hotel.name}</h3>
            <p>{hotel.address}</p>
            <p>{hotel.description}</p>

            <div className="favorite-icon">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-${hotel._id}`}>Agregar a favoritos</Tooltip>}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  size="2x"
                  style={{ color: favorites[hotel._id] ? 'green' : 'red', cursor: 'pointer' }}
                  onClick={() => toggleFavorite(hotel._id)}
                />
              </OverlayTrigger>
            </div>

            
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => handleReserve(hotel._id)}
            >
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotel;