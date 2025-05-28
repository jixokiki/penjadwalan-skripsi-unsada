// "use client";
// import { useState, useEffect } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth"; // Import the method to check auth state

// // import styles from "./dashboard.module.css"; // Import CSS untuk styling
// import Navbar from "../navbar/Navbar";
// import Link from 'next/link';
// import styles from './dashboardpenguji.module.scss';
// import NavbarPenguji from "../navbarpenguji/page";
// import { collection, getDocs, query, where, addDoc } from "firebase/firestore";



// import { auth, db } from "@/lib/firebase";

// import { useRouter } from "next/navigation";
// import jsPDF from "jspdf";

// export default function DashboardPenguji() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [jadwal, setJadwal] = useState([]);
//   const router = useRouter();
//   const user = auth.currentUser;

// //   // Check authentication state
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         setIsLoggedIn(true); // User is signed in
// //       } else {
// //         setIsLoggedIn(false); // No user is signed in
// //       }
// //     });

// //     return () => unsubscribe(); // Cleanup subscription on unmount
// //   }, []);

// //  useEffect(() => {
// //   const unsubscribe = auth.onAuthStateChanged((user) => {
// //     if (!user) {
// //       router.push("/login");
// //       return;
// //     }
// //     console.log("Login sebagai:", user.nama); // ✅ Debug


// //     const fetchJadwalPenguji = async () => {
// //       const q = query(
// //         collection(db, "jadwal_sidang"),
// //         where("penguji", "==", user.nama)
// //       );
// //       const snapshot = await getDocs(q);
// //       console.log("Jumlah data ditemukan:", snapshot.size); // ✅ Debug
// //       const data = snapshot.docs.map(doc => doc.data());
// //       setJadwal(data);
// //     };

// //     fetchJadwalPenguji();
// //   });
// //       return () => unsubscribe(); // Cleanup subscription on unmount
// //  }, []);


// useEffect(() => {
//   const unsubscribe = auth.onAuthStateChanged(async (user) => {
//     if (!user) {
//       router.push("/login");
//       return;
//     }

//     console.log("Login sebagai:", user.email); // ✅ Debug

//     // 🔍 Ambil nama dari koleksi 'penguji'
//     const pengujiRef = collection(db, "penguji");
//     const qPenguji = query(pengujiRef, where("email", "==", user.email));
//     const pengujiSnapshot = await getDocs(qPenguji);

//     if (pengujiSnapshot.empty) {
//       console.error("❌ Nama penguji tidak ditemukan di Firestore.");
//       return;
//     }

//     const namaPenguji = pengujiSnapshot.docs[0].data().nama;
//     console.log("✅ Nama penguji:", namaPenguji);

//     // ✅ Ambil data jadwal sidang berdasarkan nama
//     const qJadwal = query(
//     //   collection(db, "jadwal_sidang"),penguji_selected
//           collection(db, "penguji_selected"),
//       where("dosen_penguji", "==", namaPenguji)
//     );
//     const snapshot = await getDocs(qJadwal);
//     console.log("✅ Jumlah data ditemukan:", snapshot.size);

//     const data = snapshot.docs.map(doc => doc.data());
//     setJadwal(data);
//   });

//   return () => unsubscribe();
// }, []);


//   async function handleLogout() {
//         await signOut(auth);
//         router.push('/login');
//     }
  
//     const downloadPDF = () => {
//       const docPdf = new jsPDF();
//       docPdf.text("Jadwal Sidang Anda:", 10, 10);
//       jadwal.forEach((item, index) => {
//         docPdf.text(`${index + 1}. ${item.nim} - ${item.tanggal_sidang} - ${item.dosen_pembimbing} & ${item.dosen_penguji}`, 10, 20 + (index * 10));
//       });
//       docPdf.save('jadwal-sidang.pdf');
//     };


// const handleSendToAdmin = async (item) => {
//   try {
//     await addDoc(collection(db, "jadwalSidangMahasiswa"), item);
//     alert("Data berhasil dikirim ke Admin ✅");
//     // router.push("/admin"); // Arahkan ke halaman admin
//   } catch (error) {
//     console.error("Gagal mengirim data:", error);
//     alert("Gagal mengirim data ke admin ❌");
//   }
// };

//   return (
//     <>
//       <NavbarPenguji isLoggedIn={isLoggedIn} />
//       <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>Selamat Datang di Penjadwalan Sidang Mahasiswa</h1>
//         <p>Silahkan Tentukan Mahasiswa Anda</p>
//       </div>

//       {/* <div className={styles.buttons}>
//         <Link href="/dashboardsempro">
//           <button className={styles.btn}>Seminar Proposal</button>
//         </Link>
//         <Link href="/dashboardskripsi">
//           <button className={styles.btnAdmin}>Skripsi</button>
//         </Link>
//         <Link href="/adminLogin">
//           <button className={styles.btnAdmin}>Admin Registrasi</button>
//         </Link>
//       </div> */}
//       <div className={styles.wrapper}>
//       <h1 className={styles.heading}>Dashboard Penguji</h1>

