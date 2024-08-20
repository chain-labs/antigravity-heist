export default function H3({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 uppercase tracking-widest text-[14px] leading-[14px] from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
      {children}
    </h2>
  );
}
