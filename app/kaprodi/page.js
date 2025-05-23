// 'use client';
// import { useState, useEffect } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import jsPDF from "jspdf";
// import { motion } from "framer-motion";
// import Link from 'next/link';
// // import styles from '../page.module.css';
// import NavbarKaprodi from "../navbarkaprodi/page";
// import styles from './kaprodi.module.scss';


// export default function KaprodiPage() {
//   const [jadwal, setJadwal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [generations, setGenerations] = useState(50);
//   const [populationSize, setPopulationSize] = useState(10);
//   const [mutationRate, setMutationRate] = useState(0.1);
//   const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
//   const router = useRouter();
// //   const handleSendToPenguji = (item) => {
// //     // Kirim data melalui query params
// //     router.push(`/penguji?nim=${item.nim}&tanggal=${item.tanggal_sidang}&jam=${item.jam_sidang}`);
// //   };

// const handleSendToPenguji = async (item) => {
//   try {
//     await addDoc(collection(db, "penguji_selected"), {
//       nim: item.nim,
//       tanggal_sidang: item.tanggal_sidang,
//       jam_sidang: item.jam_sidang,
//       dosen_pembimbing: item.dosen_pembimbing,
//       dosen_penguji: item.dosen_penguji,
//       status: "dikirim",
//       timestamp: new Date()
//     });
//     console.log("Data berhasil dikirim ke koleksi penguji_selected");
//   } catch (error) {
//     console.error("Gagal kirim data:", error);
//   }
// };


//   useEffect(() => {
//     const fetchJadwal = async () => {
//       const snapshot = await getDocs(collection(db, "jadwal_sidang"));
//       const data = snapshot.docs.map(doc => doc.data());
//       setJadwal(data);
//     };
//     fetchJadwal();
//   }, []);

//   const generateSchedule = async () => {
//     await fetch('/api/generate-schedule', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ generations, populationSize, mutationRate, tanggalSidang })
//     });
//     window.location.reload();
//   };

//   const resetData = async () => {
//     await fetch('/api/reset-data', { method: 'POST' });
//     window.location.reload();
//   };

//   const downloadPDF = () => {
//     const docPdf = new jsPDF();
//     docPdf.text("Jadwal Sidang Mahasiswa:", 10, 10);
//     jadwal.forEach((item, index) => {
//       docPdf.text(`${index + 1}. ${item.nim} - ${item.tanggal_sidang} - ${item.dosen_pembimbing} & ${item.dosen_penguji}`, 10, 20 + (index * 10));
//     });
//     docPdf.save('jadwal-sidang-admin.pdf');
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push('/login');
//   };

//   const filteredJadwal = jadwal.filter(item =>
//     item.nim.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true); // User is signed in
//       } else {
//         setIsLoggedIn(false); // No user is signed in
//       }
//     });

//     return () => unsubscribe(); // Cleanup subscription on unmount
//   }, []);

//   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] p-8 font-sans">
// //       {/* <div className="max-w-6xl mx-auto"> */}
// //       <motion.div
// //         className="max-w-6xl mx-auto"
// //         initial={{ opacity: 0, y: 20 }}
// //   animate={{ opacity: 1, y: 0 }}
// //   transition={{ duration: 0.6, ease: "easeOut" }}
// // >
// //         <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-700 tracking-tight drop-shadow-md">📅 Kaprodi Jadwal Sidang</h1>

// //         {/* Input Setting */}
// //         {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
// //           <input type="number" min={10} max={200} value={generations} onChange={(e) => setGenerations(+e.target.value)} className="px-4 py-3 rounded-2xl shadow-inner bg-white/70 focus:ring-4 focus:ring-indigo-200 backdrop-blur-sm" placeholder="Generasi" />
// //           <input type="number" min={5} max={100} value={populationSize} onChange={(e) => setPopulationSize(+e.target.value)} className="px-4 py-3 rounded-2xl shadow-inner bg-white/70 focus:ring-4 focus:ring-indigo-200 backdrop-blur-sm" placeholder="Populasi" />
// //           <input type="number" min={0} max={1} step={0.01} value={mutationRate} onChange={(e) => setMutationRate(+e.target.value)} className="px-4 py-3 rounded-2xl shadow-inner bg-white/70 focus:ring-4 focus:ring-indigo-200 backdrop-blur-sm" placeholder="Mutasi (0.1)" />
// //           <input type="date" value={tanggalSidang} onChange={(e) => setTanggalSidang(e.target.value)} className="px-4 py-3 rounded-2xl shadow-inner bg-white/70 focus:ring-4 focus:ring-indigo-200 backdrop-blur-sm" />
// //         </div> */}
// //               <NavbarKaprodi isLoggedIn={isLoggedIn} />
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
// //   <div className="flex flex-col">
// //     <label className="text-sm text-gray-600 mb-1">Generasi</label>
// <div className={styles.wrapper}>
//   <motion.div className="max-w-6xl mx-auto">
//     <NavbarKaprodi isLoggedIn={isLoggedIn} />
//     <h1 className={styles.heading}>📅 Kaprodi Jadwal Sidang</h1>

