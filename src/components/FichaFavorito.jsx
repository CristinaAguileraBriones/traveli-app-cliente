


function FichaFavorito(props) {

  const {fav,handleDeleteFavorito} = props;

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <h1>{fav.name}</h1>
      <img src={fav.image[0]} alt="imagen" style={{ height: "100px" }} />
      {fav.description}
      {fav.price}

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
