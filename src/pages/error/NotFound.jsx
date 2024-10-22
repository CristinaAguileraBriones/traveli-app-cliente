import React from 'react';
import './NotFound.css'; // Archivo CSS para los estilos

function NotFound() {
  return (
    <div id="not-found" className="container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold not-found-code">404</h1>
        <p className="fs-3 text-muted">Sorry, the page you are looking for was not found.</p>
        <a href="/" className="btn btn-custom mt-4">Go Back to Home</a>
      </div>
    </div>
  );
}

export default NotFound;