// 'use client';
// import { useState, useEffect } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import jsPDF from "jspdf";

// export default function AdminPage() {
//   const [jadwal, setJadwal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchJadwal = async () => {
//       const snapshot = await getDocs(collection(db, "jadwal_sidang"));
//       const data = snapshot.docs.map(doc => doc.data());
//       setJadwal(data);
//     };
//     fetchJadwal();
//   }, []);

//   const generateSchedule = async () => {
//     await fetch('/api/generate-schedule', { method: 'POST' });
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

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl mb-4">Admin Dashboard</h1>

//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <button onClick={generateSchedule} className="p-2 bg-blue-500 text-white rounded">
//           Generate Jadwal Sidang
//         </button>
//         <button onClick={resetData} className="p-2 bg-yellow-500 text-white rounded">
//           Reset Semua Jadwal
//         </button>
//         <button onClick={downloadPDF} className="p-2 bg-green-500 text-white rounded">
//           Download Jadwal (PDF)
//         </button>
//         <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
//           Logout
//         </button>
//       </div>

//       <input
//         type="text"
//         placeholder="Cari NIM mahasiswa..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="mb-6 p-2 border rounded w-full md:w-1/2"
//       />

//       <h2 className="text-xl mb-2">Daftar Jadwal Sidang:</h2>
//       <ul className="space-y-2">
//         {filteredJadwal.map((item, index) => (
//           <li key={index} className="p-4 bg-gray-100 rounded shadow">
//             <strong>{item.nim}</strong> | {item.tanggal_sidang} | {item.dosen_pembimbing} & {item.dosen_penguji}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }






// 'use client';
// import { useState, useEffect } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs } from "firebase/firestore";
// import jsPDF from "jspdf";

// export default function AdminPage() {
//   const [jadwal, setJadwal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [generations, setGenerations] = useState(50);
//   const [populationSize, setPopulationSize] = useState(10);
//   const [mutationRate, setMutationRate] = useState(0.1);
//   const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
//   const router = useRouter();

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
//       body: JSON.stringify({
//         generations,
//         populationSize,
//         mutationRate,
//         tanggalSidang
//       })
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

// //   return (
// //     <div className="p-6 max-w-screen-lg mx-auto">
// //       <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //         <input type="number" min={10} max={200} value={generations} onChange={(e) => setGenerations(+e.target.value)} className="border p-2 rounded" placeholder="Generasi" />
// //         <input type="number" min={5} max={100} value={populationSize} onChange={(e) => setPopulationSize(+e.target.value)} className="border p-2 rounded" placeholder="Ukuran Populasi" />
// //         <input type="number" min={0} max={1} step={0.01} value={mutationRate} onChange={(e) => setMutationRate(+e.target.value)} className="border p-2 rounded" placeholder="Mutasi (0.1)" />
// //         <input type="date" value={tanggalSidang} onChange={(e) => setTanggalSidang(e.target.value)} className="border p-2 rounded" />
// //       </div>

// //       <div className="flex flex-wrap gap-4 mb-6 justify-center">
// //         <button onClick={generateSchedule} className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded shadow hover:scale-105 transition">
// //           Generate Jadwal Sidang (GA)
// //         </button>
// //         <button onClick={resetData} className="p-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
// //           Reset Semua Jadwal
// //         </button>
// //         <button onClick={downloadPDF} className="p-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
// //           Download Jadwal (PDF)
// //         </button>
// //         <button onClick={handleLogout} className="p-3 bg-red-600 text-white rounded hover:bg-red-700 transition">
// //           Logout
// //         </button>
// //       </div>

// //       <input
// //         type="text"
// //         placeholder="Cari NIM mahasiswa..."
// //         value={searchTerm}
// //         onChange={(e) => setSearchTerm(e.target.value)}
// //         className="mb-6 p-3 border rounded w-full"
// //       />

