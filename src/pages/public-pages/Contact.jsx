import React from "react";
import "../../styles/Contact.css";
import avatar_miguel from "../../assets/images/avatar_miguel.jpg"
import avatar_cristina from "../../assets/images/avatar_cristina.jpg"
import avatar_beyonse from "../../assets/images/avatar_beyonse.png"


function Contact() {
  return (
    
    <section className="contact-section">
      <div className="contact-page">
        
        <div className="about-us">
          <h1>Sobre Nosotros</h1>
          <p>
            Bienvenido a nuestra plataforma de reservas. Nos especializamos en
            ofrecer a nuestros clientes las mejores opciones de alojamiento en
            hoteles de todo el mundo. Nuestro equipo se dedica a brindarte una
            experiencia de reserva rápida, fácil y segura, asegurando que
            encuentres el lugar perfecto para tu próxima estancia, con servicios
            que garantizan tu comodidad y satisfacción.
          </p>
          <p>
            Contamos con años de experiencia en la industria hotelera y estamos
            comprometidos en ofrecerte el mayor valor a través de una cuidada
            selección de hoteles y servicios de alta calidad. Nuestro objetivo es
            garantizar que cada reserva te brinde la mejor experiencia posible,
            desde la comodidad hasta el servicio personalizado.
          </p>
        </div>

  
        <div className="team-section">
          <h2>Nuestro Equipo</h2>
          <div className="profile-cards">
         
            <div className="profile-card">
              <img
                src= {avatar_miguel}
                alt="Foto de Miguel Ángel Ponte"
                className="profile-photo"
              />
              <h3>Miguel Ángel Ponte</h3>
              <p>Gerente de Operaciones</p>
              <a
                href="https://linkedin.com/in/juan-perez"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                Ver perfil en LinkedIn
              </a>
            </div>

 
            <div className="profile-card">
              <img
                src={avatar_cristina}
                alt="Foto de Cristina Aguilera"
                className="profile-photo"
              />
              <h3>Cristina Aguilera</h3>
              <p>Directora de Marketing</p>
              <a
                href="https://linkedin.com/in/maria-gomez"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                Ver perfil en LinkedIn
              </a>
            </div>

            <div className="profile-card">
              <img
                src={avatar_beyonse}
                alt="Foto de Beyoncé"
                className="profile-photo"
              />
              <h3>Giselle Beyoncé</h3>
              <p>Jefa de Atención al cliente</p>
              <a
                href="https://linkedin.com/in/roberto-sanchez"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                Ver perfil en LinkedIn
              </a>
            </div>
          </div>
        </div>

      
        <div className="customer-support-section">
          <h2>Atención al Cliente</h2>
          <div className="customer-support-form">
            <form>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre..."
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu email..."
                required
              />

              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>

              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;