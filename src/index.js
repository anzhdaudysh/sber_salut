import React from 'react';
import ReactDOM from 'react-dom/client';
import { DeviceThemeProvider, SSRProvider } from '@salutejs/plasma-ui';
import { GlobalStyle } from './GlobalStyle';
import App  from './App';

import './index.css';
// import reportWebVitals from './reportWebVitals';
// import { body1, text, background, gradient } from '@salutejs/plasma-tokens';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DeviceThemeProvider>
      <SSRProvider>
          <App />
          <GlobalStyle />
      </SSRProvider>
  </DeviceThemeProvider>
);

// ReactDOM.render(
//   <DeviceThemeProvider>
//       <SSRProvider>
//           <App />
//           <GlobalStyle />
//       </SSRProvider>
//   </DeviceThemeProvider>,
//   document.getElementById('root'),
// );

// // root.render(
// //   <DeviceThemeProvider responsiveTypo={true}>
// //     <GlobalStyle />
// //     <App />
// //   </DeviceThemeProvider>,
// // );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
