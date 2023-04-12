import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "./lib/wagmiClient";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nfts from "./components/Nfts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/nft" element={<Nfts />} />
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>
);
