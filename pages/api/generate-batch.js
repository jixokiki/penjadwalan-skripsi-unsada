// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export const generateBatchIfNeeded = async () => {
//   const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
//   const dosenSnapshot = await getDocs(collection(db, "dosen"));
//   const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang"));

//   const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//   const dosen = dosenSnapshot.docs.map(doc => doc.data());
//   const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
//   const existingNIMs = existingJadwal.map(j => j.nim);
//   const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));

//   if (mahasiswaBaru.length < 10) {
//     return; // belum cukup batch
//   }

//   const mahasiswaBatch = mahasiswaBaru.slice(0, 10);

//   const existingDates = existingJadwal.map(item => item.tanggal_sidang);
//   let nextTanggalSidang = new Date().toISOString().split("T")[0];
//   if (existingDates.length > 0) {
//     const sorted = existingDates.sort();
//     const lastDate = new Date(sorted[sorted.length - 1]);
//     lastDate.setDate(lastDate.getDate() + 1);
//     nextTanggalSidang = lastDate.toISOString().split("T")[0];
//   }

//   const rooms = [
//     { kode: "Lt 1 - Obeha", kapasitas: 4, terisi: 0 },
//     { kode: "Lt 2 - 205", kapasitas: 3, terisi: 0 },
//     { kode: "Lt 2 - 206", kapasitas: 3, terisi: 0 }
//   ];

//   const pengujiCount = {};
//   let jamAwal = 8;

//   for (let i = 0; i < mahasiswaBatch.length; i++) {
//     const mhs = mahasiswaBatch[i];
//     const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//     const pengujiDipilih = [];

//     while (pengujiDipilih.length < 4) {
//       const calon = dosen[Math.floor(Math.random() * dosen.length)];
//       const count = pengujiCount[calon.nama] || 0;

//       if (calon.nama !== pembimbing.nama && !pengujiDipilih.includes(calon.nama) && count < 3) {
//         pengujiDipilih.push(calon.nama);
//         pengujiCount[calon.nama] = count + 1;
//       }
//     }

//     let assignedRoom = null;
//     for (const room of rooms) {
//       if (room.terisi < room.kapasitas) {
//         assignedRoom = room.kode;
//         room.terisi += 1;
//         break;
//       }
//     }

//     if (!assignedRoom) return;

//     await addDoc(collection(db, "jadwal_sidang"), {
//       nim: mhs.nim,
//       nama: mhs.nama,
//       judul: mhs.judul,
//       formulir: mhs.formulir,
//       dosen_pembimbing: pembimbing.nama,
//       dosen_penguji: pengujiDipilih[0],
//       dosen_penguji2: pengujiDipilih[1],
//       dosen_penguji3: pengujiDipilih[2],
//       dosen_penguji4: pengujiDipilih[3],
//       tanggal_sidang: nextTanggalSidang,
//       jam_sidang: `${jamAwal}:00`,
//       ruangan: assignedRoom
//     });

//     jamAwal++;
//   }
// };




import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { time } from "console";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
    const dosenSnapshot = await getDocs(collection(db, "dosen"));
    const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang"));

    const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
    const dosen = dosenSnapshot.docs.map(doc => doc.data());
    const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
    const existingNIMs = existingJadwal.map(j => j.nim);
    const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));

    if (mahasiswaBaru.length < 10) {
      return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru untuk generate batch." });
    }

    const mahasiswaBatch = mahasiswaBaru.slice(0, 10);
    const existingDates = existingJadwal.map(item => item.tanggal_sidang);
    let nextTanggalSidang = new Date().toISOString().split("T")[0];
    if (existingDates.length > 0) {
      const sorted = existingDates.sort();
      const lastDate = new Date(sorted[sorted.length - 1]);
      lastDate.setDate(lastDate.getDate() + 1);
      nextTanggalSidang = lastDate.toISOString().split("T")[0];
    }

    const rooms = [
      { kode: "Lt 1 - Obeha", kapasitas: 4, terisi: 0 },
      { kode: "Lt 2 - 205", kapasitas: 3, terisi: 0 },
      { kode: "Lt 2 - 206", kapasitas: 3, terisi: 0 }
    ];

    const pengujiCount = {};
    let jamAwal = 8;

    for (let i = 0; i < mahasiswaBatch.length; i++) {
      const mhs = mahasiswaBatch[i];
      const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
      const pengujiDipilih = [];

      while (pengujiDipilih.length < 4) {
        const calon = dosen[Math.floor(Math.random() * dosen.length)];
        const count = pengujiCount[calon.nama] || 0;

        if (calon.nama !== pembimbing.nama && !pengujiDipilih.includes(calon.nama) && count < 3) {
          pengujiDipilih.push(calon.nama);
          pengujiCount[calon.nama] = count + 1;
        }
      }

      let assignedRoom = null;
      for (const room of rooms) {
        if (room.terisi < room.kapasitas) {
          assignedRoom = room.kode;
          room.terisi += 1;
          break;
        }
      }

      if (!assignedRoom) {
        return res.status(400).json({ message: "Kapasitas ruangan full." });
      }

      await addDoc(collection(db, "jadwal_sidang"), {
        nim: mhs.nim,
        nama: mhs.nama,
        judul: mhs.judul,
        formulir: mhs.formulir,
        dosen_pembimbing: pembimbing.nama,
        dosen_penguji: pengujiDipilih[0],
        dosen_penguji2: pengujiDipilih[1],
        dosen_penguji3: pengujiDipilih[2],
        dosen_penguji4: pengujiDipilih[3],
        tanggal_sidang: nextTanggalSidang,
        jam_sidang: `${jamAwal}:00`,
        ruangan: assignedRoom,
        timestamp: new Date().toISOString()
      });

      jamAwal++;
    }

    res.status(200).json({ message: `✅ Jadwal batch baru berhasil dibuat untuk tanggal ${nextTanggalSidang}` });

  } catch (error) {
    console.error("🔥 ERROR DI BACKEND:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
