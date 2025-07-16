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



//UPDATE TERBARU VERSION 2.0
// // KaprodiPage.jsx
// "use client";
// import { useState, useEffect } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import jsPDF from "jspdf";
// import { motion } from "framer-motion";
// import NavbarKaprodi from "../navbarkaprodi/page";
// import styles from "./kaprodi.module.scss";


// export default function KaprodiPage() {
//   const [jadwal, setJadwal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [generations, setGenerations] = useState(50);
//   const [populationSize, setPopulationSize] = useState(10);
//   const [mutationRate, setMutationRate] = useState(0.1);
//   const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
//   const [sentJadwalIds, setSentJadwalIds] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   const [filterAngkatan, setFilterAngkatan] = useState("");
// const [filterJurusan, setFilterJurusan] = useState("");


//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsLoggedIn(!!user);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchJadwal = async () => {
//       const snapshot = await getDocs(collection(db, "jadwal_sidang"));
//       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setJadwal(data);
//     };
//     fetchJadwal();
//   }, []);

//   const [mahasiswaSempro, setMahasiswaSempro] = useState([]);
//   const [mahasiswaSemproJadwal, setMahasiswaSemproJadwal] = useState([]);


// useEffect(() => {
//   const fetchMahasiswa = async () => {
//     const snapshot = await getDocs(collection(db, "usersSempro"));
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setMahasiswaSempro(data);
//   };
//   fetchMahasiswa();
// }, []);


// const [listAngkatan, setListAngkatan] = useState([]);
// const [listJurusan, setListJurusan] = useState([]);

// useEffect(() => {
//   const fetchMahasiswa = async () => {
//     const snapshot = await getDocs(collection(db, "usersSempro"));
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setMahasiswaSempro(data);

//     // Ambil angkatan & jurusan unik
//     const angkatanUnik = [...new Set(data.map(item => item.angkatan))];
//     const jurusanUnik = [...new Set(data.map(item => item.jurusan))];
//     setListAngkatan(angkatanUnik);
//     setListJurusan(jurusanUnik);
//   };
//   fetchMahasiswa();
// }, []);

// const [mahasiswaSkripsi, setMahasiswaSkripsi] = useState([]);

// useEffect(() => {
//   const fetchMahasiswa = async () => {
//     const snapshot = await getDocs(collection(db, "usersSkripsi"));
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setMahasiswaSkripsi(data);
//   };
//   fetchMahasiswa();
// }, []);

// const [listAngkatanSkripsi, setListAngkatanSkripsi] = useState([]);
// const [listJurusanSkripsi, setListJurusanSkripsi] = useState([]);

// useEffect(() => {
//   const fetchMahasiswa = async () => {
//     const snapshot = await getDocs(collection(db, "usersSkripsi"));
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setMahasiswaSkripsi(data);

//     // Ambil angkatan & jurusan unik
//     const angkatanUnik = [...new Set(data.map(item => item.angkatan))];
//     const jurusanUnik = [...new Set(data.map(item => item.jurusan))];
//     setListAngkatanSkripsi(angkatanUnik);
//     setListJurusanSkripsi(jurusanUnik);
//   };
//   fetchMahasiswa();
// }, []);

//   const handleSendToPenguji = async (item) => {
//     try {
//       await addDoc(collection(db, "penguji_selected"), {
//         nim: item.nim,
//         tanggal_sidang: item.tanggal_sidang,
//         jam_sidang: item.jam_sidang,
//         dosen_pembimbing: item.dosen_pembimbing,
//         dosen_penguji: item.dosen_penguji,
//         dosen_penguji2: item.dosen_penguji2,
//         dosen_penguji3: item.dosen_penguji3,
//         dosen_penguji4: item.dosen_penguji4,
//         formulir: item.formulir,
//         status: "dikirim",
//         timestamp: new Date(),
//       });
//       setSentJadwalIds((prev) => [...prev, item.id]);
//       console.log("Data berhasil dikirim ke koleksi penguji_selected");
//     } catch (error) {
//       console.error("Gagal kirim data:", error);
//     }
//   };

//   const generateSchedule = async () => {
//     await fetch("/api/generate-schedule", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ generations, populationSize, mutationRate, tanggalSidang }),
//     });
//     window.location.reload();
//   };

//   const [loading, setLoading] = useState(false);
//   // const [jadwalSidang, setJadwalSidang] = useState([]);
//   const [jadwalSidangSempro, setJadwalSidangSempro] = useState([]);
// const [jadwalSidangSkripsi, setJadwalSidangSkripsi] = useState([]);



//   // const handleGenerate = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const res = await fetch("/api/generate-schedule", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         generations: 50,
//   //         populationSize: 10,
//   //         mutationRate: 0.1,
//   //         tanggalSidang: new Date().toISOString().split("T")[0], // 📅 Hari ini
//   //       }),
//   //     });

//   //     const result = await res.json();
//   //     alert(result.message);
//   //     console.log("📅 Jadwal hasil GA:", result.schedule);
//   //   } catch (err) {
//   //     console.error("❌ Gagal membuat jadwal", err);
//   //     alert("Terjadi kesalahan saat membuat jadwal.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// //   const handleGenerate = async () => {
// //   setLoading(true);
// //   try {
// //     const res = await fetch("/api/generate-schedule", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         generations: 50,
// //         populationSize: 10,
// //         mutationRate: 0.1,
// //         tanggalSidang: new Date().toISOString().split("T")[0],
// //       }),
// //     });

// //     const result = await res.json();
// //     setJadwalSidang(result.schedule); // ⬅️ simpan ke state
// //     alert(result.message);
// //   } catch (error) {
// //     console.error("❌ Gagal membuat jadwal:", error);
// //     alert("Terjadi kesalahan saat membuat jadwal.");
// //   } finally {
// //     setLoading(false);
// //   }
// // };



// // const handleGenerateSempro = async (nim) => {
// //   setLoading(true);
// //   try {
// //     const res = await fetch("/api/generate-schedule-bynim", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         generations: 50,
// //         populationSize: 10,
// //         mutationRate: 0.1,
// //         tanggalSidang: new Date().toISOString().split("T")[0],
// //         targetNIM: nim, // Kirim NIM terpilih
// //         formulir: "Sempro",
// //       }),
// //     });

// //     const result = await res.json();
// //     setJadwalSidang([result.schedule]); // hanya 1 item (array berisi satu object)
// //     alert(result.message);
// //   } catch (error) {
// //     console.error("❌ Gagal membuat jadwal:", error);
// //     alert("Terjadi kesalahan saat membuat jadwal.");
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// // const handleGenerateSkripsi = async (nim) => {
// //   setLoading(true);
// //   try {
// //     const res = await fetch("/api/generate-schedule-bynim", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         generations: 50,
// //         populationSize: 10,
// //         mutationRate: 0.1,
// //         tanggalSidang: new Date().toISOString().split("T")[0],
// //         targetNIM: nim, // Kirim NIM terpilih
// //       }),
// //     });

// //     const result = await res.json();
// //     setJadwalSidang([result.schedule]); // hanya 1 item (array berisi satu object)
// //     alert(result.message);
// //   } catch (error) {
// //     console.error("❌ Gagal membuat jadwal:", error);
// //     alert("Terjadi kesalahan saat membuat jadwal.");
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// const handleGenerateSempro = async (nim) => {
//   setLoading(true);
//   try {
//     const res = await fetch("/api/generate-schedule-bynimsempro", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         generations: 50,
//         populationSize: 10,
//         mutationRate: 0.1,
//         tanggalSidang: new Date().toISOString().split("T")[0],
//         targetNIM: nim,
//         formulir: "Sempro", // pastikan dikirimkan
//       }),
//     });

//     const result = await res.json();

//     if (result.schedule?.formulir === "Sempro") {
//       setJadwalSidangSempro([result.schedule]);
//     }

//     alert(result.message);
//   } catch (error) {
//     console.error("❌ Gagal membuat jadwal:", error);
//     alert("Terjadi kesalahan saat membuat jadwal.");
//   } finally {
//     setLoading(false);
//   }
// };



// // useEffect(() => {
// //   const fetchData = async () => {
// //     const usersRef = collection(db, "usersSempro");
// //     const jadwalRef = collection(db, "jadwal_sidang");

// //     const [usersSnap, jadwalSnap] = await Promise.all([
// //       getDocs(usersRef),
// //       getDocs(jadwalRef)
// //     ]);

// //     const jadwalMap = new Map();
// //     jadwalSnap.docs.forEach(doc => {
// //       const data = doc.data();
// //       jadwalMap.set(data.nim, { ...data, id: doc.id });
// //     });

// //     const merged = usersSnap.docs
// //       .map(doc => {
// //         const mhs = doc.data();
// //         const jadwal = jadwalMap.get(mhs.nim);
// //         return jadwal ? { ...mhs, jadwal } : null;
// //       })
// //       .filter(Boolean)
// //       .sort((a, b) => a.jadwal.timestamp?.seconds - b.jadwal.timestamp?.seconds); // Urut dari paling lama daftar

// //     setMahasiswaSemproJadwal(merged);
// //   };

// //   fetchData();
// // }, []);

// // const [currentPage, setCurrentPage] = useState(1);
// // const pageSize = 10;

// // const paginatedData = mahasiswaSemproJadwal.slice(
// //   (currentPage - 1) * pageSize,
// //   currentPage * pageSize
// // );

// // const aktifMahasiswa = mahasiswaSemproJadwal.filter(m => m.kelulusan !== "lulus");


// const [mahasiswaBaruBelumAdaJadwal, setMahasiswaBaruBelumAdaJadwal] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     const usersRef = collection(db, "usersSempro");
//     const jadwalRef = collection(db, "jadwal_sidang");

//     const [usersSnap, jadwalSnap] = await Promise.all([
//       getDocs(usersRef),
//       getDocs(jadwalRef)
//     ]);

//     const jadwalMap = new Map();
//     jadwalSnap.docs.forEach(doc => {
//       const data = doc.data();
//       jadwalMap.set(data.nim, { ...data, id: doc.id });
//     });

//     const merged = usersSnap.docs
//       .map(doc => {
//         const mhs = doc.data();
//         const jadwal = jadwalMap.get(mhs.nim);
//         return jadwal ? { ...mhs, jadwal } : null;
//       })
//       .filter(Boolean)
//       .sort((a, b) => a.jadwal.timestamp?.seconds - b.jadwal.timestamp?.seconds);

//     setMahasiswaSemproJadwal(merged);

//     // Mahasiswa yang belum dapat jadwal:
//     const mahasiswaBaru = usersSnap.docs
//       .map(doc => doc.data())
//       .filter(mhs => !jadwalMap.has(mhs.nim));

//     setMahasiswaBaruBelumAdaJadwal(mahasiswaBaru);
//   };

//   fetchData();
// }, []);

// const [currentPage, setCurrentPage] = useState(1);
// const pageSize = 10;

// const paginatedData = mahasiswaSemproJadwal.slice(
//   (currentPage - 1) * pageSize,
//   currentPage * pageSize
// );



// const handleGenerateSkripsi = async (nim) => {
//   setLoading(true);
//   try {
//     const res = await fetch("/api/generate-schedule-bynimskripsi", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         generations: 50,
//         populationSize: 10,
//         mutationRate: 0.1,
//         tanggalSidang: new Date().toISOString().split("T")[0],
//         targetNIM: nim,
//         formulir: "Skripsi", // pastikan dikirimkan
//       }),
//     });

//     const result = await res.json();

//     if (result.schedule?.formulir === "Skripsi") {
//       setJadwalSidangSkripsi([result.schedule]);
//     }

//     alert(result.message);
//   } catch (error) {
//     console.error("❌ Gagal membuat jadwal:", error);
//     alert("Terjadi kesalahan saat membuat jadwal.");
//   } finally {
//     setLoading(false);
//   }
// };





//   const resetData = async () => {
//     await fetch("/api/reset-data", { method: "POST" });
//     window.location.reload();
//   };

//   const downloadPDF = () => {
//     const docPdf = new jsPDF();
//     docPdf.text("Jadwal Sidang Mahasiswa:", 10, 10);
//     jadwal.forEach((item, index) => {
//       docPdf.text(`${index + 1}. ${item.nim} - ${item.tanggal_sidang} - ${item.dosen_pembimbing} & ${item.dosen_penguji}`, 10, 20 + (index * 10));
//     });
//     docPdf.save("jadwal-sidang-admin.pdf");
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push("/login");
//   };

