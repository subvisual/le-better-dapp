import { createClient, configureChains, mainnet, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { provider, webSocketProvider, chains } = configureChains(
  [mainnet, goerli],
  [publicProvider()],
  { pollingInterval: 10_000 }
);

export const wagmiClient = createClient({
  provider,
  webSocketProvider,

  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
});
