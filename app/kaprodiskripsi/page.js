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














// KaprodiPage.jsx
"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import NavbarKaprodi from "../navbarkaprodi/page";
import styles from "./kaprodi.module.scss";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useRef } from "react";


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
  const [jadwalFix, setJadwalFix] = useState([]);
  const [showFixTable, setShowFixTable] = useState(false);
const tableFixRef = useRef(null);

  const [filterAngkatan, setFilterAngkatan] = useState("");
const [filterJurusan, setFilterJurusan] = useState("");


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

  const [mahasiswaSempro, setMahasiswaSempro] = useState([]);
  const [mahasiswaSemproJadwal, setMahasiswaSemproJadwal] = useState([]);


useEffect(() => {
  const fetchMahasiswa = async () => {
    const snapshot = await getDocs(collection(db, "usersSempro"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMahasiswaSempro(data);
  };
  fetchMahasiswa();
}, []);


const [listAngkatan, setListAngkatan] = useState([]);
const [listJurusan, setListJurusan] = useState([]);

useEffect(() => {
  const fetchMahasiswa = async () => {
    const snapshot = await getDocs(collection(db, "usersSempro"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMahasiswaSempro(data);

    // Ambil angkatan & jurusan unik
    const angkatanUnik = [...new Set(data.map(item => item.angkatan))];
    const jurusanUnik = [...new Set(data.map(item => item.jurusan))];
    setListAngkatan(angkatanUnik);
    setListJurusan(jurusanUnik);
  };
  fetchMahasiswa();
}, []);

const [mahasiswaSkripsi, setMahasiswaSkripsi] = useState([]);

useEffect(() => {
  const fetchMahasiswa = async () => {
    const snapshot = await getDocs(collection(db, "usersSkripsi"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMahasiswaSkripsi(data);
  };
  fetchMahasiswa();
}, []);

const [listAngkatanSkripsi, setListAngkatanSkripsi] = useState([]);
const [listJurusanSkripsi, setListJurusanSkripsi] = useState([]);

useEffect(() => {
  const fetchMahasiswa = async () => {
    const snapshot = await getDocs(collection(db, "usersSkripsi"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMahasiswaSkripsi(data);

    // Ambil angkatan & jurusan unik
    const angkatanUnik = [...new Set(data.map(item => item.angkatan))];
    const jurusanUnik = [...new Set(data.map(item => item.jurusan))];
    setListAngkatanSkripsi(angkatanUnik);
    setListJurusanSkripsi(jurusanUnik);
  };
  fetchMahasiswa();
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
        formulir: item.formulir,
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

  const [loading, setLoading] = useState(false);
  // const [jadwalSidang, setJadwalSidang] = useState([]);
  const [jadwalSidangSempro, setJadwalSidangSempro] = useState([]);
const [jadwalSidangSkripsi, setJadwalSidangSkripsi] = useState([]);


const handleGenerateSempro = async (nim) => {
  setLoading(true);
  try {
    const res = await fetch("/api/generate-schedule-bynimsempro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generations: 50,
        populationSize: 10,
        mutationRate: 0.1,
        tanggalSidang: new Date().toISOString().split("T")[0],
        targetNIM: nim,
        formulir: "Sempro", // pastikan dikirimkan
      }),
    });

    const result = await res.json();

    if (result.schedule?.formulir === "Sempro") {
      setJadwalSidangSempro([result.schedule]);
    }

    alert(result.message);
  } catch (error) {
    console.error("❌ Gagal membuat jadwal:", error);
    alert("Terjadi kesalahan saat membuat jadwal.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "jadwal_sidang_skripsi"), (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setJadwalFix(data);
  });

  return () => unsubscribe(); // cleanup saat komponen unmount
}, []);

const [mahasiswaBaruBelumAdaJadwal, setMahasiswaBaruBelumAdaJadwal] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const usersRef = collection(db, "usersSkripsi");
    const jadwalRef = collection(db, "jadwal_sidang");

    const [usersSnap, jadwalSnap] = await Promise.all([
      getDocs(usersRef),
      getDocs(jadwalRef)
    ]);

    const jadwalMap = new Map();
    jadwalSnap.docs.forEach(doc => {
      const data = doc.data();
      jadwalMap.set(data.nim, { ...data, id: doc.id });
    });

    const merged = usersSnap.docs
      .map(doc => {
        const mhs = doc.data();
        const jadwal = jadwalMap.get(mhs.nim);
        return jadwal ? { ...mhs, jadwal} : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.jadwal.timestamp?.seconds - b.jadwal.timestamp?.seconds);

    setMahasiswaSemproJadwal(merged);

    // Mahasiswa yang belum dapat jadwal:
    const mahasiswaBaru = usersSnap.docs
      .map(doc => doc.data())
      .filter(mhs => !jadwalMap.has(mhs.nim));

    setMahasiswaBaruBelumAdaJadwal(mahasiswaBaru);
  };

  fetchData();
}, []);

const [currentPage, setCurrentPage] = useState(1);
const pageSize = 10;

const paginatedData = mahasiswaSemproJadwal.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);

const exportToPDF = () => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [["No", "NIM", "Nama", "Judul", "Tanggal", "Jam", "Pembimbing", "Penguji", "Zoom"]],
    body: jadwalFix.map((item, i) => [
      i + 1, item.nim, item.nama, item.judul, item.tanggal_sidang,
      item.jam_sidang, item.dosen_pembimbing, item.dosen_penguji, item.link_zoom || "-"
    ])
  });
  doc.save("jadwal_fix_skripsi.pdf");
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(jadwalFix);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "JadwalFix");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "jadwal_fix_skripsi.xlsx");
};

