
import { Link } from 'react-router-dom';
import './HomePage.css';  // Asegúrate de tener tu archivo CSS
//import imagenHome from "../images/home.jpg"

export const HomePage = () => {
  return (
    <>
      {/* Hero Section: Imagen de portada y encabezado */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a Traveli, tu página de reservas de hotel</h1>
          <p>¿Qué lugar del mundo vamos a explorar hoy?</p>
        </div>
        <div className="hero-image">
          <img src="path-to-your-image.jpg" alt="Imagen portada" />
        </div>
      </section>

      {/* Features or Services Section: Características o servicios */}
      <section className="features-section">
        <h2>Nuestros Servicios</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Nuestros alojamientos</h3>
            <Link to="/hotels">
              <p>¡Pincha para ver nuestros alojamientos!</p>
            </Link>
          </div>
          <div className="feature-item">
            <h3>Servicio 2</h3>
            <p>Descripción del servicio 2.</p>
          </div>
          <div className="feature-item">
            <h3>Servicio 3</h3>
            <p>Descripción del servicio 3.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section: Testimonios de clientes */}
      <section className="testimonials-section">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="testimonial-item">
          <p>"La experiencia de reserva fue rápida y sencilla. Encontré el hotel perfecto en minutos, ¡definitivamente volveré a usar esta plataforma!"</p>
          <p>- Juan Manuel Parada</p>
        </div>
        <div className="testimonial-item">
          <p>"Increíbles soluciones y atención al cliente de primer nivel."</p>
          <p>- María Gómez</p>
        </div>
      </section>

      {/* Footer Section: Pie de página */}
      <footer className="footer-section">
        <p>&copy; 2024 Nuestra Empresa. Todos los derechos reservados.</p>
        <p>Contacto: info@nuestraempresa.com</p>
      </footer>
    </>
  );
};

export default HomePage;