"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { PiPaperPlaneTiltDuotone } from "react-icons/pi";
import { MdOutlineLoop } from "react-icons/md";
import { parseEther } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import useDarkXContract from "./abi/DarkX";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLeaderboardStore } from "@/store";

const StealFormSchema = z.object({
  victimAddress: z.string().length(42).regex(/^0x/),
  stealAmount: z.coerce.number().positive().gt(0),
});

export default function Home() {
  const account = useAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    victimAddress: string;
    stealAmount: number;
  }>({
    resolver: zodResolver(StealFormSchema),
  });
  const DarkXContract = useDarkXContract();
  const {
    writeContractAsync: steal,
    data: hash,
    error,
    reset,
  } = useWriteContract();
  const { data: receipt } = useWaitForTransactionReceipt({
    hash: hash,
  });
  const [transactionProcessing, setTransactionProcessing] = useState(false);
  const { leaderboard } = useLeaderboardStore();

  function StealAction(data: { victimAddress: string; stealAmount: number }) {
    const victimDetails = leaderboard.find(
      (leader) =>
        leader.address.toLowerCase() === data.victimAddress.toLowerCase(),
    );

    if (!victimDetails) {
      toast.error("Victim does not contributed!");
      reset();
      return;
    }

    if (Number(victimDetails.amount) < data.stealAmount) {
      toast.error("Victim has no more funds to steal!");
      reset();
      return;
    }

    if (Number(victimDetails.amount) === 0) {
      toast.error("Victim has no funds to steal!");
      reset();
      return;
    }

    setTransactionProcessing(true);

    const amountInWei = parseEther(String(data.stealAmount), "wei");
    steal({
      address: DarkXContract.address as `0x${string}`,
      abi: DarkXContract.abi,
      args: [String(data.victimAddress), String(account.address), amountInWei],
      functionName: "directTransfer",
    })
      .then((data) => {
        console.log(data);
        setTransactionProcessing(false);
        reset();
      })
      .catch((error) => {
        setTransactionProcessing(false);
        console.error(error);
      });

    return;
  }

  useEffect(() => {
    if (receipt) {
      toast.success("Transaction successful");
      setTransactionProcessing(false);
    }
  }, [receipt]);

  useEffect(() => {
    if (error) {
      setTransactionProcessing(false);
      toast.error("Transaction failed");
    }
  }, [error]);

  return (
    <main className="flex flex-col gap-[32px] p-24">
      <h1 className="text-agwhite text-[32px] font-sans font-bold ">
        Victim & Amount Input
      </h1>
      <form
        onSubmit={handleSubmit(StealAction as { (data: any): void })}
        className="flex justify-start items-center gap-4"
      >
        <Input
          placeholder="Victim Address"
          className={
            errors.victimAddress
              ? "border-2 border-agorange bg-red-100 text-agorange"
              : "border-2 border-successgreen"
          }
          disabled={!account.isConnected || leaderboard.length === 0}
          required
          {...register("victimAddress")}
        />
        <Input
          placeholder="Steal Amount"
          type="number"
          className={
            errors.stealAmount
              ? "border-2 border-agorange bg-red-100 text-agorange"
              : "border-2 border-successgreen"
          }
          disabled={!account.isConnected || leaderboard.length === 0}
          required
          {...register("stealAmount")}
        />
        <Button
          type="submit"
          disabled={!account.isConnected || leaderboard.length === 0}
        >
          {transactionProcessing ? (
            <MdOutlineLoop className="animate-spin [animation-direction:reverse]" />
          ) : (
            <PiPaperPlaneTiltDuotone />
          )}
          {transactionProcessing ? "Processing..." : "Steal"}
        </Button>
      </form>
    </main>
  );
}
