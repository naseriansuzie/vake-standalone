import React, { CSSProperties } from 'react';

export default function Page() {
  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <span style={comingSoonStyle}>Coming Soon</span>
        <div style={additionalTextContainerStyle}>
          <span style={additionalTextStyle}>2024년 6월</span>
          <span style={additionalTextStyle}>초대기능이 오픈됩니다</span>
        </div>
      </div>
      <div>
        home
      </div>
    </div>
  );
}

const containerStyle: CSSProperties = {
  position: 'relative',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
};

const overlayStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const comingSoonStyle: CSSProperties = {
  color: 'white',
  fontSize: '3em',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const additionalTextContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const additionalTextStyle: CSSProperties = {
  color: 'white',
  fontSize: '1.5em',
};