const exportToWord = () => {
  let html = "<table border='1'><tr><th>No</th><th>NIM</th><th>Nama</th><th>Judul</th><th>Tanggal</th><th>Jam</th><th>Pembimbing</th><th>Penguji</th><th>Zoom</th></tr>";
  jadwalFix.forEach((item, i) => {
    html += `<tr><td>${i + 1}</td><td>${item.nim}</td><td>${item.nama}</td><td>${item.judul}</td><td>${item.tanggal_sidang}</td><td>${item.jam_sidang}</td><td>${item.dosen_pembimbing}</td><td>${item.dosen_penguji}</td><td>${item.link_zoom || "-"}</td></tr>`;
  });
  html += "</table>";

  const blob = new Blob(["\ufeff" + html], {
    type: "application/msword"
  });

  saveAs(blob, "jadwal_fix_skripsi.doc");
};


const handleGenerateSkripsi = async (nim) => {
  setLoading(true);
  try {
    const res = await fetch("/api/generate-schedule-bynimskripsi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generations: 50,
        populationSize: 10,
        mutationRate: 0.1,
        tanggalSidang: new Date().toISOString().split("T")[0],
        targetNIM: nim,
        formulir: "Skripsi", // pastikan dikirimkan
      }),
    });

    const result = await res.json();

    if (result.schedule?.formulir === "Skripsi") {
      setJadwalSidangSkripsi([result.schedule]);
    }

    alert(result.message);
  } catch (error) {
    console.error("❌ Gagal membuat jadwal:", error);
    alert("Terjadi kesalahan saat membuat jadwal.");
  } finally {
    setLoading(false);
  }
};


// const fetchData = async () => {
//   const usersRef = collection(db, "usersSempro");
//   const jadwalRef = collection(db, "jadwal_sidang");

//   const [usersSnap, jadwalSnap] = await Promise.all([
//     getDocs(usersRef),
//     getDocs(jadwalRef)
//   ]);

//   const jadwalMap = new Map();
//   jadwalSnap.docs.forEach(doc => {
//     const data = doc.data();
//     jadwalMap.set(data.nim, { ...data, id: doc.id });
//   });

//   const merged = usersSnap.docs
//     .map(doc => {
//       const mhs = doc.data();
//       const jadwal = jadwalMap.get(mhs.nim);
//       return jadwal ? { ...mhs, jadwal } : null;
//     })
//     .filter(Boolean)
//     .sort((a, b) => a.jadwal.timestamp?.seconds - b.jadwal.timestamp?.seconds);

//   setMahasiswaSemproJadwal(merged);

//   const mahasiswaBaru = usersSnap.docs
//     .map(doc => doc.data())
//     .filter(mhs => !jadwalMap.has(mhs.nim));

//   setMahasiswaBaruBelumAdaJadwal(mahasiswaBaru);
// };

// useEffect(() => {
//   fetchData();
// }, []);