//   const filteredJadwal = jadwal.filter(item =>
//     item.nim.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className={styles.wrapper}>
//       <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//         <NavbarKaprodi isLoggedIn={isLoggedIn} />
//         {/* <h2 className={styles.subheading}>📋 Daftar Data Mahasiswa Sempro:</h2>
// <ul className={styles.scheduleList}>
//   {mahasiswaSempro
//     .filter(item => item.nim.toLowerCase().includes(searchTerm.toLowerCase()))
//     .map((mhs) => (
//       <li key={mhs.id} className={styles.card}>
//         <p className={styles.nim}>{mhs.nim}</p>
//         <p className={styles.tanggal}>Nama: {mhs.nama}</p>
//         <p className={styles.dosen}>Judul: {mhs.judul}</p>
//         <p className={styles.dosen}>Jurusan: {mhs.jurusan} • Angkatan: {mhs.angkatan}</p>
//         <p className={styles.dosen}>WA: {mhs.noWhatsapp}</p>
//                         <a href={mhs.pengajuanSidangUrl} target="_blank" rel="noopener noreferrer">File Pengajuan Sidang</a><br />
//                 <a href={mhs.krsUrl} target="_blank" rel="noopener noreferrer">KRS</a><br />
//                 <a href={mhs.daftarNilaiUrl} target="_blank" rel="noopener noreferrer">Daftar Nilai</a><br />
//                 <a href={mhs.fileTA1Url} target="_blank" rel="noopener noreferrer">File TA1</a>
//       </li>
//   ))}
// </ul> */}

// {/* <div className={styles.verticalScroll}>
//   {paginatedData.map((mhs, index) => (
//     <div key={mhs.nim} className={styles.cardBox}>
//       <strong>{mhs.nama}</strong>
//       <p>NIM: {mhs.nim}</p>
//       <p>Judul: {mhs.judul}</p>
//       <p>📅 {mhs.jadwal.tanggal_sidang} • {mhs.jadwal.jam_sidang}</p>
//       <p>Pembimbing: {mhs.jadwal.dosen_pembimbing}</p>
//       <p>Penguji 1: {mhs.jadwal.dosen_penguji}</p>
//       <p>Zoom: {mhs.jadwal.link_zoom || "Belum diisi"}</p>
//     </div>
//   ))}
// </div>

// <div className={styles.pagination}>
//   <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>⬅️ Prev</button>
//   <span>Page {currentPage}</span>
//   <button disabled={currentPage * pageSize >= mahasiswaSemproJadwal.length} onClick={() => setCurrentPage(p => p + 1)}>Next ➡️</button>
// </div> */}


// <div className={styles.verticalScroll}>
//   {paginatedData.map((mhs, index) => (
//     <div key={mhs.nim} className={styles.cardBox}>
//       <strong>{mhs.nama}</strong>
//       <p>NIM: {mhs.nim}</p>
//       <p>Judul: {mhs.judul}</p>
//       <p>📅 {mhs.jadwal.tanggal_sidang} • {mhs.jadwal.jam_sidang}</p>
//       <p>Pembimbing: {mhs.jadwal.dosen_pembimbing}</p>
//       <p>Penguji 1: {mhs.jadwal.dosen_penguji}</p>
//       <p>Zoom: {mhs.jadwal.link_zoom || "Belum diisi"}</p>
//     </div>
//   ))}
// </div>

// <div className={styles.pagination}>
//   <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>⬅️ Prev</button>
//   <span>Page {currentPage}</span>
//   <button disabled={currentPage * pageSize >= mahasiswaSemproJadwal.length} onClick={() => setCurrentPage(p => p + 1)}>Next ➡️</button>
// </div>
// {mahasiswaBaruBelumAdaJadwal.length >= 10 && (
//   <button onClick={handleGenerateBatch} className={styles.generateButton}>
//     🔥 Generate Batch Baru
//   </button>
// )}



// <h2 className={styles.subheading}>📋 Daftar Data Mahasiswa Sempro:</h2>
// <div className={styles.filterContainer}>
//   <select onChange={(e) => setFilterAngkatan(e.target.value)} className={styles.dropdown}>
//     <option value="">📅 Semua Angkatan</option>
//     {listAngkatan.map((angkatan) => (
//       <option key={angkatan} value={angkatan}>{angkatan}</option>
//     ))}
//   </select>

//   <select onChange={(e) => setFilterJurusan(e.target.value)} className={styles.dropdown}>
//     <option value="">🎓 Semua Jurusan</option>
//     {listJurusan.map((jurusan) => (
//       <option key={jurusan} value={jurusan}>{jurusan}</option>
//     ))}
//   </select>
// </div>

// {/* <div className={styles.gridListmahasiswa}>
//   {mahasiswaSempro
//     .filter(item => item.nim.toLowerCase().includes(searchTerm.toLowerCase()))
//     .map((mhs) => (
//       <div key={mhs.id} className={styles.cardmahasiswa}>
//         <p className={styles.nimmahasiswa}>{mhs.nim}</p>
//         <p className={styles.namamahasiswa}>📛 {mhs.nama}</p>
//         <p className={styles.detailmahasiswa}>🎓 {mhs.jurusan} ({mhs.angkatan})</p>
//         <p className={styles.detailmahasiswa}>📄 {mhs.judul}</p>
//         <p className={styles.detailmahasiswa}>📱 {mhs.noWhatsapp}</p>
//       </div>
//   ))}
// </div> */}
// <div className={styles.gridListmahasiswa}>
//   {mahasiswaSempro
//     .filter(item =>
//       item.nim.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterAngkatan === "" || item.angkatan === filterAngkatan) &&
//       (filterJurusan === "" || item.jurusan === filterJurusan)
//     )
//     .map((mhs) => (
//       <div key={mhs.id} className={styles.cardmahasiswa}>
//                 <h3 className={styles.headingSempro}>Mahasiswa Sempro</h3>
//         <p className={styles.nimmahasiswa}>{mhs.nim}</p>
//         <p className={styles.namamahasiswa}>📛 {mhs.nama}</p>
//         <p className={styles.detailmahasiswa}>🎓 {mhs.jurusan} ({mhs.angkatan})</p>
//         <p className={styles.detailmahasiswa}>📄 {mhs.judul}</p>
//         <p className={styles.detailmahasiswa}>📱 {mhs.noWhatsapp}</p>
//             {/* <button
//   onClick={() => handleGenerateSempro(mhs.nim)} // ⬅️ Kirim NIM
//   disabled={loading}
//   className={styles.generateButton}
// >
//   {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
// </button> */}
// <button
//   onClick={() => handleGenerateSempro(mhs.nim, "Sempro")} // ✅ Kirim NIM dan formulir
//   disabled={loading}
//   className={styles.generateButton}
// >
//   {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
// </button>

//       </div>
//   ))}
// </div>

// {/* {jadwalSidang.length > 0 && jadwalSidang[0]?.formulir === "Sempro" &&(
//   <div className={styles.gridListmahasiswa}>
//     <h2 className={styles.subheading}>🧬 Jadwal Sidang Otomatis (1 Mahasiswa & Kategori: Sempro)</h2>
//     {jadwalSidang.map((jadwal, index) => {
//       const isSent = sentJadwalIds.includes(jadwal.id);
//       return(
//       <div key={index} className={styles.cardmahasiswa}>
//         <p>📛 NIM: {jadwal.nim}</p>
//         <p>👨‍🏫 Pembimbing: {jadwal.dosen_pembimbing}</p>
//         <p>🧑‍⚖️ Penguji 1: {jadwal.dosen_penguji}</p>
//         <p>🧑‍⚖️ Penguji 2: {jadwal.dosen_penguji2}</p>
//         <p>🧑‍⚖️ Penguji 3: {jadwal.dosen_penguji3}</p>
//         <p>🧑‍⚖️ Penguji 4: {jadwal.dosen_penguji4}</p>
//         <p>📅 Tanggal Sidang: {jadwal.tanggal_sidang}</p>
//         <p>⏰ Jam Sidang: {jadwal.jam_sidang}</p>
//                         <button className={styles.sendButton} onClick={() => handleSendToPenguji(item)} disabled={isSent}>
//                   {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
//                 </button>
//       </div>
//       );
// })}
//   </div>
// )} */}


// {jadwalSidangSempro.length > 0 && (
//   <div className={styles.gridListmahasiswa}>
//     <h2 className={styles.subheading}>🧬 Jadwal Sidang Otomatis (Kategori: Sempro)</h2>
//     {jadwalSidangSempro.map((jadwal, index) => {
//       const isSent = sentJadwalIds.includes(jadwal.id);
//       return (
//         <div key={index} className={styles.cardmahasiswa}>
//           <p>📛 NIM: {jadwal.nim}</p>
//           <p>👨‍🏫 Pembimbing: {jadwal.dosen_pembimbing}</p>
//           <p>🧑‍⚖️ Penguji 1: {jadwal.dosen_penguji}</p>
//           <p>🧑‍⚖️ Penguji 2: {jadwal.dosen_penguji2}</p>
//           <p>🧑‍⚖️ Penguji 3: {jadwal.dosen_penguji3}</p>
//           <p>🧑‍⚖️ Penguji 4: {jadwal.dosen_penguji4}</p>
//           <p>📅 Tanggal Sidang: {jadwal.tanggal_sidang}</p>
//           <p>⏰ Jam Sidang: {jadwal.jam_sidang}</p>
//           <button className={styles.sendButton} onClick={() => handleSendToPenguji(jadwal)} disabled={isSent}>
//             {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
//           </button>
//         </div>
//       );
//     })}
//   </div>
// )}


// <h2 className={styles.subheading}>📋 Daftar Data Mahasiswa Skripsi:</h2>
// <div className={styles.filterContainer}>
//   <select onChange={(e) => setFilterAngkatan(e.target.value)} className={styles.dropdown}>
//     <option value="">📅 Semua Angkatan</option>
//     {listAngkatanSkripsi.map((angkatan) => (
//       <option key={angkatan} value={angkatan}>{angkatan}</option>
//     ))}
//   </select>

//   <select onChange={(e) => setFilterJurusan(e.target.value)} className={styles.dropdown}>
//     <option value="">🎓 Semua Jurusan</option>
//     {listJurusanSkripsi.map((jurusan) => (
//       <option key={jurusan} value={jurusan}>{jurusan}</option>
//     ))}
//   </select>
// </div>

// <div className={styles.gridListmahasiswa}>
//   {mahasiswaSkripsi
//     .filter(item =>
//       item.nim.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterAngkatan === "" || item.angkatan === filterAngkatan) &&
//       (filterJurusan === "" || item.jurusan === filterJurusan)
//     )
//     .map((mhs) => (
//       <div key={mhs.id} className={styles.cardmahasiswa}>
//                 <h3 className={styles.headingSempro}>Mahasiswa Skripsi</h3>
//         <p className={styles.nimmahasiswa}>{mhs.nim}</p>
//         <p className={styles.namamahasiswa}>📛 {mhs.nama}</p>
//         <p className={styles.detailmahasiswa}>🎓 {mhs.jurusan} ({mhs.angkatan})</p>
//         <p className={styles.detailmahasiswa}> {mhs.dosen} </p>
//         <p className={styles.detailmahasiswa}>📄 {mhs.judul}</p>
//         <p className={styles.detailmahasiswa}>📱 {mhs.noWhatsapp}</p>
//          {/* <button
//       onClick={handleGenerate}
//       disabled={loading}
//       className={styles.generateButton}
//     >
//       {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
//     </button> */}
//     <button
//   onClick={() => handleGenerateSkripsi(mhs.nim, "Skripsi")} // ⬅️ Kirim NIM
//   disabled={loading}
//   className={styles.generateButton}
// >
//   {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
// </button>

//       </div>
//   ))}
//   {/* {jadwalSidang.length > 0 && (
//   <div className={styles.gridListmahasiswa}>
//     <h2 className={styles.subheading}>🧬 Jadwal Hasil Algoritma Genetika</h2>
//     {jadwalSidang.map((jadwal, index) => (
//       <div key={index} className={styles.cardmahasiswa}>
//         <p>📛 NIM: {jadwal.nim}</p>
//         <p>👨‍🏫 Pembimbing: {jadwal.dosen_pembimbing}</p>
//         <p>🧑‍⚖️ Penguji 1: {jadwal.dosen_penguji}</p>
//         <p>🧑‍⚖️ Penguji 2: {jadwal.dosen_penguji2}</p>
//         <p>🧑‍⚖️ Penguji 3: {jadwal.dosen_penguji3}</p>
//         <p>🧑‍⚖️ Penguji 4: {jadwal.dosen_penguji4}</p>
//         <p>📅 Tanggal Sidang: {jadwal.tanggal_sidang}</p>
//         <p>⏰ Jam Sidang: {jadwal.jam_sidang}</p>
//       </div>
//     ))}
//   </div>
// )} */}

