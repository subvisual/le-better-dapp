import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "./lib/wagmiClient";
import App from "./App";
import "./index.css";

// Global polyfill for WalletConnect to work
(window as any).global = window;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
