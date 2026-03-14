import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import  AppContextProvider  from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </HashRouter>
  ,
)
