"use client";

import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase signOut
import Navbar from "../navbar/Navbar";
import Link from 'next/link';
// import styles from '../page.module.css';
import styles from './dashboard.module.scss';
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, query, where, setDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import DashboardSeminarIsi from '../dashboardseminarisi';

export default function DashboardMahasiswa() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRevisiAlert, setShowRevisiAlert] = useState(false);
const [catatanRevisi, setCatatanRevisi] = useState("");

  const router = useRouter();
    const [nim, setNim] = useState("");
      const [judul, setJudul] = useState("");
    //   const [jadwal, setJadwal] = useState([]);
            const [jadwal, setCheckPreloadedData] = useState([]);

      const [selectedDosen, setSelectedDosen] = useState("");

      
  const [sksditempuh, setSksditempuh] = useState("");
  const [sksberjalan, setSksberjalan] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [cabangKampus, setCabangKampus] = useState("");
  const [noWhatsapp, setNoWhatsapp] = useState("");
  
  const [role, setRole] = useState("");
  const [files, setFiles] = useState({
    pengajuanSidang: null,
    krs: null,
    daftarNilai: null,
    fileTA1: null,
  });
  const [fileUrls, setFileUrls] = useState({
    pengajuanSidangUrl: "",
    krsUrl: "",
    daftarNilaiUrl: "",
    fileTA1Url: "",
  });
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

  useEffect(() => {
  const checkRevisi = async () => {
    try {
      const semproRef = doc(db, "usersSempro", nim);
      const semproSnap = await getDoc(semproRef);
      if (semproSnap.exists()) {
        const data = semproSnap.data();
        if (data.butuhRevisi) {
          alert("⚠️ Anda diminta revisi. Catatan dosen: " + (data.catatanRevisi || "Tidak ada catatan."));
        }
      }
    } catch (err) {
      console.error("Gagal cek revisi:", err);
    }
  };
  if (nim) checkRevisi();
}, [nim]);

useEffect(() => {
  const checkRevisi = async () => {
    try {
      const semproRef = doc(db, "usersSempro", nim);
      const semproSnap = await getDoc(semproRef);
      if (semproSnap.exists()) {
        const data = semproSnap.data();
        if (data.butuhRevisi) {
          setCatatanRevisi(data.catatanRevisi || ""); // <-- set ke UI
          setShowRevisiAlert(true); // <-- memicu tampilnya alert
        } else {
          setShowRevisiAlert(false);
        }
      }
    } catch (err) {
      console.error("Gagal cek revisi:", err);
    }
  };

  if (nim) checkRevisi(); // <-- dipicu ketika NIM sudah tersedia
}, [nim]);

