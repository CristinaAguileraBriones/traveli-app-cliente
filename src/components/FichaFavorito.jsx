import "../styles/UserProfile.css"
function FichaFavorito(props) {
  const { fav, handleDeleteFavorito } = props;

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {/* Contenedor de la imagen */}
      <div className="fav-image-container me-3">
        <img src={fav.image[0]} alt="Imagen del hotel" className="rounded" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
      </div>

      {/* Contenedor de texto */}
      <div className="fav-text-container flex-grow-1">
        <h5 className="fav-title mb-1">{fav.name}</h5>
        <p className="fav-description mb-1 text-muted">{fav.description}</p>
        <p className="fav-price fw-bold">{fav.price} euros/noche</p>
      </div>

      {/* Botón de eliminación */}
      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDeleteFavorito(fav._id)}
      >
        Eliminar
      </button>
    </li>
  );
}

export default FichaFavorito;