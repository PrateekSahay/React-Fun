import React from 'react';
import './ErrorFallback.css';

/**
 * Error Fallback UI Component
 * Displays user-friendly error message with optional technical details
 */
export const ErrorFallback = ({ 
  error, 
  errorInfo, 
  onReset, 
  resetButtonText = 'Try Again',
  showDetails = false 
}) => {
  return (
    <div className="error-fallback" role="alert" aria-live="assertive">
      <div className="error-fallback__container">
        <div className="error-fallback__icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        
        <h2 className="error-fallback__title">
          Something went wrong
        </h2>
        
        <p className="error-fallback__message">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        
        {showDetails && error && (
          <details className="error-fallback__details">
            <summary>Error Details (Development Only)</summary>
            <div className="error-fallback__details-content">
              <p><strong>Error:</strong> {error.message}</p>
              {error.stack && (
                <pre className="error-fallback__stack">
                  {error.stack}
                </pre>
              )}
              {errorInfo?.componentStack && (
                <>
                  <p><strong>Component Stack:</strong></p>
                  <pre className="error-fallback__stack">
                    {errorInfo.componentStack}
                  </pre>
                </>
              )}
            </div>
          </details>
        )}
        
        <div className="error-fallback__actions">
          <button 
            onClick={onReset}
            className="error-fallback__button error-fallback__button--primary"
          >
            {resetButtonText}
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="error-fallback__button error-fallback__button--secondary"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};
