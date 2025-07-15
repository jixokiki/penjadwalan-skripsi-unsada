"use client";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage methods

import styles from "./dashboardsempro.module.scss";
import Navbar from "../navbar/Navbar";
import * as XLSX from "xlsx";


import { auth, db, storage } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import jsPDF from "jspdf";
import NavbarMahasiswa from "../navbarmahasiswa/NavbarMahasiswa";

export default function DashboardSempro() {
  const [nim, setNim] = useState("");
  const [sksditempuh, setSksditempuh] = useState("");
  const [sksberjalan, setSksberjalan] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [cabangKampus, setCabangKampus] = useState("");
  const [noWhatsapp, setNoWhatsapp] = useState("");
  const [judul, setJudul] = useState("");
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [dosenList, setDosenList] = useState([]); // State for storing list of dosen
  const [selectedDosen, setSelectedDosen] = useState(""); // State for selected dosen
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


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


  // Function to fetch dosen list from Firestore
  // const fetchDosenList = async () => {
  //   try {
  //     const dosenCollection = collection(db, "dosen");
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


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("Fetching Firestore and Excel data...");
        
  //       // Fetch Firestore data
  //       const dosenCollection = collection(db, "users");
  //       const dosenSnapshot = await getDocs(dosenCollection);
  //       const dosenFirestore = dosenSnapshot.docs
  //         .map((doc) => ({ id: doc.id, ...doc.data() }))
  //         .filter((user) => user.role === "dosen");
  
  //       console.log("Dosen from Firestore:", dosenFirestore);
  
  //       // Fetch Excel data
  //       const responseSI = await fetch("/data/datadosenSistemInformasi.xlsx");
  //       const responseTI = await fetch("/data/datadosenTeknikInformatika.xlsx");
  
  //       if (!responseSI.ok || !responseTI.ok) {
  //         throw new Error("File Excel tidak ditemukan atau tidak bisa diakses");
  //       }
  
  //       console.log("Files fetched successfully");
  
  //       const [arrayBufferSI, arrayBufferTI] = await Promise.all([
  //         responseSI.arrayBuffer(),
  //         responseTI.arrayBuffer(),
  //       ]);
  
  //       const workbookSI = XLSX.read(arrayBufferSI, { type: "array" });
  //       const workbookTI = XLSX.read(arrayBufferTI, { type: "array" });
  
  //       const sheetSI = XLSX.utils.sheet_to_json(workbookSI.Sheets[workbookSI.SheetNames[0]], { raw: false, defval: "" });
  //       const sheetTI = XLSX.utils.sheet_to_json(workbookTI.Sheets[workbookTI.SheetNames[0]], { raw: false, defval: "" });
  
  //       console.log("Parsed data from Excel:", sheetSI, sheetTI);
  
  //       const allDosen = [...sheetSI, ...sheetTI].map((dosen, index) => ({
  //         id: `excel_${index}`, 
  //         nama: dosen["Nama Lengkap"] || "Tidak Diketahui",
  //         jurusan: dosen["Jurusan"] || "Tidak Diketahui",
  //       }));
  
  //       console.log("Final dosen list from Excel:", allDosen);
  
  //       // Gabungkan data Firestore & Excel
  //       setDosenList([...dosenFirestore, ...allDosen]);
  //     } catch (error) {
  //       console.error("Gagal mengambil data dosen:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  
  // useEffect(() => {
  //   console.log("Dosen List Updated:", dosenList);
  // }, [dosenList]);
  
  // Fetch dosen list when component mounts
  // useEffect(() => {
  //   fetchDosenList();
  // }, []);

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

//INI JANGAN DULU DIHAPUS TANGGAL 7 JULI
// const fetchUserDataByNim = async (nim) => {
//   if (!nim) return;

//   try {
//     let userData = {};
//     let mahasiswaData = {};

//     // Cek data dari "users"
//     const userDocRef = collection(db, "users");
//     const userSnapshot = await getDocs(userDocRef);
//     const userDoc = userSnapshot.docs.find(doc => doc.data().nim === nim);

//     if (userDoc) {
//       userData = userDoc.data();
//     }

//     // Cek data dari "mahasiswa"
//     const mhsCollection = collection(db, "mahasiswa");
//     const mhsSnapshot = await getDocs(mhsCollection);
//     const mhsDoc = mhsSnapshot.docs.find(doc => doc.data().nim === nim);

//     if (mhsDoc) {
//       mahasiswaData = mhsDoc.data();
//     }

//     // Gabungkan data dari kedua koleksi
//     const combinedData = {
//       nama: mahasiswaData.nama || userData.nama || "",
//       jurusan: userData.jurusan || "",
//       angkatan: userData.angkatan || "",
//       cabangKampus: userData.cabangKampus || "",
//       role: userData.role || "mahasiswa"
//     };

//     setNama(combinedData.nama);
//     setJurusan(combinedData.jurusan);
//     setAngkatan(combinedData.angkatan);
//     setCabangKampus(combinedData.cabangKampus);
//     setRole(combinedData.role);

//   } catch (error) {
//     console.error("Error fetching user data: ", error);
//     setError("Gagal mengambil data berdasarkan NIM");
//   }
// };


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
  //     const email = `${nim}@university.edu`;
  //     const password = nim;

  //     // Create a new user in Firebase Authentication
  //     await createUserWithEmailAndPassword(auth, email, password);

  //     // Upload files and get their URLs
  //     const uploadedFileUrls = await uploadFiles();

  //     if (!uploadedFileUrls) {
  //       setError("File uploads failed");
  //       setLoading(false);
  //       return;
  //     }

  //     // Save additional data to Firestore, including the selected dosen and file URLs
  //     await setDoc(doc(db, "usersSempro", nim), {
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

  //     setMessage({ type: "success", text: "Registration successful!" });
  //     router.push("/dashboard");
  //     alert("Form and files successfully submitted");
  //   } catch (error) {
  //     console.error("Registration failed: ", error.message);
  //     setError("Registration failed: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [jadwalSidangSempro, setJadwalSidangSempro] = useState([]);
//   const handleGenerateSempro = async (nim) => {
//   setLoading(true);
//   try {
//     const res = await fetch("/api/generate-batch", {
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

// const [jadwalSidangSempro, setJadwalSidangSempro] = useState([]);

const handleGenerateSempro = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/generate-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const result = await res.json();
    alert(result.message);
  } catch (error) {
    console.error("❌ Gagal membuat jadwal:", error);
    alert("Terjadi kesalahan saat membuat jadwal.");
  } finally {
    setLoading(false);
  }
};

