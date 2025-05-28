"use client";
import { useState, useEffect } from "react";
import { auth, db, storage } from "@/lib/firebase"; // Ensure Firebase storage is initialized
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage methods
import styles from "./dashboardskripsi.module.css";
import Navbar from "../navbar/Navbar";

import jsPDF from "jspdf";





import { onAuthStateChanged } from "firebase/auth";




import * as XLSX from "xlsx";


import { signOut } from "firebase/auth";

import NavbarMahasiswa from "../navbarmahasiswa/NavbarMahasiswa";

export default function DashboardSkripsi() {
  const [nim, setNim] = useState("");
  const [sksditempuh, setSksditempuh] = useState("");
  const [sksberjalan, setSksberjalan] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [cabangKampus, setCabangKampus] = useState("");
  const [noWhatsapp, setNoWhatsapp] = useState("");
  const [role, setRole] = useState("");
  const [judul, setJudul] = useState("");
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [dosenList, setDosenList] = useState([]); // State for storing list of dosen
  const [selectedDosen, setSelectedDosen] = useState(""); // State for selected dosen
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to fetch dosen list from Firestore
  // const fetchDosenList = async () => {
  //   try {
  //     const dosenCollection = collection(db, "users");
  //     const dosenSnapshot = await getDocs(dosenCollection);
  //     const dosen = dosenSnapshot.docs
  //       .map((doc) => ({ id: doc.id, ...doc.data() }))
  //       .filter((user) => user.role === "dosen");
  //     setDosenList(dosen);
  //   } catch (error) {
  //     console.error("Error fetching dosen list: ", error);
  //     setError("Error fetching dosen list");
  //   }
  // };

  // // Fetch dosen list when component mounts
  // useEffect(() => {
  //   fetchDosenList();
  // }, []);

  useEffect(() => {
  const fetchDosenFromCollection = async () => {
    try {
      const snapshot = await getDocs(collection(db, "dosen"));
      const dosenData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          nama: data.nama || "Tanpa Nama",
          email: data.email || "",
          nid: data.nid || "",
        };
      });
      setDosenList(dosenData);
    } catch (error) {
      console.error("Gagal ambil data dosen:", error);
    }
  };

  fetchDosenFromCollection();
}, []);

  // Fungsi untuk mengambil data berdasarkan NIM dari Firestore
  // const fetchUserDataByNim = async (nim) => {
  //   if (nim) {
  //     try {
  //       const docRef = doc(db, "users", nim);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         const userData = docSnap.data();
  //         setNama(userData.nama || "");
  //         setJurusan(userData.jurusan || "");
  //         setAngkatan(userData.angkatan || "");
  //         setCabangKampus(userData.cabangKampus || "");
  //         setRole(userData.role || "");
  //       } else {
  //         setNama("");
  //         setJurusan("");
  //         setAngkatan("");
  //         setCabangKampus("");
  //         setRole("");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching NIM data: ", error);
  //       setError("Error fetching NIM data");
  //     }
  //   }
  // };

  // Panggil fetchUserDataByNim setiap kali nim berubah
  // useEffect(() => {
  //   fetchUserDataByNim(nim);
  // }, [nim]);

  const fetchUserDataByNim = async (nim) => {
  if (!nim) return;

  try {
    let userData = {};
    let mahasiswaData = {};

    // Cek data dari "users"
    const userDocRef = collection(db, "users");
    const userSnapshot = await getDocs(userDocRef);
    const userDoc = userSnapshot.docs.find(doc => doc.data().nim === nim);

    if (userDoc) {
      userData = userDoc.data();
    }

    // Cek data dari "mahasiswa"
    const mhsCollection = collection(db, "mahasiswa");
    const mhsSnapshot = await getDocs(mhsCollection);
    const mhsDoc = mhsSnapshot.docs.find(doc => doc.data().nim === nim);

    if (mhsDoc) {
      mahasiswaData = mhsDoc.data();
    }

    // Gabungkan data dari kedua koleksi
    const combinedData = {
      nama: mahasiswaData.nama || userData.nama || "",
      jurusan: userData.jurusan || "",
      angkatan: userData.angkatan || "",
      cabangKampus: userData.cabangKampus || "",
      role: userData.role || "mahasiswa"
    };

    setNama(combinedData.nama);
    setJurusan(combinedData.jurusan);
    setAngkatan(combinedData.angkatan);
    setCabangKampus(combinedData.cabangKampus);
    setRole(combinedData.role);

  } catch (error) {
    console.error("Error fetching user data: ", error);
    setError("Gagal mengambil data berdasarkan NIM");
  }
};


  // Panggil fetchUserDataByNim setiap kali nim berubah
  useEffect(() => {
    fetchUserDataByNim(nim);
  }, [nim]);

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const selectedFile = selectedFiles[0];

    if (selectedFile.size > 5000000) { // Example: 5MB limit
      setError("File size exceeds the limit (5MB)");
      return;
    }

    setFiles((prevFiles) => ({ ...prevFiles, [name]: selectedFile }));
  };

  const uploadFiles = async () => {
    const uploadTasks = Object.keys(files).map(async (fileKey) => {
      const file = files[fileKey];
      if (file) {
        try {
          const storageRef = ref(storage, `files/${nim}/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return { fileKey, downloadURL };
        } catch (error) {
          console.error(`File upload failed for ${fileKey}: `, error);
          throw new Error(`File upload failed for ${fileKey}`);
        }
      }
      return null;
    });

    try {
      const uploadedFiles = await Promise.all(uploadTasks);
      const newFileUrls = {};
      uploadedFiles.forEach((uploadedFile) => {
        if (uploadedFile) {
          newFileUrls[`${uploadedFile.fileKey}Url`] = uploadedFile.downloadURL;
        }
      });
      return newFileUrls;
    } catch (error) {
      setError("File uploads failed");
      return null;
    }
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);

  //   try {
  //     // Upload files and get their URLs
  //     const uploadedFileUrls = await uploadFiles();

  //     if (!uploadedFileUrls) {
  //       setError("File uploads failed");
  //       setLoading(false);
  //       return;
  //     }

  //     // Save additional data to Firestore, including the selected dosen and file URLs
  //     await setDoc(doc(db, "usersSkripsi", nim), {
  //       sksditempuh,
  //       sksberjalan,
  //       judul,
  //       nama,
  //       jurusan,
  //       angkatan,
  //       cabangKampus,
  //       noWhatsapp,
  //       role,
  //       dosen: selectedDosen, // Save selected dosen to Firestore
  //       ...uploadedFileUrls, // Save uploaded file URLs to Firestore
  //     });

  //     setMessage({ type: "success", text: "Data successfully submitted!" });
  //     router.push("/dashboard");
  //     alert("Form and files successfully submitted");
  //   } catch (error) {
  //     console.error("Submission failed: ", error.message);
  //     setError("Submission failed: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleRegister = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    let userData = {};
    let mahasiswaData = {};

    // Ambil data dari "users"
    const usersSnapshot = await getDocs(collection(db, "users"));
    usersSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.nim === nim) {
        userData = data;
      }
    });

    // Ambil data dari "mahasiswa"
    const mahasiswaSnapshot = await getDocs(collection(db, "mahasiswa"));
    mahasiswaSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.nim === nim) {
        mahasiswaData = data;
      }
    });

    // Kalau data tidak ditemukan di kedua koleksi
    if (Object.keys(userData).length === 0 && Object.keys(mahasiswaData).length === 0) {
      setError("NIM tidak ditemukan di database");
      setLoading(false);
      return;
    }

    // Gabungkan data
    const combinedData = {
      nama: nama || mahasiswaData.nama || userData.nama || "",
      jurusan: jurusan || userData.jurusan || "",
      angkatan: angkatan || userData.angkatan || "",
      cabangKampus: cabangKampus || userData.cabangKampus || "",
      role: role || userData.role || "mahasiswa",
    };

    // Upload file dan dapatkan URL
    const uploadedFileUrls = await uploadFiles();

    if (!uploadedFileUrls) {
      setError("Gagal upload file");
      setLoading(false);
      return;
    }

    // Simpan ke Firestore di collection usersSempro
    await setDoc(doc(db, "usersSkripsi", nim), {
      ...combinedData,
      nim,
      sksditempuh,
      sksberjalan,
      judul,
      noWhatsapp,
      dosen: selectedDosen,
      ...uploadedFileUrls,
            butuhRevisi: false,
      catatanRevisi: "",
      formulir: "Skripsi",
    });

    setMessage({ type: "success", text: "Pendaftaran berhasil disimpan!" });
    router.push("/dashboardmahasiswa");
    alert("Form berhasil dikirim!");
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    setError("Gagal menyimpan data: " + error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
            <NavbarMahasiswa isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        <h1 className={styles.title}>Pengajuan Skripsi</h1>

        {/* Form to fetch NIM */}
        <form onSubmit={(e) => { e.preventDefault(); fetchUserDataByNim(nim); }} className={styles.form}>
          <input
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="Masukkan NIM"
            className={styles.inputField}
          />
          <button type="submit" className={styles.button}>
            Cek NIM
          </button>
        </form>

        {/* Display auto-filled data if NIM is found */}
        {nama && (
          <form onSubmit={handleRegister} className={styles.formContainer}>
            <input
              type="text"
              className={styles.inputField}
              value={nim}
              readOnly
            />
            <input
              type="text"
              className={styles.inputField}
              value={nama}
              readOnly
            />
            <input
              type="text"
              className={styles.inputField}
              value={jurusan}
              // readOnly
                            onChange={(e) => setJurusan(e.target.value)}
                            placeholder="Masukkan Jurusan Anda...."
            />
            <input
              type="text"
              className={styles.inputField}
              value={angkatan}
              // readOnly
                            onChange={(e) => setAngkatan(e.target.value)}
                            placeholder="Angkatan Berapa...."
            />
            <input
              type="text"
              className={styles.inputField}
              value={cabangKampus}
              // readOnly
                            onChange={(e) => setCabangKampus(e.target.value)}
                            placeholder="Masukkan Nama Kampus...."
            />
            <input
              type="text"
              className={styles.inputField}
              value={role}
              readOnly
            />
                        <input
              type="text"
              className={styles.inputField}
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Masukkan Judul Skripsi"
            />
            <input
              type="text"
              className={styles.inputField}
              value={sksditempuh}
              onChange={(e) => setSksditempuh(e.target.value)}
              placeholder="Masukkan SKS Ditempuh"
            />
            <input
              type="text"
              className={styles.inputField}
              value={sksberjalan}
              onChange={(e) => setSksberjalan(e.target.value)}
              placeholder="Masukkan SKS Berjalan"
            />

            <input
              type="text"
              className={styles.inputField}
              value={noWhatsapp}
              onChange={(e) => setNoWhatsapp(e.target.value)}
              placeholder="Masukkan No WhatsApp"
            />

            {/* File inputs for multiple files */}
            <label>Lembar Pengajuan Sidang</label>
            <input
              type="file"
              name="pengajuanSidang"
              onChange={handleFileChange}
              className={styles.inputField}
            />
            <label>KRS</label>
            <input
              type="file"
              name="krs"
              onChange={handleFileChange}
              className={styles.inputField}
            />
            <label>Daftar Nilai</label>
            <input
              type="file"
              name="daftarNilai"
              onChange={handleFileChange}
              className={styles.inputField}
            />
            <label>File TA 1</label>
            <input
              type="file"
              name="fileTA1"
              onChange={handleFileChange}
              className={styles.inputField}
            />
                        <label>File Jurnal</label>
            <input
              type="file"
              name="fileJurnal"
              onChange={handleFileChange}
              className={styles.inputField}
            />
                        <label>File Bukti Submit Jurnal</label>
            <input
              type="file"
              name="fileBuktiSubmitJurnal"
              onChange={handleFileChange}
              className={styles.inputField}
            />
                        <label>File Sertifikat BNSP</label>
            <input
              type="file"
              name="fileBNSP"
              onChange={handleFileChange}
              className={styles.inputField}
            />

            {/* Dosen selection */}
            {/* <select
              value={selectedDosen}
              onChange={(e) => setSelectedDosen(e.target.value)}
              className={styles.inputField}
            >
              <option value="">Pilih Dosen Pembimbing</option>
              {dosenList.map((dosen) => (
                <option key={dosen.id} value={dosen.id}>
                  {dosen.nama}
                </option>
              ))}
            </select> */}
                        <select
  className={styles.inputField}
  value={selectedDosen}
  onChange={(e) => setSelectedDosen(e.target.value)}
>
  <option value="">Pilih Dosen</option>
  {dosenList.map((dosen) => (
    <option key={dosen.id} value={dosen.nama}>
      {dosen.nama}
    </option>
  ))}
</select>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            {message && <p className={styles.successMessage}>{message.text}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
        )}
      </div>
    </>
  );
}

