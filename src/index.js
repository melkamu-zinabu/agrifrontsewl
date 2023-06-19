
//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './components/auserauth/store';
import { PersistGate } from 'redux-persist/lib/integration/react';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          
    <Router>
      
      <Routes>
        <Route path="/*" element={<App />} />

      </Routes>

  </Router>
      </PersistGate>
    </Provider>

   

  </React.StrictMode>
);


