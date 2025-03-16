import React from "react";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <a href="/">Go Back Home</a>
    </div>
  );
}

export default NotFound;