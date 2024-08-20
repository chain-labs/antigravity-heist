import { create } from "zustand";

export interface LeaderboardProps {
  id: number;
  address: string;
  amount: string;
  amountStolen: number;
  heistExecuted: number;
}

type Store = {
  leaderboard: LeaderboardProps[];
  setLeaderboard: (data: LeaderboardProps[]) => void;
};

/*
const dummyData: LeaderboardProps[] = [
  {
    id: 1,
    address: "0x1234567890",
    amount: "1000",
    amountStolen: 500,
    heistExecuted: 5,
  },
  {
    id: 2,
    address: "0x1234567890",
    amount: "1000",
    amountStolen: 500,
    heistExecuted: 5,
  },
  {
    id: 3,
    address: "0x1234567890",
    amount: "1000",
    amountStolen: 500,
    heistExecuted: 5,
  },
];
*/

export const useLeaderboardStore = create<Store>((set) => ({
  leaderboard: [],
  setLeaderboard: (data) => set({ leaderboard: data }),
}));
