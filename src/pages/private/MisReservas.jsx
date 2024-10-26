import React, { useState, useContext, useEffect } from "react";
import service from "../../service/config";


export function MisReservas() {
 
  const [reservas, setReservas] = useState([]);

 

  const getReserva = async () => {
    const response = await service.get("/reserva");
    console.log(response);

    setReservas(response.data);
    console.log(response.data);
  };

  useEffect(() => {

    getReserva();
      
    }, []);

  const handleDeleteReserva = async (e) => {
    await service.delete(`/reserva/${e.target.name}`);
    getReserva();

    console.log(e.target.name);
  };

  const handleEditReserva = async (e) =>{
    await service.put(`/${e.target.name}/edit`)
    getReserva()
  }
  return (
    <div>

      <div className="contenedor-general-reservas">

      <h1>Mis reservas</h1>

      <h2>Nombre del hotel</h2>
      
      {reservas.map((reserva) => {
        return (
          <div key={reserva._id}>

          <h2>Nombre del hotel: {reserva.alojamiento.name}</h2>
          <h3>Dirección: {reserva.alojamiento.address}</h3>
          <p>Fecha de entrada: {new Date(reserva.checkInDate).toLocaleDateString()}</p>
          <p>Fecha de salida: {new Date(reserva.checkOutDate).toLocaleDateString()}</p>
          <p>Número de huéspedes: {reserva.numberOfGuests}</p>

          
            
            <h3>{reserva.alojamiento.address}</h3>
            <div>
            {reserva.alojamiento.image.map((eachImg, index)=>{
              return (
                <img  key={index} src={eachImg} alt="imagen-hotel" />
              )

            })}
            </div>
           
            <button onClick={handleDeleteReserva} name={reserva._id}>
              Eliminar
            </button>
            <button onClick={handleEditReserva} name={reserva._id}>Editar</button>
          </div>
        );
      })}
        
      </div>

     
    </div>
  );
}

export default MisReservas;
