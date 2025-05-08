import { RouterProvider } from "react-router-dom";
import { router } from "./router"; // or wherever the router is defined
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainApp() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default MainApp;