//     <div className={styles.inputGrid}>
//       <div className={styles.inputGroup}>
//         <label>Generasi</label>
//     <input
//       type="number"
//       min={10}
//       max={200}
//       value={generations}
//       onChange={(e) => setGenerations(+e.target.value)}
//       className="px-4 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
//     />
//   </div>
//   {/* <div className="flex flex-col"> */}
//       <div className={styles.inputGrid}>
//       <div className={styles.inputGroup}>
//     <label className="text-sm text-gray-600 mb-1">Populasi</label>
//     <input
//       type="number"
//       min={5}
//       max={100}
//       value={populationSize}
//       onChange={(e) => setPopulationSize(+e.target.value)}
//       className="px-4 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
//     />
//     </div>
//   </div>
//   {/* <div className="flex flex-col"> */}
//   <div className={styles.inputGrid}>
//       <div className={styles.inputGroup}>
//     <label className="text-sm text-gray-600 mb-1">Mutasi</label>
//     <input
//       type="number"
//       min={0}
//       max={1}
//       step={0.01}
//       value={mutationRate}
//       onChange={(e) => setMutationRate(+e.target.value)}
//       className="px-4 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
//     />
//     </div>
//   </div>
//   {/* <div className="flex flex-col"> */}
//     <div className={styles.inputGrid}>
//       <div className={styles.inputGroup}>
//     <label className="text-sm text-gray-600 mb-1">Tanggal Sidang</label>
//     <input
//       type="date"
//       value={tanggalSidang}
//       onChange={(e) => setTanggalSidang(e.target.value)}
//       className="px-4 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
//     />
//     </div>
//   </div>
// </div>


//         {/* Action Button */}
//         {/* <div className="flex flex-wrap gap-4 justify-center mb-10">
//           <button onClick={generateSchedule} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
//             🚀 Generate
//           </button>
//           <button onClick={resetData} className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:brightness-110 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
//             ♻️ Reset
//           </button>
//           <button onClick={downloadPDF} className="bg-gradient-to-r from-emerald-400 to-emerald-600 hover:brightness-110 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
//             📄 PDF
//           </button>
//           <button onClick={handleLogout} className="bg-gradient-to-r from-rose-500 to-rose-700 hover:brightness-110 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
//             🚪 Logout
//           </button>
//         </div> */}

// {/* <div className="flex flex-wrap gap-4 justify-center mb-12"> */}
// <div className={styles.buttonGroup}>
//   {[
//     { label: "🚀 Generate", onClick: generateSchedule, gradient: "from-indigo-500 to-purple-600" },
//     { label: "♻️ Reset", onClick: resetData, gradient: "from-yellow-400 to-yellow-600" },
//     { label: "📄 PDF", onClick: downloadPDF, gradient: "from-emerald-400 to-emerald-600" },
//     { label: "🚪 Logout", onClick: handleLogout, gradient: "from-rose-500 to-rose-700" },
//   ].map((btn, idx) => (
//     // <button
//     //   key={idx}
//     //   onClick={btn.onClick}
//     //   className={`bg-gradient-to-r ${btn.gradient} hover:brightness-110 text-white font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300`}
//     // >
//     //   {btn.label}
//     // </button>
//     <button
//       key={idx}
//       onClick={btn.onClick}
//       className={`${styles.button} ${styles[btn.className]}`}
//     >
//       {btn.label}
//     </button>
//   ))}
// </div>


//         {/* Search */}
//         {/* <input type="text" placeholder="🔍 Cari NIM mahasiswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-inner focus:ring-4 focus:ring-indigo-200 mb-12" /> */}
//             <input
//       type="text"
//       className={styles.search}
//       placeholder="🔍 Cari NIM mahasiswa..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />

//         {/* Jadwal */}
//         {/* <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">📝 Daftar Jadwal Sidang:</h2>
//         <ul className="grid md:grid-cols-2 gap-8">
//           {filteredJadwal.map((item, index) => (
//             <li key={index} className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-[1.02] hover:shadow-2xl transition-transform">
//               <p className="text-2xl font-extrabold text-indigo-600">{item.nim}</p>
//               <p className="text-gray-600 text-lg mt-1">{item.tanggal_sidang} • {item.jam_sidang}</p>
//               <p className="text-gray-500 text-sm mt-2">{item.dosen_pembimbing} & {item.dosen_penguji}</p>
//             </li>
//           ))}
//         </ul> */}
//         <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang:</h2>
//     <ul className={styles.scheduleList}>
//       {filteredJadwal.map((item, index) => (
//         <li key={index} className={styles.card}>
//           <p className={styles.nim}>{item.nim}</p>
//           <p className={styles.tanggal}>{item.tanggal_sidang} • {item.jam_sidang}</p>
//           <p className={styles.dosen}>{item.dosen_pembimbing} & {item.dosen_penguji}</p>
//           <button
//             className={styles.sendButton}
//             onClick={() => handleSendToPenguji(item)}
//           >
//             Tampilkan di Halaman Penguji
//           </button>
//         </li>
//       ))}
//     </ul>
//       {/* </div> */}
//       </motion.div>
//     </div>
// );
// }




