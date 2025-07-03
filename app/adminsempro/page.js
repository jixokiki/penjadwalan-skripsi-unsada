"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import styles from "./adminsemprodashboard.module.scss";

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
      link_zoom: zoomLinks[index] || "", 
      jam_sidang: item.jam_sidang,
      timestamp: new Date()
    });
    alert("✅ Data berhasil dikirim ke DashboardSempro.");
  } catch (err) {
    console.error("❌ Gagal kirim:", err);
  }
};


  const handleChangeZoomLinkFix = (index, value) => {
  setZoomLinks((prev) => ({
    ...prev,
    [index]: value,
  }));
};





  return (
    <div className={styles.container}>
        <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className={styles.heading}>📅 Admin Jadwal Sidang</h1>

      <input
        type="text"
        placeholder="🔍 Cari NIM mahasiswa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.search}
      />

      <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang Fix:</h2>
      <ul className={styles.scheduleList}>
        {filteredJadwalFixSempro.map((item, index) => (
          <li key={index} className={styles.card}>
            <p className={styles.tanggal}>
              {item.tanggal_sidang} • {item.jam_sidang}
            </p>
            <div className={styles.details}>
              <strong>NIM:</strong> {item.nim}
              <br />
              <strong>Pembimbing:</strong> {item.dosen_pembimbing}
              <br />
              <strong>Penguji:</strong> {item.dosen_penguji}
              <br />
              <strong>Penguji 2:</strong> {item.dosen_penguji2}
              <br />
              <strong>Penguji 3:</strong> {item.dosen_penguji3}
              <br />
              <label>
                <strong>Link Zoom:</strong>
                <br />
                <input
                  type="text"
                  placeholder="Masukkan link Zoom"
                  value={zoomLinks[index] || ""}
                  onChange={(e) => handleChangeZoomLinkFix(index, e.target.value)}
                  className={styles.inputZoom}
                />
              </label>
              <br />
              <button
                className={styles.sendButton}
                onClick={() => handleSendToSemproFix(item, index)}
              >
                Kirim ke DashboardSempro
              </button>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className={styles.heading}>📅 Admin Jadwal Sidang</h1>

        <input
          type="text"
          placeholder="🔍 Cari NIM mahasiswa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />

        <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang:</h2>
        <ul className={styles.scheduleList}>
          {filteredJadwal.map((item, index) => (
            <li key={index} className={styles.card}>
              <p className={styles.tanggal}>{item.tanggal_sidang} • {item.jam_sidang}</p>
              <div className={styles.details}>
                <strong>NIM:</strong> {item.nim}<br />
                <strong>Pembimbing:</strong> {item.dosen_pembimbing}<br />
                <strong>Penguji:</strong> {item.dosen_penguji}<br />
                <strong>Penguji 2:</strong> {item.dosen_penguji2}<br />
                <strong>Penguji 3:</strong> {item.dosen_penguji3}<br />
                {/* <strong>Penguji 4:</strong> {item.dosen_penguji4}<br /> */}
                <label>
          <strong>Link Zoom:</strong><br />
          <input
            type="text"
            placeholder="Masukkan link Zoom"
            value={zoomLinks[index] || ""}
            onChange={(e) => handleChangeZoomLink(index, e.target.value)}
            className={styles.inputZoom}
          />
        </label>
        
        <br />
                <button
  className={styles.sendButton}
  onClick={() => handleSendToSempro(item, index)}
>
  Kirim ke DashboardSempro
</button>

              </div>
            </li>
          ))}
        </ul>
        <h2 className={styles.subheading}>📝 Daftar Jadwal Sidang Hasil Generate:</h2>

<input
  type="text"
  placeholder="🔍 Cari NIM mahasiswa..."
  value={searchTermJadwal}
  onChange={(e) => setSearchTermJadwal(e.target.value)}
  className={styles.search}
/>

<ul className={styles.scheduleList}>
  {filteredJadwalSidang.map((item, index) => (
    <li key={index} className={styles.card}>
      <p className={styles.tanggal}>{item.tanggal_sidang} • {item.jam_sidang}</p>
      <div className={styles.details}>
                <strong>Formulir:</strong> {item.formulir}<br />
                        <strong>Ruangan:</strong> {item.ruangan}<br />
        <strong>NIM:</strong> {item.nim}<br />
        <strong>Judul:</strong> {item.judul}<br />
        <strong>Pembimbing:</strong> {item.dosen_pembimbing}<br />
        <strong>Penguji:</strong> {item.dosen_penguji}<br />
        <strong>Penguji 2:</strong> {item.dosen_penguji2}<br />
        <strong>Penguji 3:</strong> {item.dosen_penguji3}<br />
        {/* <strong>Penguji 4:</strong> {item.dosen_penguji4}<br /> */}
                        <strong>Formulir:</strong> {item.formulir}<br />
                                <strong>Ruangan:</strong> {item.ruangan}<br />
{/* <strong>Times Stamp:</strong> {item.timestamp.toDate().toLocaleString()}<br /> */}

        <label>
          <strong>Link Zoom:</strong><br />
          <input
            type="text"
            placeholder="Masukkan link Zoom"
            value={zoomLinks[index] || ""}
            onChange={(e) => handleChangeZoomLink(index, e.target.value)}
            className={styles.inputZoom}
          />
        </label>
        <br />
        <button
          className={styles.sendButton}
          onClick={() => handleSendToSidangSempro(item, index)}
        >
          Kirim ke DashboardSempro
        </button>
      </div>
    </li>
  ))}
</ul>

      </motion.div>
    </div>
  );
}
