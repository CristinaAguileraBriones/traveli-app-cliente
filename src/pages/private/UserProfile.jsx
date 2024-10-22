import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../../service/config";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const { authenticateUser } = useContext(AuthContext); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: '', 
    name: '',
    email: '',
    profile_image: '',
    favoritos: []
  });
  
  const navigate = useNavigate(); // Hook de React Router para redirigir al usuario

  // Efecto para cargar la información del perfil del usuario
  useEffect(() => {
    const perfilUsuario = async () => {
      try {
        const response = await service.get("/user/profile");
        const { user } = response.data; 

        setFormData({
          userId: user._id, 
          name: user.name,
          email: user.email,
          profile_image: user.profile_image || '',
          favoritos: user.favoritos || []
        });
      } catch (error) {
        console.log("Error al obtener los datos del usuario", error);
      }
    };

    perfilUsuario();
  }, []);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para manejar la actualización de perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/user/${formData.userId}`, {
        name: formData.name,
        profile_image: formData.profile_image,
        favoritos: formData.favoritos
      });

      console.log('Perfil actualizado');
      setIsEditing(false);
      navigate("/user-profile");
    } catch (error) {
      console.log('Error al actualizar el perfil:', error);
    }
  };

  // Función para redirigir a la página de hoteles
  const goToHotels = () => {
    navigate("/hotels");
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="col-lg-8 col-md-10 bg-white p-4 shadow rounded">
        <h1 className="mb-4">Perfil de Usuario</h1>

        {!isEditing ? (
          <div>
            <p><strong>Nombre:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Imagen de perfil:</strong> {formData.profile_image || "No especificada"}</p>
            <p><strong>Hoteles favoritos:</strong> {formData.favoritos.length} alojamientos</p>
            <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>
              Editar Perfil
            </button>
            {/* Nuevo botón para acceder a la página de hoteles */}
            <button 
              className="btn btn-secondary mt-3 ms-3"
              onClick={goToHotels}
            >
              Ir a hoteles
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
                disabled 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="profile_image" className="form-label">Imagen de perfil:</label>
              <input
                type="text"
                id="profile_image"
                name="profile_image"
                className="form-control"
                value={formData.profile_image}
                onChange={handleChange}
                placeholder="URL de la imagen de perfil"
              />
            </div>

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
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;