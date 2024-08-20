import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";
import { CONTRACTS } from "../config";

const contracts: Record<
  number,
  { address: `0x${string}` | undefined; abi: any }
> = {
  [sepolia.id]: {
    address: CONTRACTS[sepolia.id].darkX,
    abi,
  },
  [baseSepolia.id]: {
    address: CONTRACTS[baseSepolia.id].darkX,
    abi,
  },
  [pulsechain.id]: {
    address: CONTRACTS[pulsechain.id].darkX,
    abi,
  },
  [base.id]: {
    address: CONTRACTS[base.id].darkX,
    abi,
  },
};

const useDarkXContract = (): IContract => {
  const account = useAccount();
  if (account.chain?.id === pulsechain.id) {
    return contracts[pulsechain.id];
  } else if (account.chain?.id === base.id) {
    return contracts[base.id];
  }

  return {};
};

export default useDarkXContract;
