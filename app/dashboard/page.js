// 'use client';
// import { useEffect, useState } from "react";
// import { auth, db } from "@/lib/firebase";
// import { signOut } from "firebase/auth";
// import { collection, getDocs } from "firebase/firestore";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const [jadwal, setJadwal] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchJadwal = async () => {
//       const snapshot = await getDocs(collection(db, "jadwal_sidang"));
//       const data = snapshot.docs.map(doc => doc.data());
//       setJadwal(data);
//     };
//     fetchJadwal();
//   }, []);

//   const logout = async () => {
//     await signOut(auth);
//     router.push('/login');
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl mb-4">Dashboard Mahasiswa</h1>
//       <button onClick={logout} className="mb-6 p-2 bg-red-500 text-white">
//         Logout
//       </button>
//       <h2 className="text-xl mb-2">Jadwal Sidang Anda:</h2>
//       <ul>
//         {jadwal.map((item, index) => (
//           <li key={index} className="border-b py-2">
//             {item.nim} - {item.tanggal_sidang} - {item.dosen_pembimbing} & {item.dosen_penguji}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



'use client';
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  const [jadwal, setJadwal] = useState([]);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      const fetchJadwal = async () => {
        const q = query(collection(db, "jadwal_sidang"), where("nim", "==", user.email.split('@')[0]));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data());
        setJadwal(data);
      };
      fetchJadwal();
    }
  }, [user, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const downloadPDF = () => {
    const docPdf = new jsPDF();
    docPdf.text("Jadwal Sidang Anda:", 10, 10);
    jadwal.forEach((item, index) => {
      docPdf.text(`${index + 1}. ${item.nim} - ${item.tanggal_sidang} - ${item.dosen_pembimbing} & ${item.dosen_penguji}`, 10, 20 + (index * 10));
    });
    docPdf.save('jadwal-sidang.pdf');
  };

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl mb-4">Dashboard Mahasiswa</h1>

    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Dashboard Mahasiswa</h1>

      {/* <button onClick={handleLogout} className="mb-6 p-2 bg-red-500 text-white rounded"> */}
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
      <div className="mb-6">
        <button onClick={downloadPDF} className="p-2 bg-green-500 text-white rounded">
          Download Jadwal (PDF)
        </button>
      </div>
      <h2 className="text-xl mb-2">Jadwal Sidang Anda:</h2>
      <ul className="space-y-2">
        {jadwal.map((item, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded shadow">
            <strong>{item.tanggal_sidang}</strong> | {item.dosen_pembimbing} & {item.dosen_penguji}
          </li>
        ))}
      </ul>
    </div>
  );
}
