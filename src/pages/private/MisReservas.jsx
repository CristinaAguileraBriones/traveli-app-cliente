import React, { useState, useContext, useEffect } from "react";
import service from "../../service/config";
import { useNavigate } from "react-router-dom";
import FichaReserva from "../../components/FichaReserva";



export function MisReservas() {
 
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate()
 
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
    await service.put(`reserva/${e.target.name}/edit`)
    getReserva()
  }
  return (
    <div>

      <div className="contenedor-general-reservas">

      <h1>Mis reservas</h1>
 
      {reservas.map((reserva) => {
        
        return (
          <FichaReserva key={reserva._id} reserva={reserva} handleDeleteReserva={handleDeleteReserva}/>
        )
      })}
      </div>
    </div>
  );
}

export default MisReservas;
