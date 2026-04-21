"use client";

import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import styles from "./index.module.css";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" width={40} height={40} />
      </div>

      <div className={styles.bottom}>
        <button
          className={styles.themeBtn}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <div className={styles.avatar}>
          <FaUserCircle />
        </div>
      </div>
    </aside>
  );
}