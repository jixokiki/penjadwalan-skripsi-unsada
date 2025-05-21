"use client";

import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase signOut
import Navbar from "../navbar/Navbar";
import Link from 'next/link';
// import styles from '../page.module.css';
import styles from './dashboard.module.scss';
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

export default function DashboardMahasiswa() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
    const [nim, setNim] = useState("");
      const [judul, setJudul] = useState("");
    //   const [jadwal, setJadwal] = useState([]);
            const [jadwal, setCheckPreloadedData] = useState([]);

      const [selectedDosen, setSelectedDosen] = useState("");
        const [searchTerm, setSearchTerm] = useState("");
      const filteredJadwal = jadwal.filter(item =>
    item.nim.toLowerCase().includes(searchTerm.toLowerCase())
  );

      useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      const userEmail = user.email;
      const extractedNim = userEmail.split("@")[0]; // Contoh: 12345678@university.edu → "12345678"
      setNim(extractedNim);
    } else {
      setIsLoggedIn(false);
    }
  });

  return () => unsubscribe();
}, []);

  useEffect(() => {
  const checkPreloadedData = async () => {
    if (!nim) return;
    console.log("NIM yang digunakan:", nim);

    const snapshot = await getDocs(
      query(collection(db, "admin_to_sempro"), where("nim", "==", nim))
    );

          const data = snapshot.docs.map(doc => doc.data());
        setCheckPreloadedData(data);
    if (!snapshot.empty) {
      const docData = snapshot.docs[0].data();
      setJudul(docData.judul || "");
      // Atur dosen secara otomatis jika diperlukan
      if (docData.dosen_penguji) setSelectedDosen(docData.dosen_penguji);
    }
  };

  checkPreloadedData();
}, [nim]);

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
      {/* {judul && (
  <div className={styles.preloadedSection}>
    <h3>📋 Data dari Admin:</h3>
    <p><strong>Judul:</strong> {judul}</p>
    {selectedDosen && (
      <p><strong>Dosen Penguji:</strong> {selectedDosen}</p>
    )}
  </div>
)} */}
        <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang:</h2>
        <ul className={styles.scheduleList}>
          {filteredJadwal.map((item, index) => (
            <li key={index} className={styles.card}>
              <p className={styles.tanggal}>{item.tanggal_sidang} • {item.jam_sidang}</p>
              <div className={styles.details}>
                <strong>NIM:</strong> {item.nim}<br />
                <strong>Pembimbing:</strong> {item.dosen_pembimbing}<br />
                <strong>Penguji:</strong> {item.dosen_penguji}<br />
                <strong>Penguji 2:</strong> {item.dosen_penguji2}<br />
                <strong>Penguji 3:</strong> {item.dosen_penguji3}<br />
                <strong>Penguji 4:</strong> {item.dosen_penguji4}<br />
                {/* <button
  className={styles.sendButton}
  onClick={() => handleSendToSempro(item)}
>
  Sudah Selesai
</button> */}

              </div>
            </li>
          ))}
        </ul>

    </>
  );
}


