// // MahasiswaList.js
// "use client";
// import { useEffect, useState } from "react";

// import { collection, getDocs } from "firebase/firestore";

// import Navbar from "../navbar/Navbar";


// import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase signOut
// import Link from 'next/link';
// // import styles from '../page.module.css';
// import styles from './userList.module.scss';

// import { auth, db } from "@/lib/firebase";

// import { useRouter } from "next/navigation";
// import jsPDF from "jspdf";

// export default function MahasiswaList() {
//   const [mahasiswa, setMahasiswa] = useState([]);
//   const [error, setError] = useState(null);

//   // Function to fetch all mahasiswa from Firestore
//   const fetchMahasiswa = async () => {
//     try {
//       const usersCollection = collection(db, "users");
//       const usersSnapshot = await getDocs(usersCollection);
//       const mahasiswaList = usersSnapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.role === "mahasiswa"); // Filter for mahasiswa role
//       setMahasiswa(mahasiswaList);
//     } catch (error) {
//       console.error("Error fetching mahasiswa: ", error);
//       setError("Error fetching mahasiswa");
//     }
//   };

//   useEffect(() => {
//     fetchMahasiswa();
//   }, []);

//   return (
//     <>
//     <Navbar/>
//     <div className={styles.container}>
//       <h1 className={styles.title}>List of Mahasiswa</h1>
//       {error && <p className={styles.error}>{error}</p>}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>NIM</th>
//             <th>Nama</th>
//             <th>Jurusan</th>
//             <th>Angkatan</th>
//             <th>Kampus</th>
//             <th>Role</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mahasiswa.length > 0 ? (
//             mahasiswa.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.nama}</td>
//                 <td>{user.jurusan}</td>
//                 <td>{user.angkatan}</td>
//                 <td>{user.cabangKampus}</td>
//                 <td>{user.role}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7">No mahasiswa found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// }



// "use client";
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import Navbar from "../navbar/Navbar";
// import styles from "./userList.module.scss";
// import { db } from "@/lib/firebase";

// export default function MahasiswaList() {
//   const [mahasiswa, setMahasiswa] = useState([]);
//   const [error, setError] = useState(null);

//   const fetchMahasiswaGabungan = async () => {
//     try {
//       // Ambil semua koleksi yang dibutuhkan
//       const [usersSnap, mhsSnap, semproSnap, skripsiSnap] = await Promise.all([
//         getDocs(collection(db, "users")),
//         getDocs(collection(db, "mahasiswa")),
//         getDocs(collection(db, "usersSempro")),
//         getDocs(collection(db, "usersSkripsi")),
//       ]);

//       const users = usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       const mahasiswa = mhsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       const sempro = semproSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       const skripsi = skripsiSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//       // Gabungkan semua data berdasarkan NIM (id)
//       const allNIM = new Set([
//         ...users.map((u) => u.id),
//         ...mahasiswa.map((m) => m.id),
//         ...sempro.map((s) => s.id),
//         ...skripsi.map((s) => s.id),
//       ]);

//       const merged = Array.from(allNIM).map((nim) => {
//         const user = users.find((u) => u.id === nim);
//         const mhs = mahasiswa.find((m) => m.id === nim);
//         const semproData = sempro.find((s) => s.id === nim);
//         const skripsiData = skripsi.find((s) => s.id === nim);

//         return {
//           id: nim,
//           nim: nim,
//           // nama: mhs?.nama || skripsiData?.nama || "-",
//           nama: mhs?.nama || semproData?.nama || skripsiData?.nama || user?.email?.split("@")[0] || "-",
//           // jurusan: mhs?.jurusan || skripsiData?.jurusan || semproData?.jurusan || "-",
//           // angkatan: semproData?.angkatan || skripsiData?.angkatan || "-",
//           jurusan: mhs?.jurusan || skripsiData?.jurusan || semproData?.jurusan || "-",
// angkatan: semproData?.angkatan || skripsiData?.angkatan || "-",

//           cabangKampus: semproData?.cabangKampus || skripsiData?.cabangKampus || "-",
//           role: user?.role || "mahasiswa",
//           email: user?.email || mhs?.email || "-",
//           judulSempro: semproData?.judul || "-",
//           dosenSempro: semproData?.dosen || "-",
//           judulSkripsi: skripsiData?.judul || "-",
//           dosenSkripsi: skripsiData?.dosen || "-",
//           fileTAUrl: skripsiData?.fileTAUrl || "-",
//         };
//       });

//       setMahasiswa(merged);
//     } catch (error) {
//       console.error("Gagal mengambil data:", error);
//       setError("Terjadi kesalahan saat memuat data.");
//     }
//   };