//       {/* <button onClick={handleLogout} className="mb-6 p-2 bg-red-500 text-white rounded"> */}
//       <button onClick={handleLogout} className={styles.logoutButton}>
//         Logout
//       </button>
//       <div className="mb-6">
//         <button onClick={downloadPDF} className="p-2 bg-green-500 text-white rounded">
//           Download Jadwal (PDF)
//         </button>
//       </div>
//       {/* <h2 className="text-xl mb-2">Jadwal Mahasiswa Sidang:</h2>
//       <ul className="space-y-2">
//         {jadwal.map((item, index) => (
//           <li key={index} className="p-4 bg-gray-100 rounded shadow">
//             <strong>{item.tanggal_sidang}</strong> | {item.dosen_pembimbing} & {item.dosen_penguji}
//             <strong>{item.tanggal_sidang} • {item.jam_sidang}</strong><br />
//             NIM: {item.nim}<br />
//             Pembimbing: {item.dosen_pembimbing}<br />
//             Penguji: {item.dosen_penguji}<br/>
//             Penguji2: {item.dosen_penguji2}<br/>
//             Penguji3: {item.dosen_penguji3}<br/>
//             Penguji4: {item.dosen_penguji4}<br/>
//           </li>
//         ))}
//       </ul> */}
//       <h2 className="text-xl mb-2">Jadwal Mahasiswa Sidang:</h2>
// <ul className="space-y-2">
//   {jadwal.map((item, index) => (
//     <li key={index} className="p-4 bg-gray-100 rounded shadow">
//       <strong>{item.tanggal_sidang} • {item.jam_sidang}</strong><br />
//       NIM: {item.nim}<br />
//       Pembimbing: {item.dosen_pembimbing}<br />
//       Penguji: {item.dosen_penguji}<br />
//       Penguji2: {item.dosen_penguji2}<br />
//       Penguji3: {item.dosen_penguji3}<br />
//       Penguji4: {item.dosen_penguji4}<br />

//       <button
//         onClick={() => handleSendToAdmin(item)}
//         className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//       >
//         Kirim ke Admin
//       </button>
//     </li>
//   ))}
// </ul>

//     </div>
//     </div>
//     </>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

import styles from "./dashboardpenguji.module.scss";
import NavbarPenguji from "../navbarpenguji/page";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

export default function DashboardPenguji() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jadwal, setJadwal] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      console.log("Login sebagai:", user.email);

      const pengujiRef = collection(db, "penguji");
      const qPenguji = query(pengujiRef, where("email", "==", user.email));
      const pengujiSnapshot = await getDocs(qPenguji);

      if (pengujiSnapshot.empty) {
        console.error("❌ Nama penguji tidak ditemukan di Firestore.");
        return;
      }

      const namaPenguji = pengujiSnapshot.docs[0].data().nama;
      console.log("✅ Nama penguji:", namaPenguji);

      const qJadwal = query(
        collection(db, "penguji_selected"),
        where("dosen_penguji", "==", namaPenguji)
      );
      const snapshot = await getDocs(qJadwal);
      console.log("✅ Jumlah data ditemukan:", snapshot.size);

      const data = snapshot.docs.map((doc) => doc.data());
      setJadwal(data);
      setIsLoggedIn(true);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const downloadPDF = () => {
    const docPdf = new jsPDF();
    docPdf.text("Jadwal Sidang Anda:", 10, 10);
    jadwal.forEach((item, index) => {
      docPdf.text(
        `${index + 1}. ${item.nim} - ${item.tanggal_sidang} - ${item.dosen_pembimbing} & ${item.dosen_penguji}`,
        10,
        20 + index * 10
      );
    });
    docPdf.save("jadwal-sidang.pdf");
  };

  const handleSendToAdmin = async (item) => {
    try {
      await addDoc(collection(db, "jadwalSidangMahasiswa"), item);
      alert("Data berhasil dikirim ke Admin ✅");
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Gagal mengirim data ke admin ❌");
    }
  };

  return (
    <>
      <NavbarPenguji isLoggedIn={isLoggedIn} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Selamat Datang di Penjadwalan Sidang Mahasiswa</h1>
          <p>Silahkan Tentukan Mahasiswa Anda</p>
        </div>

        <div className={styles.wrapper}>
          <h1 className={styles.heading}>Dashboard Penguji</h1>

          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>

          <button onClick={downloadPDF} className={styles.downloadButton}>
            Download Jadwal (PDF)
          </button>

          <h2 className={styles.subheading}>Jadwal Mahasiswa Sidang:</h2>
          <ul className={styles.scheduleList}>
            {jadwal.map((item, index) => (
              <li key={index} className={styles.scheduleItem}>
                <strong>
                  {item.tanggal_sidang} • {item.jam_sidang}
                </strong>
                <br />
                NIM: {item.nim}
                <br />
                Pembimbing: {item.dosen_pembimbing}
                <br />
                Penguji: {item.dosen_penguji}
                <br />
                Penguji2: {item.dosen_penguji2}
                <br />
                Penguji3: {item.dosen_penguji3}
                <br />
                Penguji4: {item.dosen_penguji4}
                <br />
                <button
                  onClick={() => handleSendToAdmin(item)}
                  className={styles.sendButton}
                >
                  Kirim ke Admin
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
