import React from 'react';
import "./Error.css"

function Error() {
  return (
    <div id="error" className="container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold error-code">404</h1>
        <p className="fs-3 text-muted">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-custom mt-4">Go Back to Home</a>
      </div>
    </div>
  );
}

export default Error;