// </div>
// {/* {jadwalSidang.length > 0 && (
//   <div className={styles.gridListmahasiswa}>
//     <h2 className={styles.subheading}>🧬 Jadwal Sidang Otomatis (1 Mahasiswa)</h2>
//     {jadwalSidang.map((jadwal, index) => {
//       const isSent = sentJadwalIds.includes(jadwal.id);
//       return(
//       <div key={index} className={styles.cardmahasiswa}>
//         <p>📛 NIM: {jadwal.nim}</p>
//         <p>👨‍🏫 Pembimbing: {jadwal.dosen_pembimbing}</p>
//         <p>🧑‍⚖️ Penguji 1: {jadwal.dosen_penguji}</p>
//         <p>🧑‍⚖️ Penguji 2: {jadwal.dosen_penguji2}</p>
//         <p>🧑‍⚖️ Penguji 3: {jadwal.dosen_penguji3}</p>
//         <p>🧑‍⚖️ Penguji 4: {jadwal.dosen_penguji4}</p>
//         <p>📅 Tanggal Sidang: {jadwal.tanggal_sidang}</p>
//         <p>⏰ Jam Sidang: {jadwal.jam_sidang}</p>
//                         <button className={styles.sendButton} onClick={() => handleSendToPenguji(jadwal)} disabled={isSent}>
//                   {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
//                 </button>
//       </div>
//       );
// })}
//   </div>
// )} */}


// {jadwalSidangSkripsi.length > 0 && (
//   <div className={styles.gridListmahasiswa}>
//     <h2 className={styles.subheading}>🧬 Jadwal Sidang Otomatis (Kategori: Skripsi)</h2>
//     {jadwalSidangSkripsi.map((jadwal, index) => {
//       const isSent = sentJadwalIds.includes(jadwal.id);
//       return (
//         <div key={index} className={styles.cardmahasiswa}>
//           <p>📛 NIM: {jadwal.nim}</p>
//           <p>👨‍🏫 Pembimbing: {jadwal.dosen_pembimbing}</p>
//           <p>🧑‍⚖️ Penguji 1: {jadwal.dosen_penguji}</p>
//           <p>🧑‍⚖️ Penguji 2: {jadwal.dosen_penguji2}</p>
//           <p>🧑‍⚖️ Penguji 3: {jadwal.dosen_penguji3}</p>
//           <p>🧑‍⚖️ Penguji 4: {jadwal.dosen_penguji4}</p>
//           <p>📅 Tanggal Sidang: {jadwal.tanggal_sidang}</p>
//           <p>⏰ Jam Sidang: {jadwal.jam_sidang}</p>
//           <button className={styles.sendButton} onClick={() => handleSendToPenguji(jadwal)} disabled={isSent}>
//             {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
//           </button>
//         </div>
//       );
//     })}
//   </div>
// )}




//         <h1 className={styles.heading}>📅 Kaprodi Jadwal Sidang</h1>

//         <div className={styles.inputGrid}>
//           <div className={styles.inputGroup}>
//             <label>Generasi</label>
//             <input type="number" value={generations} onChange={(e) => setGenerations(+e.target.value)} />
//           </div>
//           <div className={styles.inputGroup}>
//             <label>Populasi</label>
//             <input type="number" value={populationSize} onChange={(e) => setPopulationSize(+e.target.value)} />
//           </div>
//           <div className={styles.inputGroup}>
//             <label>Mutasi</label>
//             <input type="number" step={0.01} value={mutationRate} onChange={(e) => setMutationRate(+e.target.value)} />
//           </div>
//           <div className={styles.inputGroup}>
//             <label>Tanggal Sidang</label>
//             <input type="date" value={tanggalSidang} onChange={(e) => setTanggalSidang(e.target.value)} />
//           </div>
//         </div>

//         <div className={styles.buttonGroup}>
//           <button className={`${styles.button} ${styles.generate}`} onClick={generateSchedule}>🚀 Generate</button>
//           <button className={`${styles.button} ${styles.reset}`} onClick={resetData}>♻️ Reset</button>
//           <button className={`${styles.button} ${styles.download}`} onClick={downloadPDF}>📄 PDF</button>
//           <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>🚪 Logout</button>
//         </div>

//         <input className={styles.search} type="text" placeholder="🔍 Cari NIM mahasiswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

//         <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang:</h2>
//         <ul className={styles.scheduleList}>
//           {filteredJadwal.map((item, index) => {
//             const isSent = sentJadwalIds.includes(item.id);
//             return (
//               <li key={item.id} className={`${styles.card} ${isSent ? styles.sentCard : ""}`}>
//                 <p className={styles.nim}>{item.nim}</p>
//                 <p className={styles.tanggal}>{item.tanggal_sidang} • {item.jam_sidang}</p>
//                 <p className={styles.dosen}>Dosen Pebimbing : {item.dosen_pembimbing} </p>
//                 <p className={styles.dosen}>Dosen Penguji 1 : {item.dosen_penguji}</p>
//                 <p className={styles.dosen}>Dosen Penguji 2: {item.dosen_penguji2}</p>
//                 <p className={styles.dosen}>Dosen Penguji 3: {item.dosen_penguji3}</p>
//                 <p className={styles.dosen}>Dosen Penguji 4: {item.dosen_penguji4}</p>
//                 <button className={styles.sendButton} onClick={() => handleSendToPenguji(item)} disabled={isSent}>
//                   {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </motion.div>
//     </div>
//   );
// }













//INI JANGAN DIHAPUS YA IKI INIII JANGAN DIHAPUSSS OIII IKIIII
// // KaprodiPage.jsx
// "use client";
// import { useState, useEffect } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
// import jsPDF from "jspdf";
// import { motion } from "framer-motion";
// import NavbarKaprodi from "../navbarkaprodi/page";
// import styles from "./kaprodi.module.scss";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { useRef } from "react";


// export default function KaprodiPage() {
//   const [jadwal, setJadwal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [generations, setGenerations] = useState(50);
//   const [populationSize, setPopulationSize] = useState(10);
//   const [mutationRate, setMutationRate] = useState(0.1);
//   const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
//   const [sentJadwalIds, setSentJadwalIds] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();
//   const [jadwalFix, setJadwalFix] = useState([]);
//   const [showFixTable, setShowFixTable] = useState(false);
// const tableFixRef = useRef(null);

//   const [filterAngkatan, setFilterAngkatan] = useState("");
// const [filterJurusan, setFilterJurusan] = useState("");


//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsLoggedIn(!!user);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchJadwal = async () => {
//       const snapshot = await getDocs(collection(db, "jadwal_sidang"));
//       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setJadwal(data);
//     };
//     fetchJadwal();
//   }, []);

//   const [mahasiswaSempro, setMahasiswaSempro] = useState([]);
//   const [mahasiswaSemproJadwal, setMahasiswaSemproJadwal] = useState([]);


// useEffect(() => {
//   const fetchMahasiswa = async () => {
//     const snapshot = await getDocs(collection(db, "usersSempro"));
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setMahasiswaSempro(data);
//   };
//   fetchMahasiswa();
// }, []);


// const [listAngkatan, setListAngkatan] = useState([]);
// const [listJurusan, setListJurusan] = useState([]);

// useEffect(() => {
//   const fetchMahasiswa = async () => {
//     const snapshot = await getDocs(collection(db, "usersSempro"));
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setMahasiswaSempro(data);

//     // Ambil angkatan & jurusan unik
//     const angkatanUnik = [...new Set(data.map(item => item.angkatan))];
//     const jurusanUnik = [...new Set(data.map(item => item.jurusan))];
//     setListAngkatan(angkatanUnik);
//     setListJurusan(jurusanUnik);
//   };
//   fetchMahasiswa();
// }, []);

// const [mahasiswaSkripsi, setMahasiswaSkripsi] = useState([]);

// useEffect(() => {
//   const fetchMahasiswa = async () => {
//     const snapshot = await getDocs(collection(db, "usersSkripsi"));
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setMahasiswaSkripsi(data);
//   };
//   fetchMahasiswa();
// }, []);

// const [listAngkatanSkripsi, setListAngkatanSkripsi] = useState([]);
// const [listJurusanSkripsi, setListJurusanSkripsi] = useState([]);

// useEffect(() => {
//   const fetchMahasiswa = async () => {
//     const snapshot = await getDocs(collection(db, "usersSkripsi"));
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setMahasiswaSkripsi(data);

//     // Ambil angkatan & jurusan unik
//     const angkatanUnik = [...new Set(data.map(item => item.angkatan))];
//     const jurusanUnik = [...new Set(data.map(item => item.jurusan))];
//     setListAngkatanSkripsi(angkatanUnik);
//     setListJurusanSkripsi(jurusanUnik);
//   };
//   fetchMahasiswa();
// }, []);

//   const handleSendToPenguji = async (item) => {
//     try {
//       await addDoc(collection(db, "penguji_selected"), {
//         nim: item.nim,
//         tanggal_sidang: item.tanggal_sidang,
//         jam_sidang: item.jam_sidang,
//         dosen_pembimbing: item.dosen_pembimbing,
//         dosen_penguji: item.dosen_penguji,
//         dosen_penguji2: item.dosen_penguji2,
//         dosen_penguji3: item.dosen_penguji3,
//         dosen_penguji4: item.dosen_penguji4,
//         formulir: item.formulir,
//         status: "dikirim",
//         timestamp: new Date(),
//       });
//       setSentJadwalIds((prev) => [...prev, item.id]);
//       console.log("Data berhasil dikirim ke koleksi penguji_selected");
//     } catch (error) {
//       console.error("Gagal kirim data:", error);
//     }
//   };

//   const generateSchedule = async () => {
//     await fetch("/api/generate-schedule", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ generations, populationSize, mutationRate, tanggalSidang }),
//     });
//     window.location.reload();
//   };

//   const [loading, setLoading] = useState(false);
//   // const [jadwalSidang, setJadwalSidang] = useState([]);
//   const [jadwalSidangSempro, setJadwalSidangSempro] = useState([]);
// const [jadwalSidangSkripsi, setJadwalSidangSkripsi] = useState([]);


// const handleGenerateSempro = async (nim) => {
//   setLoading(true);
//   try {
//     const res = await fetch("/api/generate-schedule-bynimsempro", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         generations: 50,
//         populationSize: 10,
//         mutationRate: 0.1,
//         tanggalSidang: new Date().toISOString().split("T")[0],
//         targetNIM: nim,
//         formulir: "Sempro", // pastikan dikirimkan
//       }),
//     });

//     const result = await res.json();

//     if (result.schedule?.formulir === "Sempro") {
//       setJadwalSidangSempro([result.schedule]);
//     }

