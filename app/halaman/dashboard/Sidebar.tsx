"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenUser: () => void;
  onOpenPersonalize: () => void;
};

export default function Sidebar({
  open,
  onClose,
  onOpenUser,
  onOpenPersonalize,
}: Props) {
  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <aside
        className="sidebar"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="iconBtn closeSide" aria-label="Close menu" onClick={onClose}>
          ✕
        </button>

        <button className="sideItem" onClick={onOpenUser}>
          USER
        </button>

        <button className="sideItem" onClick={onOpenPersonalize}>
          PERSONALIZE
        </button>

        <div className="sideBottom">
          <button className="gearBtn" aria-label="Settings">
            ⚙️
          </button>
        </div>
      </aside>
    </div>
  );
}
