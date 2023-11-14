import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ApplicationWriter from "./ApplicationWriter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/application",
        element: <ApplicationWriter />,
      },
      
    ],
  },
]);