//     alert(result.message);
//   } catch (error) {
//     console.error("❌ Gagal membuat jadwal:", error);
//     alert("Terjadi kesalahan saat membuat jadwal.");
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   const unsubscribe = onSnapshot(collection(db, "jadwal_sidang_skripsi"), (snapshot) => {
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setJadwalFix(data);
//   });

//   return () => unsubscribe(); // cleanup saat komponen unmount
// }, []);

// const [mahasiswaBaruBelumAdaJadwal, setMahasiswaBaruBelumAdaJadwal] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     const usersRef = collection(db, "usersSkripsi");
//     const jadwalRef = collection(db, "jadwal_sidang");

//     const [usersSnap, jadwalSnap] = await Promise.all([
//       getDocs(usersRef),
//       getDocs(jadwalRef)
//     ]);

//     const jadwalMap = new Map();
//     jadwalSnap.docs.forEach(doc => {
//       const data = doc.data();
//       jadwalMap.set(data.nim, { ...data, id: doc.id });
//     });

//     const merged = usersSnap.docs
//       .map(doc => {
//         const mhs = doc.data();
//         const jadwal = jadwalMap.get(mhs.nim);
//         return jadwal ? { ...mhs, jadwal} : null;
//       })
//       .filter(Boolean)
//       .sort((a, b) => a.jadwal.timestamp?.seconds - b.jadwal.timestamp?.seconds);

//     setMahasiswaSemproJadwal(merged);

//     // Mahasiswa yang belum dapat jadwal:
//     const mahasiswaBaru = usersSnap.docs
//       .map(doc => doc.data())
//       .filter(mhs => !jadwalMap.has(mhs.nim));

//     setMahasiswaBaruBelumAdaJadwal(mahasiswaBaru);
//   };

//   fetchData();
// }, []);

// const [currentPage, setCurrentPage] = useState(1);
// const pageSize = 10;

// const paginatedData = mahasiswaSemproJadwal.slice(
//   (currentPage - 1) * pageSize,
//   currentPage * pageSize
// );

// const exportToPDF = () => {
//   const doc = new jsPDF();
//   autoTable(doc, {
//     head: [["No", "NIM", "Nama", "Judul", "Tanggal", "Jam", "Pembimbing", "Penguji", "Zoom"]],
//     body: jadwalFix.map((item, i) => [
//       i + 1, item.nim, item.nama, item.judul, item.tanggal_sidang,
//       item.jam_sidang, item.dosen_pembimbing, item.dosen_penguji, item.link_zoom || "-"
//     ])
//   });
//   doc.save("jadwal_fix_skripsi.pdf");
// };

// const exportToExcel = () => {
//   const worksheet = XLSX.utils.json_to_sheet(jadwalFix);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "JadwalFix");
//   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//   const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//   saveAs(data, "jadwal_fix_skripsi.xlsx");
// };

// const exportToWord = () => {
//   let html = "<table border='1'><tr><th>No</th><th>NIM</th><th>Nama</th><th>Judul</th><th>Tanggal</th><th>Jam</th><th>Pembimbing</th><th>Penguji</th><th>Zoom</th></tr>";
//   jadwalFix.forEach((item, i) => {
//     html += `<tr><td>${i + 1}</td><td>${item.nim}</td><td>${item.nama}</td><td>${item.judul}</td><td>${item.tanggal_sidang}</td><td>${item.jam_sidang}</td><td>${item.dosen_pembimbing}</td><td>${item.dosen_penguji}</td><td>${item.link_zoom || "-"}</td></tr>`;
//   });
//   html += "</table>";

//   const blob = new Blob(["\ufeff" + html], {
//     type: "application/msword"
//   });

//   saveAs(blob, "jadwal_fix_skripsi.doc");
// };


// const handleGenerateSkripsi = async (nim) => {
//   setLoading(true);
//   try {
//     const res = await fetch("/api/generate-schedule-bynimskripsi", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         generations: 50,
//         populationSize: 10,
//         mutationRate: 0.1,
//         tanggalSidang: new Date().toISOString().split("T")[0],
//         targetNIM: nim,
//         formulir: "Skripsi", // pastikan dikirimkan
//       }),
//     });

//     const result = await res.json();

//     if (result.schedule?.formulir === "Skripsi") {
//       setJadwalSidangSkripsi([result.schedule]);
//     }

//     alert(result.message);
//   } catch (error) {
//     console.error("❌ Gagal membuat jadwal:", error);
//     alert("Terjadi kesalahan saat membuat jadwal.");
//   } finally {
//     setLoading(false);
//   }
// };


// // const fetchData = async () => {
// //   const usersRef = collection(db, "usersSempro");
// //   const jadwalRef = collection(db, "jadwal_sidang");

// //   const [usersSnap, jadwalSnap] = await Promise.all([
// //     getDocs(usersRef),
// //     getDocs(jadwalRef)
// //   ]);

// //   const jadwalMap = new Map();
// //   jadwalSnap.docs.forEach(doc => {
// //     const data = doc.data();
// //     jadwalMap.set(data.nim, { ...data, id: doc.id });
// //   });

// //   const merged = usersSnap.docs
// //     .map(doc => {
// //       const mhs = doc.data();
// //       const jadwal = jadwalMap.get(mhs.nim);
// //       return jadwal ? { ...mhs, jadwal } : null;
// //     })
// //     .filter(Boolean)
// //     .sort((a, b) => a.jadwal.timestamp?.seconds - b.jadwal.timestamp?.seconds);

// //   setMahasiswaSemproJadwal(merged);

// //   const mahasiswaBaru = usersSnap.docs
// //     .map(doc => doc.data())
// //     .filter(mhs => !jadwalMap.has(mhs.nim));

// //   setMahasiswaBaruBelumAdaJadwal(mahasiswaBaru);
// // };

// // useEffect(() => {
// //   fetchData();
// // }, []);


// // ====================
// useEffect(() => {
//   const usersRef = collection(db, "usersSempro");
//   const jadwalRef = collection(db, "jadwal_sidang_sempro");

//   // Listen realtime dari jadwal_sidang:
//   const unsubscribeJadwal = onSnapshot(jadwalRef, async (jadwalSnap) => {
//     const usersSnap = await getDocs(usersRef);

//     const jadwalMap = new Map();
//     jadwalSnap.docs.forEach(doc => {
//       const data = doc.data();
//       jadwalMap.set(data.nim, { ...data, id: doc.id });
//     });

//     const merged = usersSnap.docs
//       .map(doc => {
//         const mhs = doc.data();
//         const jadwal = jadwalMap.get(mhs.nim);
//         return jadwal ? { ...mhs, jadwal } : null;
//       })
//       .filter(Boolean)
//       .sort((a, b) => a.jadwal.timestamp?.seconds - b.jadwal.timestamp?.seconds);

//     setMahasiswaSemproJadwal(merged);

//     const mahasiswaBaru = usersSnap.docs
//       .map(doc => doc.data())
//       .filter(mhs => !jadwalMap.has(mhs.nim));

//     setMahasiswaBaruBelumAdaJadwal(mahasiswaBaru);
//   });

//   // Unsubscribe kalau komponen unmount
//   return () => unsubscribeJadwal();
// }, []);


// // const handleGenerateBatch = async () => {
// //   setLoading(true);
// //   try {
// //     const res = await fetch("/api/generate-batch", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" }
// //     });

// //     const result = await res.json();
// //     alert(result.message);

// //     // ✅ Refresh data setelah generate
// //     await fetchData();
// //   } catch (error) {
// //     console.error("❌ Gagal membuat jadwal:", error);
// //     alert("Terjadi kesalahan saat membuat jadwal.");
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// const handleGenerateBatch = async () => {
//   setLoading(true);
//   try {
//     const res = await fetch("/api/generate-batch-skripsi", { method: "POST" });
//     const result = await res.json();
//     alert(result.message);
//     // ✅ Tidak perlu panggil fetchData atau reload
//   } catch (error) {
//     console.error("❌ Gagal membuat jadwal:", error);
//     alert("Terjadi kesalahan saat membuat jadwal.");
//   } finally {
//     setLoading(false);
//   }
// };




//   const resetData = async () => {
//     await fetch("/api/reset-data", { method: "POST" });
//     window.location.reload();
//   };

//   const downloadPDF = () => {
//     const docPdf = new jsPDF();
//     docPdf.text("Jadwal Sidang Mahasiswa:", 10, 10);
//     jadwal.forEach((item, index) => {
//       docPdf.text(`${index + 1}. ${item.nim} - ${item.tanggal_sidang} - ${item.dosen_pembimbing} & ${item.dosen_penguji}`, 10, 20 + (index * 10));
//     });
//     docPdf.save("jadwal-sidang-admin.pdf");
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push("/login");
//   };

//   const filteredJadwal = jadwal.filter(item =>
//     item.nim.toLowerCase().includes(searchTerm.toLowerCase())
//   );



// const [startDate, setStartDate] = useState("");
// const [startTime, setStartTime] = useState("08:00");
// const [endTime, setEndTime] = useState("16:00");
// const [durasiHari, setDurasiHari] = useState(1);
// // const [selectedIds, setSelectedIds] = useState<string[]>([]);
// const [selectedIds, setSelectedIds] = useState([]);


// // const toggleMahasiswaSelection = (id: string) => {
// const toggleMahasiswaSelection = (id) => {

//   setSelectedIds(prev =>
//     prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//   );
// };

// const handleTerapkanJadwal = () => {
//   const totalMahasiswa = selectedIds.length;
//   const jamMulai = parseInt(startTime.split(":")[0]);
//   const jamSelesai = parseInt(endTime.split(":")[0]);
//   const slotPerHari = jamSelesai - jamMulai;
//   const maxPerHari = slotPerHari; // 1 mahasiswa per jam

//   const jadwalBaru = [...jadwalFix];

//   selectedIds.forEach((id, idx) => {
//     const hariKe = Math.floor(idx / maxPerHari);
//     const jamKe = idx % maxPerHari;
//     const tanggalSidang = new Date(startDate);
//     tanggalSidang.setDate(tanggalSidang.getDate() + hariKe);

//     const jamSidang = `${jamMulai + jamKe}:00`;

//     const index = jadwalBaru.findIndex(item => item.id === id);
//     if (index !== -1) {
//       jadwalBaru[index].tanggal_sidang = tanggalSidang.toISOString().split("T")[0];
//       jadwalBaru[index].jam_sidang = jamSidang;
//     }
//   });

//   // Update state jadwalFix
//   setJadwalFix(jadwalBaru);
// };


// const handleKirimKeAdmin = async () => {
//   const dataUntukAdmin = jadwalFix.filter(
//     item => selectedIds.includes(item.id) && item.tanggal_sidang && item.jam_sidang
//   );

//   try {
//     // Jika pakai Firebase:
//     for (const data of dataUntukAdmin) {
//       await addDoc(collection(db, "jadwalFixSkripsi"), data); // atau setDoc jika pakai id tertentu
//     }

//     alert("🎉 Jadwal berhasil dikirim ke Admin!");
//   } catch (error) {
//     console.error("Gagal mengirim data:", error);
//     alert("❌ Gagal mengirim jadwal ke Admin.");
//   }
// };

//   return (
//     <div className={styles.wrapper}>
//       <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//         <NavbarKaprodi isLoggedIn={isLoggedIn} />
       

// <div className={styles.verticalScroll}>
//   {paginatedData.map((mhs, index) => (
//     <div key={mhs.nim} className={styles.cardBox}>
//       <strong>{mhs.nama}</strong>
//       <p>NIM: {mhs.nim}</p>
//       <p>Judul: {mhs.judul}</p>
//       <p>Form: {mhs.formulir}</p>
//       <p>Ruangan: {mhs.jadwal.ruangan || "belum diisi"}</p>
//       <p>📅 {mhs.jadwal.tanggal_sidang} • {mhs.jadwal.jam_sidang}</p>
//       <p>Pembimbing: {mhs.jadwal.dosen_pembimbing}</p>
//       <p>Penguji 1: {mhs.jadwal.dosen_penguji}</p>
//       <p>Zoom: {mhs.jadwal.link_zoom || "Belum diisi"}</p>
//     </div>
//   ))}
// </div>

// <div className={styles.pagination}>
//   <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>⬅️ Prev</button>
//   <span>Page {currentPage}</span>
//   <button disabled={currentPage * pageSize >= mahasiswaSemproJadwal.length} onClick={() => setCurrentPage(p => p + 1)}>Next ➡️</button>
// </div>
// {/* {mahasiswaBaruBelumAdaJadwal.length >= 10 && (
//   <button onClick={handleGenerateBatch} className={styles.generateButton}>
//     🔥 Generate Batch Baru
//   </button>
// )} */}
// {/* <button onClick={async () => {
//     await handleGenerateBatch();
//     await fetchData(); // langsung refresh data
// }} className={styles.generateButton}>
//   🔥 Generate Batch Baru
// </button> */}

// {/* <button onClick={async () => {
//     await handleGenerateBatch();
//     window.location.reload();
// }} className={styles.generateButton}>
//   🔥 Generate Batch Baru
// </button> */}

// <button onClick={handleGenerateBatch} className={styles.generateButton}>
//   {loading ? "Memproses..." : "🔥 Generate Batch Baru"}
// </button>


// {showFixTable && jadwalFix.length > 0 && (
//   <div className={styles.tableWrapper}>
//     <h2 className={styles.subheading}>📑 Jadwal Fix Sidang (Skripsi)</h2>

//     <div className={styles.exportButtons}>
//       <button onClick={() => exportToPDF()}>📄 Export PDF</button>
//       <button onClick={() => exportToExcel()}>📊 Export Excel</button>
//       <button onClick={() => exportToWord()}>📝 Export Word</button>
//     </div>

//     <table className={styles.dataTable}>
//       <thead>
//         <tr>
//           <th>No</th>
//           <th>NIM</th>
//           <th>Nama</th>
//           <th>Judul</th>
//           <th>Tanggal</th>
//           <th>Jam</th>
//           <th>Pembimbing</th>
//           <th>Penguji 1</th>
//           <th>Zoom</th>
//         </tr>
//       </thead>
//       <tbody>
//         {jadwalFix.map((item, index) => (
//           <tr key={item.id}>
//             <td>{index + 1}</td>
//             <td>{item.nim}</td>
//             <td>{item.nama}</td>
//             <td>{item.judul}</td>
//             <td>{item.tanggal_sidang}</td>
//             <td>{item.jam_sidang}</td>
//             <td>{item.dosen_pembimbing}</td>
//             <td>{item.dosen_penguji}</td>
//             <td>{item.link_zoom || "-"}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}


// {jadwalFix.length > 0 && (
//   <div className={styles.tableWrapper} ref={tableFixRef}>

//     <h2 className={styles.subheading}>📑 Jadwal Fix Sidang (Skripsi)</h2>

//     <div className={styles.exportButtons}>
//       <button onClick={() => exportToPDF()}>📄 Export PDF</button>
//       <button onClick={() => exportToExcel()}>📊 Export Excel</button>
//       <button onClick={() => exportToWord()}>📝 Export Word</button>
//     </div>

// {/* Kalender & Pilihan Jadwal
// <div className={styles.kalenderSection}>
//   <h3>📆 Atur Jadwal Fix Sidang</h3>

//   Pilih Tanggal Mulai
//   <label>
//     Tanggal Mulai Sidang:
//     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
//   </label>

//   Jam Mulai dan Selesai
//   <div className={styles.timeRange}>
//     <label>
//       Jam Mulai:
//       <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
//     </label>
//     <label>
//       Jam Selesai:
//       <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
//     </label>
//   </div>

//   Pilih Mahasiswa
//   <div className={styles.pilihMahasiswa}>
//     <label>Pilih Mahasiswa untuk Disidangkan:</label>
//     {jadwalFix.map((item) => (
//       <div key={item.id}>
//         <input
//           type="checkbox"
//           checked={selectedIds.includes(item.id)}
//           onChange={() => toggleMahasiswaSelection(item.id)}
//         />
//         <span>{item.nama} ({item.nim})</span>
//       </div>
//     ))}
//   </div>

//   Berapa Hari Selesai
//   <label>
//     Target Hari Selesai Sidang:
//     <input
//       type="number"
//       value={durasiHari}
//       min={1}
//       onChange={e => setDurasiHari(Number(e.target.value))}
//     />
//   </label>

//   Tombol Terapkan
//   <button onClick={handleTerapkanJadwal}>
//     🔄 Terapkan Jadwal untuk Mahasiswa Terpilih
//   </button>
// </div>
// Hasil Jadwal Fix
// <div className={styles.hasilJadwal}>
//   <h4>📋 Jadwal Fix Mahasiswa</h4>
//   <ul>
//     {jadwalFix
//       .filter(item => selectedIds.includes(item.id)) // atau tampilkan semuanya
//       .map(item => (
//         <li key={item.id}>
//           {item.nama} ({item.nim}) - {item.tanggal_sidang || "Belum dijadwalkan"} jam {item.jam_sidang || "-"}- {item.dosen_pembimbing} - DOSEN PENGUJI 1 {item.dosen_penguji} {"\n"} - DOSEN PENGUJI 2{item.dosen_penguji2}  {"\n"} - DOSEN PENGUJI 3 {item.dosen_penguji3} - {item.link_zoom || "Belum diisi"}
//         </li>
//       ))}
//   </ul>
// </div> */}


//     {/* Kalender & Pilihan Jadwal */}
// <div className={styles.kalenderSection}>
//   <h3>📆 Atur Jadwal Fix Sidang</h3>

//   {/* Pilih Tanggal Mulai */}
//   <label>
//     Tanggal Mulai Sidang:
//     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
//   </label>

//   {/* Jam Mulai dan Selesai */}
//   <div className={styles.timeRange}>
//     <label>
//       Jam Mulai:
//       <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
//     </label>
//     <label>
//       Jam Selesai:
//       <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
//     </label>
//   </div>

//   {/* Pilih Mahasiswa */}
//   <div className={styles.pilihMahasiswa}>
//     <label>Pilih Mahasiswa untuk Disidangkan:</label>
//     {jadwalFix.map((item) => (
//       <div key={item.id}>
//         <input
//           type="checkbox"
//           checked={selectedIds.includes(item.id)}
//           onChange={() => toggleMahasiswaSelection(item.id)}
//         />
//         <span>{item.nama} ({item.nim})</span>
//       </div>
//     ))}
//   </div>

//   {/* Berapa Hari Selesai */}
//   <label>
//     Target Hari Selesai Sidang:
//     <input
//       type="number"
//       value={durasiHari}
//       min={1}
//       onChange={e => setDurasiHari(Number(e.target.value))}
//     />
//   </label>

//   {/* Tombol Terapkan */}
//   <button onClick={handleTerapkanJadwal}>
//     🔄 Terapkan Jadwal untuk Mahasiswa Terpilih
//   </button>
// </div>


// <div className={styles.hasilJadwal}>
//   <h4>📋 Jadwal Fix Mahasiswa</h4>
//   <div className={styles.jadwalGrid}>
//     {jadwalFix
//       .filter(item => selectedIds.includes(item.id))
//       .map(item => (
//         <div key={item.id} className={styles.jadwalCard}>
//           <div className={styles.jadwalTitle}>
//             {item.nama} ({item.nim})
//           </div>
//           <div className={styles.jadwalDetail}>
//             📅 <strong>Tanggal:</strong> {item.tanggal_sidang || "Belum dijadwalkan"}{"\n"}
//             🕒 <strong>Jam:</strong> {item.jam_sidang || "-"}{"\n\n"}
//             👨‍🏫 <strong>Dosen Pembimbing:</strong> {item.dosen_pembimbing || "-"}{"\n"}
//             🧑‍🔬 <strong>Penguji 1:</strong> {item.dosen_penguji || "-"}{"\n"}
//             👩‍🔬 <strong>Penguji 2:</strong> {item.dosen_penguji2 || "-"}{"\n"}
//             👨‍🔬 <strong>Penguji 3:</strong> {item.dosen_penguji3 || "-"}{"\n\n"}
//             🔗 <strong>Zoom:</strong> {item.link_zoom || "Belum diisi"}
//           </div>
//         </div>
//       ))}
//   </div>
//   {selectedIds.length > 0 && jadwalFix.some(item => item.tanggal_sidang && selectedIds.includes(item.id)) && (
//   <button
//     className={styles.sendToAdminButton}
//     onClick={handleKirimKeAdmin}
//   >
//     ✅ Kirim Semua Jadwal ke Admin
//   </button>
// )}

// </div>

//     <table className={styles.dataTable}>
//       <thead>
//         <tr>
//           <th>No</th>
//           <th>NIM</th>
//           <th>Nama</th>
//           <th>Judul</th>
//           <th>Tanggal</th>
//           <th>Jam</th>
//           <th>Pembimbing</th>
//           <th>Penguji 1</th>
//           <th>Zoom</th>
//         </tr>
//       </thead>
//       <tbody>
//         {jadwalFix.map((item, index) => (
//           <tr key={item.id}>
//             <td>{index + 1}</td>
//             <td>{item.nim}</td>
//             <td>{item.nama}</td>
//             <td>{item.judul}</td>
//             <td>{item.tanggal_sidang}</td>
//             <td>{item.jam_sidang}</td>
//             <td>{item.dosen_pembimbing}</td>
//             <td>{item.dosen_penguji}</td>
//             <td>{item.link_zoom || "-"}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}

// <h2 className={styles.subheading}>📋 Daftar Data Mahasiswa Sempro:</h2>
// <div className={styles.filterContainer}>
//   <select onChange={(e) => setFilterAngkatan(e.target.value)} className={styles.dropdown}>
//     <option value="">📅 Semua Angkatan</option>
//     {listAngkatan.map((angkatan) => (
//       <option key={angkatan} value={angkatan}>{angkatan}</option>
//     ))}
//   </select>

//   <select onChange={(e) => setFilterJurusan(e.target.value)} className={styles.dropdown}>
//     <option value="">🎓 Semua Jurusan</option>
//     {listJurusan.map((jurusan) => (
//       <option key={jurusan} value={jurusan}>{jurusan}</option>
//     ))}
//   </select>
// </div>

// <div className={styles.gridListmahasiswa}>
//   {mahasiswaSempro
//     .filter(item =>
//       item.nim.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterAngkatan === "" || item.angkatan === filterAngkatan) &&
//       (filterJurusan === "" || item.jurusan === filterJurusan)
//     )
//     .map((mhs) => (
//       <div key={mhs.id} className={styles.cardmahasiswa}>
//                 <h3 className={styles.headingSempro}>Mahasiswa Sempro</h3>
//         <p className={styles.nimmahasiswa}>{mhs.nim}</p>
//         <p className={styles.namamahasiswa}>📛 {mhs.nama}</p>
//         <p className={styles.detailmahasiswa}>🎓 {mhs.jurusan} ({mhs.angkatan})</p>
//         <p className={styles.detailmahasiswa}>📄 {mhs.judul}</p>
//         <p className={styles.detailmahasiswa}>📱 {mhs.noWhatsapp}</p>
            
// <button
//   onClick={() => handleGenerateSempro(mhs.nim, "Sempro")} // ✅ Kirim NIM dan formulir
//   disabled={loading}
//   className={styles.generateButton}
// >
//   {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
// </button>

//       </div>
//   ))}
// </div>


// {jadwalSidangSempro.length > 0 && (
//   <div className={styles.gridListmahasiswa}>
//     <h2 className={styles.subheading}>🧬 Jadwal Sidang Otomatis (Kategori: Sempro)</h2>
//     {jadwalSidangSempro.map((jadwal, index) => {
//       const isSent = sentJadwalIds.includes(jadwal.id);
//       return (
//         <div key={index} className={styles.cardmahasiswa}>
//           <p>📛 NIM: {jadwal.nim}</p>
//           <p>👨‍🏫 Pembimbing: {jadwal.dosen_pembimbing}</p>
//           <p>🧑‍⚖️ Penguji 1: {jadwal.dosen_penguji}</p>
//           <p>🧑‍⚖️ Penguji 2: {jadwal.dosen_penguji2}</p>
//           <p>🧑‍⚖️ Penguji 3: {jadwal.dosen_penguji3}</p>
//           <p>🧑‍⚖️ Penguji 4: {jadwal.dosen_penguji4}</p>
//           <p>📅 Tanggal Sidang: {jadwal.tanggal_sidang}</p>
//           <p>⏰ Jam Sidang: {jadwal.jam_sidang}</p>
//           <button className={styles.sendButton} onClick={() => handleSendToPenguji(jadwal)} disabled={isSent}>
//             {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
//           </button>
//         </div>
//       );
//     })}
//   </div>
// )}


// <h2 className={styles.subheading}>📋 Daftar Data Mahasiswa Skripsi:</h2>
// <div className={styles.filterContainer}>
//   <select onChange={(e) => setFilterAngkatan(e.target.value)} className={styles.dropdown}>
//     <option value="">📅 Semua Angkatan</option>
//     {listAngkatanSkripsi.map((angkatan) => (
//       <option key={angkatan} value={angkatan}>{angkatan}</option>
//     ))}
//   </select>

//   <select onChange={(e) => setFilterJurusan(e.target.value)} className={styles.dropdown}>
//     <option value="">🎓 Semua Jurusan</option>
//     {listJurusanSkripsi.map((jurusan) => (
//       <option key={jurusan} value={jurusan}>{jurusan}</option>
//     ))}
//   </select>
// </div>

// <div className={styles.gridListmahasiswa}>
//   {mahasiswaSkripsi
//     .filter(item =>
//       item.nim.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterAngkatan === "" || item.angkatan === filterAngkatan) &&
//       (filterJurusan === "" || item.jurusan === filterJurusan)
//     )
//     .map((mhs) => (
//       <div key={mhs.id} className={styles.cardmahasiswa}>
//                 <h3 className={styles.headingSempro}>Mahasiswa Skripsi</h3>
//         <p className={styles.nimmahasiswa}>{mhs.nim}</p>
//         <p className={styles.namamahasiswa}>📛 {mhs.nama}</p>
//         <p className={styles.detailmahasiswa}>🎓 {mhs.jurusan} ({mhs.angkatan})</p>
//         <p className={styles.detailmahasiswa}> {mhs.dosen} </p>
//         <p className={styles.detailmahasiswa}>📄 {mhs.judul}</p>
//         <p className={styles.detailmahasiswa}>📱 {mhs.noWhatsapp}</p>
//          {/* <button
//       onClick={handleGenerate}
//       disabled={loading}
//       className={styles.generateButton}
//     >
//       {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
//     </button> */}
//     <button
//   onClick={() => handleGenerateSkripsi(mhs.nim, "Skripsi")} // ⬅️ Kirim NIM
//   disabled={loading}
//   className={styles.generateButton}
// >
//   {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
// </button>

//       </div>
//   ))}
  

// </div>


// {jadwalSidangSkripsi.length > 0 && (
//   <div className={styles.gridListmahasiswa}>
//     <h2 className={styles.subheading}>🧬 Jadwal Sidang Otomatis (Kategori: Skripsi)</h2>
//     {jadwalSidangSkripsi.map((jadwal, index) => {
//       const isSent = sentJadwalIds.includes(jadwal.id);
//       return (
//         <div key={index} className={styles.cardmahasiswa}>
//           <p>📛 NIM: {jadwal.nim}</p>
//           <p>👨‍🏫 Pembimbing: {jadwal.dosen_pembimbing}</p>
//           <p>🧑‍⚖️ Penguji 1: {jadwal.dosen_penguji}</p>
//           <p>🧑‍⚖️ Penguji 2: {jadwal.dosen_penguji2}</p>
//           <p>🧑‍⚖️ Penguji 3: {jadwal.dosen_penguji3}</p>
//           <p>🧑‍⚖️ Penguji 4: {jadwal.dosen_penguji4}</p>
//           <p>📅 Tanggal Sidang: {jadwal.tanggal_sidang}</p>
//           <p>⏰ Jam Sidang: {jadwal.jam_sidang}</p>
//           <button className={styles.sendButton} onClick={() => handleSendToPenguji(jadwal)} disabled={isSent}>
//             {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
//           </button>
//         </div>
//       );
//     })}
//   </div>
// )}

//         <h1 className={styles.heading}>📅 Kaprodi Jadwal Sidang</h1>

//         <div className={styles.inputGrid}>
//           <div className={styles.inputGroup}>
//             <label>Generasi</label>
//             <input type="number" value={generations} onChange={(e) => setGenerations(+e.target.value)} />
//           </div>
//           <div className={styles.inputGroup}>
//             <label>Populasi</label>
//             <input type="number" value={populationSize} onChange={(e) => setPopulationSize(+e.target.value)} />
//           </div>
//           <div className={styles.inputGroup}>
//             <label>Mutasi</label>
//             <input type="number" step={0.01} value={mutationRate} onChange={(e) => setMutationRate(+e.target.value)} />
//           </div>
//           <div className={styles.inputGroup}>
//             <label>Tanggal Sidang</label>
//             <input type="date" value={tanggalSidang} onChange={(e) => setTanggalSidang(e.target.value)} />
//           </div>
//         </div>

//         <div className={styles.buttonGroup}>
//           <button className={`${styles.button} ${styles.generate}`} onClick={generateSchedule}>🚀 Generate</button>
//           <button className={`${styles.button} ${styles.reset}`} onClick={resetData}>♻️ Reset</button>
//           <button className={`${styles.button} ${styles.download}`} onClick={downloadPDF}>📄 PDF</button>
//           <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>🚪 Logout</button>
//         </div>

//         <input className={styles.search} type="text" placeholder="🔍 Cari NIM mahasiswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

//         <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang:</h2>
//         <ul className={styles.scheduleList}>
//           {filteredJadwal.map((item, index) => {
//             const isSent = sentJadwalIds.includes(item.id);
//             return (
//               <li key={item.id} className={`${styles.card} ${isSent ? styles.sentCard : ""}`}>
//                 <p className={styles.nim}>{item.nim}</p>
//                 <p className={styles.tanggal}>{item.tanggal_sidang} • {item.jam_sidang}</p>
//                 <p className={styles.dosen}>Dosen Pebimbing : {item.dosen_pembimbing} </p>
//                 <p className={styles.dosen}>Dosen Penguji 1 : {item.dosen_penguji}</p>
//                 <p className={styles.dosen}>Dosen Penguji 2: {item.dosen_penguji2}</p>
//                 <p className={styles.dosen}>Dosen Penguji 3: {item.dosen_penguji3}</p>
//                 <p className={styles.dosen}>Dosen Penguji 4: {item.dosen_penguji4}</p>
//                 <button className={styles.sendButton} onClick={() => handleSendToPenguji(item)} disabled={isSent}>
//                   {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </motion.div>
//     </div>
//   );
// }

















// KaprodiPage.jsx
"use client"
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import styles from "./KaprodiPage.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";

const KaprodiPage = () => {
  // const [selectedCategory, setSelectedCategory] = useState("Sempro");
  // const [dataSempro, setDataSempro] = useState([]);
  // const [dataSeminarIsi, setDataSeminarIsi] = useState([]);
  // const [dataSkripsi, setDataSkripsi] = useState([]);
  // const [jadwalTerbaik, setJadwalTerbaik] = useState([]);
  // const [fitnessTerbaik, setFitnessTerbaik] = useState(null);
  // const [logGenerasi, setLogGenerasi] = useState([]);
  // const [chartData, setChartData] = useState([]);
  // const [dosenLoad, setDosenLoad] = useState({});
  // const [processSteps, setProcessSteps] = useState([]);
  // const [listDosen, setListDosen] = useState([]);

  // const fetchData = async () => {
  //   const semproSnap = await getDocs(collection(db, "usersSempro"));
  //   const seminarSnap = await getDocs(collection(db, "usersSeminarIsi"));
  //   const skripsiSnap = await getDocs(collection(db, "usersSkripsi"));
  //   const pembimbingSnap = await getDocs(collection(db, "dosen"));
  //   const pengujiSnap = await getDocs(collection(db, "penguji"));

  //   setDataSempro(semproSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  //   setDataSeminarIsi(seminarSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  //   setDataSkripsi(skripsiSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

  //   const pembimbingList = pembimbingSnap.docs.map(doc => doc.data().nama);
  //   const pengujiList = pengujiSnap.docs.map(doc => doc.data().nama);
  //   const combinedDosen = Array.from(new Set([...pembimbingList, ...pengujiList]));
  //   setListDosen(combinedDosen);
  // };

  // useEffect(() => { fetchData(); }, []);

  // const waktuSidang = ["08:00", "09:30", "11:00", "13:00", "14:30", "16:00"];
  // const tanggalSidang = ["2025-07-22", "2025-07-23"];
  // const ruangan = ["Ruang A", "Ruang B", "Ruang C"];

  // const generateGA = async (dataset) => {
  //   if (listDosen.length < 2) {
  //     alert("Data dosen atau penguji belum tersedia cukup untuk proses GA.");
  //     return;
  //   }

  //   const jumlahPopulasi = 20;
  //   const totalGenerasi = 10;
  //   let populasi = [], log = [], chartLog = [], steps = [];

  //   const createRandomSolution = () => dataset.map((mhs) => {
  //     const waktu = waktuSidang[Math.floor(Math.random() * waktuSidang.length)];
  //     const tanggal = tanggalSidang[Math.floor(Math.random() * tanggalSidang.length)];
  //     const ruang = ruangan[Math.floor(Math.random() * ruangan.length)];
  //     const pembimbing = listDosen[Math.floor(Math.random() * listDosen.length)];
  //     let penguji = listDosen[Math.floor(Math.random() * listDosen.length)];
  //     while (penguji === pembimbing) penguji = listDosen[Math.floor(Math.random() * listDosen.length)];
  //     return { mahasiswaId: mhs.id, namaMahasiswa: mhs.nama, tanggal, jam: waktu, ruangan: ruang, pembimbing, penguji };
  //   });

  //   for (let i = 0; i < jumlahPopulasi; i++) {
  //     const solusi = createRandomSolution();
  //     const fitness = hitungFitness(solusi);
  //     populasi.push({ solusi, fitness });
  //   }

  //   for (let g = 0; g < totalGenerasi; g++) {
  //     populasi.sort((a, b) => b.fitness - a.fitness);
  //     const best = populasi[0];
  //     log.push(`Generasi ${g + 1}: fitness terbaik ${best.fitness}`);
  //     chartLog.push({ generasi: `Gen-${g + 1}`, fitness: best.fitness });

  //     await addDoc(collection(db, "riwayat_GA"), {
  //       waktu: new Date().toISOString(),
  //       generasi: g + 1,
  //       fitness: best.fitness,
  //       jadwal: best.solusi,
  //     });

  //     steps.push(`🎯 Seleksi Gen-${g + 1}: ${best.fitness}`);

  //     const selectParent = () => {
  //       const kandidat = [
  //         populasi[Math.floor(Math.random() * populasi.length)],
  //         populasi[Math.floor(Math.random() * populasi.length)]
  //       ];
  //       return kandidat.sort((a, b) => b.fitness - a.fitness)[0].solusi;
  //     };

  //     const parentA = selectParent();
  //     const parentB = selectParent();
  //     const crossoverPoint = Math.floor(parentA.length / 2);
  //     const child = [...parentA.slice(0, crossoverPoint), ...parentB.slice(crossoverPoint)].map(gene => ({ ...gene }));

  //     steps.push(`🔀 Crossover Gen-${g + 1}: titik potong ${crossoverPoint}`);

  //     for (let i = 0; i < child.length; i++) {
  //       if (Math.random() < 0.1) {
  //         const tipeMutasi = Math.floor(Math.random() * 4);
  //         if (tipeMutasi === 0) child[i].jam = waktuSidang[Math.floor(Math.random() * waktuSidang.length)];
  //         if (tipeMutasi === 1) child[i].ruangan = ruangan[Math.floor(Math.random() * ruangan.length)];
  //         if (tipeMutasi === 2) child[i].pembimbing = listDosen[Math.floor(Math.random() * listDosen.length)];
  //         if (tipeMutasi === 3) child[i].penguji = listDosen[Math.floor(Math.random() * listDosen.length)];
  //       }
  //     }

  //     steps.push(`🧪 Mutasi Gen-${g + 1}`);

  //     const fitnessAnak = hitungFitness(child);
  //     populasi.pop();
  //     populasi.push({ solusi: child, fitness: fitnessAnak });
  //   }

  //   populasi.sort((a, b) => b.fitness - a.fitness);
  //   setJadwalTerbaik(populasi[0].solusi);
  //   setFitnessTerbaik(populasi[0].fitness);
  //   setLogGenerasi(log);
  //   setChartData(chartLog);
  //   setProcessSteps(steps);

  //   const dosenCounter = {};
  //   populasi[0].solusi.forEach(({ pembimbing, penguji }) => {
  //     dosenCounter[pembimbing] = (dosenCounter[pembimbing] || 0) + 1;
  //     dosenCounter[penguji] = (dosenCounter[penguji] || 0) + 1;
  //   });
  //   setDosenLoad(dosenCounter);
  // };

    const [selectedCategory, setSelectedCategory] = useState("Sempro");
  const [dataSempro, setDataSempro] = useState([]);
  const [dataSeminarIsi, setDataSeminarIsi] = useState([]);
  const [dataSkripsi, setDataSkripsi] = useState([]);
  const [jadwalTerbaik, setJadwalTerbaik] = useState([]);
  const [fitnessTerbaik, setFitnessTerbaik] = useState(null);
  const [logGenerasi, setLogGenerasi] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [dosenLoad, setDosenLoad] = useState({});
  const [processSteps, setProcessSteps] = useState([]);
  const [listDosen, setListDosen] = useState([]);

  const fetchData = async () => {
    const semproSnap = await getDocs(collection(db, "usersSempro"));
    const seminarSnap = await getDocs(collection(db, "usersSeminarIsi"));
    const skripsiSnap = await getDocs(collection(db, "usersSkripsi"));
    const pembimbingSnap = await getDocs(collection(db, "dosen"));
    const pengujiSnap = await getDocs(collection(db, "penguji"));

    setDataSempro(semproSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setDataSeminarIsi(seminarSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setDataSkripsi(skripsiSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    const pembimbingList = pembimbingSnap.docs.map(doc => doc.data().nama);
    const pengujiList = pengujiSnap.docs.map(doc => doc.data().nama);
    const combinedDosen = Array.from(new Set([...pembimbingList, ...pengujiList]));
    setListDosen(combinedDosen);
  };

  useEffect(() => { fetchData(); }, []);

  const waktuSidang = ["08:00", "09:30", "11:00", "13:00", "14:30", "16:00"];
  const tanggalSidang = ["2025-07-22", "2025-07-23"];
  // const ruangan = ["Ruang A", "Ruang B", "Ruang C"];
  const [ruangan, setRuangan] = useState(["Ruang A", "Ruang B", "Ruang C"]);
  const [filterDosen, setFilterDosen] = useState("");

  // Deteksi konflik: dosen/penguji yang sama di jam & tanggal yang sama di ruangan berbeda
  const konflikSet = new Set();
  const semuaSidang = jadwalTerbaik;
  semuaSidang.forEach((a, idx) => {
    semuaSidang.forEach((b, jdx) => {
      if (
        idx !== jdx &&
        a.jam === b.jam &&
        a.tanggal === b.tanggal &&
        a.ruangan !== b.ruangan &&
        [a.pembimbing, a.penguji1, a.penguji2, a.penguji3].some((dosen) =>
          [b.pembimbing, b.penguji1, b.penguji2, b.penguji3].includes(dosen)
        )
      ) {
        konflikSet.add(`${a.namaMahasiswa}-${a.jam}`);
        konflikSet.add(`${b.namaMahasiswa}-${b.jam}`);
      }
    });
  });

  // const generateGA = async (dataset) => {
  //   if (listDosen.length < 4) {
  //     alert("Minimal butuh 4 dosen untuk pembimbing + 3 penguji.");
  //     return;
  //   }

  //   const jumlahPopulasi = 20;
  //   const totalGenerasi = 10;
  //   let populasi = [];
  //   let log = [];
  //   let chartLog = [];
  //   let steps = [];

  //   const createRandomSolution = () => dataset.map((mhs) => {
  //     const waktu = waktuSidang[Math.floor(Math.random() * waktuSidang.length)];
  //     const tanggal = tanggalSidang[Math.floor(Math.random() * tanggalSidang.length)];
  //     const ruang = ruangan[Math.floor(Math.random() * ruangan.length)];
  //     const pembimbing = listDosen[Math.floor(Math.random() * listDosen.length)];
  //     let penguji1 = pembimbing;
  //     let penguji2 = pembimbing;
  //     let penguji3 = pembimbing;
  //     while (penguji1 === pembimbing) penguji1 = listDosen[Math.floor(Math.random() * listDosen.length)];
  //     while (penguji2 === pembimbing || penguji2 === penguji1) penguji2 = listDosen[Math.floor(Math.random() * listDosen.length)];
  //     while (penguji3 === pembimbing || penguji3 === penguji1 || penguji3 === penguji2) penguji3 = listDosen[Math.floor(Math.random() * listDosen.length)];
  //     return { mahasiswaId: mhs.id, namaMahasiswa: mhs.nama, tanggal, jam: waktu, ruangan: ruang, pembimbing, penguji1, penguji2, penguji3 };
  //   });

  //   for (let i = 0; i < jumlahPopulasi; i++) {
  //     const solusi = createRandomSolution();
  //     const fitness = hitungFitness(solusi);
  //     populasi.push({ solusi, fitness });
  //   }

  //   for (let g = 0; g < totalGenerasi; g++) {
  //     populasi.sort((a, b) => b.fitness - a.fitness);
  //     const best = populasi[0];
  //     log.push(`Generasi ${g + 1}: fitness terbaik ${best.fitness}`);
  //     chartLog.push({ generasi: `Gen-${g + 1}`, fitness: best.fitness });

  //     await addDoc(collection(db, "riwayat_GA"), {
  //       waktu: new Date().toISOString(),
  //       generasi: g + 1,
  //       fitness: best.fitness,
  //       jadwal: best.solusi
  //     });

  //     steps.push(`🎯 Seleksi Gen-${g + 1}: ${best.fitness}`);

  //     const selectParent = () => {
  //       const kandidat = [
  //         populasi[Math.floor(Math.random() * populasi.length)],
  //         populasi[Math.floor(Math.random() * populasi.length)]
  //       ];
  //       return kandidat.sort((a, b) => b.fitness - a.fitness)[0].solusi;
  //     };

  //     const parentA = selectParent();
  //     const parentB = selectParent();
  //     const crossoverPoint = Math.floor(parentA.length / 2);
  //     const child = [...parentA.slice(0, crossoverPoint), ...parentB.slice(crossoverPoint)].map(gene => ({ ...gene }));

  //     steps.push(`🔀 Crossover Gen-${g + 1}: titik potong ${crossoverPoint}`);

  //     for (let i = 0; i < child.length; i++) {
  //       if (Math.random() < 0.1) {
  //         const tipeMutasi = Math.floor(Math.random() * 5);
  //         if (tipeMutasi === 0) child[i].jam = waktuSidang[Math.floor(Math.random() * waktuSidang.length)];
  //         if (tipeMutasi === 1) child[i].ruangan = ruangan[Math.floor(Math.random() * ruangan.length)];
  //         if (tipeMutasi === 2) child[i].pembimbing = listDosen[Math.floor(Math.random() * listDosen.length)];
  //         if (tipeMutasi === 3) child[i].penguji1 = listDosen[Math.floor(Math.random() * listDosen.length)];
  //         if (tipeMutasi === 4) child[i].penguji2 = listDosen[Math.floor(Math.random() * listDosen.length)];
  //       }
  //     }

  //     steps.push(`🧪 Mutasi Gen-${g + 1}`);

  //     const fitnessAnak = hitungFitness(child);
  //     populasi.pop();
  //     populasi.push({ solusi: child, fitness: fitnessAnak });
  //   }

  //   populasi.sort((a, b) => b.fitness - a.fitness);
  //   setJadwalTerbaik(populasi[0].solusi);
  //   setFitnessTerbaik(populasi[0].fitness);
  //   setLogGenerasi(log);
  //   setChartData(chartLog);
  //   setProcessSteps(steps);

  //   const dosenCounter = {};
  //   populasi[0].solusi.forEach(({ pembimbing, penguji1, penguji2, penguji3 }) => {
  //     [pembimbing, penguji1, penguji2, penguji3].forEach(d => {
  //       dosenCounter[d] = (dosenCounter[d] || 0) + 1;
  //     });
  //   });
  //   setDosenLoad(dosenCounter);
  // };


  const generateGA = async (datasetOriginal) => {
  let dataset = [...datasetOriginal];

  // Hanya untuk Sempro: filter statusSempro
  if (selectedCategory === "Sempro") {
    dataset = dataset.filter(m => m.statusSempro === "Masih Disidangkan");
    if (dataset.length === 0) {
      alert("Tidak ada mahasiswa Sempro dengan status 'Masih Disidangkan'");
      return;
    }
  }

  if (listDosen.length < 4) {
    alert("Minimal butuh 4 dosen untuk pembimbing + penguji.");
    return;
  }

  const jumlahPopulasi = 20;
  const totalGenerasi = 10;
  let populasi = [];
  let log = [];
  let chartLog = [];
  let steps = [];

  const getPengujiSempro = (namaMahasiswa) => {
    const mhs = dataSempro.find(d => d.nama === namaMahasiswa);
    return {
      penguji1: mhs?.penguji1 || listDosen[Math.floor(Math.random() * listDosen.length)],
      penguji2: mhs?.penguji2 || listDosen[Math.floor(Math.random() * listDosen.length)],
    };
  };

  const createRandomSolution = () => dataset.map((mhs) => {
    const waktu = waktuSidang[Math.floor(Math.random() * waktuSidang.length)];
    const tanggal = tanggalSidang[Math.floor(Math.random() * tanggalSidang.length)];
    const ruang = ruangan[Math.floor(Math.random() * ruangan.length)];
    // const pembimbing = listDosen[Math.floor(Math.random() * listDosen.length)];
    const pembimbing = mhs.dosen || listDosen[Math.floor(Math.random() * listDosen.length)];


    if (selectedCategory === "Sempro") {
      let penguji1 = pembimbing;
      let penguji2 = pembimbing;
      while (penguji1 === pembimbing) penguji1 = listDosen[Math.floor(Math.random() * listDosen.length)];
      while (penguji2 === pembimbing || penguji2 === penguji1) penguji2 = listDosen[Math.floor(Math.random() * listDosen.length)];

      return {
        mahasiswaId: mhs.id, namaMahasiswa: mhs.nama,
        tanggal, jam: waktu, ruangan: ruang,
        pembimbing, penguji1, penguji2
      };
    }

    if (selectedCategory === "SeminarIsi" || selectedCategory === "Skripsi") {
      const { penguji1, penguji2 } = getPengujiSempro(mhs.nama);
      return {
        mahasiswaId: mhs.id, namaMahasiswa: mhs.nama,
        tanggal, jam: waktu, ruangan: ruang,
        pembimbing,
        penguji1: pembimbing,
        penguji2, penguji3: listDosen[Math.floor(Math.random() * listDosen.length)]
      };
    }
  });

  for (let i = 0; i < jumlahPopulasi; i++) {
    const solusi = createRandomSolution();
    const fitness = hitungFitness(solusi);
    populasi.push({ solusi, fitness });
  }

  for (let g = 0; g < totalGenerasi; g++) {
    populasi.sort((a, b) => b.fitness - a.fitness);
    const best = populasi[0];
    log.push(`Generasi ${g + 1}: fitness terbaik ${best.fitness}`);
    chartLog.push({ generasi: `Gen-${g + 1}`, fitness: best.fitness });

    await addDoc(collection(db, "riwayat_GA"), {
      waktu: new Date().toISOString(),
      kategori: selectedCategory,
      generasi: g + 1,
      fitness: best.fitness,
      jadwal: best.solusi,
    });

    steps.push(`🎯 Seleksi Gen-${g + 1}: ${best.fitness}`);

    const selectParent = () => {
      const kandidat = [
        populasi[Math.floor(Math.random() * populasi.length)],
        populasi[Math.floor(Math.random() * populasi.length)]
      ];
      return kandidat.sort((a, b) => b.fitness - a.fitness)[0].solusi;
    };

    const parentA = selectParent();
    const parentB = selectParent();
    const crossoverPoint = Math.floor(parentA.length / 2);
    const child = [...parentA.slice(0, crossoverPoint), ...parentB.slice(crossoverPoint)].map(gene => ({ ...gene }));

    steps.push(`🔀 Crossover Gen-${g + 1}: titik potong ${crossoverPoint}`);

    for (let i = 0; i < child.length; i++) {
      if (Math.random() < 0.1) {
        const tipeMutasi = Math.floor(Math.random() * 5);
        if (tipeMutasi === 0) child[i].jam = waktuSidang[Math.floor(Math.random() * waktuSidang.length)];
        if (tipeMutasi === 1) child[i].ruangan = ruangan[Math.floor(Math.random() * ruangan.length)];
        if (tipeMutasi === 2) child[i].pembimbing = listDosen[Math.floor(Math.random() * listDosen.length)];
        if (tipeMutasi === 3) child[i].penguji1 = listDosen[Math.floor(Math.random() * listDosen.length)];
        if (tipeMutasi === 4 && child[i].penguji2) child[i].penguji2 = listDosen[Math.floor(Math.random() * listDosen.length)];
      }
    }

    steps.push(`🧪 Mutasi Gen-${g + 1}`);

    const fitnessAnak = hitungFitness(child);
    populasi.pop();
    populasi.push({ solusi: child, fitness: fitnessAnak });
  }

  populasi.sort((a, b) => b.fitness - a.fitness);
  setJadwalTerbaik(populasi[0].solusi);
  setFitnessTerbaik(populasi[0].fitness);
  setLogGenerasi(log);
  setChartData(chartLog);
  setProcessSteps(steps);

  const dosenCounter = {};
  populasi[0].solusi.forEach((entry) => {
    [entry.pembimbing, entry.penguji1, entry.penguji2, entry.penguji3]
      .filter(Boolean)
      .forEach(d => dosenCounter[d] = (dosenCounter[d] || 0) + 1);
  });
  setDosenLoad(dosenCounter);
};


  const hitungFitness = (solusi) => {
    let score = 100;
    const dosenLoad = {};
    for (let i = 0; i < solusi.length; i++) {
      const { jam, tanggal, ruangan, pembimbing, penguji } = solusi[i];
      for (let j = i + 1; j < solusi.length; j++) {
        const b = solusi[j];
        if (jam === b.jam && tanggal === b.tanggal) {
          if (ruangan === b.ruangan) score -= 10;
          if (pembimbing === b.pembimbing) score -= 10;
          if (penguji === b.penguji) score -= 10;
        }
      }
      dosenLoad[pembimbing] = (dosenLoad[pembimbing] || 0) + 1;
      dosenLoad[penguji] = (dosenLoad[penguji] || 0) + 1;
    }
    const nilaiMax = Math.max(...Object.values(dosenLoad));
    const nilaiMin = Math.min(...Object.values(dosenLoad));
    score -= (nilaiMax - nilaiMin) * 5;
    return score;
  };

  // const simpanKeFirestore = async () => {
  //   for (const jadwal of jadwalTerbaik) {
  //     await addDoc(collection(db, "jadwal_sidang_sempro"), jadwal);
  //   }
  //   alert("Jadwal berhasil disimpan ke Firestore!");
  // };



const simpanKeFirestore = async () => {
  let targetCollection = "jadwal_sidang_sempro";
  let userCollection = "usersSempro";
  let statusField = "statusSempro";

  if (selectedCategory === "SeminarIsi") {
    targetCollection = "jadwal_sidang_seminar";
    userCollection = "usersSeminarIsi";
    statusField = "statusSeminarIsi";
  } else if (selectedCategory === "Skripsi") {
    targetCollection = "jadwal_sidang_skripsi";
    userCollection = "usersSkripsi";
    statusField = "statusSkripsi";
  }

  for (const jadwal of jadwalTerbaik) {
    await addDoc(collection(db, targetCollection), jadwal);

    const userRef = doc(db, userCollection, jadwal.mahasiswaId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (userData[statusField] === "Masih Disidangkan") {
        console.log(`✅ Mengubah status ${statusField} untuk ID ${jadwal.mahasiswaId}`);
        await updateDoc(userRef, {
          [statusField]: "Lagi Sidang",
        });
      } else {
  console.warn(`⛔ Dilewati: ${statusField} sekarang = ${userData[statusField]}`);
}
    }
  }

  alert("Jadwal berhasil disimpan & status mahasiswa yang valid telah diperbarui!");
};




  const getCurrentDataset = () => {
    if (selectedCategory === "SeminarIsi") return dataSeminarIsi;
    if (selectedCategory === "Skripsi") return dataSkripsi;
    return dataSempro;
  };

      const maxLoad = Math.max(...Object.values(dosenLoad));


const [activeTab, setActiveTab] = useState("log");
  const [showCrossover, setShowCrossover] = useState(true);
  const [showMutasi, setShowMutasi] = useState(true);

  const maxFitness = Math.max(...chartData.map((d) => d.fitness));

  const filteredLog = logGenerasi.filter((log) => {
    if (log.includes("Crossover") && !showCrossover) return false;
    if (log.includes("Mutasi") && !showMutasi) return false;
    return true;
  });

  const exportLogToTxt = (logData) => {
    const blob = new Blob([logData.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "log_generasi.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <motion.div className={styles.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className={styles.gridAnalyticBox}>
        <div className={styles.card} onClick={() => setSelectedCategory("Sempro")}>📘 Mahasiswa Sempro ({dataSempro.length})</div>
        <div className={styles.card} onClick={() => setSelectedCategory("SeminarIsi")}>📕 Seminar Isi ({dataSeminarIsi.length})</div>
        <div className={styles.card} onClick={() => setSelectedCategory("Skripsi")}>📗 Skripsi ({dataSkripsi.length})</div>
      </div>

      <div className={styles.actionButtons}>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => generateGA(getCurrentDataset())}>🚀 Jalankan Genetic Algorithm</motion.button>
        {jadwalTerbaik.length > 0 && <motion.button whileTap={{ scale: 0.95 }} onClick={simpanKeFirestore}>💾 Simpan Jadwal ke Firestore</motion.button>}
      </div>

      {/* <AnimatePresence>
        {logGenerasi.length > 0 && (
          <motion.div className={styles.logBox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h4>🧬 Log Proses Generasi:</h4>
            <ul>{logGenerasi.map((log, idx) => <li key={idx}>{log}</li>)}</ul>
            <h4>⚙️ Detail Proses GA:</h4>
            <ul>{processSteps.map((step, idx) => <li key={idx}>{step}</li>)}</ul>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="fitness" stroke="#8884d8" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="generasi" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* <AnimatePresence>
  {logGenerasi.length > 0 && (
    <motion.div
      className={styles.logBox}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h3>🧠 Proses Genetic Algorithm</h3>
        <div className={styles.badge}>🔥 Fitness Terbaik: {maxFitness}</div>
      </div>

      <div className={styles.section}>
        <h4>🧬 Log Proses Generasi:</h4>
        <ul className={styles.scrollArea}>
          {logGenerasi.map((log, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.02 }}
            >
              {log}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h4>⚙️ Detail Proses GA:</h4>
        <ul className={styles.scrollArea}>
          {processSteps.map((step, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.02 }}
            >
              {step}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h4>📈 Grafik Nilai Fitness:</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <Line type="monotone" dataKey="fitness" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="generasi" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )}
</AnimatePresence> */}



<AnimatePresence>
      {logGenerasi.length > 0 && (
        <motion.div
          className={styles.logBox}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.header}>
            <h3>🧠 Proses Genetic Algorithm</h3>
            <div className={styles.badge}>🔥 Fitness Terbaik: {maxFitness}</div>
          </div>

          <div className={styles.tabs}>
            <button
              className={activeTab === "log" ? styles.active : ""}
              onClick={() => setActiveTab("log")}
            >
              Log
            </button>
            <button
              className={activeTab === "detail" ? styles.active : ""}
              onClick={() => setActiveTab("detail")}
            >
              Detail
            </button>
            <button
              className={activeTab === "chart" ? styles.active : ""}
              onClick={() => setActiveTab("chart")}
            >
              Grafik
            </button>
          </div>

          {activeTab === "log" && (
            <div className={styles.section}>
              <div className={styles.exportButtonWrap}>
                <button
                  className={styles.exportButton}
                  onClick={() => exportLogToTxt(filteredLog)}
                >
                  📁 Export Log
                </button>
              </div>

              <div className={styles.filterBox}>
                <label>
                  <input
                    type="checkbox"
                    checked={showCrossover}
                    onChange={() => setShowCrossover(!showCrossover)}
                  />
                  Crossover
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showMutasi}
                    onChange={() => setShowMutasi(!showMutasi)}
                  />
                  Mutasi
                </label>
              </div>

              <ul className={styles.scrollArea}>
                {filteredLog.map((log, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {log}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "detail" && (
            <div className={styles.section}>
              <ul className={styles.scrollArea}>
                {processSteps.map((step, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {step}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "chart" && (
            <div className={styles.section}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="fitness"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="generasi" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>


      {/* <motion.div className={styles.resultSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h3>📊 Fitness Terbaik: {fitnessTerbaik ?? "Belum dihitung"}</h3>
        {Array.from(new Set(jadwalTerbaik.map(j => j.tanggal))).map((tanggal, i) => (
          <div key={i}>
            <h4 style={{ marginTop: "1rem" }}>📅 Tanggal: {tanggal}</h4>
            <div style={{ display: "flex", gap: "2rem", overflowX: "auto" }}>
              {ruangan.map((ruang, j) => (
                <div key={j} style={{ minWidth: "300px" }}>
                  <h5 style={{ textAlign: "center" }}>🏛 {ruang}</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Jam</th>
                        <th>Pembimbing</th>
                        <th>Penguji 1</th>
                                                <th>Penguji 2</th>
                                                                        <th>Penguji 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jadwalTerbaik.filter(row => row.tanggal === tanggal && row.ruangan === ruang).map((row, k) => (
                        <tr key={k}>
                          <td>{row.namaMahasiswa}</td>
                          <td>{row.jam}</td>
                          <td>{row.pembimbing}</td>
                          <td>{row.penguji1}</td>
                                                    <td>{row.penguji2}</td>
                                                                              <td>{row.penguji3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div> */}

      <div className={styles.filterBox}>
  <label htmlFor="filterDosen">Filter Dosen: </label>
  <select id="filterDosen" value={filterDosen} onChange={(e) => setFilterDosen(e.target.value)}>
    <option value="">Semua</option>
    {listDosen.map((d, idx) => <option key={idx} value={d}>{d}</option>)}
  </select>
</div>


      {/* <motion.div
      className={styles.resultSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h3>📊 Fitness Terbaik: {fitnessTerbaik ?? "Belum dihitung"}</h3>
      {Array.from(new Set(jadwalTerbaik.map((j) => j.tanggal))).map(
        (tanggal, i) => (
          <div key={i}>
            <h4 className={styles.tanggalLabel}>📅 Tanggal: {tanggal}</h4>
            <div className={styles.gridPerTanggal}>
              {ruangan.map((ruang, j) => (
                <div key={j} className={styles.kolomRuangan}>
                  <h5>🏛 {ruang}</h5>
                  <table className={styles.jadwalTable}>
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Jam</th>
                        <th>Pembimbing</th>
                        <th>Penguji 1</th>
                        <th>Penguji 2</th>
                        <th>Penguji 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jadwalTerbaik
                        .filter(
                          (row) =>
                            row.tanggal === tanggal && row.ruangan === ruang
                        )
                        .map((row, k) => (
                          <tr
                            key={k}
                            className={
                              konflikSet.has(`${row.namaMahasiswa}-${row.jam}`)
                                ? styles.rowConflict
                                : ""
                            }
                          >
                            <td>{row.namaMahasiswa}</td>
                            <td>{row.jam}</td>
                            <td>{row.pembimbing}</td>
                            <td>{row.penguji1}</td>
                            <td>{row.penguji2}</td>
                            <td>{row.penguji3}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </motion.div> */}

    <motion.div className={styles.resultSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h3>📊 Fitness Terbaik: {fitnessTerbaik ?? "Belum dihitung"}</h3>
        {Array.from(new Set(jadwalTerbaik.map((j) => j.tanggal))).map((tanggal, i) => (
          <div key={i}>
            <h4 className={styles.tanggalLabel}>📅 Tanggal: {tanggal}</h4>
            <div className={styles.gridPerTanggal}>
              {ruangan.map((ruang, j) => (
                <div key={j} className={styles.kolomRuangan}>
                  <h5>🏛 {ruang}</h5>
                  <table className={styles.jadwalTable}>
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Jam</th>
                        <th>Pembimbing</th>
                        <th>Penguji 1</th>
                        <th>Penguji 2</th>
                        <th>Penguji 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jadwalTerbaik
                        .filter(row => row.tanggal === tanggal && row.ruangan === ruang)
                        // .filter(row => !filterDosen || [row.pembimbing, row.penguji1, row.penguji2, row.penguji3].includes(filterDosen))
                        .filter(row => !filterDosen || [row.pembimbing, row.dosen, row.penguji1, row.penguji2, row.penguji3].includes(filterDosen))
                        .map((row, k) => (
                          <motion.tr
                            key={k}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: k * 0.03 }}
                            className={
                              konflikSet.has(`${row.namaMahasiswa}-${row.jam}`)
                                ? styles.rowConflict
                                : ""
                            }
                          >
                            <td>{row.namaMahasiswa}</td>
                            <td>{row.jam}</td>
                            <td>{row.dosen || row.pembimbing}</td>
                            <td>{row.penguji1}</td>
                            <td>{row.penguji2}</td>
                            <td>{row.penguji3}</td>
                          </motion.tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div className={styles.resultSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h4>📚 Beban Dosen (Pembimbing + Penguji)</h4>
        {/* <ul>{Object.entries(dosenLoad).map(([nama, jumlah], i) => <li key={i}>{nama}: {jumlah} sidang</li>)}</ul> */}
        <ul>
  {Object.entries(dosenLoad).map(([nama, jumlah], i) => (
    <li key={i} className={jumlah === maxLoad ? styles.highlightSibuk : ""}>
      {nama}: {jumlah} sidang
    </li>
  ))}
</ul>
<motion.div className={styles.barchartBox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
  <h4>📊 Grafik Beban Dosen</h4>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={Object.entries(dosenLoad).map(([nama, jumlah]) => ({ nama, jumlah }))}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="nama" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="jumlah" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
</motion.div>

      </motion.div>
    </motion.div>
  );
};

export default KaprodiPage;
