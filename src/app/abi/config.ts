import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";

type Address = `0x${string}`;

export const CONTRACTS: Record<
  number,
  {
    darkX: Address;
  }
> = {
  [sepolia.id]: {
    darkX: "0xb1BF01E195D511509B12D980769351eF5255eE0f",
  },
  [baseSepolia.id]: { darkX: "0xdE87E198D2A5d6894a03AfCb34876601A6dd226f" },
  [pulsechain.id]: {
    darkX: "0x5ecc92CE4B271C32c6DFBC23bd3b15EcC54ea9B6",
  },
  [base.id]: {
    darkX: "0x6a3282ec6a687105e1B71327bf6B2e7db9A7e889",
  },
};
