import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../../service/config";
import "bootstrap/dist/css/bootstrap.min.css";

function UserProfile() {
  const { authenticateUser } = useContext(AuthContext);

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
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        uploadData
      );
      // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    console.log("pidiendo datos desde Useffect");
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
      ...formData, //recordamos el operador spread que copia todas las propiedades del objeto
      [name]: value, //cambia al valor actualizado, esto actualiza el nombre en el front y en la base de datos COMPROBADO
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDeleteFavorito = async (hotelId) => {
    try {
      // Llama a la ruta de DELETE en el backend
      console.log(hotelId);
      await service.delete(`/user/profile/favoritos/${hotelId}`);
      // Elimina el favorito del estado local
      setFormData({
        ...formData,
        favoritos: formData.favoritos.filter((fav) => fav !== hotelId), // EL FILTER NO CREABA OTRO ARRAY? INCONSISTENCIA DE DATOS?
      });
      console.log("Favorito eliminado");
    } catch (error) {
      console.log("Error al eliminar el favorito:", error);
    }
  };

  const handleSubmit = async (e) => {
    //AQUI SOSPECHO QUE PUEDE ESTAR EL FALLO
    e.preventDefault();
    try {
      await service.put(`/user/${formData.userId}`, {
        name: formData.name,
        profile_image: formData.profile_image,
        favoritos: formData.favoritos, //ESTO ES UN ARRAY
      });

      console.log("Perfil actualizado");
      setIsEditing(false);
      navigate("/user-profile");
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
            <p>
              <strong>Imagen de perfil:</strong>{" "}
              {formData.profile_image || "No especificada"}
            </p>
            <p>
              <strong>Hoteles favoritos:</strong> {formData.favoritos.length}{" "}
              alojamientos
            </p>

            {formData.favoritos.length > 0 && (
              <ul>
                {formData.favoritos.map((fav, index) => (
                  <li key={index}>
                    <strong>{fav}</strong>
                    {/* Botón para eliminar favorito */}
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
            {/* Nuevo botón para acceder a la página de hoteles */}
            <button
              className="btn btn-secondary mt-3 ms-3"
              onClick={goToHotels}
            >
              Ir a hoteles
            </button>
            {/* Nuevo botón para acceder a la página de reservas */}
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
                disabled
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="profile_image" className="form-label">Imagen de perfil:</label>
              <input
                type="file"
                id="profile_image"
                name="profile_image"
                className="form-control"
                value={formData.profile_image}
                onChange={handleImageChange}
                placeholder="URL de la imagen de perfil"
              />
            </div> */}
            <div>
              <label>Image: </label>
              <input
                type="file"
                name="image"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              {/* below disabled prevents the user from attempting another upload while one is already happening */}
            </div>
            ;
            {/* to render a loading message or spinner while uploading the picture */}
            {isUploading ? <h3>... uploading image</h3> : null}
            {/* below line will render a preview of the image from cloudinary */}
            {imageUrl ? (
              <div>
                <img src={imageUrl} alt="img" width={200} />
              </div>
            ) : null}


            
            <div className="mb-3">
              <label htmlFor="favoritos" className="form-label">
                Hoteles favoritos:
              </label>
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
            <button type="submit" className="btn btn-success">
              Guardar cambios
            </button>
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
