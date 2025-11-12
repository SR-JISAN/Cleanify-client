import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'

import { RouterProvider } from 'react-router'
import Router from './Routes/Router.jsx'
import ContextProvider from './Context/ContextProvider.jsx'
import Loading from './Components/Loading/Loading.jsx'




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Suspense fallback={<Loading></Loading>}>   
        <RouterProvider router={Router}></RouterProvider>
      </Suspense>
    </ContextProvider>
  </StrictMode>
);
