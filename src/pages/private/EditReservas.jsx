import React, { useState, useContext, useEffect } from "react";
import "../../styles/Reserva.css";
import { AuthContext } from "../../context/auth.context"; 
import service from "../../service/config";
import { useParams, useNavigate } from "react-router-dom";

function EditReservas() {
  
  const { hotelId } = useParams(); 
  const { isLoggedIn, token } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    guestName: "",  
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


  const getReserva = async () =>{
    const clone = structuredClone(formData)
    const response = await service.get( `/reserva/${hotelId}`)
    clone.guestName = response.data.guestName
    clone.checkIn = response.data.checkInDate.split("T")[0]
    clone.checkOut = response.data.checkOutDate.split("T")[0]
    clone.guests = response.data.numberOfGuests
    clone.alojamiento = response.data.alojamiento
    console.log(hotelId);
    setFormData(clone);
      
  }


  useEffect(() => {
    // console.log("ID del hotel (hotelId):", hotelId);
    getReserva()
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut)
    
    // if (!formData.guestName || !formData.email || !formData.checkIn || !formData.checkOut || !formData.guests || !formData.alojamiento) {
    //   return;
    // }
    console.log("Datos de reserva que se modificarán:", {
      guestName: formData.guestName,
      alojamiento: formData.alojamiento,
      checkInDate,
      checkOutDate,
      numberOfGuests: formData.guests,
      email: formData.email,
    });
    
    try {
      const response = await service.put(
        `/reserva/${hotelId}/edit`,
        {
          guestName: formData.guestName,
          alojamiento: formData.alojamiento,  
          checkInDate,
          checkOutDate,
          numberOfGuests: formData.guests,
          email: formData.email,
        },
     
      );

      console.log("Reserva realizada con éxito:", response.data);
      setSubmitted(true); 
      console.log("ID del hotel antes de la navegación:", hotelId);
      navigate(`/misreservas`); 
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
    }
  };

  return (
    <div className="reserva-page">
      <h1>Edita tus fechas</h1>
      {submitted ? (
        <div className="confirmation-message">
          <h2>¡Reserva confirmada!</h2>
          <p>Gracias por tu reserva.</p>
          <p>Te hemos enviado un correo de confirmación a: {formData.email}</p>
        </div>
      ) : (
        <form className="reserva-form">
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
          
          <button onClick={handleSubmit} type="submit" className="submit-btn">
            Editar reserva
          </button>
        </form>
      )}
    </div>
  );
}

export default EditReservas