export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WaveformIcon({ className }: { className?: string }) {
  const bars = [5, 10, 15, 10, 5];
  return (
    <svg viewBox="0 0 24 24" className={className}>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={1.5 + i * 4.5}
          y={12 - h / 2}
          width={2.2}
          height={h}
          rx={1.1}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 5v14M6 13l6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 19V5M6 11l6-6 6 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}

export function CopyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M15 5H5a2 2 0 0 0-2 2v10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.68 10.62 20.32 3h-2.1l-5.77 6.6L7.86 3H2l6.96 9.94L2 21h2.1l6.1-6.98L15.14 21H21l-7.32-10.38Zm-2.16 2.48-.71-.99-5.63-7.87h2.24l4.54 6.35.71.99 5.9 8.26h-2.24l-4.81-6.74Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36c1.36.72 2.9 1.13 4.62 1.13 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.03c-1.5 0-2.9-.4-4.13-1.1l-.3-.17-3.08.77.82-3-.2-.31a8.02 8.02 0 0 1-1.24-4.31c0-4.46 3.63-8.09 8.13-8.09 4.5 0 8.13 3.63 8.13 8.09 0 4.46-3.63 8.12-8.13 8.12Zm4.44-6.05c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.42-.55-.42-.14 0-.3-.02-.46-.02s-.42.06-.64.3c-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function BarcodeIcon({ className }: { className?: string }) {
  const bars = [2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1];
  let x = 0;
  return (
    <svg viewBox="0 0 32 16" className={className} preserveAspectRatio="none">
      {bars.map((w, i) => {
        const rect = (
          <rect key={i} x={x} y={0} width={w} height={16} fill="currentColor" />
        );
        x += w + 1;
        return rect;
      })}
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M8 0c.6 4.4 1.2 5.4 5.6 6-4.4.6-5 1.2-5.6 6-.6-4.4-1.2-5.4-5.6-6C6.8 5.4 7.4 4.4 8 0Z" />
    </svg>
  );
}
