import { useNavigate } from "react-router-dom";
import "../pages/private/MisReservas.css"


function FichaReserva(props) {
  const {reserva,handleDeleteReserva} = props;
  const navigate = useNavigate();


  return (
    <div>
      <h2>Nombre del hotel: {reserva.alojamiento.name}</h2>
      <h3>Dirección: {reserva.alojamiento.address}</h3>
      <p>
        Fecha de entrada: {new Date(reserva.checkInDate).toLocaleDateString()}
      </p>
      <p>
        Fecha de salida: {new Date(reserva.checkOutDate).toLocaleDateString()}
      </p>
      <p>Número de huéspedes: {reserva.numberOfGuests}</p>

      <h3>{reserva.alojamiento.address}</h3>
      <div className="contenedor-imagenes">
        {reserva.alojamiento.image.map((eachImg, index) => {
          return <img className="imagenes-reservas" key={index} src={eachImg} alt="imagen-hotel" />;
        })}
      </div>

      <button className="button" onClick={handleDeleteReserva} name={reserva._id}>
        Eliminar
      </button>
      <button
        onClick={() => navigate(`/editReservas/${reserva._id}`)}
        name={reserva._id}
      >
        Editar
      </button>
    </div>
  );
}

export default FichaReserva;