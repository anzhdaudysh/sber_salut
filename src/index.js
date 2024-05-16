import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DeviceThemeProvider } from '@salutejs/plasma-ui/components/Device'; // Типографика, имеющая размеры, зависимые от типа устройства
import { GlobalStyle } from './GlobalStyle'; // Тема оформления (цветовая схема)
import { body1, text, background, gradient } from '@salutejs/plasma-tokens';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.render(
  <DeviceThemeProvider>
      <SSRProvider>
          <App />
          <GlobalStyle />
      </SSRProvider>
  </DeviceThemeProvider>,
  document.getElementById('root'),
);

// root.render(
//   <DeviceThemeProvider responsiveTypo={true}>
//     <GlobalStyle />
//     <App />
//   </DeviceThemeProvider>,
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
