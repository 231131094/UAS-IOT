"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  doorLabel: string;     // OPEN / CLOSE
  actionText: string;    // Close / Open
  onAction: () => void;  // toggle door
};



export default function DoorModal({
  open,
  onClose,
  doorLabel,
  actionText,
  onAction,
}: Props) {
  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal doorModal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modalClose" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        <div className="doorBig">{doorLabel}</div>

        <button className="doorAction" onClick={onAction}>
          {actionText}
        </button>
      </div>
    </div>
  );
}
