"use client";

import { useEffect, useState } from "react";
import "./dashboard.css";

import Sidebar from "./Sidebar";
import UserModal from "./UserModal";
import ModeModal from "./ModeModal";
import DoorModal from "./DoorModal";

type Theme = "light" | "dark";

export default function DashboardPage() {
  // ===== UI STATE =====
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [modeModalOpen, setModeModalOpen] = useState(false);
  const [doorModalOpen, setDoorModalOpen] = useState(false);

  // ===== BUSINESS STATE =====
  const [doorIsOpen, setDoorIsOpen] = useState(true);

  // ===== THEME STATE (SOURCE OF TRUTH) =====
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as Theme) ?? "light";
  });

  // ===== SENSOR DATA =====
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  // ===== GLOBAL EFFECT =====
  useEffect(() => {
    // ESC key
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setUserModalOpen(false);
        setModeModalOpen(false);
        setDoorModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // Fetch sensor
    const interval = setInterval(() => {
      fetch(
        "https://project-uas-b500e-default-rtdb.asia-southeast1.firebasedatabase.app/sensor.json"
      )
        .then((res) => res.json())
        .then(setData)
        .catch(console.error);
    }, 3000);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearInterval(interval);
    };
  }, []);

  // ===== APPLY THEME =====
  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ===== DERIVED STATE =====
  const doorLabel = doorIsOpen ? "OPEN" : "CLOSE";
  const danger = data?.suhu > 40;

  // ===== HANDLERS =====
  function openUser() {
    setSidebarOpen(false);
    setUserModalOpen(true);
  }

  function openPersonalize() {
    setSidebarOpen(false);
    setModeModalOpen(true);
  }

  function toggleDoor() {
    setDoorIsOpen((v) => !v);
    setDoorModalOpen(false);
  }

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    setModeModalOpen(false);
  }

  return (
    <main className="dash">
      <header className="topbar">
        <button
          className="iconBtn"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="hamburger">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </span>
        </button>

        <div className="brand">SMART HOME</div>
        <div className="address">Jl. Asia No. 138</div>
      </header>

      <section className="content">
        <div className="grid">
          {/* DOOR */}
          <button
            className={`card ${doorIsOpen ? "" : "activeCard"}`}
            onClick={() => danger && setDoorModalOpen(true)}
          >
            <div className="cardTop">
              <div className="cardIcon">🚪</div>
              <div className="cardTitle">DOOR</div>
            </div>
            <div className="cardValue">{data?.suhu > 40? "OPEN" : "CLOSE"}</div>
          </button>

          {/* OBJECT */}
          <div className="card">
            <div className="cardTop">
              <div className="cardIcon">🚶‍♂️</div>
              <div className="cardTitle">OBJECT DETECTION</div>
            </div>
            <div className="cardValue">{data?.jarak} cm</div>
          </div>

          {/* LED */}
          <div className="card">
            <div className="cardTop">
              <div className="cardIcon">💡</div>
              <div className="cardTitle">LED</div>
            </div>
            <div className="cardValue">{danger ? "On" : "Off"}</div>
          </div>

          {/* ALARM */}
          <div className="card">
            <div className="cardTop">
              <div className="cardIcon">🔊</div>
              <div className="cardTitle">ALARM</div>
            </div>
            <div className="cardValue">{danger ? "On" : "Off"}</div>
          </div>

          {/* TEMP */}
          <div className="card">
            <div className="cardTop">
              <div className="cardIcon">🌡️</div>
              <div className="cardTitle">TEMPERATURE</div>
            </div>
            <div className="cardValue">{data?.suhu}</div>
            <div className="pill">{data?.suhu > 45 ? "HOT" : "Normal"}</div>
          </div>

          {/* HUMID */}
          <div className="card">
            <div className="cardTop">
              <div className="cardIcon">💧</div>
              <div className="cardTitle">HUMIDITY</div>
            </div>
            <div className="cardValue">{data?.lembab ?? "0"}</div>
          </div>
        </div>
      </section>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenUser={openUser}
        onOpenPersonalize={openPersonalize}
      />

      <UserModal
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
      />

      <ModeModal
        open={modeModalOpen}
        theme={theme}
        onToggle={toggleTheme}
        onClose={() => setModeModalOpen(false)}
      />

      <DoorModal
        open={doorModalOpen}
        onClose={() => setDoorModalOpen(false)}
        doorLabel={doorLabel}
        actionText={doorIsOpen ? "Close" : "Open"}
        onAction={toggleDoor}
      />
    </main>
  );
}
