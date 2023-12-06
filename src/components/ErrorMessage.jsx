import React from 'react';
import Alert from 'react-bootstrap/Alert'; // Assuming you're using Bootstrap for styling

function ErrorMessage({ message }) {
  return (
    <Alert variant="danger" className="error-message">
      <Alert.Heading>Error</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}

export default ErrorMessage;
