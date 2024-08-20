"use client";

import { condenseAddress } from "@/utils";
import request, { gql } from "graphql-request";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatUnits } from "viem";
import {
  PiBagDuotone,
  PiCoinsDuotone,
  PiCopyDuotone,
  PiIdentificationCardDuotone,
  PiWalletDuotone,
} from "react-icons/pi";
import { ImEvil } from "react-icons/im";
import { LeaderboardProps, useLeaderboardStore } from "@/store";

type graphqlData = {
  users: {
    totalMined: string;
    address: `0x${string}`;
    heistConducted: string[];
  }[];
};
function formattingNumber(number: number): React.ReactNode {
  function USAbasedNumbering(number: number) {
    return number.toLocaleString("en-US");
  }

  const stringNumber = String(number);

  if (stringNumber.includes(".")) {
    const [integer, decimal] = stringNumber.split(".");
    return (
      <>
        {USAbasedNumbering(parseInt(integer))}.<small>{decimal}</small>
      </>
    );
  }

  return USAbasedNumbering(number);
}

export default function Leaderboard() {
  const { leaderboard, setLeaderboard } = useLeaderboardStore();
  useEffect(() => {
    async function fetchData() {
      const pulseSGData: Promise<graphqlData> = request(
        "https://ag-graph.simplrhq.com/subgraphs/name/ag-pulse",
        gql`
          query GetData {
            users(orderBy: totalMined, orderDirection: desc) {
              totalMined
              address
              heistConducted {
                amount
              }
            }
          }
        `,
      );

      const baseSGData: Promise<graphqlData> = request(
        "https://base-mainnet.graph-eu.p2pify.com/1e807715234d9b5b00a85f7194690a46/sgr-427-061-956/",
        gql`
          query GetData {
            users(orderBy: totalMined, orderDirection: desc) {
              totalMined
              address
              heistConducted {
                amount
              }
            }
          }
        `,
      );

      const chainsData = await Promise.all([pulseSGData, baseSGData]);
      const rawData = chainsData.flatMap((chainData) => chainData.users);
      // sort data by totalMined
      const data = rawData.sort(
        (a, b) => Number(b.totalMined) - Number(a.totalMined),
      );

      const leaderboardData = data.map((user, index) => {
        return {
          id: index + 1,
          address: user.address,
          amount: formatUnits(BigInt(user.totalMined), 18),
          amountStolen: user.heistConducted.reduce(
            (acc, heist) => acc + Number(heist),
            0,
          ),
          heistExecuted: user.heistConducted.length,
        };
      });

      setLeaderboard(leaderboardData);
    }
    fetchData();
  }, []);

  return (
    <main className="flex flex-col gap-[32px] p-24 pt-0">
      <h1 className="text-agwhite text-[32px] mt-[32px] font-sans font-bold">
        Heist Leaderboard
      </h1>
      {leaderboard.length ? (
        <table className="table-auto text-agwhite">
          <thead className="font-sans uppercase font-extrabold tracking-widest">
            <tr>
              <th className="px-4 py-2 border border-agwhite">Id</th>
              <th className="px-4 py-2 border border-agwhite"> Address</th>
              <th className="px-4 py-2 border border-agwhite"> Amount</th>
              <th className="px-4 py-2 border border-agwhite">Amount Stolen</th>
              <th className="px-4 py-2 border border-agwhite">
                No. of Heist Executed
              </th>
            </tr>
          </thead>
          <tbody className="font-general-sans font-medium bg-gradient-to-b from-[#0A1133] to-[#142266]">
            {leaderboard.map((entry) => (
              <tr key={entry.id}>
                <td className="border px-4 py-2">{entry.id}</td>
                <td
                  className="px-4 py-2 cursor-pointer flex justify-between items-center leading-[32px] border border-agwhite"
                  title={entry.address}
                  onClick={() => {
                    navigator.clipboard.writeText(entry.address);
                    toast.success("Copied address to clipboard");
                  }}
                >
                  {condenseAddress(entry.address)}
                  <PiCopyDuotone />
                </td>
                <td className="border px-4 py-2 text-[24px] leading-[32px] font-extrabold text-agyellow">
                  {formattingNumber(Number(Number(entry.amount).toFixed(2)))}
                </td>
                <td className="border px-4 py-2">
                  {formattingNumber(Number(entry.amountStolen))}
                </td>
                <td className="border px-4 py-2">
                  {formattingNumber(Number(entry.heistExecuted))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-agwhite font-sans font-bold text-[24px] mx-auto">
          Loading Leaderboard
          <span className="animate-pulse">.</span>
          <span className="animate-pulse [animation-delay:0.2s]">.</span>
          <span className="animate-pulse [animation-delay:0.4s]">.</span>
        </div>
      )}
    </main>
  );
}