// ====================
useEffect(() => {
  const usersRef = collection(db, "usersSempro");
  const jadwalRef = collection(db, "jadwal_sidang_sempro");

  // Listen realtime dari jadwal_sidang:
  const unsubscribeJadwal = onSnapshot(jadwalRef, async (jadwalSnap) => {
    const usersSnap = await getDocs(usersRef);

    const jadwalMap = new Map();
    jadwalSnap.docs.forEach(doc => {
      const data = doc.data();
      jadwalMap.set(data.nim, { ...data, id: doc.id });
    });

    const merged = usersSnap.docs
      .map(doc => {
        const mhs = doc.data();
        const jadwal = jadwalMap.get(mhs.nim);
        return jadwal ? { ...mhs, jadwal } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.jadwal.timestamp?.seconds - b.jadwal.timestamp?.seconds);

    setMahasiswaSemproJadwal(merged);

    const mahasiswaBaru = usersSnap.docs
      .map(doc => doc.data())
      .filter(mhs => !jadwalMap.has(mhs.nim));

    setMahasiswaBaruBelumAdaJadwal(mahasiswaBaru);
  });

  // Unsubscribe kalau komponen unmount
  return () => unsubscribeJadwal();
}, []);


// const handleGenerateBatch = async () => {
//   setLoading(true);
//   try {
//     const res = await fetch("/api/generate-batch", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" }
//     });

//     const result = await res.json();
//     alert(result.message);

//     // ✅ Refresh data setelah generate
//     await fetchData();
//   } catch (error) {
//     console.error("❌ Gagal membuat jadwal:", error);
//     alert("Terjadi kesalahan saat membuat jadwal.");
//   } finally {
//     setLoading(false);
//   }
// };


const handleGenerateBatch = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/generate-batch-skripsi", { method: "POST" });
    const result = await res.json();
    alert(result.message);
    // ✅ Tidak perlu panggil fetchData atau reload
  } catch (error) {
    console.error("❌ Gagal membuat jadwal:", error);
    alert("Terjadi kesalahan saat membuat jadwal.");
  } finally {
    setLoading(false);
  }
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
       

<div className={styles.verticalScroll}>
  {paginatedData.map((mhs, index) => (
    <div key={mhs.nim} className={styles.cardBox}>
      <strong>{mhs.nama}</strong>
      <p>NIM: {mhs.nim}</p>
      <p>Judul: {mhs.judul}</p>
      <p>Form: {mhs.formulir}</p>
      <p>Ruangan: {mhs.jadwal.ruangan || "belum diisi"}</p>
      <p>📅 {mhs.jadwal.tanggal_sidang} • {mhs.jadwal.jam_sidang}</p>
      <p>Pembimbing: {mhs.jadwal.dosen_pembimbing}</p>
      <p>Penguji 1: {mhs.jadwal.dosen_penguji}</p>
      <p>Zoom: {mhs.jadwal.link_zoom || "Belum diisi"}</p>
    </div>
  ))}
</div>

<div className={styles.pagination}>
  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>⬅️ Prev</button>
  <span>Page {currentPage}</span>
  <button disabled={currentPage * pageSize >= mahasiswaSemproJadwal.length} onClick={() => setCurrentPage(p => p + 1)}>Next ➡️</button>
</div>
{/* {mahasiswaBaruBelumAdaJadwal.length >= 10 && (
  <button onClick={handleGenerateBatch} className={styles.generateButton}>
    🔥 Generate Batch Baru
  </button>
)} */}
{/* <button onClick={async () => {
    await handleGenerateBatch();
    await fetchData(); // langsung refresh data
}} className={styles.generateButton}>
  🔥 Generate Batch Baru
</button> */}

{/* <button onClick={async () => {
    await handleGenerateBatch();
    window.location.reload();
}} className={styles.generateButton}>
  🔥 Generate Batch Baru
</button> */}

<button onClick={handleGenerateBatch} className={styles.generateButton}>
  {loading ? "Memproses..." : "🔥 Generate Batch Baru"}
</button>


