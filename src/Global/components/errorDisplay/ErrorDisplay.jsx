import React from 'react';
import './ErrorDisplay.sass';
function ErrorDisplay({ errorMessage }) {
  return (
    <>
      {errorMessage ? (
        <div className="ErrorDisplay">
          <div className="ErrorDisplay__container">
            <p className="ErrorDisplay__container__message">{errorMessage}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default ErrorDisplay;
