import { useAccount } from "wagmi";
import Connect from "./components/Connect";
import USDCDetails from "./components/USDCDetails";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const { address, isConnected } = useAccount();

  return (
    <div className="App">
      <h1 className="title">Le better dapp</h1>

      {isConnected ? (
        <>
          <p>Hello, {address}</p>
          <USDCDetails />
          <Link to="/nft">go to nfts</Link>
        </>
      ) : (
        <Connect />
      )}
    </div>
  );
}

export default App;