//   const handleRegister = async (e) => {
//   e.preventDefault();
//   setError(null);
//   setLoading(true);

//   try {
//     let userData = {};
//     let mahasiswaData = {};

//     // Ambil data dari "users"
//     const usersSnapshot = await getDocs(collection(db, "users"));
//     usersSnapshot.forEach(doc => {
//       const data = doc.data();
//       if (data.nim === nim) {
//         userData = data;
//       }
//     });

//     // Ambil data dari "mahasiswa"
//     const mahasiswaSnapshot = await getDocs(collection(db, "mahasiswa"));
//     mahasiswaSnapshot.forEach(doc => {
//       const data = doc.data();
//       if (data.nim === nim) {
//         mahasiswaData = data;
//       }
//     });

//     // Kalau data tidak ditemukan di kedua koleksi
//     if (Object.keys(userData).length === 0 && Object.keys(mahasiswaData).length === 0) {
//       setError("NIM tidak ditemukan di database");
//       setLoading(false);
//       return;
//     }

//     // Gabungkan data
//     const combinedData = {
//       nama: nama || mahasiswaData.nama || userData.nama || "",
//       jurusan: jurusan || userData.jurusan || "",
//       angkatan: angkatan || userData.angkatan || "",
//       cabangKampus: cabangKampus || userData.cabangKampus || "",
//       role: role || userData.role || "mahasiswa",
//     };

//     // Upload file dan dapatkan URL
//     const uploadedFileUrls = await uploadFiles();

//     if (!uploadedFileUrls) {
//       setError("Gagal upload file");
//       setLoading(false);
//       return;
//     }


//     // Simpan ke Firestore di collection usersSempro
//     await setDoc(doc(db, "usersSempro", nim), {
//       ...combinedData,
//       nim,
//       sksditempuh,
//       sksberjalan,
//       judul,
//       noWhatsapp,
//       dosen: selectedDosen,
//       ...uploadedFileUrls,
//       butuhRevisi: false,
//       catatanRevisi: "",
//       formulir: "Sempro",
//     });

//     await handleGenerateSempro(nim, "Sempro");


//     setMessage({ type: "success", text: "Pendaftaran berhasil disimpan!" });
//     router.push("/dashboardmahasiswa");
//     alert("Form berhasil dikirim!");
//   } catch (error) {
//     console.error("Terjadi kesalahan:", error.message);
//     setError("Gagal menyimpan data: " + error.message);
//   } finally {
//     setLoading(false);
//   }
// };

//JANGAN DIHAPUS YA IKI INI UPDATE TGL 12 JULI 2025
// const handleRegister = async (e) => {
//   e.preventDefault();
//   setError(null);
//   setLoading(true);

