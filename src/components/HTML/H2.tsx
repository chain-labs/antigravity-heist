import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export default function H2({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <h2
      style={style}
      className={twMerge(
        "text-[32px] leading-[32px] from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text",
        className,
      )}
    >
      {children}
    </h2>
  );
}
