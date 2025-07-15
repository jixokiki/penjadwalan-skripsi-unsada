// // DosenList.js
// "use client";
// import { useEffect, useState } from "react";

// import { collection, getDocs } from "firebase/firestore";

// import Navbar from "../navbar/Navbar";


// import { auth, db } from "@/lib/firebase";
// import { signOut } from "firebase/auth";

// import { useRouter } from "next/navigation";
// import jsPDF from "jspdf";
// import styles from "./dosenlist.module.scss";

// export default function DosenList() {
//   const [dosen, setDosen] = useState([]);
//   const [error, setError] = useState(null);

//   // Function to fetch all dosen from Firestore
//   const fetchDosen = async () => {
//     try {
//       const usersCollection = collection(db, "users");
//       const usersSnapshot = await getDocs(usersCollection);
//       const dosenList = usersSnapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.role === "dosen"); // Filter for dosen role
//       setDosen(dosenList);
//     } catch (error) {
//       console.error("Error fetching dosen: ", error);
//       setError("Error fetching dosen");
//     }
//   };

//   useEffect(() => {
//     fetchDosen();
//   }, []);

//   return (
//     <>
//     <Navbar/>
//     <div className={styles.container}>
//       <h1 className={styles.title}>List of Dosen</h1>
//       {error && <p className={styles.error}>{error}</p>}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>NIM</th>
//             <th>Nama</th>
//             <th>Jurusan</th>
//             {/* <th>Angkatan</th> */}
//             {/* <th>Kampus</th> */}
//             <th>Role</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dosen.length > 0 ? (
//             dosen.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.nid}</td>
//                 <td>{user.nama}</td>
//                 <td>{user.jurusan}</td>
//                 {/* <td>{user.angkatan}</td> */}
//                 {/* <td>{user.cabangKampus}</td> */}
//                 <td>{user.role}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7">No dosen found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// }




"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import Navbar from "../navbar/Navbar";
import { auth, db } from "@/lib/firebase";
import styles from "./dosenlist.module.scss";

export default function DosenList() {
  const [dosenFinal, setDosenFinal] = useState([]);
  const [error, setError] = useState(null);

  const fetchDosenGabungan = async () => {
    try {
      // Ambil dari koleksi "users" yang role-nya dosen
      const usersSnapshot = await getDocs(collection(db, "users"));
      const dosenUsers = usersSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((doc) => doc.role === "dosen");

      // Ambil dari koleksi "dosen"
      const dosenSnapshot = await getDocs(collection(db, "dosen"));
      const dosenKhusus = dosenSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Gabungkan berdasarkan email yang sama
      const merged = dosenKhusus.map((dosenData) => {
        const matchingUser = dosenUsers.find(
          (user) => user.email === dosenData.email
        );
        return {
          ...dosenData,
          role: matchingUser?.role || "dosen",
          email: dosenData.email || matchingUser?.email || "-",
        };
      });

      setDosenFinal(merged);
    } catch (err) {
      console.error("Error fetching dosen: ", err);
      setError("Gagal mengambil data dosen.");
    }
  };

  useEffect(() => {
    fetchDosenGabungan();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>List of Dosen</h1>
        {error && <p className={styles.error}>{error}</p>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>NID</th>
              <th>Nama</th>
              {/* <th>Jurusan</th> */}
              <th>Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {dosenFinal.length > 0 ? (
              dosenFinal.map((dosen) => (
                <tr key={dosen.id}>
                  <td>{dosen.nid || "-"}</td>
                  <td>{dosen.nama || "-"}</td>
                  {/* <td>{dosen.jurusan || "-"}</td> */}
                  <td>{dosen.role || "-"}</td>
                  <td>{dosen.email || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Tidak ada data dosen.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