// //       <h2 className="text-2xl font-semibold mb-2">Daftar Jadwal Sidang:</h2>
// //       <ul className="space-y-2">
// //         {filteredJadwal.map((item, index) => (
// //           <li key={index} className="p-4 bg-gray-100 rounded shadow">
// //             <strong>{item.nim}</strong> | {item.tanggal_sidang} | {item.dosen_pembimbing} & {item.dosen_penguji}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );

// return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">📋 Admin Dashboard</h1>
  
//         {/* Kontrol Parameter GA */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <input type="number" min={10} max={200} value={generations} onChange={(e) => setGenerations(+e.target.value)}
//             className="border border-gray-300 p-3 rounded shadow-sm focus:ring focus:ring-blue-300"
//             placeholder="Generasi" />
//           <input type="number" min={5} max={100} value={populationSize} onChange={(e) => setPopulationSize(+e.target.value)}
//             className="border border-gray-300 p-3 rounded shadow-sm focus:ring focus:ring-blue-300"
//             placeholder="Ukuran Populasi" />
//           <input type="number" min={0} max={1} step={0.01} value={mutationRate} onChange={(e) => setMutationRate(+e.target.value)}
//             className="border border-gray-300 p-3 rounded shadow-sm focus:ring focus:ring-blue-300"
//             placeholder="Mutasi (0.1)" />
//           <input type="date" value={tanggalSidang} onChange={(e) => setTanggalSidang(e.target.value)}
//             className="border border-gray-300 p-3 rounded shadow-sm focus:ring focus:ring-blue-300" />
//         </div>
  
//         {/* Tombol Aksi */}
//         <div className="flex flex-wrap gap-4 mb-6 justify-center">
//           <button onClick={generateSchedule}
//             className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform">
//             🚀 Generate Jadwal Sidang
//           </button>
//           <button onClick={resetData}
//             className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition">
//             ♻️ Reset Jadwal
//           </button>
//           <button onClick={downloadPDF}
//             className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition">
//             📄 Download PDF
//           </button>
//           <button onClick={handleLogout}
//             className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition">
//             🚪 Logout
//           </button>
//         </div>
  
//         {/* Pencarian */}
//         <input
//           type="text"
//           placeholder="🔍 Cari NIM mahasiswa..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="mb-6 p-3 border border-gray-300 rounded-lg shadow-sm w-full focus:ring focus:ring-indigo-300"
//         />
  
//         {/* List Jadwal */}
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">🗓️ Daftar Jadwal Sidang:</h2>
//         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {filteredJadwal.map((item, index) => (
//             <li key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="text-lg font-medium">{item.nim}</div>
//               <div className="text-gray-600">{item.tanggal_sidang} — {item.jam_sidang}</div>
//               <div className="mt-1 text-sm text-gray-500">{item.dosen_pembimbing} & {item.dosen_penguji}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
  
// }



// 'use client';
// import { useState, useEffect } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs } from "firebase/firestore";
// import jsPDF from "jspdf";

// export default function AdminPage() {
//   const [jadwal, setJadwal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [generations, setGenerations] = useState(50);
//   const [populationSize, setPopulationSize] = useState(10);
//   const [mutationRate, setMutationRate] = useState(0.1);
//   const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
//   const router = useRouter();

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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 font-sans">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-800 tracking-tight">📅 Admin Jadwal Sidang</h1>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <input type="number" min={10} max={200} value={generations} onChange={(e) => setGenerations(+e.target.value)} className="input-field" placeholder="Generasi" />
//           <input type="number" min={5} max={100} value={populationSize} onChange={(e) => setPopulationSize(+e.target.value)} className="input-field" placeholder="Populasi" />
//           <input type="number" min={0} max={1} step={0.01} value={mutationRate} onChange={(e) => setMutationRate(+e.target.value)} className="input-field" placeholder="Mutasi (0.1)" />
//           <input type="date" value={tanggalSidang} onChange={(e) => setTanggalSidang(e.target.value)} className="input-field" />
//         </div>

