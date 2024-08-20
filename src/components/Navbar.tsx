"use client";

import { IMAGEKIT_LOGOS } from "@/assets/imageKit";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { PiWalletDuotone } from "react-icons/pi";
import { ConnectButton, useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { condenseAddress } from "@/utils";

export default function Navbar() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const account = useAccount();
  return (
    <header className="flex justify-between items-center p-8">
      <Link className="flex items-center cursor-pointer" href="/">
        <div className="w-[37px] h-[37px] xl:w-[45px] xl:h-[45px] relative">
          <Image src={IMAGEKIT_LOGOS.LOGO} alt="icon" fill />
        </div>
        <p className="from-white to-[#999999] pl-2 font-sans font-black sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
          ANTIGRAVITY HEIST
        </p>
      </Link>
      <ConnectButton />
    </header>
  );
}
