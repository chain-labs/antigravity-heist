import { twMerge } from "tailwind-merge";

export default function H1({
  children,
  center = false,
  className = "",
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <h1
      style={{
        textAlign: center ? "center" : "left",
      }}
      className={twMerge(
        "text-[44px] leading-[44px] md:text-[48px] md:leading-[48px] from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text",
        className,
      )}
    >
      {children}
    </h1>
  );
}
