import React from "react";

const ErrorComponent = ({ errorCode = '404', errorMessage = 'Unknown Error' }) => {
  return (
    <div className="errorContainer">
      <h1 className="errorCode">{errorCode}</h1>
      <p className="errorMessage">{errorMessage}</p>
    </div>
  );
};

export default ErrorComponent;
