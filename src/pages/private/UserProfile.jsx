import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../../service/config";
import "bootstrap/dist/css/bootstrap.min.css";

function UserProfile() {
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

  //FUNCION CLOUDINARY:
  const handleFileUpload = async (event) => {
  if (!event.target.files[0]) {
    console.log("No se ha seleccionado ningún archivo.");
    return;
  }

  setIsUploading(true);

  const uploadData = new FormData();
  uploadData.append("image", event.target.files[0]);

  try {
    
    const response = await service.post("/upload", uploadData, {
      headers: { Authorization: `Bearer ${token}` }, 
    });

    const newImageUrl = response.data.imageUrl;
    setImageUrl(newImageUrl);
    setIsUploading(false);
    console.log("Imagen subida con éxito:", newImageUrl);
    // pausar el proceso para pasar a guardar cambios

    // actualizar la imagen que se muestra en el paso de la actualización
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    setIsUploading(false);
    navigate("/error");
  }
};




  useEffect(() => {
    const perfilUsuario = async () => {
      try {
        const response = await service.get("/user/profile");
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
    try {
      await service.delete(`/user/profile/favoritos/${hotelId}`);
      
      setFormData({
        ...formData,
        favoritos: formData.favoritos.filter((fav) => fav !== hotelId), 
      });
    } catch (error) {
      console.log("Error al eliminar el favorito:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("llamando a handl");
    try {
      
       
      const response = await service.put(`/user/${formData.userId}`, {
        name: formData.name,
        email: formData.email,
        profile_image: imageUrl || formData.profile_image,
        favoritos: formData.favoritos,
      });

      setIsEditing(false);
      window.location.reload();
      //navigate("/user-profile");
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
      <div className="col-lg-8 col-md-10 bg-white p-4 shadow rounded">
        <h1 className="mb-4">Perfil de Usuario</h1>

        {!isEditing ? (
          <div>
            <p>
              <strong>Nombre:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <div>
              <strong>Imagen de perfil:</strong>{" "}
              {formData.profile_image ? (
                <img src={formData.profile_image} alt="Imagen de perfil" width={200} />
              ) : (
                "No especificada"
              )}
            </div>
            <p>
              <strong>Hoteles favoritos:</strong> {formData.favoritos.length} alojamientos
            </p>

            {formData.favoritos.length > 0 && (
              <ul>
                {formData.favoritos.map((fav, index) => (
                  <li key={index}>
                    <strong>{fav}</strong>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => handleDeleteFavorito(fav)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              className="btn btn-primary mt-3"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </button>
            <button
              className="btn btn-secondary mt-3 ms-3"
              onClick={goToHotels}
            >
              Ir a hoteles
            </button>
            <button
              className="btn btn-success mt-3 ms-3"
              onClick={goToReservation}
            >
              Realiza tu reserva
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre:</label>
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
              <label htmlFor="email" className="form-label">Correo electrónico:</label>
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
            <div>
              <label>Imagen: </label>
              <input
                type="file"
                name="image"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </div>
            {isUploading ? <h3>... uploading image</h3> : null}
            {formData.profile_image ? (
              <div>
                <img src={formData.profile_image} alt="Imagen de perfil" width={200} />
              </div>
            ) : null}

            <div className="mb-3">
              <label htmlFor="favoritos" className="form-label">Hoteles favoritos:</label>
              <input
                type="text"
                id="favoritos"
                name="favoritos"
                className="form-control"
                value={formData.favoritos}
                onChange={handleChange}
                disabled
              />
            </div>

            <button type="submit" className="btn btn-success">Guardar cambios</button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;