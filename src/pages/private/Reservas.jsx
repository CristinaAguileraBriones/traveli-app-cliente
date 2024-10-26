import React, { useState, useContext, useEffect } from "react";
import "./Reserva.css";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 
import service from "../../service/config";


function Reserva() {
  const { hotelId } = useParams(); 
  const { isLoggedIn, token } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    guestName: "",
    email: "",  
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
    alojamiento: hotelId || "",  
  });

  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("ID del hotel (hotelId):", hotelId);
    setFormData((prevData) => ({
      ...prevData,
      alojamiento: hotelId,
    }));
  }, [hotelId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut)
    
    if (!formData.guestName || !formData.email || !formData.checkIn || !formData.checkOut || !formData.guests || !formData.alojamiento) {
      return;
    }
    console.log("Datos de reserva que se enviarán:", {
      guestName: formData.guestName,
      alojamiento: formData.alojamiento,
      checkInDate,
      checkOutDate,
      numberOfGuests: formData.guests,
      specialRequests: formData.specialRequests
    });
    
    try {
      const response = await service.post(
        '/reserva/addReserva',
        {
          guestName: formData.guestName,
          alojamiento: formData.alojamiento,  
          checkInDate,
          checkOutDate,
          numberOfGuests: formData.guests,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );

      console.log("Reserva realizada con éxito:", response.data);
      setSubmitted(true); 
      console.log("ID del hotel antes de la navegación:", hotelId);
      navigate(`/reservas/${hotelId}`); 
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
    }
  };

  return (
    <div className="reserva-page">
      <h1>Reserva tu Estancia en el alojamiento: {hotelId}</h1>
      {submitted ? (
        <div className="confirmation-message">
          <h2>¡Reserva confirmada!</h2>
          <p>Gracias por tu reserva.</p>
          <p>Te hemos enviado un correo de confirmación a: {formData.email}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="reserva-form">
          <div className="form-group">
            <label htmlFor="name">Ingrese nombre de usuario</label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              value={formData.guestName}
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
          {/* esto no esta en el modelo */}
         

          <button type="submit" className="submit-btn">
            Enviar reserva
          </button>
        </form>
      )}
    </div>
  );
}

export default Reserva;