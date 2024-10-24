import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import service from "../../service/config.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; // Importamos el ícono de corazón
import { OverlayTrigger, Tooltip } from 'react-bootstrap'; // Para el tooltip
import './Hotel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "../../context/auth.context.jsx"

function Hotel() {
  const { isLoggedIn, authenticateUser  } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [hotel, setHotel] = useState([]);  
  const [activeIndexes, setActiveIndexes] = useState({}); 
  const [favorites, setFavorites] = useState({}); // Para manejar los favoritos
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await authenticateUser(); 
      setLoading(false); 
    };

    checkAuthentication();
  }, [authenticateUser]);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login'); 
    }
  }, [isLoggedIn, loading, navigate]);

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

        // Inicializamos favoritos como falso para cada hotel
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

  //Manejar la acción de reservar hotel REVISAR
  const handleReserve = (hotelId) => {
    navigate(`/reservas/${hotelId}`);
  };

  

  // Manejar la acción de agregar/eliminar favoritos REVISAR
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
      [hotelId]: !prevFavorites[hotelId] // Alterna entre true/false
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
              {/* Botones para cambiar de imagen */}
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

            {/* Icono de corazón con pop-up (Agregar a favoritos) */}
            <div className="favorite-icon">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-${hotel._id}`}>Agregar a favoritos</Tooltip>} // Pop-up
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  size="2x"
                  style={{ color: favorites[hotel._id] ? 'green' : 'gray', cursor: 'pointer' }}
                  onClick={() => toggleFavorite(hotel._id)} // Cambia el estado al hacer clic
                />
              </OverlayTrigger>
            </div>

            {/* Botón de Reservar */}
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => handleReserve(hotel._id)} // Manejar la acción de reservar
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