// KaprodiPage.jsx
"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs, addDoc } from "firebase/firestore";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import NavbarKaprodi from "../navbarkaprodi/page";
import styles from "./kaprodi.module.scss";

export default function KaprodiPage() {
  const [jadwal, setJadwal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [generations, setGenerations] = useState(50);
  const [populationSize, setPopulationSize] = useState(10);
  const [mutationRate, setMutationRate] = useState(0.1);
  const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
  const [sentJadwalIds, setSentJadwalIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchJadwal = async () => {
      const snapshot = await getDocs(collection(db, "jadwal_sidang"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJadwal(data);
    };
    fetchJadwal();
  }, []);

  const handleSendToPenguji = async (item) => {
    try {
      await addDoc(collection(db, "penguji_selected"), {
        nim: item.nim,
        tanggal_sidang: item.tanggal_sidang,
        jam_sidang: item.jam_sidang,
        dosen_pembimbing: item.dosen_pembimbing,
        dosen_penguji: item.dosen_penguji,
        dosen_penguji2: item.dosen_penguji2,
        dosen_penguji3: item.dosen_penguji3,
        dosen_penguji4: item.dosen_penguji4,
        status: "dikirim",
        timestamp: new Date(),
      });
      setSentJadwalIds((prev) => [...prev, item.id]);
      console.log("Data berhasil dikirim ke koleksi penguji_selected");
    } catch (error) {
      console.error("Gagal kirim data:", error);
    }
  };

  const generateSchedule = async () => {
    await fetch("/api/generate-schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ generations, populationSize, mutationRate, tanggalSidang }),
    });
    window.location.reload();
  };

  const resetData = async () => {
    await fetch("/api/reset-data", { method: "POST" });
    window.location.reload();
  };

  const downloadPDF = () => {
    const docPdf = new jsPDF();
    docPdf.text("Jadwal Sidang Mahasiswa:", 10, 10);
    jadwal.forEach((item, index) => {
      docPdf.text(`${index + 1}. ${item.nim} - ${item.tanggal_sidang} - ${item.dosen_pembimbing} & ${item.dosen_penguji}`, 10, 20 + (index * 10));
    });
    docPdf.save("jadwal-sidang-admin.pdf");
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const filteredJadwal = jadwal.filter(item =>
    item.nim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <NavbarKaprodi isLoggedIn={isLoggedIn} />
        <h1 className={styles.heading}>📅 Kaprodi Jadwal Sidang</h1>

        <div className={styles.inputGrid}>
          <div className={styles.inputGroup}>
            <label>Generasi</label>
            <input type="number" value={generations} onChange={(e) => setGenerations(+e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>Populasi</label>
            <input type="number" value={populationSize} onChange={(e) => setPopulationSize(+e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>Mutasi</label>
            <input type="number" step={0.01} value={mutationRate} onChange={(e) => setMutationRate(+e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>Tanggal Sidang</label>
            <input type="date" value={tanggalSidang} onChange={(e) => setTanggalSidang(e.target.value)} />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.generate}`} onClick={generateSchedule}>🚀 Generate</button>
          <button className={`${styles.button} ${styles.reset}`} onClick={resetData}>♻️ Reset</button>
          <button className={`${styles.button} ${styles.download}`} onClick={downloadPDF}>📄 PDF</button>
          <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>🚪 Logout</button>
        </div>

        <input className={styles.search} type="text" placeholder="🔍 Cari NIM mahasiswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang:</h2>
        <ul className={styles.scheduleList}>
          {filteredJadwal.map((item, index) => {
            const isSent = sentJadwalIds.includes(item.id);
            return (
              <li key={item.id} className={`${styles.card} ${isSent ? styles.sentCard : ""}`}>
                <p className={styles.nim}>{item.nim}</p>
                <p className={styles.tanggal}>{item.tanggal_sidang} • {item.jam_sidang}</p>
                <p className={styles.dosen}>Dosen Pebimbing : {item.dosen_pembimbing} </p>
                <p className={styles.dosen}>Dosen Penguji 1 : {item.dosen_penguji}</p>
                <p className={styles.dosen}>Dosen Penguji 2: {item.dosen_penguji2}</p>
                <p className={styles.dosen}>Dosen Penguji 3: {item.dosen_penguji3}</p>
                <p className={styles.dosen}>Dosen Penguji 4: {item.dosen_penguji4}</p>
                <button className={styles.sendButton} onClick={() => handleSendToPenguji(item)} disabled={isSent}>
                  {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
