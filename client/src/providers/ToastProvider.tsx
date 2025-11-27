'use client';

import { ToastContainer } from 'react-toastify';

export default function ToastProvider() {
  return (
    <ToastContainer 
      theme = 'dark'
      closeOnClick = { true }
      closeButton = { false }
      pauseOnFocusLoss = { false }
      icon={false}
      toastStyle={{
        minHeight: '40px',
        maxHeight: '60px',
        fontSize: '14px',
        padding: '8px 12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        lineHeight: '1.2',
        minWidth: '200px',
        maxWidth: '200px',
      }}
      style={{
        marginTop: '64px',
      }}
      
      />
  );
}
