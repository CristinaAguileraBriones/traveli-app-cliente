import React, { useState, useEffect } from 'react';
import service  from "../../service/config.js"
import './Hotel.css';  

function Hotel() {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [hotel, setHotel] = useState([]);  // Estado para almacenar los hoteles

  // manejar la barra de búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    
    service.get('/alojamiento')  
      .then(response => {
        setHotel(response.data);  // Actualizamos el estado con los datos de la respuesta
      })
      .catch(error => {
        console.error('Error al obtener los hoteles:', error);
      });
  }, []); 

  

  // Filtramos los hoteles según el término de búsqueda
  const filteredHotels = hotel.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
  )


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
            <img src={hotel.image[0]} alt={hotel.name} className="hotel-image" />
            <h3>{hotel.name}</h3>
            <p>{hotel.address}</p>
            <p>{hotel.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotel;