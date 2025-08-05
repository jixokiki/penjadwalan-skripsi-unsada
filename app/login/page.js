// // 'use client';
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { auth } from "@/lib/firebase";
// // import { signInWithEmailAndPassword } from "firebase/auth";

// // export default function LoginPage() {
// //   const [nim, setNim] = useState("");
// //   const [password, setPassword] = useState(""); // Password dummy
// //   const router = useRouter();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await signInWithEmailAndPassword(auth, `${nim}@email.com`, password);
// //       router.push('/dashboard');
// //     } catch (error) {
// //       alert('Login gagal! Pastikan NIM benar.');
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen">
// //       <form className="p-6 bg-white rounded shadow-md" onSubmit={handleLogin}>
// //         <h1 className="mb-4 text-xl font-bold">Login Mahasiswa</h1>
// //         <input
// //           type="text"
// //           placeholder="NIM"
// //           value={nim}
// //           onChange={(e) => setNim(e.target.value)}
// //           className="block w-full p-2 mb-4 border"
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="block w-full p-2 mb-4 border"
// //           required
// //         />
// //         <button type="submit" className="w-full p-2 text-white bg-blue-500">
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }




// //jangan dihapus yaa iooooo
// // 'use client';
// // import { motion } from "framer-motion";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { auth, db } from "@/lib/firebase";
// // import { signInWithEmailAndPassword } from "firebase/auth";
// // import { collection, query, where, getDocs } from "firebase/firestore";
// // import styles from './login.module.scss';

// // export default function LoginPage() {
// //   const [nimOrEmail, setNimOrEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const router = useRouter();

// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const email = nimOrEmail.includes('@') ? nimOrEmail : `${nimOrEmail}@email.com`;
// // //       await signInWithEmailAndPassword(auth, email, password);

// // //       const userDoc = doc(db, "users", email);
// // //       const userSnap = await getDoc(userDoc);

// // //       if (userSnap.exists()) {
// // //         const role = userSnap.data().role;
// // //         if (role === "admin") {
// // //           router.push('/admin');
// // //         } else {
// // //           router.push('/dashboard');
// // //         }
// // //       } else {
// // //         alert('Role tidak ditemukan!');
// // //       }
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert('Login gagal! Pastikan NIM atau Email dan Password benar.');
// // //     }
// // //   };

// // //INIIIIII JANGAN DIHAPUS YAA ANAK PUKIII
// // // const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const email = nimOrEmail.includes('@') ? nimOrEmail : `${nimOrEmail}@email.com`;
// // //       await signInWithEmailAndPassword(auth, email, password);
  
// // //       // Cek role di Firestore
// // //       const userQuery = query(collection(db, "users"), where("email", "==", email));
// // //       const querySnapshot = await getDocs(userQuery);
  
// // //       if (!querySnapshot.empty) {
// // //         const userData = querySnapshot.docs[0].data();
// // //         const role = userData.role;
// // //         if (role === "admin") {
// // //           router.push('/admin');
// // //         } else if(role === "kaprodi"){
// // //           router.push('/kaprodi');
// // //         } else if(role === "mahasiswa"){
// // //           router.push('/dashboardmahasiswa');
// // //         }
// // //         else if(role === "penguji"){
// // //           router.push('/penguji');
// // //         }
// // //         else {
// // //           router.push('/dashboard');
// // //         }
// // //       } else {
// // //         alert('Role tidak ditemukan di database!');
// // //       }
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert('Login gagal! Pastikan NIM atau Email dan Password benar.');
// // //     }
// // //   };
  


// // const handleLogin = async (e) => {
// //   e.preventDefault();
// //   try {
// //     const email = nimOrEmail.includes('@') ? nimOrEmail : `${nimOrEmail}@gmail.com`;

// //     // Login ke Firebase Authentication
// //     await signInWithEmailAndPassword(auth, email, password);

// //     // Ambil data user berdasarkan email
// //     const userQuery = query(collection(db, "users"), where("email", "==", email));
// //     const querySnapshot = await getDocs(userQuery);

// //     if (!querySnapshot.empty) {
// //       const userData = querySnapshot.docs[0].data();
// //       const role = userData.role;

// //       // Routing berdasarkan role
// //       if (role === "admin") {
// //         router.push('/admin');
// //       } else if (role === "kaprodi") {
// //         router.push('/kaprodi');
// //       } else if (role === "mahasiswa") {
// //         router.push('/dashboardmahasiswa');
// //       } else if (role === "penguji") {
// //         router.push('/penguji');
// //       } else if (role === "dosen") {
// //         router.push('/dosen');
// //       } else {
// //         router.push('/dashboard');
// //       }
// //     } else {
// //       alert('Akun ditemukan, tapi role belum ditentukan di Firestore.');
// //     }

// //   } catch (error) {
// //     console.error(error);
// //     alert('Login gagal! Pastikan NIM atau Email dan Password benar.');
// //   }
// // };


// //   return (
// //     // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
// //     //   <motion.div
// //     //     initial={{ opacity: 0, y: -20 }}
// //     //     animate={{ opacity: 1, y: 0 }}
// //     //     className="p-8 bg-white rounded-lg shadow-md w-80"
// //     //   >


// //     <div className={styles.wrapper}>
// //       <motion.div className={styles.card}>

// //         {/* <h1 className="text-2xl font-bold text-center mb-6">Selamat Datang di E-Skripsi Scheduler</h1>
// //         <form onSubmit={handleLogin} className="space-y-4">
// //           <input
// //             type="text"
// //             placeholder="NIM Mahasiswa atau Email Admin"
// //             value={nimOrEmail}
// //             onChange={(e) => setNimOrEmail(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             required
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             required
// //           />
// //           <button
// //             type="submit"
// //             className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //           >
// //             Login
// //           </button>
// //         </form> */}
// //         <h1 className={styles.title}>Selamat Datang di E-Skripsi Scheduler</h1>
// //     <form onSubmit={handleLogin} className={styles.form}>
// //       <input
// //         type="text"
// //         placeholder="NIM Mahasiswa atau Email Admin"
// //         value={nimOrEmail}
// //         onChange={(e) => setNimOrEmail(e.target.value)}
// //         className={styles.input}
// //         required
// //       />
// //       <input
// //         type="password"
// //         placeholder="Password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //         className={styles.input}
// //         required
// //       />
// //       <button type="submit" className={styles.button}>
// //         Login
// //       </button>
// //     </form>
// //       </motion.div>
// //     </div>
// //   );
// // }






// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

// const GeneticAlgorithmScheduler = () => {
//   // State untuk 5 mahasiswa (hardcoded sesuai permintaan)
//   const [mahasiswaData] = useState([
//     { nama: "Alice Johnson", nim: "123456789", judul: "Implementasi Machine Learning dalam E-commerce" },
//     { nama: "Bob Smith", nim: "987654321", judul: "Sistem Manajemen Inventory Berbasis Web" }, 
//     { nama: "Charlie Brown", nim: "456789123", judul: "Aplikasi Mobile untuk Monitoring Kesehatan" },
//     { nama: "Diana Prince", nim: "789123456", judul: "Analisis Big Data untuk Prediksi Cuaca" },
//     { nama: "Edward Wilson", nim: "321654987", judul: "Blockchain untuk Supply Chain Management" }
//   ]);

//   // State untuk hasil GA
//   const [jadwalTerbaik, setJadwalTerbaik] = useState([]);
//   const [fitnessTerbaik, setFitnessTerbaik] = useState(null);
//   const [logGenerasi, setLogGenerasi] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [dosenLoad, setDosenLoad] = useState({});
//   const [detailFitnessTerbaik, setDetailFitnessTerbaik] = useState(null);
//   const [statistikFitness, setStatistikFitness] = useState({
//     best: null,
//     avg: null,  
//     worst: null,
//   });

//   // State untuk konfigurasi
//   const [populasiSize, setPopulasiSize] = useState(20);
//   const [generasiMaks, setGenerasiMaks] = useState(10);
//   const [probCrossover, setProbCrossover] = useState(0.7);
//   const [probMutasi, setProbMutasi] = useState(0.1);

//   // Tab state
//   const [activeTab, setActiveTab] = useState("input");

//   // Data konfigurasi
//   const waktuSidang = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:30", "13:30", "14:30", "15:30"];
//   const ruangan = ["Ruang T-301", "Ruang T-302", "Ruang T-303"];
//   const listDosen = ["Dr. Ahmad", "Prof. Budi", "Dr. Citra", "Prof. Dewi", "Dr. Eko", "Prof. Fani"];

//   // Fungsi untuk menentukan tanggal berdasarkan NIM (ganjil = Senin, genap = Selasa)
//   const getTanggalSidang = (nim) => {
//     const lastDigit = parseInt(nim.slice(-1));
//     return lastDigit % 2 === 1 ? "2025-07-21" : "2025-07-22"; // Senin atau Selasa
//   };

//   // Fungsi Hitung Fitness
//   const hitungFitness = (solusi) => {
//     let score = 1000;
//     const jadwalMap = {};
//     const dosenMap = {};

//     let bentrokRuangan = 0;
//     let bentrokDosen = 0;
//     let pengujiGanda = 0;
//     let bebanDosen = 0;

//     solusi.forEach((entry) => {
//       const key = `${entry.tanggal}-${entry.jam}-${entry.ruangan}`;
//       if (!jadwalMap[key]) jadwalMap[key] = [];
//       jadwalMap[key].push(entry);

//       [entry.pembimbing, entry.penguji1, entry.penguji2].filter(Boolean).forEach((dosen) => {
//         const dosKey = `${entry.tanggal}-${entry.jam}-${dosen}`;
//         if (!dosenMap[dosKey]) dosenMap[dosKey] = 0;
//         dosenMap[dosKey]++;
//       });
//     });

//     // Penalti bentrok ruangan
//     Object.values(jadwalMap).forEach(list => {
//       if (list.length > 1) {
//         const konflik = list.length - 1;
//         score -= 100 * konflik;
//         bentrokRuangan += 100 * konflik;
//       }
//     });

//     // Penalti bentrok dosen
//     Object.values(dosenMap).forEach(count => {
//       if (count > 1) {
//         const konflik = count - 1;
//         score -= 50 * konflik;
//         bentrokDosen += 50 * konflik;
//       }
//     });

//     // Penalti penguji ganda
//     solusi.forEach(entry => {
//       if (entry.penguji1 && entry.penguji2 && entry.penguji1 === entry.penguji2) {
//         score -= 30;
//         pengujiGanda += 30;
//       }
//       if (entry.pembimbing === entry.penguji1 || entry.pembimbing === entry.penguji2) {
//         score -= 20;
//         pengujiGanda += 20;
//       }
//     });

//     // Penalti beban dosen tidak merata
//     const dosenTotal = {};
//     solusi.forEach(entry => {
//       [entry.pembimbing, entry.penguji1, entry.penguji2].filter(Boolean).forEach(d => {
//         dosenTotal[d] = (dosenTotal[d] || 0) + 1;
//       });
//     });

//     const beban = Object.values(dosenTotal);
//     if (beban.length > 0) {
//       const max = Math.max(...beban);
//       const min = Math.min(...beban);
//       const selisih = max - min;
//       const penaltyBeban = selisih * 10;
//       score -= penaltyBeban;
//       bebanDosen = penaltyBeban;
//     }

//     return {
//       score,
//       detail: {
//         bentrokRuangan,
//         bentrokDosen,
//         pengujiGanda,
//         bebanDosen
//       }
//     };
//   };

//   // Fungsi untuk membuat solusi acak
//   const createRandomSolution = () => {
//     return mahasiswaData.map((mhs) => {
//       const waktu = waktuSidang[Math.floor(Math.random() * waktuSidang.length)];
//       const tanggal = getTanggalSidang(mhs.nim); // Berdasarkan NIM
//       const ruang = ruangan[Math.floor(Math.random() * ruangan.length)];
//       const pembimbing = listDosen[Math.floor(Math.random() * listDosen.length)];
      
//       // Pilih penguji yang berbeda dari pembimbing
//       let penguji1 = pembimbing;
//       let penguji2 = pembimbing;
      
//       while (penguji1 === pembimbing) {
//         penguji1 = listDosen[Math.floor(Math.random() * listDosen.length)];
//       }
      
//       while (penguji2 === pembimbing || penguji2 === penguji1) {
//         penguji2 = listDosen[Math.floor(Math.random() * listDosen.length)];
//       }

//       return {
//         namaMahasiswa: mhs.nama,
//         nim: mhs.nim,
//         tanggal,
//         jam: waktu,
//         ruangan: ruang,
//         pembimbing,
//         penguji1,
//         penguji2,
//         judul: mhs.judul
//       };
//     });
//   };

//   // Fungsi utama Genetic Algorithm
//   const generateGA = () => {
//     let populasi = [];
//     let log = [];
//     let chartLog = [];

//     // Inisialisasi populasi
//     for (let i = 0; i < populasiSize; i++) {
//       const solusi = createRandomSolution();
//       const hasil = hitungFitness(solusi);
//       populasi.push({ 
//         solusi, 
//         fitness: hasil.score, 
//         detailFitness: hasil.detail 
//       });
//     }

//     // Evolusi selama beberapa generasi
//     for (let g = 0; g < generasiMaks; g++) {
//       // Urutkan berdasarkan fitness (tertinggi = terbaik)
//       populasi.sort((a, b) => b.fitness - a.fitness);
//       const best = populasi[0];
      
//       log.push(`Generasi ${g + 1}: fitness terbaik ${best.fitness}`);
//       chartLog.push({ generasi: `Gen-${g + 1}`, fitness: best.fitness });

//       // Seleksi parent (tournament selection)
//       const selectParent = () => {
//         const kandidat = [
//           populasi[Math.floor(Math.random() * populasi.length)],
//           populasi[Math.floor(Math.random() * populasi.length)]
//         ];
//         return kandidat.sort((a, b) => b.fitness - a.fitness)[0].solusi;
//       };

//       // Crossover
//       const newPopulation = [populasi[0]]; // Elitism - simpan yang terbaik
      
//       while (newPopulation.length < populasiSize) {
//         if (Math.random() < probCrossover) {
//           const parentA = selectParent();
//           const parentB = selectParent();
//           const crossoverPoint = Math.floor(parentA.length / 2);
          
//           let child1 = [...parentA.slice(0, crossoverPoint), ...parentB.slice(crossoverPoint)];
//           let child2 = [...parentB.slice(0, crossoverPoint), ...parentA.slice(crossoverPoint)];
          
//           // Mutasi
//           [child1, child2].forEach(child => {
//             child.forEach(gene => {
//               if (Math.random() < probMutasi) {
//                 const tipeMutasi = Math.floor(Math.random() * 4);
//                 if (tipeMutasi === 0) gene.jam = waktuSidang[Math.floor(Math.random() * waktuSidang.length)];
//                 if (tipeMutasi === 1) gene.ruangan = ruangan[Math.floor(Math.random() * ruangan.length)];
//                 if (tipeMutasi === 2) gene.pembimbing = listDosen[Math.floor(Math.random() * listDosen.length)];
//                 if (tipeMutasi === 3) {
//                   let newPenguji = gene.pembimbing;
//                   while (newPenguji === gene.pembimbing) {
//                     newPenguji = listDosen[Math.floor(Math.random() * listDosen.length)];
//                   }
//                   gene.penguji1 = newPenguji;
//                 }
//               }
//             });
//           });

//           // Evaluasi fitness anak
//           const fitness1 = hitungFitness(child1);
//           const fitness2 = hitungFitness(child2);
          
//           newPopulation.push({ 
//             solusi: child1, 
//             fitness: fitness1.score, 
//             detailFitness: fitness1.detail 
//           });
          
//           if (newPopulation.length < populasiSize) {
//             newPopulation.push({ 
//               solusi: child2, 
//               fitness: fitness2.score, 
//               detailFitness: fitness2.detail 
//             });
//           }
//         }
//       }
      
//       populasi = newPopulation;
//     }

//     // Hasil akhir
//     populasi.sort((a, b) => b.fitness - a.fitness);
//     const hasilTerbaik = populasi[0];
    
//     setJadwalTerbaik(hasilTerbaik.solusi);
//     setFitnessTerbaik(hasilTerbaik.fitness);
//     setDetailFitnessTerbaik(hasilTerbaik.detailFitness);
//     setLogGenerasi(log);
//     setChartData(chartLog);

//     // Hitung statistik fitness
//     const nilaiFitness = chartLog.map(d => d.fitness);
//     const bestFitness = Math.max(...nilaiFitness);
//     const worstFitness = Math.min(...nilaiFitness);
//     const averageFitness = (nilaiFitness.reduce((a, b) => a + b, 0) / nilaiFitness.length).toFixed(2);

//     setStatistikFitness({
//       best: bestFitness.toFixed(2),
//       avg: averageFitness,
//       worst: worstFitness.toFixed(2),
//     });

//     // Hitung beban dosen
//     const dosenCounter = {};
//     hasilTerbaik.solusi.forEach((entry) => {
//       [entry.pembimbing, entry.penguji1, entry.penguji2]
//         .filter(Boolean)
//         .forEach(d => dosenCounter[d] = (dosenCounter[d] || 0) + 1);
//     });
//     setDosenLoad(dosenCounter);

//     setActiveTab("hasil");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6">
//           <h1 className="text-3xl font-bold text-white text-center mb-2">
//             🧬 Sistem Penjadwalan Genetic Algorithm
//           </h1>
//           <p className="text-blue-200 text-center">
//             Algoritma genetika untuk optimasi jadwal sidang mahasiswa
//           </p>
//         </div>

//         {/* Tab Navigation */}
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6">
//           <div className="flex gap-4 mb-4">
//             <button
//               onClick={() => setActiveTab("input")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 activeTab === "input" 
//                   ? "bg-blue-500 text-white shadow-lg" 
//                   : "bg-white/20 text-blue-200 hover:bg-white/30"
//               }`}
//             >
//               📝 Input Data
//             </button>
//             <button
//               onClick={() => setActiveTab("konfigurasi")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 activeTab === "konfigurasi" 
//                   ? "bg-blue-500 text-white shadow-lg" 
//                   : "bg-white/20 text-blue-200 hover:bg-white/30"
//               }`}
//             >
//               ⚙️ Konfigurasi GA
//             </button>
//             <button
//               onClick={() => setActiveTab("hasil")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 activeTab === "hasil" 
//                   ? "bg-blue-500 text-white shadow-lg" 
//                   : "bg-white/20 text-blue-200 hover:bg-white/30"
//               }`}
//             >
//               📊 Hasil & Analisis
//             </button>
//           </div>
//         </div>

//         {/* Content Tabs */}
//         {activeTab === "input" && (
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
//             <h2 className="text-2xl font-bold text-white mb-4">📚 Data Mahasiswa</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-white">
//                 <thead>
//                   <tr className="border-b border-white/20">
//                     <th className="p-3 text-left">No</th>
//                     <th className="p-3 text-left">Nama</th>
//                     <th className="p-3 text-left">NIM</th>
//                     <th className="p-3 text-left">Judul</th>
//                     <th className="p-3 text-left">Hari Sidang</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {mahasiswaData.map((mhs, idx) => (
//                     <tr key={idx} className="border-b border-white/10">
//                       <td className="p-3">{idx + 1}</td>
//                       <td className="p-3">{mhs.nama}</td>
//                       <td className="p-3 font-mono">{mhs.nim}</td>
//                       <td className="p-3 text-sm">{mhs.judul}</td>
//                       <td className="p-3">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           parseInt(mhs.nim.slice(-1)) % 2 === 1 
//                             ? "bg-green-500/20 text-green-300" 
//                             : "bg-blue-500/20 text-blue-300"
//                         }`}>
//                           {parseInt(mhs.nim.slice(-1)) % 2 === 1 ? "Senin" : "Selasa"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
            
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-white/10 p-4 rounded-xl">
//                 <h3 className="text-white font-semibold mb-2">📅 Waktu Sidang</h3>
//                 <div className="text-blue-200 text-sm">
//                   {waktuSidang.join(", ")}
//                 </div>
//               </div>
//               <div className="bg-white/10 p-4 rounded-xl">
//                 <h3 className="text-white font-semibold mb-2">🏛️ Ruangan</h3>
//                 <div className="text-blue-200 text-sm">
//                   {ruangan.join(", ")}
//                 </div>
//               </div>
//               <div className="bg-white/10 p-4 rounded-xl">
//                 <h3 className="text-white font-semibold mb-2">👨‍🏫 Dosen</h3>
//                 <div className="text-blue-200 text-sm">
//                   {listDosen.join(", ")}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "konfigurasi" && (
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
//             <h2 className="text-2xl font-bold text-white mb-6">⚙️ Konfigurasi Genetic Algorithm</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-white font-semibold mb-2">
//                     Ukuran Populasi: {populasiSize}
//                   </label>
//                   <input
//                     type="range"
//                     min="10"
//                     max="100"
//                     value={populasiSize}
//                     onChange={(e) => setPopulasiSize(parseInt(e.target.value))}
//                     className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-white font-semibold mb-2">
//                     Jumlah Generasi: {generasiMaks}
//                   </label>
//                   <input
//                     type="range"
//                     min="5"
//                     max="50"
//                     value={generasiMaks}
//                     onChange={(e) => setGenerasiMaks(parseInt(e.target.value))}
//                     className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-white font-semibold mb-2">
//                     Probabilitas Crossover: {probCrossover}
//                   </label>
//                   <input
//                     type="range"
//                     min="0.1"
//                     max="1.0"
//                     step="0.1"
//                     value={probCrossover}
//                     onChange={(e) => setProbCrossover(parseFloat(e.target.value))}
//                     className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-white font-semibold mb-2">
//                     Probabilitas Mutasi: {probMutasi}
//                   </label>
//                   <input
//                     type="range"
//                     min="0.01"
//                     max="0.5"
//                     step="0.01"
//                     value={probMutasi}
//                     onChange={(e) => setProbMutasi(parseFloat(e.target.value))}
//                     className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 text-center">
//               <button
//                 onClick={generateGA}
//                 className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 🚀 Jalankan Genetic Algorithm
//               </button>
//             </div>
//           </div>
//         )}

//         {activeTab === "hasil" && jadwalTerbaik.length > 0 && (
//           <div className="space-y-6">
//             {/* Statistik Hasil */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
//               <h2 className="text-2xl font-bold text-white mb-4">📈 Statistik Hasil</h2>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div className="bg-blue-500/20 p-4 rounded-xl text-center">
//                   <div className="text-3xl font-bold text-blue-300">{fitnessTerbaik}</div>
//                   <div className="text-blue-200">Fitness Terbaik</div>
//                 </div>
//                 <div className="bg-green-500/20 p-4 rounded-xl text-center">
//                   <div className="text-3xl font-bold text-green-300">{statistikFitness.best}</div>
//                   <div className="text-green-200">Best Fitness</div>
//                 </div>
//                 <div className="bg-yellow-500/20 p-4 rounded-xl text-center">
//                   <div className="text-3xl font-bold text-yellow-300">{statistikFitness.avg}</div>
//                   <div className="text-yellow-200">Average Fitness</div>
//                 </div>
//                 <div className="bg-red-500/20 p-4 rounded-xl text-center">
//                   <div className="text-3xl font-bold text-red-300">{statistikFitness.worst}</div>
//                   <div className="text-red-200">Worst Fitness</div>
//                 </div>
//               </div>
//             </div>

//             {/* Grafik Evolusi */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
//               <h3 className="text-xl font-bold text-white mb-4">📊 Evolusi Fitness</h3>
//               <div className="bg-white/5 p-4 rounded-xl" style={{ height: '300px' }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
//                     <XAxis dataKey="generasi" stroke="#ffffff80" />
//                     <YAxis stroke="#ffffff80" />
//                     <Tooltip 
//                       contentStyle={{ 
//                         backgroundColor: 'rgba(0,0,0,0.8)', 
//                         border: 'none', 
//                         borderRadius: '8px',
//                         color: 'white'
//                       }} 
//                     />
//                     <Line 
//                       type="monotone" 
//                       dataKey="fitness" 
//                       stroke="#3B82F6" 
//                       strokeWidth={3}
//                       dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Detail Fitness */}
//             {detailFitnessTerbaik && (
//               <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
//                 <h3 className="text-xl font-bold text-white mb-4">🔍 Detail Penalti</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div className="bg-red-500/20 p-4 rounded-xl text-center">
//                     <div className="text-2xl font-bold text-red-300">-{detailFitnessTerbaik.bentrokRuangan}</div>
//                     <div className="text-red-200 text-sm">Bentrok Ruangan</div>
//                   </div>
//                   <div className="bg-orange-500/20 p-4 rounded-xl text-center">
//                     <div className="text-2xl font-bold text-orange-300">-{detailFitnessTerbaik.bentrokDosen}</div>
//                     <div className="text-orange-200 text-sm">Bentrok Dosen</div>
//                   </div>
//                   <div className="bg-yellow-500/20 p-4 rounded-xl text-center">
//                     <div className="text-2xl font-bold text-yellow-300">-{detailFitnessTerbaik.pengujiGanda}</div>
//                     <div className="text-yellow-200 text-sm">Penguji Ganda</div>
//                   </div>
//                   <div className="bg-purple-500/20 p-4 rounded-xl text-center">
//                     <div className="text-2xl font-bold text-purple-300">-{detailFitnessTerbaik.bebanDosen}</div>
//                     <div className="text-purple-200 text-sm">Beban Tidak Merata</div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Jadwal Hasil */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
//               <h3 className="text-xl font-bold text-white mb-4">📅 Jadwal Sidang Terbaik</h3>
              
//               {/* Senin */}
//               <div className="mb-6">
//                 <h4 className="text-lg font-semibold text-green-300 mb-3">📅 Senin (2025-07-21)</h4>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-white border border-white/20 rounded-lg overflow-hidden">
//                     <thead className="bg-white/10">
//                       <tr>
//                         <th className="p-3 text-left">Judul</th>
//                         <th className="p-3 text-left">Jam</th>
//                         <th className="p-3 text-left">Ruangan</th>
//                         <th className="p-3 text-left">Pembimbing</th>
//                         <th className="p-3 text-left">Penguji 1</th>
//                         <th className="p-3 text-left">Penguji 2</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {jadwalTerbaik
//                         .filter(jadwal => jadwal.tanggal === "2025-07-22")
//                         .map((jadwal, idx) => (
//                           <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
//                             <td className="p-3">{idx + 1}</td>
//                             <td className="p-3">{jadwal.namaMahasiswa}</td>
//                             <td className="p-3 font-mono">{jadwal.nim}</td>
//                             <td className="p-3 text-sm">{jadwal.judul}</td>
//                             <td className="p-3">
//                               <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
//                                 {jadwal.jam}
//                               </span>
//                             </td>
//                             <td className="p-3">{jadwal.ruangan}</td>
//                             <td className="p-3">{jadwal.pembimbing}</td>
//                             <td className="p-3">{jadwal.penguji1}</td>
//                             <td className="p-3">{jadwal.penguji2}</td>
//                           </tr>
//                         ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             {/* Beban Dosen */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
//               <h3 className="text-xl font-bold text-white mb-4">👨‍🏫 Beban Dosen</h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
//                 {Object.entries(dosenLoad).map(([nama, jumlah]) => (
//                   <div key={nama} className="bg-white/5 p-3 rounded-lg">
//                     <div className="text-white font-semibold">{nama}</div>
//                     <div className="text-blue-300">{jumlah} sidang</div>
//                   </div>
//                 ))}
//               </div>
              
//               {Object.keys(dosenLoad).length > 0 && (
//                 <div className="bg-white/5 p-4 rounded-xl" style={{ height: '300px' }}>
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={Object.entries(dosenLoad).map(([nama, jumlah]) => ({ nama, jumlah }))}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
//                       <XAxis dataKey="nama" stroke="#ffffff80" />
//                       <YAxis stroke="#ffffff80" />
//                       <Tooltip 
//                         contentStyle={{ 
//                           backgroundColor: 'rgba(0,0,0,0.8)', 
//                           border: 'none', 
//                           borderRadius: '8px',
//                           color: 'white'
//                         }} 
//                       />
//                       <Bar dataKey="jumlah" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               )}
//             </div>

//             {/* Log Generasi */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
//               <h3 className="text-xl font-bold text-white mb-4">📝 Log Proses GA</h3>
//               <div className="bg-black/20 p-4 rounded-xl max-h-64 overflow-y-auto">
//                 <pre className="text-green-300 text-sm font-mono">
//                   {logGenerasi.join('\n')}
//                 </pre>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "hasil" && jadwalTerbaik.length === 0 && (
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
//             <div className="text-6xl mb-4">🤖</div>
//             <h3 className="text-2xl font-bold text-white mb-2">Belum Ada Hasil</h3>
//             <p className="text-blue-200 mb-6">
//               Silakan jalankan Genetic Algorithm terlebih dahulu di tab Konfigurasi GA
//             </p>
//             <button
//               onClick={() => setActiveTab("konfigurasi")}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
//             >
//               Pergi ke Konfigurasi GA →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GeneticAlgorithmScheduler;left">No</th>
//                         <th className="p-3 text-left">Nama</th>
//                         <th className="p-3 text-left">NIM</th>
//                         <th className="p-3 text-left">Judul</th>
//                         <th className="p-3 text-left">Jam</th>
//                         <th className="p-3 text-left">Ruangan</th>
//                         <th className="p-3 text-left">Pembimbing</th>
//                         <th className="p-3 text-left">Penguji 1</th>
//                         <th className="p-3 text-left">Penguji 2</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {jadwalTerbaik
//                         .filter(jadwal => jadwal.tanggal === "2025-07-21")
//                         .map((jadwal, idx) => (
//                           <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
//                             <td className="p-3">{idx + 1}</td>
//                             <td className="p-3">{jadwal.namaMahasiswa}</td>
//                             <td className="p-3 font-mono">{jadwal.nim}</td>
//                             <td className="p-3 text-sm">{jadwal.judul}</td>
//                             <td className="p-3">
//                               <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
//                                 {jadwal.jam}
//                               </span>
//                             </td>
//                             <td className="p-3">{jadwal.ruangan}</td>
//                             <td className="p-3">{jadwal.pembimbing}</td>
//                             <td className="p-3">{jadwal.penguji1}</td>
//                             <td className="p-3">{jadwal.penguji2}</td>
//                           </tr>
//                         ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Selasa */}
//               <div className="mb-6">
//                 <h4 className="text-lg font-semibold text-blue-300 mb-3">📅 Selasa (2025-07-22)</h4>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-white border border-white/20 rounded-lg overflow-hidden">
//                     <thead className="bg-white/10">
//                       <tr>
//                         <th className="p-3 text-left">No</th>
//                         <th className="p-3 text-left">Nama</th>
//                         <th className="p-3 text-left">NIM</th>
//                         <th className="p-3 text-








"use client";
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

// Data awal mahasiswa
const initialMahasiswaData = [
  { nama: "Alice Johnson", nim: "123456789", judul: "Implementasi AI dalam Dunia Pendidikan" },
  { nama: "Bob Smith", nim: "987654321", judul: "Sistem Informasi Manajemen UKM" },
  { nama: "Charlie Brown", nim: "192837465", judul: "Blockchain untuk Keamanan Data" },
  { nama: "Diana Prince", nim: "564738291", judul: "Pengaruh UI/UX terhadap User Retention" },
  { nama: "Ethan Hunt", nim: "847362519", judul: "Aplikasi Mobile untuk Deteksi Dini Diabetes" },
];

