import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "./lib/wagmiClient";
import App from "./App";
import "./index.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Nfts from "./components/Nfts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/nft",
    element: <Nfts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RouterProvider router={router} />
    </WagmiConfig>
  </React.StrictMode>
);
