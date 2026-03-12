import React from 'react';

export default function App() {
  return (
    <div style={{
      backgroundColor: '#0A0F1E',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      margin: 0,
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        fontSize: 'clamp(4rem, 12vw, 9rem)',
        fontWeight: '900',
        background: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: 0,
        lineHeight: '1',
        letterSpacing: '-0.05em'
      }}>
        VEXADROP
      </h1>

      <p style={{
        fontSize: '1.5rem',
        fontWeight: '300',
        marginTop: '1.5rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        opacity: 0.9
      }}>
        The Future of Comfort is Loading<span className="loading-dots">...</span>
      </p>

      <p style={{
        fontSize: '1rem',
        marginTop: '3rem',
        opacity: 0.5,
        maxWidth: '450px',
        lineHeight: '1.6'
      }}>
        Premium lifestyle essentials for the global citizen.
      </p>

      <style>{`
        .loading-dots {
          display: inline-block;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        body { margin: 0; padding: 0; overflow: hidden; }
      `}</style>
    </div>
  );
}