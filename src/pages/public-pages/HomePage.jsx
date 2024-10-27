import { Link } from 'react-router-dom';
import '../../styles/HomePage.css';  


export const HomePage = () => {
  return (
    <>
     
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a Traveli, reserva tu hotel</h1>
          <p>¿Qué lugar del mundo vamos a explorar hoy?</p>
          
        </div>
        <div className="hero-image">
         
        </div>
      </section>


      <section className="features-section">
        <h2>Nuestros Servicios</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Nuestros alojamientos</h3>
            <Link to="/hotels">
              <p>¡Pincha para ver nuestros alojamientos!</p>
            </Link>
          </div>
          <div className="feature-item-reserva">
            <h3>Tus reservas</h3>
            <Link to="/misreservas">
            <p>Regístrate en nuestra web y empieza a reservar tu hotel de ensueño</p>
            </Link>
          </div>
          
        </div>
      </section>

   
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

      <footer className="footer-section">
        <p>&copy; 2024 Nuestra Empresa. Todos los derechos reservados.</p>
        <p>Contacto: info@nuestraempresa.com</p>
      </footer>
    </>
  );
};

export default HomePage;