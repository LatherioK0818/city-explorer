import React from 'react';
import Alert from 'react-bootstrap/Alert'; // Assuming you're using Bootstrap for styling

function ErrorMessage(props) {
  return (
    <Alert variant="danger" className="error-message">
      <Alert.Heading>Error</Alert.Heading>
      <p>{props.errorMessage}</p>
    </Alert>
  );
}

export default ErrorMessage;
