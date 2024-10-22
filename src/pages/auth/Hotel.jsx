import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import service from "../../service/config.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; // Importamos el ícono de corazón
import { OverlayTrigger, Tooltip } from 'react-bootstrap'; // Para el tooltip
import './Hotel.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Hotel() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [hotel, setHotel] = useState([]);  
  const [activeIndexes, setActiveIndexes] = useState({}); 
  const [favorites, setFavorites] = useState({}); // Para manejar los favoritos
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    service.get('/alojamiento')  
      .then(response => {
        setHotel(response.data);  
       
        const initialIndexes = response.data.reduce((acc, hotel) => {
          acc[hotel.id] = 0;
          return acc;
        }, {});
        setActiveIndexes(initialIndexes);

        // Inicializamos favoritos como falso para cada hotel
        const initialFavorites = response.data.reduce((acc, hotel) => {
          acc[hotel.id] = false;
          return acc;
        }, {});
        setFavorites(initialFavorites);
      })
      .catch(error => {
        console.error('Error al obtener los hoteles:', error);
      });
  }, []);

  const handleNext = (hotelId) => {
    setActiveIndexes(prevIndexes => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] + 1) % hotel.find(h => h.id === hotelId).image.length
    }));
  };

  const handlePrev = (hotelId) => {
    setActiveIndexes(prevIndexes => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] - 1 + hotel.find(h => h.id === hotelId).image.length) % hotel.find(h => h.id === hotelId).image.length
    }));
  };

  // Manejar la acción de reservar hotel
  const handleReserve = (hotelId) => {
    navigate(`/reservas/${hotelId}`);
  };

  // Manejar la acción de agregar/eliminar favoritos
  const toggleFavorite = (hotelId) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [hotelId]: !prevFavorites[hotelId] // Alterna entre true/false
    }));
  };

  const filteredHotels = hotel.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hotel-page">
      <h1>Encuentra tu Hotel</h1>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre o ubicación"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Sección de tarjetas de hoteles */}
      <div className="hotel-cards">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="hotel-card">
            <div id={`carousel-${hotel.id}`} className="carousel slide">
              <div className="carousel-inner">
                {hotel.image.map((img, index) => (
                  <div 
                    key={index} 
                    className={`carousel-item ${activeIndexes[hotel.id] === index ? 'active' : ''}`}
                  >
                    <img src={img} className="d-block w-100 hotel-image" alt={hotel.name} />
                  </div>
                ))}
              </div>
              {/* Botones para cambiar de imagen */}
              <button className="carousel-control-prev" type="button" onClick={() => handlePrev(hotel.id)}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" onClick={() => handleNext(hotel.id)}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <h3>{hotel.name}</h3>
            <p>{hotel.address}</p>
            <p>{hotel.description}</p>

            {/* Icono de corazón con pop-up (Agregar a favoritos) */}
            <div className="favorite-icon">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-${hotel.id}`}>Agregar a favoritos</Tooltip>} // Pop-up
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  size="2x"
                  style={{ color: favorites[hotel.id] ? 'green' : 'gray', cursor: 'pointer' }}
                  onClick={() => toggleFavorite(hotel.id)} // Cambia el estado al hacer clic
                />
              </OverlayTrigger>
            </div>

            {/* Botón de Reservar */}
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => handleReserve(hotel.id)} // Manejar la acción de reservar
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