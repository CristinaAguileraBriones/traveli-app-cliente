import React, { useState } from 'react';
import './Reserva.css'; 

function Reserva() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
  });
  const [submitted, setSubmitted] = useState(false); 

  // cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validar y enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (!formData.name || !formData.email || !formData.checkIn || !formData.checkOut || !formData.guests) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    //solicitud post
    // Ejemplo: service.post('/reservas', formData)
    console.log('Datos de la reserva enviados:', formData);

    // Marcar como enviado
    setSubmitted(true);
  };

  return (
    <div className="reserva-page">
      <h1>Reserva tu Estancia</h1>
      {submitted ? (
        <div className="confirmation-message">
          <h2>¡Reserva confirmada!</h2>
          <p>Gracias, {formData.name}, por tu reserva.</p>
          <p>Te hemos enviado un correo de confirmación a: {formData.email}</p>
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

          <button type="submit" className="submit-btn">Enviar reserva</button>
        </form>
      )}
    </div>
  );
}

export default Reserva;