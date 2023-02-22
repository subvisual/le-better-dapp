import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useAccount } from "wagmi";
import Connect from "./components/Connect";
import USDCDetails from "./components/USDCDetails";

function App() {
  const { address, isConnected } = useAccount();

  return (
    <div className="App">
      <h1 className="title">Le better dapp</h1>

      {isConnected ? (
        <>
          <p>Hello, {address}</p>
          <USDCDetails />
        </>
      ) : (
        <Connect />
      )}
    </div>
  );
}

export default App;
