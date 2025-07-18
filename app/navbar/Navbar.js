// Navbar.js
"use client";
import { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { useRouter } from 'next/navigation'; // Import useRouter
import styles from "./navbar.module.scss"; // Create this CSS file for styling


import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import jsPDF from "jspdf";

export default function Navbar({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Create router instance

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Logout failed: ", error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/dashboardmahasiswa">Sidang</Link> {/* Dashboard link */}
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {/* Hamburger Icon */}
        <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
      </div>
      <ul className={`${styles.menu} ${isOpen ? styles.active : ""}`}>
        <li className={styles.menuItem}>
          <Link href="/dashboardmahasiswa">Home</Link> {/* Home link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/dosenlist">Dosen List</Link> {/* Dosen List link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/mahasiswalist">Mahasiswa List</Link> {/* Mahasiswa List link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/listjadwalsempromahasiswa">Jadwal Sempro</Link> {/* Mahasiswa List link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/listjadwalskripsimahasiswa">Jadwal Skripsi</Link> {/* Mahasiswa List link */}
        </li>
        {/* <li className={styles.menuItem}>
          <Link href="/services">Services</Link>
        </li> */}
        {/* <li className={styles.menuItem}>
          <Link href="/contact">Contact</Link> 
        </li> */}
        <li className={styles.menuItem}>
          <Link href="/filerevisi">Revisi</Link> 
        </li>
        <li className={styles.menuItem}>
          <Link href="/filenilai">Nilai Sempro</Link>
        </li>
        {/* Show logout option only if logged in */}
        {isLoggedIn && (
          <li className={styles.menuItem}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