//   useEffect(() => {
//     fetchMahasiswaGabungan();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       {/* <div className={styles.container}>
//         <h1 className={styles.title}>List of Mahasiswa</h1>
//         {error && <p className={styles.error}>{error}</p>}
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>NIM</th>
//               <th>Nama</th>
//               <th>Jurusan</th>
//               <th>Angkatan</th>
//               <th>Kampus</th>
//               <th>Role</th>
//               <th>Email</th>
//               <th>Judul Sempro</th>
//               <th>Dosen Sempro</th>
//               <th>Judul Skripsi</th>
//               <th>Dosen Skripsi</th>
//               <th>File TA</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mahasiswa.length > 0 ? (
//               mahasiswa.map((mhs) => (
//                 <tr key={mhs.id}>
//                   <td>{mhs.nim}</td>
//                   <td>{mhs.nama}</td>
//                   <td>{mhs.jurusan}</td>
//                   <td>{mhs.angkatan}</td>
//                   <td>{mhs.cabangKampus}</td>
//                   <td>{mhs.role}</td>
//                   <td>{mhs.email}</td>
//                   <td>{mhs.judulSempro}</td>
//                   <td>{mhs.dosenSempro}</td>
//                   <td>{mhs.judulSkripsi}</td>
//                   <td>{mhs.dosenSkripsi}</td>
//                   <td>
//                     {mhs.fileTAUrl !== "-" ? (
//                       <a href={mhs.fileTAUrl} target="_blank" rel="noopener noreferrer">
//                         Lihat
//                       </a>
//                     ) : (
//                       "-"
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="12">Tidak ada data mahasiswa.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div> */}
//       <div className={styles.container}>
//   <h1 className={styles.title}>List of Mahasiswa</h1>
//   {error && <p className={styles.error}>{error}</p>}
  
//   <div className={styles.tableWrapper}>
//     <table className={styles.table}>
//       <thead>
//         <tr>
//           <th>NIM</th>
//           <th>Nama</th>
//           <th>Jurusan</th>
//           <th>Angkatan</th>
//           <th>Kampus</th>
//           <th>Role</th>
//           <th>Email</th>
//           <th>Judul Sempro</th>
//           <th>Dosen Sempro</th>
//           <th>Judul Skripsi</th>
//           <th>Dosen Skripsi</th>
//         </tr>
//       </thead>
//       <tbody>
//         {mahasiswa.length > 0 ? (
//           mahasiswa.map((mhs) => (
//             <tr key={mhs.id}>
//               <td>{mhs.nim}</td>
//               <td>{mhs.nama}</td>
//               <td>{mhs.jurusan}</td>
//               <td>{mhs.angkatan}</td>
//               <td>{mhs.cabangKampus}</td>
//               <td>{mhs.role}</td>
//               <td>{mhs.email}</td>
//               <td>{mhs.judulSempro}</td>
//               <td>{mhs.dosenSempro}</td>
//               <td>{mhs.judulSkripsi}</td>
//               <td>{mhs.dosenSkripsi}</td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="12">Tidak ada data mahasiswa.</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>

//     </>
//   );
// }




"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Navbar from "../navbar/Navbar";
import styles from "./userList.module.scss";
import { db } from "@/lib/firebase";

export default function MahasiswaList() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMahasiswaGabungan = async () => {
      try {
        const [usersSnap, mhsSnap, semproSnap, skripsiSnap] = await Promise.all([
          getDocs(collection(db, "users")),
          getDocs(collection(db, "mahasiswa")),
          getDocs(collection(db, "usersSempro")),
          getDocs(collection(db, "usersSkripsi")),
        ]);

        const users = usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const mahasiswa = mhsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const sempro = semproSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const skripsi = skripsiSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const allNIM = new Set([
          ...users.map((u) => u.id),
          ...mahasiswa.map((m) => m.id),
          ...sempro.map((s) => s.id),
          ...skripsi.map((s) => s.id),
        ]);

        const merged = Array.from(allNIM).map((nim) => {
          const user = users.find((u) => u.id === nim);
          const mhs = mahasiswa.find((m) => m.id === nim);
          const semproData = sempro.find((s) => s.id === nim);
          const skripsiData = skripsi.find((s) => s.id === nim);

          return {
            nim,
            nama:
              mhs?.nama ||
              semproData?.nama ||
              skripsiData?.nama ||
              user?.email?.split("@")[0] ||
              "-",
            jurusan: mhs?.jurusan || skripsiData?.jurusan || semproData?.jurusan || "-",
            angkatan: semproData?.angkatan || skripsiData?.angkatan || "-",
            kampus: semproData?.cabangKampus || skripsiData?.cabangKampus || "-",
            role: user?.role || "mahasiswa",
            email: user?.email || mhs?.email || "-",
            judulSempro: semproData?.judul || "-",
            dosenSempro: semproData?.dosen || "-",
            judulSkripsi: skripsiData?.judul || "-",
            dosenSkripsi: skripsiData?.dosen || "-",
          };
        });

        setMahasiswa(merged);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setError("Terjadi kesalahan saat memuat data.");
      }
    };

    fetchMahasiswaGabungan();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "nim", header: "NIM" },
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "jurusan", header: "Jurusan" },
      { accessorKey: "angkatan", header: "Angkatan" },
      { accessorKey: "kampus", header: "Kampus" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "judulSempro", header: "Judul Sempro" },
      { accessorKey: "dosenSempro", header: "Dosen Sempro" },
      { accessorKey: "judulSkripsi", header: "Judul Skripsi" },
      { accessorKey: "dosenSkripsi", header: "Dosen Skripsi" },
    ],
    []
  );

  const table = useReactTable({
    data: mahasiswa,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>List of Mahasiswa</h1>
        {error && <p className={styles.error}>{error}</p>}

        <input
          className={styles.searchInput}
          type="text"
          placeholder="🔍 Cari mahasiswa..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ⬅ Prev
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next ➡
          </button>
        </div>
      </div>
    </section>
  );
}
