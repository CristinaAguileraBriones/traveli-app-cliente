import React, { useState, useContext } from "react";
import "./Reserva.css";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 
import service from "../../service/config"; 

function Reserva() {
  const { hotelName } = useParams(); 
  const { isLoggedIn, token } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
    alojamiento: "",
  });

  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!formData.name || !formData.email || !formData.checkIn || !formData.checkOut || !formData.guests || !formData.alojamiento) {
      return;
    }

    
    try {
      const response = await service.post(
        '/reserva/addReserva',
        {
          guestName: formData.name,
          email: formData.email,
          alojamiento: hotelName, 
          checkInDate: formData.checkIn,
          checkOutDate: formData.checkOut,
          numberOfGuests: formData.guests,
          specialRequests: formData.specialRequests,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );

      console.log("Reserva realizada con éxito:", response.data);
      setSubmitted(true); 
      navigate("/"); 
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
    }
  };

  return (
    <div className="reserva-page">
      <h1>Reserva tu Estancia en el alojamiento: {hotelName}</h1>
      {submitted ? (
        <div className="confirmation-message">
          <h2>¡Reserva confirmada!</h2>
          <p>Gracias, {formData.name}, por tu reserva.</p>
          <p>Te hemos enviado un correo de confirmación a: {formData.email}</p>
          <p>Tipo de alojamiento: {formData.alojamiento}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="reserva-form">
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Introduce tu nombre completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Introduce tu correo electrónico"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkIn">Fecha de entrada</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkOut">Fecha de salida</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="guests">Número de huéspedes</label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialRequests">Solicitudes especiales</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Especifica si tienes alguna solicitud especial (opcional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="alojamiento">Tipo de alojamiento</label>
            <select
              id="alojamiento"
              name="alojamiento"
              value={formData.alojamiento}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona el tipo de alojamiento</option>
              <option value="habitacion-estandar">Habitación estándar</option>
              <option value="suite">Suite</option>
              <option value="villa">Villa</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Enviar reserva
          </button>
        </form>
      )}
    </div>
  );
}

export default Reserva;