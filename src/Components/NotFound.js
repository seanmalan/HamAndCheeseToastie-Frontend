import React from 'react';

function NotFound({ item }) {
  // Generate a random number between 1 and 5
  const randomImageNumber = Math.floor(Math.random() * 5) + 1;
  const apiUrl = process.env.REACT_APP_API_URL;
  // Construct the image URL
  const imageUrl = `${apiUrl}/images/404/404-${randomImageNumber}.jpeg`;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1>{item} Not Found</h1>

      <p>Sorry, we have searched everywhere and we couldn't find any {item}.</p>
      <img src={imageUrl} className="img-fluid" style={{ maxWidth: '600px' }} alt="404 Not Found" />
    </div>
  );
}

export default NotFound;
