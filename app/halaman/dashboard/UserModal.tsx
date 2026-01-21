"use client";

type Props = { open: boolean; onClose: () => void };

export default function UserModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal userModal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modalClose" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        <div className="userTop">
          <div className="userAvatar">🙂</div>

          <div>
            <div className="userNameRow">
              <div className="userName">Andrew</div>
              <div className="userEdit">✎</div>
            </div>
          </div>
        </div>

        <div className="userField">
          <div className="userLabelRow">
            Username <span className="userEdit">✎</span>
          </div>
          <div className="userValue">andrew123</div>
        </div>

        <div className="userField">
          <div className="userLabelRow">
            Address <span className="userEdit">✎</span>
          </div>
          <div className="userValue">Jl. Asia No. 138</div>
        </div>

        <div className="userField">
          <div className="userLabelRow">
            Password <span className="userEdit">✎</span>
          </div>
          <div className="userValue">********</div>
        </div>

        <button className="userLogout">Log Out</button>
      </div>
    </div>
  );
}
