import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';

const container = document.getElementById('root');

// ✅ KODE YANG DIPERBARUI:
// Periksa apakah root sudah punya konten dari prerendering
if (container && container.innerHTML !== '') {
  // Gunakan hydrate untuk konten yang sudah diprerender
  ReactDOM.hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Render normal untuk development atau jika tidak ada prerendering
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}