const GeneticAlgorithmScheduler = () => {
  const [mahasiswaData] = useState(initialMahasiswaData);
  const [jadwal, setJadwal] = useState([]);
  const [fitnessHistory, setFitnessHistory] = useState([]);

  // Parameter Genetic Algorithm
  const POPULATION_SIZE = 10;
  const MAX_GENERATIONS = 20;
  const CROSSOVER_RATE = 0.8;
  const MUTATION_RATE = 0.1;

  // Contoh slot waktu dan ruangan
  const slotWaktu = ['Senin 08:00', 'Senin 10:00', 'Selasa 08:00', 'Selasa 10:00', 'Rabu 08:00'];
  const ruangan = ['Ruang A', 'Ruang B'];

  // Fungsi bantu
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateIndividual = () => {
    return mahasiswaData.map((mhs) => ({
      ...mhs,
      waktu: getRandom(slotWaktu),
      ruangan: getRandom(ruangan),
    }));
  };

  const calculateFitness = (individual) => {
    let conflicts = 0;
    const jadwalMap = {};

    individual.forEach((item) => {
      const key = `${item.waktu}-${item.ruangan}`;
      if (jadwalMap[key]) {
        conflicts += 1; // Bentrok waktu & ruangan
      } else {
        jadwalMap[key] = true;
      }
    });

    // Fitness = Semakin sedikit konflik, semakin tinggi nilainya
    return 1 / (1 + conflicts);
  };

  const crossover = (parent1, parent2) => {
    const child = parent1.map((item, index) => {
      if (Math.random() < 0.5) return { ...item };
      else return { ...parent2[index] };
    });
    return child;
  };

  const mutate = (individual) => {
    return individual.map((item) => {
      if (Math.random() < MUTATION_RATE) {
        return {
          ...item,
          waktu: getRandom(slotWaktu),
          ruangan: getRandom(ruangan),
        };
      }
      return item;
    });
  };

  const runGA = () => {
    let population = Array.from({ length: POPULATION_SIZE }, generateIndividual);
    let fitnessList = [];

    for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
      const populationFitness = population.map(ind => calculateFitness(ind));
      const bestIndex = populationFitness.indexOf(Math.max(...populationFitness));
      const bestIndividual = population[bestIndex];

      fitnessList.push({ generation: generation + 1, fitness: populationFitness[bestIndex].toFixed(3) });

      if (populationFitness[bestIndex] === 1) {
        setJadwal(bestIndividual);
        setFitnessHistory(fitnessList);
        return;
      }

      const newPopulation = [];
      while (newPopulation.length < POPULATION_SIZE) {
        const parent1 = population[Math.floor(Math.random() * POPULATION_SIZE)];
        const parent2 = population[Math.floor(Math.random() * POPULATION_SIZE)];
        let child = crossover(parent1, parent2);
        child = mutate(child);
        newPopulation.push(child);
      }
      population = newPopulation;
    }

    // Ambil best setelah selesai semua generasi
    const finalFitness = population.map(ind => calculateFitness(ind));
    const bestIdx = finalFitness.indexOf(Math.max(...finalFitness));
    setJadwal(population[bestIdx]);
    setFitnessHistory(fitnessList);
  };

  useEffect(() => {
    runGA();
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Penjadwalan Sidang (Algoritma Genetika)</h2>

      {/* Jadwal Hasil */}
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-2 px-4 border">Nama</th>
              <th className="py-2 px-4 border">NIM</th>
              <th className="py-2 px-4 border">Judul</th>
              <th className="py-2 px-4 border">Waktu</th>
              <th className="py-2 px-4 border">Ruangan</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map((item, index) => (
              <tr key={index} className="text-center border-b">
                <td className="py-2 px-4 border">{item.nama}</td>
                <td className="py-2 px-4 border">{item.nim}</td>
                <td className="py-2 px-4 border">{item.judul}</td>
                <td className="py-2 px-4 border">{item.waktu}</td>
                <td className="py-2 px-4 border">{item.ruangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grafik Perkembangan Fitness */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Perkembangan Nilai Fitness</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fitnessHistory}>
            <Line type="monotone" dataKey="fitness" stroke="#8884d8" strokeWidth={2} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="generation" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Grafik Bar Slot Waktu */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Distribusi Jadwal Sidang</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={slotWaktu.map(slot => ({
            waktu: slot,
            jumlah: jadwal.filter(j => j.waktu === slot).length
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="waktu" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="jumlah" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GeneticAlgorithmScheduler;
