import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../../service/config";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css";

function UserProfile() {
  const [reservas, setReservas] = useState([]);
  const { isLoggedIn, token } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    profile_image: "",
    favoritos: [],
  });

  const navigate = useNavigate();


  // Función de Cloudinary para manejar la subida de archivos
  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      console.log("No se ha seleccionado ningún archivo.");
      return;
    }

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData,);

      const newImageUrl = response.data.imageUrl;
      setImageUrl(newImageUrl);
      setIsUploading(false);
      console.log("Imagen subida con éxito:", newImageUrl);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setIsUploading(false);
      navigate("/error");
    }
  };

  // hacer llamada a reserva GET:
  const getReserva = async () =>{
    const response = await service.get("/reserva")
    console.log(response);
    
    setReservas(response.data);

  }

  const perfilUsuario = async () => {
    try {
      const response = await service.get("/user/profile/favoritos");
      const user = response.data;

      setFormData({
        userId: user._id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image || "",
        favoritos: user.favoritos || [],
      });
    } catch (error) {
      console.log("Error al obtener los datos del usuario", error);
    }
  };


  useEffect(() => {

    getReserva();
    

    perfilUsuario();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteFavorito = async (hotelId) => {
    console.log("esto deberia ser hotelid" , hotelId);
    
    try {
      await service.delete(`/user/profile/favoritos/${hotelId}`);
      setFormData({
        ...formData,
        favoritos: formData.favoritos.filter((fav) => fav !== hotelId),
      });
      perfilUsuario()
    } catch (error) {
      console.log("Error al eliminar el favorito:", error);
    }
  };




  const handleDeleteReserva = async (e) =>{
    await service.delete(`/reserva/${e.target.name}`)
    getReserva();

    console.log(e.target.name);
  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/user/${formData.userId}`, {
        name: formData.name,
        email: formData.email,
        profile_image: imageUrl || formData.profile_image,
        favoritos: formData.favoritos,
      });

      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.log("Error al actualizar el perfil:", error);
    }
  };

  const goToHotels = () => {
    navigate("/hotels");
  };

  const goToReservation = () => {
    navigate("/reservas");
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="col-lg-6 col-md-8 bg-white p-5 shadow rounded">
        <h1 className="mb-4 text-center">Perfil de Usuario</h1>
        <div className="mb-3">
          {formData.profile_image ? (
            <img
              src={formData.profile_image}
              alt="Imagen de perfil"
              className="img-thumbnail"
            />
          ) : (
            <span>No especificada</span>
          )}
        </div>

        {!isEditing ? (
          <div className="div-contenido">
            <p className="lead">
              <strong>Nombre:</strong> {formData.name}
            </p>
            <p className="lead">
              <strong>Email:</strong> {formData.email}
            </p>

            <p className="lead">
              <strong>Hoteles favoritos:</strong> {formData.favoritos.length}{" "}
              alojamientos
            </p>

            {formData.favoritos.length > 0 && (
              <ul className="list-group mb-3">
                {console.log("data", formData)}
                
                {formData.favoritos.map((fav, index) => (
                  <li
                    key={index}className="list-group-item d-flex justify-content-between align-items-center"
>
                    {fav.name}


                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteFavorito(fav._id)}
                      >
                      Eliminar
                    </button>
                      {fav._id}
                  </li>
                ))}
              </ul>
            )}

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </button>
              <button className="btn btn-secondary" onClick={goToHotels}>
                Ir a Hoteles
              </button>
              <button className="btn btn-success" onClick={goToReservation}>
                Realizar Reserva
              </button>
            </div>
            {reservas.map( (reserva)=>{
              return (
                <div key={reservas._id}>
                  <h3>
                    {reserva.alojamiento.address}
                  
                  </h3>
                  <button onClick={handleDeleteReserva} name={reserva._id}>Eliminar</button>
                </div>
              );
              

            } )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Imagen:</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              {isUploading ? (
                <div className="text-muted mt-2">Subiendo imagen...</div>
              ) : null}
            </div>

            {formData.profile_image && (
              <div className="mb-3">
                <img
                  src={formData.profile_image}
                  alt="Imagen de perfil"
                  className="img-thumbnail"
                  width={200}
                />
              </div>
            )}

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                Guardar cambios
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