//   try {
//     let userData = {};
//     let mahasiswaData = {};

//     // Ambil data dari "users"
//     const usersSnapshot = await getDocs(collection(db, "users"));
//     usersSnapshot.forEach(doc => {
//       const data = doc.data();
//       if (data.nim === nim) {
//         userData = data;
//       }
//     });

//     // Ambil data dari "mahasiswa"
//     const mahasiswaSnapshot = await getDocs(collection(db, "mahasiswa"));
//     mahasiswaSnapshot.forEach(doc => {
//       const data = doc.data();
//       if (data.nim === nim) {
//         mahasiswaData = data;
//       }
//     });

//     if (Object.keys(userData).length === 0 && Object.keys(mahasiswaData).length === 0) {
//       setError("NIM tidak ditemukan di database");
//       setLoading(false);
//       return;
//     }

//     const combinedData = {
//       nama: nama || mahasiswaData.nama || userData.nama || "",
//       jurusan: jurusan || userData.jurusan || "",
//       angkatan: angkatan || userData.angkatan || "",
//       cabangKampus: cabangKampus || userData.cabangKampus || "",
//       role: role || userData.role || "mahasiswa",
//     };

//     const uploadedFileUrls = await uploadFiles();
//     if (!uploadedFileUrls) {
//       setError("Gagal upload file");
//       setLoading(false);
//       return;
//     }

//     await setDoc(doc(db, "usersSempro", nim), {
//       ...combinedData,
//       nim,
//       sksditempuh,
//       sksberjalan,
//       judul,
//       noWhatsapp,
//       dosen: selectedDosen,
//       ...uploadedFileUrls,
//       butuhRevisi: false,
//       catatanRevisi: "",
//       formulir: "Sempro",
//     });

//     // // ✅ Setelah register berhasil, langsung panggil generate batch
//     // await handleGenerateSempro();