//         <div className="flex flex-wrap gap-4 justify-center mb-10">
//           <button onClick={generateSchedule} className="btn bg-gradient-to-r from-blue-600 to-purple-600">🚀 Generate</button>
//           <button onClick={resetData} className="btn bg-yellow-500 hover:bg-yellow-600">♻️ Reset</button>
//           <button onClick={downloadPDF} className="btn bg-green-600 hover:bg-green-700">📄 PDF</button>
//           <button onClick={handleLogout} className="btn bg-red-600 hover:bg-red-700">🚪 Logout</button>
//         </div>

//         <input type="text" placeholder="🔍 Cari NIM mahasiswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field w-full mb-6" />

//         <h2 className="text-2xl font-bold text-gray-700 mb-4">📝 Daftar Jadwal Sidang:</h2>
//         <ul className="grid md:grid-cols-2 gap-4">
//           {filteredJadwal.map((item, index) => (
//             <li key={index} className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 hover:shadow-xl transition">
//               <p className="font-semibold text-lg text-indigo-700">{item.nim}</p>
//               <p className="text-gray-600">{item.tanggal_sidang} • {item.jam_sidang}</p>
//               <p className="text-sm text-gray-500">{item.dosen_pembimbing} & {item.dosen_penguji}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <style jsx>{`
//         .input-field {
//           @apply p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300;
//         }
//         .btn {
//           @apply px-6 py-3 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform;
//         }
//       `}</style>
//     </div>
//   );
// }


// 'use client';
// import { useState, useEffect } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs } from "firebase/firestore";
// import jsPDF from "jspdf";

// export default function AdminPage() {
//   const [jadwal, setJadwal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [generations, setGenerations] = useState(50);
//   const [populationSize, setPopulationSize] = useState(10);
//   const [mutationRate, setMutationRate] = useState(0.1);
//   const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
//   const router = useRouter();

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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-8 font-sans">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-5xl font-black text-center mb-10 text-indigo-800 tracking-tight">📅 Admin Jadwal Sidang</h1>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//           <input type="number" min={10} max={200} value={generations} onChange={(e) => setGenerations(+e.target.value)} className="input-field" placeholder="Generasi" />
//           <input type="number" min={5} max={100} value={populationSize} onChange={(e) => setPopulationSize(+e.target.value)} className="input-field" placeholder="Populasi" />
//           <input type="number" min={0} max={1} step={0.01} value={mutationRate} onChange={(e) => setMutationRate(+e.target.value)} className="input-field" placeholder="Mutasi (0.1)" />
//           <input type="date" value={tanggalSidang} onChange={(e) => setTanggalSidang(e.target.value)} className="input-field" />
//         </div>

//         <div className="flex flex-wrap gap-4 justify-center mb-10">
//           <button onClick={generateSchedule} className="btn bg-gradient-to-r from-indigo-600 to-purple-600">🚀 Generate</button>
//           <button onClick={resetData} className="btn bg-gradient-to-r from-yellow-400 to-yellow-600">♻️ Reset</button>
//           <button onClick={downloadPDF} className="btn bg-gradient-to-r from-emerald-500 to-emerald-700">📄 PDF</button>
//           <button onClick={handleLogout} className="btn bg-gradient-to-r from-rose-500 to-rose-700">🚪 Logout</button>
//         </div>

//         <input type="text" placeholder="🔍 Cari NIM mahasiswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field w-full mb-8" />

//         <h2 className="text-3xl font-bold text-gray-700 mb-6">📝 Daftar Jadwal Sidang:</h2>
//         <ul className="grid md:grid-cols-2 gap-6">
//           {filteredJadwal.map((item, index) => (
//             <li key={index} className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
//               <p className="text-xl font-bold text-indigo-700">{item.nim}</p>
//               <p className="text-gray-600">{item.tanggal_sidang} • {item.jam_sidang}</p>
//               <p className="text-sm text-gray-500 mt-1">{item.dosen_pembimbing} & {item.dosen_penguji}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <style jsx>{`
//         .input-field {
//           @apply p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 bg-white/70 backdrop-blur-sm;
//         }
//         .btn {
//           @apply px-6 py-3 text-white font-bold rounded-2xl shadow-md hover:scale-105 transition-transform;
//         }
//       `}</style>
//     </div>
//   );
// }


//JANGAN DIHAPUSS YA IKIIIIIIII WOIII 
// 'use client';
// import { useState, useEffect } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs } from "firebase/firestore";
// import jsPDF from "jspdf";
// import { motion } from "framer-motion";

// export default function AdminPage() {
//   const [jadwal, setJadwal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [generations, setGenerations] = useState(50);
//   const [populationSize, setPopulationSize] = useState(10);
//   const [mutationRate, setMutationRate] = useState(0.1);
//   const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
//   const router = useRouter();

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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] p-8 font-sans">
//       {/* <div className="max-w-6xl mx-auto"> */}
//       <motion.div
//   className="max-w-6xl mx-auto"
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.6, ease: "easeOut" }}
// >
//         <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-700 tracking-tight drop-shadow-md">📅 Admin Jadwal Sidang</h1>

//         {/* Input Setting */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//           <input type="number" min={10} max={200} value={generations} onChange={(e) => setGenerations(+e.target.value)} className="px-4 py-3 rounded-2xl shadow-inner bg-white/70 focus:ring-4 focus:ring-indigo-200 backdrop-blur-sm" placeholder="Generasi" />
//           <input type="number" min={5} max={100} value={populationSize} onChange={(e) => setPopulationSize(+e.target.value)} className="px-4 py-3 rounded-2xl shadow-inner bg-white/70 focus:ring-4 focus:ring-indigo-200 backdrop-blur-sm" placeholder="Populasi" />
//           <input type="number" min={0} max={1} step={0.01} value={mutationRate} onChange={(e) => setMutationRate(+e.target.value)} className="px-4 py-3 rounded-2xl shadow-inner bg-white/70 focus:ring-4 focus:ring-indigo-200 backdrop-blur-sm" placeholder="Mutasi (0.1)" />
//           <input type="date" value={tanggalSidang} onChange={(e) => setTanggalSidang(e.target.value)} className="px-4 py-3 rounded-2xl shadow-inner bg-white/70 focus:ring-4 focus:ring-indigo-200 backdrop-blur-sm" />
//         </div> */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//   <div className="flex flex-col">
//     <label className="text-sm text-gray-600 mb-1">Generasi</label>
//     <input
//       type="number"
//       min={10}
//       max={200}
//       value={generations}
//       onChange={(e) => setGenerations(+e.target.value)}
//       className="px-4 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
//     />
//   </div>
//   <div className="flex flex-col">
//     <label className="text-sm text-gray-600 mb-1">Populasi</label>
//     <input
//       type="number"
//       min={5}
//       max={100}
//       value={populationSize}
//       onChange={(e) => setPopulationSize(+e.target.value)}
//       className="px-4 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
//     />
//   </div>
//   <div className="flex flex-col">
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
//   </div>
//   <div className="flex flex-col">
//     <label className="text-sm text-gray-600 mb-1">Tanggal Sidang</label>
//     <input
//       type="date"
//       value={tanggalSidang}
//       onChange={(e) => setTanggalSidang(e.target.value)}
//       className="px-4 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
//     />
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

// {/* <div className="flex flex-wrap gap-4 justify-center mb-12">
//   {[
//     { label: "🚀 Generate", onClick: generateSchedule, gradient: "from-indigo-500 to-purple-600" },
//     { label: "♻️ Reset", onClick: resetData, gradient: "from-yellow-400 to-yellow-600" },
//     { label: "📄 PDF", onClick: downloadPDF, gradient: "from-emerald-400 to-emerald-600" },
//     { label: "🚪 Logout", onClick: handleLogout, gradient: "from-rose-500 to-rose-700" },
//   ].map((btn, idx) => (
//     <button
//       key={idx}
//       onClick={btn.onClick}
//       className={`bg-gradient-to-r ${btn.gradient} hover:brightness-110 text-white font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300`}
//     >
//       {btn.label}
//     </button>
//   ))}
// </div>  */}


//         {/* Search */}
//         <input type="text" placeholder="🔍 Cari NIM mahasiswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-inner focus:ring-4 focus:ring-indigo-200 mb-12" />

//         {/* Jadwal */}
//         <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">📝 Daftar Jadwal Sidang:</h2>
//         <ul className="grid md:grid-cols-2 gap-8">
//           {filteredJadwal.map((item, index) => (
//             <li key={index} className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-[1.02] hover:shadow-2xl transition-transform">
//               <p className="text-2xl font-extrabold text-indigo-600">{item.nim}</p>
//               <p className="text-gray-600 text-lg mt-1">{item.tanggal_sidang} • {item.jam_sidang}</p>
//               <p className="text-gray-500 text-sm mt-2">{item.dosen_pembimbing} & {item.dosen_penguji}</p>
//             </li>
//           ))}
//         </ul>
//       {/* </div> */}
//       </motion.div>
//     </div>
//   );
// }




// 'use client';
// import { useState, useEffect } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs } from "firebase/firestore";
// import jsPDF from "jspdf";
// import { motion } from "framer-motion";
// import styles from './admindashboard.module.scss';


// export default function AdminPage() {
//   const [jadwal, setJadwal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [generations, setGenerations] = useState(50);
//   const [populationSize, setPopulationSize] = useState(10);
//   const [mutationRate, setMutationRate] = useState(0.1);
//   const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchJadwal = async () => {
//       const snapshot = await getDocs(collection(db, "jadwalSidangMahasiswa"));
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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] p-8 font-sans">
//       {/* <div className="max-w-6xl mx-auto"> */}
//       <motion.div
//   className="max-w-6xl mx-auto"
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.6, ease: "easeOut" }}
// >
//         <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-700 tracking-tight drop-shadow-md">📅 Admin Jadwal Sidang</h1>
//         {/* Search */}
//         <input type="text" placeholder="🔍 Cari NIM mahasiswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-inner focus:ring-4 focus:ring-indigo-200 mb-12" />

//         {/* Jadwal */}
//         <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">📝 Daftar Jadwal Sidang:</h2>
//         <ul className="grid md:grid-cols-2 gap-8">
//           {filteredJadwal.map((item, index) => (
//             <li key={index} className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-[1.02] hover:shadow-2xl transition-transform">
//               {/* <p className="text-2xl font-extrabold text-indigo-600">{item.nim}</p> */}
//               <p className="text-gray-600 text-lg mt-1">{item.tanggal_sidang} • {item.jam_sidang}</p>
//               {/* <p className="text-gray-500 text-sm mt-2">{item.dosen_pembimbing} & {item.dosen_penguji}</p> */}
//                     NIM: {item.nim}<br />
//       Pembimbing: {item.dosen_pembimbing}<br />
//       Penguji: {item.dosen_penguji}<br />
//       Penguji2: {item.dosen_penguji2}<br />
//       Penguji3: {item.dosen_penguji3}<br />
//       Penguji4: {item.dosen_penguji4}<br />
//             </li>
//           ))}
//         </ul>
//       {/* </div> */}
//       </motion.div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs, addDoc } from "firebase/firestore";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import styles from "./admindashboard.module.scss";

export default function AdminPage() {
  const [jadwal, setJadwal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [generations, setGenerations] = useState(50);
  const [populationSize, setPopulationSize] = useState(10);
  const [mutationRate, setMutationRate] = useState(0.1);
  const [tanggalSidang, setTanggalSidang] = useState("2025-05-10");
  const [zoomLinks, setZoomLinks] = useState({});
  const router = useRouter();

  const [jadwalSidang, setJadwalSidang] = useState([]);
const [searchTermJadwal, setSearchTermJadwal] = useState("");



  useEffect(() => {
    const fetchJadwal = async () => {
      const snapshot = await getDocs(collection(db, "jadwalSidangMahasiswa"));
      const data = snapshot.docs.map(doc => doc.data());
      setJadwal(data);
    };
    fetchJadwal();
  }, []);

  useEffect(() => {
  const fetchJadwalSidang = async () => {
    const snapshot = await getDocs(collection(db, "jadwal_sidang"));
    const data = snapshot.docs.map(doc => doc.data());
    setJadwalSidang(data);
  };
  fetchJadwalSidang();
}, []);


  const generateSchedule = async () => {
    await fetch('/api/generate-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ generations, populationSize, mutationRate, tanggalSidang })
    });
    window.location.reload();
  };

  const resetData = async () => {
    await fetch('/api/reset-data', { method: 'POST' });
    window.location.reload();
  };

  const downloadPDF = () => {
    const docPdf = new jsPDF();
    docPdf.text("Jadwal Sidang Mahasiswa:", 10, 10);
    jadwal.forEach((item, index) => {
      docPdf.text(`${index + 1}. ${item.nim} - ${item.tanggal_sidang} - ${item.dosen_pembimbing} & ${item.dosen_penguji}`, 10, 20 + (index * 10));
    });
    docPdf.save('jadwal-sidang-admin.pdf');
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleSendToSempro = async (item, index) => {
  try {
    await addDoc(collection(db, "admin_to_sempro"), {
      nim: item.nim,
      dosen_pembimbing: item.dosen_pembimbing,
      dosen_penguji: item.dosen_penguji,
      dosen_penguji2: item.dosen_penguji2,
      dosen_penguji3: item.dosen_penguji3,
      // dosen_penguji4: item.dosen_penguji4,
      tanggal_sidang: item.tanggal_sidang,
      link_zoom: zoomLinks[index] || "", // Tambahkan ini
      jam_sidang: item.jam_sidang,
      timestamp: new Date()
    });
    alert("Data berhasil dikirim ke DashboardSempro.");
  } catch (err) {
    console.error("Gagal kirim:", err);
  }
};

const handleSendToSidangSempro = async (item, index) => {
  try {
    await addDoc(collection(db, "admin_to_sempro"), {
      nim: item.nim,
      dosen_pembimbing: item.dosen_pembimbing,
      dosen_penguji: item.dosen_penguji,
      dosen_penguji2: item.dosen_penguji2,
      dosen_penguji3: item.dosen_penguji3,
      // dosen_penguji4: item.dosen_penguji4,
      tanggal_sidang: item.tanggal_sidang,
      link_zoom: zoomLinks[index] || "", 
      jam_sidang: item.jam_sidang,
      timestamp: new Date()
    });
    alert("✅ Data berhasil dikirim ke DashboardSempro.");
  } catch (err) {
    console.error("❌ Gagal kirim:", err);
  }
};


  const filteredJadwal = jadwal.filter(item =>
    item.nim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJadwalSidang = jadwalSidang.filter(item =>
  item.nim.toLowerCase().includes(searchTermJadwal.toLowerCase())
);


  const handleChangeZoomLink = (index, value) => {
  setZoomLinks((prev) => ({
    ...prev,
    [index]: value,
  }));
};


const handleSkripsiButtonClick = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/adminskripsi"); // Redirect to dashboardskripsi
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSemproButtonClick = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/adminsempro"); // Redirect to dashboardskripsi
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
//     <div className={styles.container}>
//       <motion.div
//         className={styles.wrapper}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <h1 className={styles.heading}>📅 Admin Jadwal Sidang</h1>

//         <input
//           type="text"
//           placeholder="🔍 Cari NIM mahasiswa..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className={styles.search}
//         />

//         <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang:</h2>
//         <ul className={styles.scheduleList}>
//           {filteredJadwal.map((item, index) => (
//             <li key={index} className={styles.card}>
//               <p className={styles.tanggal}>{item.tanggal_sidang} • {item.jam_sidang}</p>
//               <div className={styles.details}>
//                 <strong>NIM:</strong> {item.nim}<br />
//                 <strong>Pembimbing:</strong> {item.dosen_pembimbing}<br />
//                 <strong>Penguji:</strong> {item.dosen_penguji}<br />
//                 <strong>Penguji 2:</strong> {item.dosen_penguji2}<br />
//                 <strong>Penguji 3:</strong> {item.dosen_penguji3}<br />
//                 {/* <strong>Penguji 4:</strong> {item.dosen_penguji4}<br /> */}
//                 <label>
//           <strong>Link Zoom:</strong><br />
//           <input
//             type="text"
//             placeholder="Masukkan link Zoom"
//             value={zoomLinks[index] || ""}
//             onChange={(e) => handleChangeZoomLink(index, e.target.value)}
//             className={styles.inputZoom}
//           />
//         </label>
        
//         <br />
//                 <button
//   className={styles.sendButton}
//   onClick={() => handleSendToSempro(item, index)}
// >
//   Kirim ke DashboardSempro
// </button>

//               </div>
//             </li>
//           ))}
//         </ul>
//         <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang Hasil Generate:</h2>

// <input
//   type="text"
//   placeholder="🔍 Cari NIM mahasiswa..."
//   value={searchTermJadwal}
//   onChange={(e) => setSearchTermJadwal(e.target.value)}
//   className={styles.search}
// />

// <ul className={styles.scheduleList}>
//   {filteredJadwalSidang.map((item, index) => (
//     <li key={index} className={styles.card}>
//       <p className={styles.tanggal}>{item.tanggal_sidang} • {item.jam_sidang}</p>
//       <div className={styles.details}>
//                 <strong>Formulir:</strong> {item.formulir}<br />
//                         <strong>Ruangan:</strong> {item.ruangan}<br />
//         <strong>NIM:</strong> {item.nim}<br />
//         <strong>Judul:</strong> {item.judul}<br />
//         <strong>Pembimbing:</strong> {item.dosen_pembimbing}<br />
//         <strong>Penguji:</strong> {item.dosen_penguji}<br />
//         <strong>Penguji 2:</strong> {item.dosen_penguji2}<br />
//         <strong>Penguji 3:</strong> {item.dosen_penguji3}<br />
//         {/* <strong>Penguji 4:</strong> {item.dosen_penguji4}<br /> */}
//                         <strong>Formulir:</strong> {item.formulir}<br />
//                                 <strong>Ruangan:</strong> {item.ruangan}<br />
// {/* <strong>Times Stamp:</strong> {item.timestamp.toDate().toLocaleString()}<br /> */}

//         <label>
//           <strong>Link Zoom:</strong><br />
//           <input
//             type="text"
//             placeholder="Masukkan link Zoom"
//             value={zoomLinks[index] || ""}
//             onChange={(e) => handleChangeZoomLink(index, e.target.value)}
//             className={styles.inputZoom}
//           />
//         </label>
//         <br />
//         <button
//           className={styles.sendButton}
//           onClick={() => handleSendToSidangSempro(item, index)}
//         >
//           Kirim ke DashboardSempro
//         </button>
//       </div>
//     </li>
//   ))}
// </ul>

//       </motion.div>
//     </div>
    <div className={styles.wrapper}>
      <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* <NavbarKaprodi isLoggedIn={isLoggedIn} /> */}
       <motion.div className="maxContainer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
  <h1 className="heroTitle fadeInUp">Selamat Datang di Penjadwalan Sidang Mahasiswa</h1>
  <p className="heroSubtitle fadeInUp">Atur jadwal sidang Anda dengan mudah, di mana saja.</p>

  <div className={styles.buttons}>
    <button onClick={handleSemproButtonClick} className="btnAdmin fadeInUp">Pengiriman Jadwal Mahasiswa Sempro</button>
    <button onClick={handleSkripsiButtonClick} className="btnAdmin fadeInUp">Pengiriman Jadwal Mahasiswa Skripsi</button>
  </div>
</motion.div>


      </motion.div>
    </div>
  );
}