useEffect(() => {
  const fetchMahasiswaData = async () => {
    try {
      const docRef = doc(db, "usersSempro", nim);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNama(data.nama || "");
        setJurusan(data.jurusan || "");
        setAngkatan(data.angkatan || "");
        setJudul(data.judul || "");
        setNoWhatsapp(data.noWhatsapp || "");
        setSelectedDosen(data.dosen || "");
        setSksditempuh(data.sksditempuh || "");
        setSksberjalan(data.sksberjalan || "");
        setCatatanRevisi(data.catatanRevisi || "");
        setFileUrls({
          pengajuanSidangUrl: data.pengajuanSidangUrl || "",
          krsUrl: data.krsUrl || "",
          daftarNilaiUrl: data.daftarNilaiUrl || "",
          fileTA1Url: data.fileTA1Url || "",
        });
      }
    } catch (error) {
      console.error("Gagal mengambil data mahasiswa:", error);
    }
  };

  if (nim) fetchMahasiswaData();
}, [nim]);

  // Function to handle logout and redirect
  const handleSkripsiButtonClick = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/dashboardskripsi"); // Redirect to dashboardskripsi
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

    const handleSeminarIsiButtonClick = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/dashboardseminarisi"); // Redirect to dashboardskripsi
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  



  const [jadwalFixSempro, setJadwalFixSempro] = useState([]);
  
    useEffect(() => {
      const unsub = onSnapshot(collection(db, "jadwalFixSempro"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJadwalFixSempro(data);
      });
  
      return () => unsub();
    }, []);
  
    const filteredJadwalFixSempro = jadwalFixSempro.filter((item) =>
      item.nim?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    
  
  const handleSendToSidangSemproFix = async (item, index) => {
    try {
      await addDoc(collection(db, "admin_to_sempro"), {
        nim: item.nim,
        dosen_pembimbing: item.dosen_pembimbing,
        dosen_penguji: item.dosen_penguji,
        dosen_penguji2: item.dosen_penguji2,
        dosen_penguji3: item.dosen_penguji3,
        // dosen_penguji4: item.dosen_penguji4,
        tanggal_sidang: item.tanggal_sidang,
        // link_zoom: zoomLinks[index] || "", 
        jam_sidang: item.jam_sidang,
        timestamp: new Date()
      });
      alert("✅ Data berhasil dikirim ke DashboardSempro.");
    } catch (err) {
      console.error("❌ Gagal kirim:", err);
    }
  };
  
  
  //   const handleChangeZoomLinkFix = (index, value) => {
  //   setZoomLinks((prev) => ({
  //     ...prev,
  //     [index]: value,
  //   }));
  // };


  const [jadwalFixSkripsi, setJadwalFixSkripsi] = useState([]);
  
    useEffect(() => {
      const unsub = onSnapshot(collection(db, "jadwalFixSkripsi"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJadwalFixSkripsi(data);
      });
  
      return () => unsub();
    }, []);
  
    const filteredJadwalFixSkripsi = jadwalFixSkripsi.filter((item) =>
      item.nim?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    
  
  const handleSendToSidangSkripsiFix = async (item, index) => {
    try {
      await addDoc(collection(db, "admin_to_sempro"), {
        nim: item.nim,
        dosen_pembimbing: item.dosen_pembimbing,
        dosen_penguji: item.dosen_penguji,
        dosen_penguji2: item.dosen_penguji2,
        dosen_penguji3: item.dosen_penguji3,
        // dosen_penguji4: item.dosen_penguji4,
        tanggal_sidang: item.tanggal_sidang,
        // link_zoom: zoomLinks[index] || "", 
        jam_sidang: item.jam_sidang,
        timestamp: new Date()
      });
      alert("✅ Data berhasil dikirim ke DashboardSempro.");
    } catch (err) {
      console.error("❌ Gagal kirim:", err);
    }
  };
  
  
  //   const handleChangeZoomLinkFix = (index, value) => {
  //   setZoomLinks((prev) => ({
  //     ...prev,
  //     [index]: value,
  //   }));
  // };
  

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
          
    
        <div className={styles.header}>
          
          {showRevisiAlert && (
  <div className={styles.revisiAlert}>
    <h3>⚠️ Anda Diminta Melakukan Revisi</h3>
    <p>{catatanRevisi || "Tidak ada catatan tambahan dari dosen."}</p>
    <p className={styles.revisiNote}>Segera perbarui data dan upload ulang dokumen jika diperlukan.</p>
    
<div className={styles.detailMahasiswaBox}>
  <h3>Data Anda:</h3>
  <p><strong>NIM:</strong> {nim}</p>
  <p><strong>Nama:</strong> {nama}</p>
  <p><strong>Jurusan:</strong> {jurusan}</p>
  <p><strong>Angkatan:</strong> {angkatan}</p>
  <p><strong>Judul:</strong> {judul}</p>
  <p><strong>No Whatsapp:</strong> {noWhatsapp}</p>
  <p><strong>Dosen Pembimbing:</strong> {selectedDosen}</p>

  <textarea
    placeholder="Tulis catatan tambahan jika ada revisi yang telah Anda lakukan..."
    value={catatanRevisi}
    onChange={(e) => setCatatanRevisi(e.target.value)}
    className={styles.revisiInput}
    readOnly
  />

  {/* <button
    className={styles.revisiKirimButton}
    onClick={async () => {
      try {
        await setDoc(doc(db, "usersSempro", nim), {
          nim,
          nama,
          jurusan,
          angkatan,
          judul,
          noWhatsapp,
          dosen: selectedDosen,
          sksditempuh,
          sksberjalan,
          pengajuanSidangUrl: fileUrls.pengajuanSidangUrl || "",
          krsUrl: fileUrls.krsUrl || "",
          daftarNilaiUrl: fileUrls.daftarNilaiUrl || "",
          fileTA1Url: fileUrls.fileTA1Url || "",
          role: "mahasiswa",
          butuhRevisi: false,
          revisiBaru: true,
          catatanRevisi: catatanRevisi || ""
        });
        alert("✅ Revisi berhasil dikirim ulang. Tunggu konfirmasi penguji.");
      } catch (err) {
        console.error("Gagal kirim ulang revisi:", err);
        alert("❌ Gagal mengirim revisi. Coba lagi.");
      }
    }}
  >
    Kirim Ulang Revisi
  </button> */}
</div>
  </div>
)}

          <h1>Selamat Datang di Penjadwalan Sidang Mahasiswa</h1>
          <p>Atur jadwal sidang Anda dengan mudah, di mana saja.</p>
        </div>

        <div className={styles.buttons}>
          <Link href="/dashboardsempro">
            <button className={styles.btn}>Seminar Proposal</button>
          </Link>
          {/* When clicked, sign out and redirect to /dashboardskripsi */}
                    <button onClick={handleSeminarIsiButtonClick} className={styles.btnAdmin}>
            Seminar Isi
          </button>
          <button onClick={handleSkripsiButtonClick} className={styles.btnAdmin}>
            Skripsi
          </button>
        </div>
        <DashboardSeminarIsi/>
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
                <strong>Formulir:</strong> {item.formulir}<br />
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


