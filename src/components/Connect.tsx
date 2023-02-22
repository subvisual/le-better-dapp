import { useConnect } from "wagmi";

export default function Connect() {
  const { connectors, isLoading, connect } = useConnect();

  return (
    <div className="connector-row">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          type="button"
          onClick={() => {
            connect({ connector });
          }}
          disabled={isLoading || !connector.ready}
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
}
