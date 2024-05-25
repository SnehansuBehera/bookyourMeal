import { Outlet } from "react-router-dom";
import Navigation from './pages/Auth/Navigation.jsx';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>

  )
}