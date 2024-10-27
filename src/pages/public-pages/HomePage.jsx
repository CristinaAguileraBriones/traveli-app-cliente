import { Link } from 'react-router-dom';
import '../../styles/HomePage.css'; 
import tuiter from  "../../assets/images/tuiter.png"
import fb from "../../assets/images/fb.png"
import instagram from "../../assets/images/instagram.png"
import spain from "../../assets/images/spain.png"


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
  <div className="footer-content">
    <img
      src={spain} 
      alt="Bandera de España"
      className="flag-icon"
    />
    <p>&copy; 2024 Traveli. Todos los derechos reservados.</p>
    <p>Contacto: info@nuestraempresa.com</p>
    <div className="social-icons">
      <a href="https://www.facebook.com" target="_blank">
        <img src={fb} alt="Facebook" />
      </a>
      <a href="https://www.twitter.com" target="_blank">
        <img src={tuiter} alt="Twitter" />
      </a>
      <a href="https://www.instagram.com" target="_blank">
        <img src={instagram} alt="Instagram" />
      </a>
    </div>
  </div>
</footer>
    </>
  );
};

export default HomePage;