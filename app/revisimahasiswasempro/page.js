"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import Link from "next/link";

import styles from "./revisimahasiswasempro.module.scss";
import NavbarPenguji from "../navbarpenguji/page";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where, addDoc, setDoc, doc } from "firebase/firestore";

export default function RevisiMahasiswaSempro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jadwal, setJadwal] = useState([]);
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      console.log("Login sebagai:", user.email);

      // Ambil nama penguji berdasarkan email
      const pengujiRef = collection(db, "penguji");
      const qPenguji = query(pengujiRef, where("email", "==", user.email));
      const pengujiSnapshot = await getDocs(qPenguji);

      if (pengujiSnapshot.empty) {
        console.error("❌ Nama penguji tidak ditemukan.");
        return;
      }

      const namaPenguji = pengujiSnapshot.docs[0].data().nama;
      console.log("✅ Nama penguji:", namaPenguji);

      // Ambil jadwal sidang dari koleksi penguji_selected
      const qJadwal = query(
        collection(db, "penguji_selected"),
        where("dosen_penguji", "==", namaPenguji)
      );
      const snapshot = await getDocs(qJadwal);
      const data = snapshot.docs.map((doc) => doc.data());

      setJadwal(data);
      setIsLoggedIn(true);

      const daftarNIM = data.map((item) => item.nim);
      const semproSnapshot = await getDocs(collection(db, "usersSempro"));
      const semuaData = semproSnapshot.docs.map((doc) => doc.data());
      const filtered = semuaData.filter((mhs) => daftarNIM.includes(mhs.nim));
      setDataMahasiswa(filtered);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const downloadPDF = () => {
    const docPdf = new jsPDF();
    docPdf.text("Jadwal Sidang Anda:", 10, 10);
    jadwal.forEach((item, index) => {
      docPdf.text(
        `${index + 1}. ${item.nim} - ${item.tanggal_sidang} - ${item.dosen_pembimbing} & ${item.dosen_penguji}`,
        10,
        20 + index * 10
      );
    });
    docPdf.save("jadwal-sidang.pdf");
  };

  const handleSendToAdmin = async (item) => {
    try {
      await addDoc(collection(db, "jadwalSidangMahasiswa"), item);
      alert("Data berhasil dikirim ke Admin ✅");
    } catch (error) {
      console.error("❌ Gagal mengirim data:", error);
      alert("Gagal mengirim data ke admin ❌");
    }
  };

  return (
    <>
      <NavbarPenguji isLoggedIn={isLoggedIn} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Selamat Datang di Penjadwalan Sidang Mahasiswa</h1>
          <p>Silakan pilih mahasiswa Anda dan kelola revisi mereka</p>
        </div>

        <div className={styles.wrapper}>
          <h1 className={styles.heading}>Dashboard Penguji</h1>

          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>

          <button onClick={downloadPDF} className={styles.downloadButton}>
            Download Jadwal (PDF)
          </button>

          <h2 className={styles.subheading}>Jadwal Mahasiswa Sidang:</h2>
          <ul className={styles.scheduleList}>
            {jadwal.map((item, index) => (
              <li key={index} className={styles.scheduleItem}>
                <strong>
                  {item.tanggal_sidang} • {item.jam_sidang}
                </strong>
                <br />
                NIM: {item.nim}
                <br />
                Pembimbing: {item.dosen_pembimbing}
                <br />
                Penguji: {item.dosen_penguji}
                <br />
                Penguji 2: {item.dosen_penguji2}
                <br />
                Penguji 3: {item.dosen_penguji3}
                <br />
                Penguji 4: {item.dosen_penguji4}
                <br />
                <button
                  onClick={() => handleSendToAdmin(item)}
                  className={styles.sendButton}
                >
                  Kirim ke Admin
                </button>
              </li>
            ))}
          </ul>

          <h2 className={styles.subheading}>Detail Mahasiswa:</h2>
          <ul className={styles.scheduleList}>
            {dataMahasiswa.map((mhs, index) => (
              <li key={index} className={styles.scheduleItem}>
                <strong>{mhs.nama} - {mhs.nim}</strong><br />
                Jurusan: {mhs.jurusan}<br />
                Angkatan: {mhs.angkatan}<br />
                Judul: {mhs.judul}<br />
                No WhatsApp: {mhs.noWhatsapp}<br />
                Dosen Pembimbing: {mhs.dosen}<br />
                <a href={mhs.pengajuanSidangUrl} target="_blank" rel="noopener noreferrer">File Pengajuan Sidang</a><br />
                <a href={mhs.krsUrl} target="_blank" rel="noopener noreferrer">KRS</a><br />
                <a href={mhs.daftarNilaiUrl} target="_blank" rel="noopener noreferrer">Daftar Nilai</a><br />
                <a href={mhs.fileTA1Url} target="_blank" rel="noopener noreferrer">File TA1</a>
                {mhs.revisiBaru && (
  <p className={styles.revisiBaruNote}>
    🟢 Mahasiswa sudah mengirim revisi terbaru.
  </p>
)}
                <br/>
                          <textarea
  placeholder="Tulis catatan revisi..."
  value={mhs.catatanRevisi || ""}
  onChange={(e) => {
    const newData = [...dataMahasiswa];
    newData[index].catatanRevisi = e.target.value;
    setDataMahasiswa(newData);
  }}
  className={styles.revisiInput}
/>
<button
  onClick={async () => {
    try {
        console.log("Data yang akan dikirim:", mhs);
      await setDoc(doc(db, "usersSempro", mhs.nim), {
  nama: mhs.nama || "",
  nim: mhs.nim || "",
  jurusan: mhs.jurusan || "",
  angkatan: mhs.angkatan || "",
  judul: mhs.judul || "",
  noWhatsapp: mhs.noWhatsapp || "",
  dosen: mhs.dosen || "",
  pengajuanSidangUrl: mhs.pengajuanSidangUrl || "",
  krsUrl: mhs.krsUrl || "",
  daftarNilaiUrl: mhs.daftarNilaiUrl || "",
  fileTA1Url: mhs.fileTA1Url || "",
  role: mhs.role || "",
  sksditempuh: mhs.sksditempuh || "",
  sksberjalan: mhs.sksberjalan || "",
  catatanRevisi: mhs.catatanRevisi || "",
  butuhRevisi: true
});

      alert("✅ Mahasiswa ditandai perlu revisi.");
    } catch (error) {
        console.error("Gagal menyimpan:", error);
      alert("❌ Gagal menyimpan catatan revisi.");
    }
  }}
  className={styles.revisiButton}
>
  Tandai Perlu Revisi
</button>
<button
  onClick={async () => {
    try {
      await setDoc(doc(db, "usersSempro", mhs.nim), {
        ...mhs,
        butuhRevisi: false,
        catatanRevisi: "",
        revisiBaru: false,
      });
      alert("✅ Revisi sudah disetujui dan dinyatakan aman.");
    } catch (error) {
      console.error("❌ Gagal menyetujui revisi:", error);
      alert("❌ Gagal menyetujui revisi.");
    }
  }}
  className={styles.terimaRevisiButton}
>
  Setujui Revisi (Aman)
</button>

              </li>
            ))}
          </ul>
          

        </div>
      </div>
    </>
  );
}
