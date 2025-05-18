"use client";

import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase signOut
import Navbar from "../navbar/Navbar";
import Link from 'next/link';
import styles from '../page.module.css';
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

export default function DashboardMahasiswa() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is signed in
      } else {
        setIsLoggedIn(false); // No user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Function to handle logout and redirect
  const handleSkripsiButtonClick = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/dashboardskripsi"); // Redirect to dashboardskripsi
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Selamat Datang di Penjadwalan Sidang Mahasiswa</h1>
          <p>Atur jadwal sidang Anda dengan mudah, di mana saja.</p>
        </div>

        <div className={styles.buttons}>
          <Link href="/dashboardsempro">
            <button className={styles.btn}>Seminar Proposal</button>
          </Link>
          {/* When clicked, sign out and redirect to /dashboardskripsi */}
          <button onClick={handleSkripsiButtonClick} className={styles.btnAdmin}>
            Skripsi
          </button>
        </div>
      </div>
    </>
  );
}


