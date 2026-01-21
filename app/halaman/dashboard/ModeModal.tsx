"use client";

type Props = {
  open: boolean;
  theme: "light" | "dark";
  onToggle: () => void;
  onClose: () => void;
};

export default function ModeModal({
  open,
  theme,
  onToggle,
  onClose,
}: Props) {
  if (!open) return null;

  const isDark = theme === "dark";

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal modeModal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modalClose" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        <div className="modeTitle">
          {isDark ? "Dark Mode" : "Light Mode"}
        </div>

        <button className="modeLink" type="button" onClick={onToggle}>
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
}
