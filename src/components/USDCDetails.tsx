import { parseUnits } from "ethers/lib/utils.js";
import { FormEvent, useState } from "react";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const USDC_CONTRACT = "0x7b8E5E828480B1D6ea62f0194E565982285ffe67";

export default function USDCDetails() {
  const [amount, setAmount] = useState<string>();
  const [to, setTo] = useState<`0x${string}`>();

  const { address } = useAccount();

  // Get the balance of x token
  const { data: balance } = useBalance({
    address,
    token: USDC_CONTRACT,
    formatUnits: 6
  });

  // Prepare transaction with args
  const { config } = usePrepareContractWrite({
    address: USDC_CONTRACT,
    abi: erc20ABI,
    functionName: "transfer",
    args: [to as `0x${string}`, parseUnits(amount || "0", 6)],
    enabled: !!(address && amount),
  });
  const { data, isLoading, write } = useContractWrite(config);

  // on form submit
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    write?.();
  }

  return (
    <div className="token-section">
      <h3>USDC (wink wink)</h3>
      <strong>
        Balance: {balance?.formatted} {balance?.symbol}
      </strong>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="to"
          placeholder="Recipient"
          required
          onChange={(ev) => setTo(ev.target.value as `0x${string}`)}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          required
          step="any"
          onChange={(ev) => setAmount(ev.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {data && <p>{data.hash}</p>}
    </div>
  );
}
