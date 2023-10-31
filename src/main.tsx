import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import PageOrganizations from "./PageOrganizations.tsx";
import PageOrganization from "./PageOrganization.tsx";
import Auth from "./Auth.tsx";
import Profile from "./Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/orgs",
    element: <PageOrganizations />,
  },
  {
    path: "/orgs/:orgId",
    element: <PageOrganization />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `https://hello-world.example.com`,
      }}
      cacheLocation="localstorage"
    >
      <Profile />
      <RouterProvider router={router} />
      <Auth />
    </Auth0Provider>
  </React.StrictMode>
);
