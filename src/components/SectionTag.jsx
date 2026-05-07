export default function SectionTag({ label, className = '' }) {
  return (
    <span
      className={`font-mono-share text-xs px-2 py-1 border border-magenta text-magenta opacity-70 tracking-widest ${className}`}
    >
      {label}
    </span>
  );
}