//     setMessage({ type: "success", text: "Pendaftaran berhasil disimpan!" });
//     router.push("/dashboardmahasiswa");
//     alert("Form berhasil dikirim!");
//   } catch (error) {
//     console.error("Terjadi kesalahan:", error.message);
//     setError("Gagal menyimpan data: " + error.message);
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

    if (Object.keys(userData).length === 0 && Object.keys(mahasiswaData).length === 0) {
      setError("NIM tidak ditemukan di database");
      setLoading(false);
      return;
    }

    const combinedData = {
      nama: nama || mahasiswaData.nama || userData.nama || "",
      jurusan: jurusan || userData.jurusan || "",
      angkatan: angkatan || userData.angkatan || "",
      cabangKampus: cabangKampus || userData.cabangKampus || "",
      role: role || userData.role || "mahasiswa",
    };

    // Tentukan spesialisasi penguji berdasarkan judul
    let spesialis_penguji = "";
    const lowerJudul = judul.toLowerCase();

    if (lowerJudul.includes("web") || lowerJudul.includes("website") || lowerJudul.includes("frontend") || lowerJudul.includes("backend")) {
      spesialis_penguji = "web";
    } else if (lowerJudul.includes("iot") || lowerJudul.includes("internet of things")) {
      spesialis_penguji = "IOT";
    } else if (lowerJudul.includes("data mining") || lowerJudul.includes("klasifikasi") || lowerJudul.includes("clustering")) {
      spesialis_penguji = "Data Mining";
    }

    // Daftar penguji berdasarkan spesialisasi
    const pengujiMap = {
      web: ["yan sofyan andhana saputra","suzuki syofiyan", "bagus tri mahardika", "afri yudha"],
      IOT: ["andi susilo", "timor setiyaningsih", "adam arif budiman"],
      "Data Mining": ["herianto", "linda nur afifa", "aji setiawan"]
    };

    let pengujiData = {};
    if (spesialis_penguji && pengujiMap[spesialis_penguji]) {
      const [penguji1, penguji2, penguji3] = pengujiMap[spesialis_penguji];
      pengujiData = { penguji1, penguji2, penguji3, spesialis_penguji };
    }

    const uploadedFileUrls = await uploadFiles();
    if (!uploadedFileUrls) {
      setError("Gagal upload file");
      setLoading(false);
      return;
    }

    await setDoc(doc(db, "usersSempro", nim), {
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
      statusSempro: "Masih Disidangkan",
      formulir: "Sempro",
      ...pengujiData // tambahkan data penguji berdasarkan judul
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



const [searchKey, setSearchKey] = useState(""); // untuk document ID yang diketik user

///INI DIA IOO
const fetchUserDataByNim = async (inputId) => {
  if (!inputId) return;

  try {
    const docRef = doc(db, "usersSempro", inputId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setNama(data.nama || "");
      setJurusan(data.jurusan || "");
      setAngkatan(data.angkatan || "");
      setCabangKampus(data.cabangKampus || "");
      setRole(data.role || "mahasiswa");
      setSksditempuh(data.sksditempuh || "");
      setSksberjalan(data.sksberjalan || "");
      setNoWhatsapp(data.noWhatsapp || "");
      setJudul(data.judul || "");
      setSelectedDosen(data.dosen || "");
      // setNim(inputId); // <- penting: nim tetap diisi agar input readonly tetap muncul
      setNim(data.nim || ""); // ← ambil field nim dari Firestore

    } else {
      setError("Data tidak ditemukan.");
      setNama(""); // reset agar form kosong
    }
  } catch (error) {
    console.error("Gagal ambil data dari usersSempro:", error);
    setError("Terjadi kesalahan saat mengambil data.");
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
      <NavbarMahasiswa isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        <h1 className={styles.title}>Pengajuan Seminar Proposal</h1>

        {/* Form to fetch NIM */}
        {/* <form onSubmit={(e) => { e.preventDefault(); fetchUserDataByNim(nim); }} className={styles.form}>
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
        </form> */}
        {/* <form
  onSubmit={(e) => {
    e.preventDefault();
    fetchUserDataByNim(nim); // nim = "Julio"
  }}
  className={styles.form}
>
  <input
    type="text"
    value={nim}
    onChange={(e) => setNim(e.target.value)}
    placeholder="Masukkan ID / NIM"
    className={styles.inputField}
  />
  <button type="submit" className={styles.button}>
    Cek NIM
  </button>
</form> */}

<form
  onSubmit={(e) => {
    e.preventDefault();
    fetchUserDataByNim(searchKey); // ⬅️ gunakan document ID di sini
  }}
  className={styles.form}
>
  <input
    type="text"
    value={searchKey}
    onChange={(e) => setSearchKey(e.target.value)} // ⬅️ update searchKey, bukan nim
    placeholder="Masukkan NIM / Nama"
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
                            // onChange={(e) => setNama(e.target.value)}
                            // placeholder="Masukkan Nama Anda..."
            />
            <input
              type="text"
              className={styles.inputField}
              value={jurusan}
              readOnly
                            // onChange={(e) => setJurusan(e.target.value)}
                            // placeholder="Masukkan Jurusan Anda...."
            />
            <input
              type="text"
              className={styles.inputField}
              value={angkatan}
              readOnly
                            // onChange={(e) => setAngkatan(e.target.value)}
                            // placeholder="Angkatan Berapa..."
            />
            {/* <input
              type="text"
              className={styles.inputField}
              value={cabangKampus}
              // readOnly
                            onChange={(e) => setCabangKampus(e.target.value)}
                            placeholder="Masukkan Nama Kampus..."
            /> */}
            <input
              type="text"
              className={styles.inputField}
              value={role}
              readOnly
            />
            {/* <input
              type="text"
              className={styles.inputField}
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Masukkan Judul Sempro"
            /> */}
            <input
              type="text"
              className={styles.inputField}
              value={sksditempuh}
              readOnly
              // onChange={(e) => setSksditempuh(e.target.value)}
              // placeholder="Masukkan SKS Ditempuh"
            />
            {/* <input
              type="text"
              className={styles.inputField}
              value={sksberjalan}
              onChange={(e) => setSksberjalan(e.target.value)}
              placeholder="Masukkan SKS Berjalan"
            /> */}

            <input
              type="text"
              className={styles.inputField}
              value={noWhatsapp}
              readOnly
              // onChange={(e) => setNoWhatsapp(e.target.value)}
              // placeholder="Masukkan No WhatsApp"
            />

<input
              type="text"
              className={styles.inputField}
              value={judul}
              readOnly
              // onChange={(e) => setJudul(e.target.value)}
              // placeholder="Masukkan Judul Sempro"
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

            <label>File TA1 (SEMPRO)</label>
            <input
              type="file"
              name="fileTA1"
              onChange={handleFileChange}
              className={styles.inputField}
            />

            {/* Select input for Dosen */}
            {/* <select
              className={styles.inputField}
              value={selectedDosen}
              onChange={(e) => setSelectedDosen(e.target.value)}
            >
              <option value="">Pilih Dosen</option>
              {dosenList.map((dosen) => (
                <option key={dosen.id} value={dosen.nama}>
                  {dosen.nama} ({dosen.jurusan})
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


            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
        )}

        {message && (
          <p className={message.type === "success" ? styles.success : styles.error}>
            {message.text}
          </p>
        )}
      </div>
    </>
  );
}