{showFixTable && jadwalFix.length > 0 && (
  <div className={styles.tableWrapper}>
    <h2 className={styles.subheading}>📑 Jadwal Fix Sidang (Skripsi)</h2>

    <div className={styles.exportButtons}>
      <button onClick={() => exportToPDF()}>📄 Export PDF</button>
      <button onClick={() => exportToExcel()}>📊 Export Excel</button>
      <button onClick={() => exportToWord()}>📝 Export Word</button>
    </div>

    <table className={styles.dataTable}>
      <thead>
        <tr>
          <th>No</th>
          <th>NIM</th>
          <th>Nama</th>
          <th>Judul</th>
          <th>Tanggal</th>
          <th>Jam</th>
          <th>Pembimbing</th>
          <th>Penguji 1</th>
          <th>Zoom</th>
        </tr>
      </thead>
      <tbody>
        {jadwalFix.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.nim}</td>
            <td>{item.nama}</td>
            <td>{item.judul}</td>
            <td>{item.tanggal_sidang}</td>
            <td>{item.jam_sidang}</td>
            <td>{item.dosen_pembimbing}</td>
            <td>{item.dosen_penguji}</td>
            <td>{item.link_zoom || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


{jadwalFix.length > 0 && (
  <div className={styles.tableWrapper} ref={tableFixRef}>

    <h2 className={styles.subheading}>📑 Jadwal Fix Sidang (Skripsi)</h2>

    <div className={styles.exportButtons}>
      <button onClick={() => exportToPDF()}>📄 Export PDF</button>
      <button onClick={() => exportToExcel()}>📊 Export Excel</button>
      <button onClick={() => exportToWord()}>📝 Export Word</button>
    </div>

    <table className={styles.dataTable}>
      <thead>
        <tr>
          <th>No</th>
          <th>NIM</th>
          <th>Nama</th>
          <th>Judul</th>
          <th>Tanggal</th>
          <th>Jam</th>
          <th>Pembimbing</th>
          <th>Penguji 1</th>
          <th>Zoom</th>
        </tr>
      </thead>
      <tbody>
        {jadwalFix.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.nim}</td>
            <td>{item.nama}</td>
            <td>{item.judul}</td>
            <td>{item.tanggal_sidang}</td>
            <td>{item.jam_sidang}</td>
            <td>{item.dosen_pembimbing}</td>
            <td>{item.dosen_penguji}</td>
            <td>{item.link_zoom || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

<h2 className={styles.subheading}>📋 Daftar Data Mahasiswa Sempro:</h2>
<div className={styles.filterContainer}>
  <select onChange={(e) => setFilterAngkatan(e.target.value)} className={styles.dropdown}>
    <option value="">📅 Semua Angkatan</option>
    {listAngkatan.map((angkatan) => (
      <option key={angkatan} value={angkatan}>{angkatan}</option>
    ))}
  </select>

  <select onChange={(e) => setFilterJurusan(e.target.value)} className={styles.dropdown}>
    <option value="">🎓 Semua Jurusan</option>
    {listJurusan.map((jurusan) => (
      <option key={jurusan} value={jurusan}>{jurusan}</option>
    ))}
  </select>
</div>

<div className={styles.gridListmahasiswa}>
  {mahasiswaSempro
    .filter(item =>
      item.nim.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterAngkatan === "" || item.angkatan === filterAngkatan) &&
      (filterJurusan === "" || item.jurusan === filterJurusan)
    )
    .map((mhs) => (
      <div key={mhs.id} className={styles.cardmahasiswa}>
                <h3 className={styles.headingSempro}>Mahasiswa Sempro</h3>
        <p className={styles.nimmahasiswa}>{mhs.nim}</p>
        <p className={styles.namamahasiswa}>📛 {mhs.nama}</p>
        <p className={styles.detailmahasiswa}>🎓 {mhs.jurusan} ({mhs.angkatan})</p>
        <p className={styles.detailmahasiswa}>📄 {mhs.judul}</p>
        <p className={styles.detailmahasiswa}>📱 {mhs.noWhatsapp}</p>
            
<button
  onClick={() => handleGenerateSempro(mhs.nim, "Sempro")} // ✅ Kirim NIM dan formulir
  disabled={loading}
  className={styles.generateButton}
>
  {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
</button>

      </div>
  ))}
</div>


{jadwalSidangSempro.length > 0 && (
  <div className={styles.gridListmahasiswa}>
    <h2 className={styles.subheading}>🧬 Jadwal Sidang Otomatis (Kategori: Sempro)</h2>
    {jadwalSidangSempro.map((jadwal, index) => {
      const isSent = sentJadwalIds.includes(jadwal.id);
      return (
        <div key={index} className={styles.cardmahasiswa}>
          <p>📛 NIM: {jadwal.nim}</p>
          <p>👨‍🏫 Pembimbing: {jadwal.dosen_pembimbing}</p>
          <p>🧑‍⚖️ Penguji 1: {jadwal.dosen_penguji}</p>
          <p>🧑‍⚖️ Penguji 2: {jadwal.dosen_penguji2}</p>
          <p>🧑‍⚖️ Penguji 3: {jadwal.dosen_penguji3}</p>
          <p>🧑‍⚖️ Penguji 4: {jadwal.dosen_penguji4}</p>
          <p>📅 Tanggal Sidang: {jadwal.tanggal_sidang}</p>
          <p>⏰ Jam Sidang: {jadwal.jam_sidang}</p>
          <button className={styles.sendButton} onClick={() => handleSendToPenguji(jadwal)} disabled={isSent}>
            {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
          </button>
        </div>
      );
    })}
  </div>
)}


<h2 className={styles.subheading}>📋 Daftar Data Mahasiswa Skripsi:</h2>
<div className={styles.filterContainer}>
  <select onChange={(e) => setFilterAngkatan(e.target.value)} className={styles.dropdown}>
    <option value="">📅 Semua Angkatan</option>
    {listAngkatanSkripsi.map((angkatan) => (
      <option key={angkatan} value={angkatan}>{angkatan}</option>
    ))}
  </select>

  <select onChange={(e) => setFilterJurusan(e.target.value)} className={styles.dropdown}>
    <option value="">🎓 Semua Jurusan</option>
    {listJurusanSkripsi.map((jurusan) => (
      <option key={jurusan} value={jurusan}>{jurusan}</option>
    ))}
  </select>
</div>

<div className={styles.gridListmahasiswa}>
  {mahasiswaSkripsi
    .filter(item =>
      item.nim.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterAngkatan === "" || item.angkatan === filterAngkatan) &&
      (filterJurusan === "" || item.jurusan === filterJurusan)
    )
    .map((mhs) => (
      <div key={mhs.id} className={styles.cardmahasiswa}>
                <h3 className={styles.headingSempro}>Mahasiswa Skripsi</h3>
        <p className={styles.nimmahasiswa}>{mhs.nim}</p>
        <p className={styles.namamahasiswa}>📛 {mhs.nama}</p>
        <p className={styles.detailmahasiswa}>🎓 {mhs.jurusan} ({mhs.angkatan})</p>
        <p className={styles.detailmahasiswa}> {mhs.dosen} </p>
        <p className={styles.detailmahasiswa}>📄 {mhs.judul}</p>
        <p className={styles.detailmahasiswa}>📱 {mhs.noWhatsapp}</p>
         {/* <button
      onClick={handleGenerate}
      disabled={loading}
      className={styles.generateButton}
    >
      {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
    </button> */}
    <button
  onClick={() => handleGenerateSkripsi(mhs.nim, "Skripsi")} // ⬅️ Kirim NIM
  disabled={loading}
  className={styles.generateButton}
>
  {loading ? "Memproses..." : "🔁 Buat Jadwal Sidang Otomatis"}
</button>

      </div>
  ))}
  

</div>


{jadwalSidangSkripsi.length > 0 && (
  <div className={styles.gridListmahasiswa}>
    <h2 className={styles.subheading}>🧬 Jadwal Sidang Otomatis (Kategori: Skripsi)</h2>
    {jadwalSidangSkripsi.map((jadwal, index) => {
      const isSent = sentJadwalIds.includes(jadwal.id);
      return (
        <div key={index} className={styles.cardmahasiswa}>
          <p>📛 NIM: {jadwal.nim}</p>
          <p>👨‍🏫 Pembimbing: {jadwal.dosen_pembimbing}</p>
          <p>🧑‍⚖️ Penguji 1: {jadwal.dosen_penguji}</p>
          <p>🧑‍⚖️ Penguji 2: {jadwal.dosen_penguji2}</p>
          <p>🧑‍⚖️ Penguji 3: {jadwal.dosen_penguji3}</p>
          <p>🧑‍⚖️ Penguji 4: {jadwal.dosen_penguji4}</p>
          <p>📅 Tanggal Sidang: {jadwal.tanggal_sidang}</p>
          <p>⏰ Jam Sidang: {jadwal.jam_sidang}</p>
          <button className={styles.sendButton} onClick={() => handleSendToPenguji(jadwal)} disabled={isSent}>
            {isSent ? "✅ Terkirim ke Penguji" : "Tampilkan di Halaman Penguji"}
          </button>
        </div>
      );
    })}
  </div>
)}

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
