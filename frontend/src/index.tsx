import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './Components/Layout/MainLayout/MainLayout';
import { my_vacations } from './Components/Redux/my_vacations_store';
import {Provider} from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { persister} from "./Components/Redux/my_vacations_store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<BrowserRouter>
<Provider store={my_vacations}>
 <PersistGate loading={null} persistor={persister}>
<MainLayout/>
</PersistGate>
</Provider>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
