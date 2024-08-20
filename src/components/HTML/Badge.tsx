import { twMerge } from "tailwind-merge";

export function Badge({
  children,
  special = false,
  gradient = false,
  className,
}: {
  children: React.ReactNode;
  special?: boolean;
  gradient?: boolean;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "text-[12px] leading-[12px] relative flex items-center gap-[8px] justify-center font-sans font-extrabold text-agwhite cursor-pointer rounded-full py-[4px] px-[8px] border-2 uppercase tracking-widest w-fit text-nowrap",
        special &&
          "text-agyellow font-extrabold bg-gradient-to-b from-[#0A1133] to-[#142266] border-none",
        gradient
          ? "bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
          : "",
        className ?? "",
      )}
    >
      {children}
    </div>
  );
}
