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



//jangan dihapus dah code dibawah ini
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { time } from "console";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
//     const dosenSnapshot = await getDocs(collection(db, "dosen"));
//     const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang"));

//     const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//     const dosen = dosenSnapshot.docs.map(doc => doc.data());
//     const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
//     const existingNIMs = existingJadwal.map(j => j.nim);
//     const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));

//     if (mahasiswaBaru.length < 10) {
//       return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru untuk generate batch." });
//     }

//     const mahasiswaBatch = mahasiswaBaru.slice(0, 10);
//     const existingDates = existingJadwal.map(item => item.tanggal_sidang);
//     let nextTanggalSidang = new Date().toISOString().split("T")[0];
//     if (existingDates.length > 0) {
//       const sorted = existingDates.sort();
//       const lastDate = new Date(sorted[sorted.length - 1]);
//       lastDate.setDate(lastDate.getDate() + 1);
//       nextTanggalSidang = lastDate.toISOString().split("T")[0];
//     }

//     const rooms = [
//       { kode: "Lt 1 - Obeha", kapasitas: 4, terisi: 0 },
//       { kode: "Lt 2 - 205", kapasitas: 3, terisi: 0 },
//       { kode: "Lt 2 - 206", kapasitas: 3, terisi: 0 }
//     ];

//     const pengujiCount = {};
//     let jamAwal = 8;

//     for (let i = 0; i < mahasiswaBatch.length; i++) {
//       const mhs = mahasiswaBatch[i];
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       const pengujiDipilih = [];

//       while (pengujiDipilih.length < 4) {
//         const calon = dosen[Math.floor(Math.random() * dosen.length)];
//         const count = pengujiCount[calon.nama] || 0;

//         if (calon.nama !== pembimbing.nama && !pengujiDipilih.includes(calon.nama) && count < 3) {
//           pengujiDipilih.push(calon.nama);
//           pengujiCount[calon.nama] = count + 1;
//         }
//       }

//       let assignedRoom = null;
//       for (const room of rooms) {
//         if (room.terisi < room.kapasitas) {
//           assignedRoom = room.kode;
//           room.terisi += 1;
//           break;
//         }
//       }

//       if (!assignedRoom) {
//         return res.status(400).json({ message: "Kapasitas ruangan full." });
//       }

//       await addDoc(collection(db, "jadwal_sidang"), {
//         nim: mhs.nim,
//         nama: mhs.nama,
//         judul: mhs.judul,
//         formulir: mhs.formulir,
//         dosen_pembimbing: pembimbing.nama,
//         dosen_penguji: pengujiDipilih[0],
//         dosen_penguji2: pengujiDipilih[1],
//         dosen_penguji3: pengujiDipilih[2],
//         dosen_penguji4: pengujiDipilih[3],
//         tanggal_sidang: nextTanggalSidang,
//         jam_sidang: `${jamAwal}:00`,
//         ruangan: assignedRoom,
//         timestamp: new Date().toISOString()
//       });

//       jamAwal++;
//     }

//     res.status(200).json({ message: `✅ Jadwal batch baru berhasil dibuat untuk tanggal ${nextTanggalSidang}` });

//   } catch (error) {
//     console.error("🔥 ERROR DI BACKEND:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }

//PLISSS IKI INI JANGAN DIHAPUS PERCAYA SAMA GUA
// import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     // Ambil data
//     const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
//     const dosenSnapshot = await getDocs(collection(db, "dosen"));
//     const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang"));

//     const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//     const dosen = dosenSnapshot.docs.map(doc => doc.data());
//     const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
//     const existingNIMs = existingJadwal.map(j => j.nim);

//     // Filter mahasiswa yang belum punya jadwal
//     const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));

//     if (mahasiswaBaru.length < 10) {
//       return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru untuk generate batch." });
//     }

//     // Ambil batch pertama 10 mahasiswa
//     const mahasiswaBatch = mahasiswaBaru.slice(0, 10);

//     // GENETIC RANDOM ASSIGNMENT DI MEMORY (CEPAT)
//     const schedule = mahasiswaBatch.map((mhs) => {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       const pengujiSet = new Set();

//       while (pengujiSet.size < 4) {
//         const calon = dosen[Math.floor(Math.random() * dosen.length)];
//         if (calon.nama !== pembimbing.nama) pengujiSet.add(calon.nama);
//       }
//       const [penguji1, penguji2, penguji3, penguji4] = [...pengujiSet];

//       return {
//         nim: mhs.nim,
//         nama: mhs.nama,
//         judul: mhs.judul,
//         formulir: mhs.formulir,
//         ruangan: mhs.ruangan,
//         dosen_pembimbing: pembimbing.nama,
//         dosen_penguji: penguji1,
//         dosen_penguji2: penguji2,
//         dosen_penguji3: penguji3,
//         dosen_penguji4: penguji4
//       };
//     });

//     // ================= ROOM & TANGGAL ALLOCATOR =================
//     const rooms = [
//       { kode: "Lt 1 - Obeha", kapasitas: 4 },
//       { kode: "Lt 2 - 205", kapasitas: 3 },
//       { kode: "Lt 2 - 206", kapasitas: 3 }
//     ];

//     // Hitung existing jadwal per tanggal
//     const jadwalPerTanggal = {};
//     existingJadwal.forEach(j => {
//       if (!jadwalPerTanggal[j.tanggal_sidang]) jadwalPerTanggal[j.tanggal_sidang] = {};
//       if (!jadwalPerTanggal[j.tanggal_sidang][j.ruangan]) jadwalPerTanggal[j.tanggal_sidang][j.ruangan] = 0;
//       jadwalPerTanggal[j.tanggal_sidang][j.ruangan]++;
//     });

//     // Tentukan tanggal starting point
//     let tanggalMulai = new Date();
//     if (existingJadwal.length > 0) {
//       const sortedDates = existingJadwal.map(j => j.tanggal_sidang).sort();
//       tanggalMulai = new Date(sortedDates[sortedDates.length - 1]);
//     }

//     // MULAI ALOKASI TANGGAL & RUANGAN SECARA CEPAT
//     const finalSchedule = [];

//     for (let i = 0; i < schedule.length; i++) {
//       let assigned = false;
//       let tanggalLoop = new Date(tanggalMulai);

//       while (!assigned) {
//         const tanggalStr = tanggalLoop.toISOString().split("T")[0];
//         if (!jadwalPerTanggal[tanggalStr]) jadwalPerTanggal[tanggalStr] = {};

//         for (const room of rooms) {
//           const terisi = jadwalPerTanggal[tanggalStr][room.kode] || 0;
//           if (terisi < room.kapasitas) {
//             // Dapat room
//             jadwalPerTanggal[tanggalStr][room.kode] = terisi + 1;

//             finalSchedule.push({
//               ...schedule[i],
//               tanggal_sidang: tanggalStr,
//               jam_sidang: `${8 + terisi}:00`,
//               ruangan: room.kode,
//               timestamp: new Date().toISOString()
//             });

//             assigned = true;
//             break;
//           }
//         }
//         if (!assigned) {
//           tanggalLoop.setDate(tanggalLoop.getDate() + 1);
//         }
//       }
//     }

//     // FINAL WRITE BATCH SEKALI SAJA KE FIRESTORE
//     const batch = writeBatch(db);
//     finalSchedule.forEach(item => {
//       const newDocRef = doc(collection(db, "jadwal_sidang"));
//       batch.set(newDocRef, item);
//     });
//     await batch.commit();

//     res.status(200).json({ message: `✅ Jadwal batch berhasil dibuat.` });

//   } catch (error) {
//     console.error("🔥 ERROR FINAL:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }


//jangan dihapus ini iki ini version selanjutbnya dari code diatas yaitu FULL HYBRID ANTI-BENTROK CLEAN CODE FINAL VERSION
// import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     // Ambil semua data awal
//     const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
//     const dosenSnapshot = await getDocs(collection(db, "dosen"));
//     const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang"));

//     const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//     const dosen = dosenSnapshot.docs.map(doc => doc.data());
//     const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
//     const existingNIMs = existingJadwal.map(j => j.nim);

//     // Filter mahasiswa baru (belum ada jadwal)
//     const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));
//     if (mahasiswaBaru.length < 10) {
//       return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru untuk generate batch." });
//     }
//     const mahasiswaBatch = mahasiswaBaru.slice(0, 10);

//     // Random assign dosen (GENETIC SIMULASI CEPAT)
//     const schedule = mahasiswaBatch.map((mhs) => {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       const pengujiSet = new Set();
//       while (pengujiSet.size < 4) {
//         const calon = dosen[Math.floor(Math.random() * dosen.length)];
//         if (calon.nama !== pembimbing.nama) pengujiSet.add(calon.nama);
//       }
//       const [penguji1, penguji2, penguji3, penguji4] = [...pengujiSet];
//       return {
//         nim: mhs.nim,
//         nama: mhs.nama,
//         judul: mhs.judul,
//         formulir: mhs.formulir,
//         pembimbing: pembimbing.nama,
//         penguji: [penguji1, penguji2, penguji3, penguji4]
//       };
//     });

//     // Template ruangan
//     const rooms = [
//       { kode: "Lt 1 - Obeha", kapasitas: 4 },
//       { kode: "Lt 2 - 205", kapasitas: 3 },
//       { kode: "Lt 2 - 206", kapasitas: 3 }
//     ];

//     // Siapkan tracker per tanggal dan jam: siapa dosen yang dipakai di jam tsb
//     const jadwalPerTanggalJam = {};

//     // Tentukan starting tanggal
//     let tanggalMulai = new Date();
//     if (existingJadwal.length > 0) {
//       const sortedDates = existingJadwal.map(j => j.tanggal_sidang).sort();
//       tanggalMulai = new Date(sortedDates[sortedDates.length - 1]);
//     }

//     // Masukkan existing data ke tracker bentrok
//     for (const j of existingJadwal) {
//       if (!jadwalPerTanggalJam[j.tanggal_sidang]) jadwalPerTanggalJam[j.tanggal_sidang] = {};
//       if (!jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang]) jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang] = new Set();
//       jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang].add(j.dosen_pembimbing);
//       jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang].add(j.dosen_penguji);
//       jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang].add(j.dosen_penguji2);
//       jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang].add(j.dosen_penguji3);
//       jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang].add(j.dosen_penguji4);
//     }

//     const finalSchedule = [];
//     for (const item of schedule) {
//       let assigned = false;
//       let tanggalLoop = new Date(tanggalMulai);

//       while (!assigned) {
//         const tanggalStr = tanggalLoop.toISOString().split("T")[0];
//         if (!jadwalPerTanggalJam[tanggalStr]) jadwalPerTanggalJam[tanggalStr] = {};

//         for (const room of rooms) {
//           for (let slot = 0; slot < room.kapasitas; slot++) {
//             const jamSidang = `${8 + slot}:00`;
//             if (!jadwalPerTanggalJam[tanggalStr][jamSidang]) {
//               jadwalPerTanggalJam[tanggalStr][jamSidang] = new Set();
//             }
//             const dosenDipakai = jadwalPerTanggalJam[tanggalStr][jamSidang];

//             // Cek apakah dosen sudah dipakai di jam ini:
//             const dosenBentrok = [
//               item.pembimbing,
//               ...item.penguji
//             ].some(dosen => dosenDipakai.has(dosen));

//             if (!dosenBentrok) {
//               // Assign
//               dosenDipakai.add(item.pembimbing);
//               item.penguji.forEach(p => dosenDipakai.add(p));

//               finalSchedule.push({
//                 nim: item.nim,
//                 nama: item.nama,
//                 judul: item.judul,
//                 formulir: item.formulir,
//                 dosen_pembimbing: item.pembimbing,
//                 dosen_penguji: item.penguji[0],
//                 dosen_penguji2: item.penguji[1],
//                 dosen_penguji3: item.penguji[2],
//                 dosen_penguji4: item.penguji[3],
//                 tanggal_sidang: tanggalStr,
//                 jam_sidang: jamSidang,
//                 ruangan: room.kode,
//                 timestamp: new Date().toISOString()
//               });

//               assigned = true;
//               break;
//             }
//           }
//           if (assigned) break;
//         }

//         if (!assigned) {
//           tanggalLoop.setDate(tanggalLoop.getDate() + 1);
//         }
//       }
//     }

//     // Sekali commit
//     const batch = writeBatch(db);
//     finalSchedule.forEach(item => {
//       const newDocRef = doc(collection(db, "jadwal_sidang"));
//       batch.set(newDocRef, item);
//     });
//     await batch.commit();

//     res.status(200).json({ message: `✅ Jadwal batch berhasil dibuat.` });

//   } catch (error) {
//     console.error("🔥 ERROR FINAL HYBRID ANTI-BENTROK:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }


//jangan dihapus dulu yaa ikiii soalnya code dibawah sudah menerapkan Full Hybrid Anti-Bentrok + Random Fair Room Distribution ✅
// import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     // Ambil semua data awal
//     const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
//     const dosenSnapshot = await getDocs(collection(db, "dosen"));
//     const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang"));

//     const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//     const dosen = dosenSnapshot.docs.map(doc => doc.data());
//     const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
//     const existingNIMs = existingJadwal.map(j => j.nim);

//     // Filter mahasiswa baru
//     const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));
//     if (mahasiswaBaru.length < 10) {
//       return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru untuk generate batch." });
//     }
//     const mahasiswaBatch = mahasiswaBaru.slice(0, 10);

//     // Random assign dosen
//     const schedule = mahasiswaBatch.map((mhs) => {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       const pengujiSet = new Set();
//       while (pengujiSet.size < 4) {
//         const calon = dosen[Math.floor(Math.random() * dosen.length)];
//         if (calon.nama !== pembimbing.nama) pengujiSet.add(calon.nama);
//       }
//       const [penguji1, penguji2, penguji3, penguji4] = [...pengujiSet];
//       return {
//         nim: mhs.nim,
//         nama: mhs.nama,
//         judul: mhs.judul,
//         formulir: mhs.formulir,
//         pembimbing: pembimbing.nama,
//         penguji: [penguji1, penguji2, penguji3, penguji4]
//       };
//     });

//     const rooms = [
//       { kode: "Lt 1 - Obeha", kapasitas: 4 },
//       { kode: "Lt 2 - 205", kapasitas: 3 },
//       { kode: "Lt 2 - 206", kapasitas: 3 }
//     ];

//     const jadwalPerTanggalJam = {};

//     let tanggalMulai = new Date();
//     if (existingJadwal.length > 0) {
//       const sortedDates = existingJadwal.map(j => j.tanggal_sidang).sort();
//       tanggalMulai = new Date(sortedDates[sortedDates.length - 1]);
//     }

//     // Masukkan existing bentrok
//     for (const j of existingJadwal) {
//       if (!jadwalPerTanggalJam[j.tanggal_sidang]) jadwalPerTanggalJam[j.tanggal_sidang] = {};
//       if (!jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang]) jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang] = new Set();
//       [j.dosen_pembimbing, j.dosen_penguji, j.dosen_penguji2, j.dosen_penguji3, j.dosen_penguji4].forEach(dosen => {
//         jadwalPerTanggalJam[j.tanggal_sidang][j.jam_sidang].add(dosen);
//       });
//     }

//     const finalSchedule = [];

//     for (const item of schedule) {
//       let assigned = false;
//       let tanggalLoop = new Date(tanggalMulai);

//       while (!assigned) {
//         const tanggalStr = tanggalLoop.toISOString().split("T")[0];
//         if (!jadwalPerTanggalJam[tanggalStr]) jadwalPerTanggalJam[tanggalStr] = {};

//         // RANDOMIZE RUANGAN SETIAP MAHASISWA
//         const shuffledRooms = [...rooms].sort(() => Math.random() - 0.5);

//         for (const room of shuffledRooms) {
//           for (let slot = 0; slot < room.kapasitas; slot++) {
//             const jamSidang = `${8 + slot}:00`;
//             if (!jadwalPerTanggalJam[tanggalStr][jamSidang]) {
//               jadwalPerTanggalJam[tanggalStr][jamSidang] = new Set();
//             }
//             const dosenDipakai = jadwalPerTanggalJam[tanggalStr][jamSidang];
//             const dosenBentrok = [item.pembimbing, ...item.penguji].some(dosen => dosenDipakai.has(dosen));

//             if (!dosenBentrok) {
//               dosenDipakai.add(item.pembimbing);
//               item.penguji.forEach(p => dosenDipakai.add(p));
//               finalSchedule.push({
//                 nim: item.nim,
//                 nama: item.nama,
//                 judul: item.judul,
//                 formulir: item.formulir,
//                 dosen_pembimbing: item.pembimbing,
//                 dosen_penguji: item.penguji[0],
//                 dosen_penguji2: item.penguji[1],
//                 dosen_penguji3: item.penguji[2],
//                 dosen_penguji4: item.penguji[3],
//                 tanggal_sidang: tanggalStr,
//                 jam_sidang: jamSidang,
//                 ruangan: room.kode,
//                 timestamp: new Date().toISOString()
//               });
//               assigned = true;
//               break;
//             }
//           }
//           if (assigned) break;
//         }
//         if (!assigned) {
//           tanggalLoop.setDate(tanggalLoop.getDate() + 1);
//         }
//       }
//     }

//     // Sekali commit
//     const batch = writeBatch(db);
//     finalSchedule.forEach(item => {
//       const newDocRef = doc(collection(db, "jadwal_sidang"));
//       batch.set(newDocRef, item);
//     });
//     await batch.commit();

//     res.status(200).json({ message: `✅ Jadwal batch berhasil dibuat.` });

//   } catch (error) {
//     console.error("🔥 ERROR FINAL HYBRID RANDOM FAIR:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }




// //jangan dihapus ya iki ini code sudah fix dengan menerapkan Alternatif 1 (safety soft mode) yang tanggal sidangnya itu loh
// import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     // Ambil semua data awal
//     const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
//     const dosenSnapshot = await getDocs(collection(db, "dosen"));
//     const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang_sempro"));

//     const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//     const dosen = dosenSnapshot.docs.map(doc => doc.data());
//     const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
//     const existingNIMs = existingJadwal.map(j => j.nim);

//     // Filter mahasiswa baru
//     const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));
//     if (mahasiswaBaru.length < 10) {
//       return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru untuk generate batch." });
//     }
//     const mahasiswaBatch = mahasiswaBaru.slice(0, 10);

//     // Hitung batch keberapa kita sekarang
//     const totalExisting = existingJadwal.length;
//     const currentBatchIndex = Math.floor(totalExisting / 10); // batch ke-0, 1, 2, dst

//     // Tanggal starting point
//     const baseDate = new Date();
//     baseDate.setDate(baseDate.getDate() + 4 + (currentBatchIndex * 2));
//     const tanggalBatchSidang = baseDate.toISOString().split("T")[0];

//     // Random assign dosen
//     const schedule = mahasiswaBatch.map((mhs) => {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       const pengujiSet = new Set();
//       while (pengujiSet.size < 4) {
//         const calon = dosen[Math.floor(Math.random() * dosen.length)];
//         if (calon.nama !== pembimbing.nama) pengujiSet.add(calon.nama);
//       }
//       const [penguji1, penguji2, penguji3, penguji4] = [...pengujiSet];
//       return {
//         nim: mhs.nim,
//         nama: mhs.nama,
//         judul: mhs.judul,
//         formulir: mhs.formulir,
//         pembimbing: pembimbing.nama,
//         penguji: [penguji1, penguji2, penguji3, penguji4]
//       };
//     });

//     const rooms = [
//       { kode: "Lt 1 - Obeha", kapasitas: 4 },
//       { kode: "Lt 2 - 205", kapasitas: 3 },
//       { kode: "Lt 2 - 206", kapasitas: 3 }
//     ];

//     const jadwalPerTanggalJam = {};

//     // Masukkan existing bentrok seluruh data
//     for (const j of existingJadwal) {
//       const tgl = j.tanggal_sidang;
//       if (!jadwalPerTanggalJam[tgl]) jadwalPerTanggalJam[tgl] = {};
//       if (!jadwalPerTanggalJam[tgl][j.jam_sidang]) jadwalPerTanggalJam[tgl][j.jam_sidang] = new Set();
//       [j.dosen_pembimbing, j.dosen_penguji, j.dosen_penguji2, j.dosen_penguji3, j.dosen_penguji4].forEach(dosen => {
//         jadwalPerTanggalJam[tgl][j.jam_sidang].add(dosen);
//       });
//     }

//     const finalSchedule = [];

//     for (const item of schedule) {
//       let assigned = false;
//       let tanggalLoop = new Date(tanggalBatchSidang); // Mulai dari batch tanggalnya

//       // Soft Safe Mode ➔ izinkan mundur ke tanggal berikutnya jika mentok
//       while (!assigned) {
//         const tanggalStr = tanggalLoop.toISOString().split("T")[0];
//         if (!jadwalPerTanggalJam[tanggalStr]) jadwalPerTanggalJam[tanggalStr] = {};

//         const shuffledRooms = [...rooms].sort(() => Math.random() - 0.5);

//         for (const room of shuffledRooms) {
//           for (let slot = 0; slot < room.kapasitas; slot++) {
//             const jamSidang = `${8 + slot}:00`;
//             if (!jadwalPerTanggalJam[tanggalStr][jamSidang]) {
//               jadwalPerTanggalJam[tanggalStr][jamSidang] = new Set();
//             }
//             const dosenDipakai = jadwalPerTanggalJam[tanggalStr][jamSidang];
//             const dosenBentrok = [item.pembimbing, ...item.penguji].some(dosen => dosenDipakai.has(dosen));

//             if (!dosenBentrok) {
//               dosenDipakai.add(item.pembimbing);
//               item.penguji.forEach(p => dosenDipakai.add(p));
//               finalSchedule.push({
//                 nim: item.nim,
//                 nama: item.nama,
//                 judul: item.judul,
//                 formulir: item.formulir,
//                 dosen_pembimbing: item.pembimbing,
//                 dosen_penguji: item.penguji[0],
//                 dosen_penguji2: item.penguji[1],
//                 dosen_penguji3: item.penguji[2],
//                 dosen_penguji4: item.penguji[3],
//                 tanggal_sidang: tanggalStr,
//                 jam_sidang: jamSidang,
//                 ruangan: room.kode,
//                 timestamp: new Date().toISOString()
//               });
//               assigned = true;
//               break;
//             }
//           }
//           if (assigned) break;
//         }

//         // Kalau gagal di tanggal hari ini ➔ geser ke tanggal berikutnya
//         if (!assigned) {
//           tanggalLoop.setDate(tanggalLoop.getDate() + 1);
//         }
//       }
//     }

//     const batch = writeBatch(db);
//     finalSchedule.forEach(item => {
//       const newDocRef = doc(collection(db, "jadwal_sidang_skripsi"));
//       batch.set(newDocRef, item);
//     });
//     await batch.commit();

//     res.status(200).json({ message: `✅ Jadwal batch berhasil dibuat (mulai tanggal ${tanggalBatchSidang}).` });

//   } catch (error) {
//     console.error("🔥 ERROR FINAL HYBRID FULL SAFE:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }


// import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     const dosenSnapshot = await getDocs(collection(db, "dosen"));
//     const jadwalSemproSnapshot = await getDocs(collection(db, "jadwal_sidang_sempro"));
//     const existingJadwalSkripsiSnapshot = await getDocs(collection(db, "jadwal_sidang_skripsi"));

//     const dosen = dosenSnapshot.docs.map(doc => doc.data());
//     const semuaSempro = jadwalSemproSnapshot.docs.map(doc => doc.data());
//     const existingJadwal = existingJadwalSkripsiSnapshot.docs.map(doc => doc.data());

//     const existingNIMs = existingJadwal.map(j => j.nim);
//     const mahasiswaBaru = semuaSempro.filter(mhs => mhs?.nim && !existingNIMs.includes(mhs.nim));

//     if (mahasiswaBaru.length < 10) {
//       return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru di jadwal_sidang_sempro." });
//     }

//     const mahasiswaBatch = mahasiswaBaru.slice(0, 10);

//     const totalExisting = existingJadwal.length;
//     const currentBatchIndex = Math.floor(totalExisting / 10);

//     const baseDate = new Date();
//     baseDate.setDate(baseDate.getDate() + 4 + (currentBatchIndex * 2));
//     const tanggalBatchSidang = baseDate.toISOString().split("T")[0];

//     const schedule = mahasiswaBatch.map((mhs) => {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       const pengujiSet = new Set();
//       while (pengujiSet.size < 4) {
//         const calon = dosen[Math.floor(Math.random() * dosen.length)];
//         if (calon.nama !== pembimbing.nama) pengujiSet.add(calon.nama);
//       }
//       const [penguji1, penguji2, penguji3, penguji4] = [...pengujiSet];
//       return {
//         nim: mhs.nim,
//         nama: mhs.nama,
//         judul: mhs.judul,
//         formulir: mhs.formulir,
//         pembimbing: pembimbing.nama,
//         penguji: [penguji1, penguji2, penguji3, penguji4]
//       };
//     });

//     const rooms = [
//       { kode: "Lt 1 - Obeha", kapasitas: 4 },
//       { kode: "Lt 2 - 205", kapasitas: 3 },
//       { kode: "Lt 2 - 206", kapasitas: 3 }
//     ];

//     const jadwalPerTanggalJam = {};
//     for (const j of existingJadwal) {
//       const tgl = j.tanggal_sidang;
//       if (!jadwalPerTanggalJam[tgl]) jadwalPerTanggalJam[tgl] = {};
//       if (!jadwalPerTanggalJam[tgl][j.jam_sidang]) jadwalPerTanggalJam[tgl][j.jam_sidang] = new Set();
//       [j.dosen_pembimbing, j.dosen_penguji, j.dosen_penguji2, j.dosen_penguji3, j.dosen_penguji4].forEach(dosen => {
//         jadwalPerTanggalJam[tgl][j.jam_sidang].add(dosen);
//       });
//     }

//     const finalSchedule = [];

//     for (const item of schedule) {
//       let assigned = false;
//       let tanggalLoop = new Date(tanggalBatchSidang);

//       while (!assigned) {
//         const tanggalStr = tanggalLoop.toISOString().split("T")[0];
//         if (!jadwalPerTanggalJam[tanggalStr]) jadwalPerTanggalJam[tanggalStr] = {};

//         const shuffledRooms = [...rooms].sort(() => Math.random() - 0.5);

//         for (const room of shuffledRooms) {
//           for (let slot = 0; slot < room.kapasitas; slot++) {
//             const jamSidang = `${8 + slot}:00`;
//             if (!jadwalPerTanggalJam[tanggalStr][jamSidang]) {
//               jadwalPerTanggalJam[tanggalStr][jamSidang] = new Set();
//             }
//             const dosenDipakai = jadwalPerTanggalJam[tanggalStr][jamSidang];
//             const dosenBentrok = [item.pembimbing, ...item.penguji].some(dosen => dosenDipakai.has(dosen));

//             if (!dosenBentrok) {
//               dosenDipakai.add(item.pembimbing);
//               item.penguji.forEach(p => dosenDipakai.add(p));
//               finalSchedule.push({
//                 nim: item.nim,
//                 nama: item.nama,
//                 judul: item.judul,
//                 formulir: item.formulir,
//                 dosen_pembimbing: item.pembimbing,
//                 dosen_penguji: item.penguji[0],
//                 dosen_penguji2: item.penguji[1],
//                 dosen_penguji3: item.penguji[2],
//                 dosen_penguji4: item.penguji[3],
//                 tanggal_sidang: tanggalStr,
//                 jam_sidang: jamSidang,
//                 ruangan: room.kode,
//                 timestamp: new Date().toISOString()
//               });
//               assigned = true;
//               break;
//             }
//           }
//           if (assigned) break;
//         }
//         if (!assigned) tanggalLoop.setDate(tanggalLoop.getDate() + 1);
//       }
//     }

//     const batch = writeBatch(db);
//     finalSchedule.forEach(item => {
//       const newDocRef = doc(collection(db, "jadwal_sidang_skripsi"));
//       batch.set(newDocRef, item);
//     });
//     await batch.commit();

//     res.status(200).json({ message: `✅ Jadwal batch berhasil dibuat (mulai tanggal ${tanggalBatchSidang}).` });

//   } catch (error) {
//     console.error("🔥 ERROR:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }



import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const jadwalSemproSnapshot = await getDocs(collection(db, "jadwal_sidang_sempro"));
    const existingJadwalSkripsiSnapshot = await getDocs(collection(db, "jadwal_sidang_skripsi"));

    const semuaSempro = jadwalSemproSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const existingJadwal = existingJadwalSkripsiSnapshot.docs.map(doc => doc.data());

    const existingNIMs = existingJadwal.map(j => j.nim);
    const mahasiswaBaru = semuaSempro.filter(mhs => mhs?.nim && !existingNIMs.includes(mhs.nim));

    if (mahasiswaBaru.length < 10) {
      return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru di jadwal_sidang_sempro." });
    }

    const mahasiswaBatch = mahasiswaBaru.slice(0, 10);
    const totalExisting = existingJadwal.length;
    const currentBatchIndex = Math.floor(totalExisting / 10);

    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + 30 + currentBatchIndex);
    const tanggalBatchSidang = baseDate.toISOString().split("T")[0];

    const schedule = mahasiswaBatch.map((mhs) => {
      const semproData = semuaSempro.find(s => s.nim === mhs.nim);

      if (!semproData) {
        throw new Error(`Data sempro untuk NIM ${mhs.nim} tidak ditemukan`);
      }

      return {
        nim: mhs.nim,
        nama: mhs.nama,
        judul: mhs.judul,
        formulir: mhs.formulir,
        pembimbing: semproData.dosen_pembimbing,
        penguji: [
          semproData.dosen_penguji,
          semproData.dosen_penguji2,
          semproData.dosen_penguji3,
          semproData.dosen_penguji4
        ]
      };
    });

    const rooms = [
      { kode: "Lt 1 - Obeha", kapasitas: 4 },
      { kode: "Lt 2 - 205", kapasitas: 3 },
      { kode: "Lt 2 - 206", kapasitas: 3 }
    ];

    const jadwalPerTanggalJam = {};
    for (const j of existingJadwal) {
      const tgl = j.tanggal_sidang;
      if (!jadwalPerTanggalJam[tgl]) jadwalPerTanggalJam[tgl] = {};
      if (!jadwalPerTanggalJam[tgl][j.jam_sidang]) jadwalPerTanggalJam[tgl][j.jam_sidang] = new Set();
      [j.dosen_pembimbing, j.dosen_penguji, j.dosen_penguji2, j.dosen_penguji3, j.dosen_penguji4].forEach(dosen => {
        jadwalPerTanggalJam[tgl][j.jam_sidang].add(dosen);
      });
    }

    const finalSchedule = [];

    for (const item of schedule) {
      let assigned = false;
      let tanggalLoop = new Date(tanggalBatchSidang);

      while (!assigned) {
        const tanggalStr = tanggalLoop.toISOString().split("T")[0];
        if (!jadwalPerTanggalJam[tanggalStr]) jadwalPerTanggalJam[tanggalStr] = {};

        const shuffledRooms = [...rooms].sort(() => Math.random() - 0.5);

        for (const room of shuffledRooms) {
          for (let slot = 0; slot < room.kapasitas; slot++) {
            const jamSidang = `${8 + slot}:00`;
            if (!jadwalPerTanggalJam[tanggalStr][jamSidang]) {
              jadwalPerTanggalJam[tanggalStr][jamSidang] = new Set();
            }
            const dosenDipakai = jadwalPerTanggalJam[tanggalStr][jamSidang];
            const dosenBentrok = [item.pembimbing, ...item.penguji].some(dosen => dosenDipakai.has(dosen));

            if (!dosenBentrok) {
              item.penguji.forEach(p => dosenDipakai.add(p));
              finalSchedule.push({
                nim: item.nim,
                nama: item.nama,
                judul: item.judul,
                formulir: "Skripsi",
                dosen_pembimbing: item.pembimbing,
                dosen_penguji: item.penguji[0],
                dosen_penguji2: item.penguji[1],
                dosen_penguji3: item.penguji[2],
                dosen_penguji4: item.penguji[3],
                tanggal_sidang: tanggalStr,
                jam_sidang: jamSidang,
                ruangan: room.kode,
                timestamp: new Date().toISOString()
              });
              assigned = true;
              break;
            }
          }
          if (assigned) break;
        }
        if (!assigned) tanggalLoop.setDate(tanggalLoop.getDate() + 1);
      }
    }

    const batch = writeBatch(db);
    finalSchedule.forEach(item => {
      const newDocRef = doc(collection(db, "jadwal_sidang_skripsi"));
      batch.set(newDocRef, item);
    });
    await batch.commit();

    res.status(200).json({ message: `✅ Jadwal batch berhasil dibuat (mulai tanggal ${tanggalBatchSidang}).` });

  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

//INI sebenernya masih ada bug yaa ga sesuai tapi jangan dihapus dulu soalnya ini ada penerapan code tanggal LANJUTKAN HYBRID INTELLIGENT AI-LIKE
// import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
//     const dosenSnapshot = await getDocs(collection(db, "dosen"));
//     const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang"));

//     const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//     const dosen = dosenSnapshot.docs.map(doc => doc.data());
//     const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
//     const existingNIMs = existingJadwal.map(j => j.nim);

//     const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));
//     if (mahasiswaBaru.length < 10) {
//       return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru untuk generate batch." });
//     }
//     const mahasiswaBatch = mahasiswaBaru.slice(0, 10);

//     const totalExisting = existingJadwal.length;
//     const currentBatchIndex = Math.floor(totalExisting / 10);
//     const baseDate = new Date();
//     baseDate.setDate(baseDate.getDate() + 4 + (currentBatchIndex * 2));
//     let tanggalLoop = new Date(baseDate);

//     const rooms = [
//       { kode: "Lt 1 - Obeha", kapasitas: 4 },
//       { kode: "Lt 2 - 205", kapasitas: 3 },
//       { kode: "Lt 2 - 206", kapasitas: 3 }
//     ];

//     const finalSchedule = [];

//     for (const mhs of mahasiswaBatch) {
//       let assigned = false;

//       while (!assigned) {
//         const tanggalStr = tanggalLoop.toISOString().split("T")[0];
//         const jadwalPerJam = {};

//         // Baca semua existing jadwal di tanggal saat ini:
//         existingJadwal.filter(j => j.tanggal_sidang === tanggalStr).forEach(j => {
//           if (!jadwalPerJam[j.jam_sidang]) jadwalPerJam[j.jam_sidang] = new Set();
//           [j.dosen_pembimbing, j.dosen_penguji, j.dosen_penguji2, j.dosen_penguji3, j.dosen_penguji4].forEach(d => {
//             jadwalPerJam[j.jam_sidang].add(d);
//           });
//         });

//         let retries = 0;
//         const maxRetries = 20;

//         while (!assigned && retries < maxRetries) {
//           retries++;

//           const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//           const pengujiSet = new Set();
//           while (pengujiSet.size < 4) {
//             const calon = dosen[Math.floor(Math.random() * dosen.length)];
//             if (calon.nama !== pembimbing.nama) pengujiSet.add(calon.nama);
//           }
//           const [penguji1, penguji2, penguji3, penguji4] = [...pengujiSet];

//           const shuffledRooms = [...rooms].sort(() => Math.random() - 0.5);
//           for (const room of shuffledRooms) {
//             for (let slot = 0; slot < room.kapasitas; slot++) {
//               const jamSidang = `${8 + slot}:00`;
//               if (!jadwalPerJam[jamSidang]) jadwalPerJam[jamSidang] = new Set();

//               const dosenBentrok = [
//                 pembimbing.nama, penguji1, penguji2, penguji3, penguji4
//               ].some(d => jadwalPerJam[jamSidang].has(d));

//               if (!dosenBentrok) {
//                 // Assign jadwal
//                 jadwalPerJam[jamSidang].add(pembimbing.nama);
//                 [penguji1, penguji2, penguji3, penguji4].forEach(d => jadwalPerJam[jamSidang].add(d));

//                 finalSchedule.push({
//                   nim: mhs.nim,
//                   nama: mhs.nama,
//                   judul: mhs.judul,
//                   formulir: mhs.formulir,
//                   dosen_pembimbing: pembimbing.nama,
//                   dosen_penguji: penguji1,
//                   dosen_penguji2: penguji2,
//                   dosen_penguji3: penguji3,
//                   dosen_penguji4: penguji4,
//                   tanggal_sidang: tanggalStr,
//                   jam_sidang: jamSidang,
//                   ruangan: room.kode,
//                   timestamp: new Date().toISOString()
//                 });

//                 assigned = true;
//                 break;
//               }
//             }
//             if (assigned) break;
//           }
//         }

//         if (!assigned) {
//           // Kalau setelah 20x random tetap bentrok ➔ kita geser tanggal 1 hari
//           tanggalLoop.setDate(tanggalLoop.getDate() + 1);
//         }
//       }
//     }

//     const batch = writeBatch(db);
//     finalSchedule.forEach(item => {
//       const newDocRef = doc(collection(db, "jadwal_sidang"));
//       batch.set(newDocRef, item);
//     });
//     await batch.commit();

//     res.status(200).json({
//       message: `✅ Jadwal batch berhasil dibuat.`
//     });

//   } catch (error) {
//     console.error("🔥 ERROR HYBRID AI:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }



// import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
//     const dosenSnapshot = await getDocs(collection(db, "dosen"));
//     const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang"));

//     const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//     const dosen = dosenSnapshot.docs.map(doc => doc.data());
//     const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
//     const existingNIMs = existingJadwal.map(j => j.nim);
//     const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));

//     if (mahasiswaBaru.length < 10) {
//       return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru untuk generate batch." });
//     }

//     const mahasiswaBatch = mahasiswaBaru.slice(0, 10);

//     // ================= TANGGAL STARTING POINT =================
//     let tanggalSidang = new Date().toISOString().split("T")[0];
//     if (existingJadwal.length > 0) {
//       const sorted = existingJadwal.map(j => j.tanggal_sidang).sort();
//       tanggalSidang = sorted[sorted.length - 1]; // ambil tanggal terakhir
//     }

//     // ================= ROOM & KAPASITAS =================
//     const roomsTemplate = [
//       { kode: "Lt 1 - Obeha", kapasitas: 4 },
//       { kode: "Lt 2 - 205", kapasitas: 3 },
//       { kode: "Lt 2 - 206", kapasitas: 3 }
//     ];

//     const pengujiCount = {};
//     let jamAwal = 8;

//     const batch = writeBatch(db);

//     // Per mahasiswa:
//     for (const mhs of mahasiswaBatch) {
//       let assignedRoom = null;
//       let tanggalLoop = new Date(tanggalSidang);

//       while (!assignedRoom) {
//         // Hitung ruangan hari ini:
//         const jadwalHariIni = existingJadwal.filter(j => j.tanggal_sidang === tanggalLoop.toISOString().split("T")[0]);
//         const roomAvailability = roomsTemplate.map(room => {
//           const terisi = jadwalHariIni.filter(j => j.ruangan === room.kode).length;
//           return { ...room, terisi };
//         });

//         // Coba assign ke room yang masih ada slot:
//         for (const room of roomAvailability) {
//           if (room.terisi < room.kapasitas) {
//             assignedRoom = room.kode;
//             break;
//           }
//         }

//         // Kalau semua room penuh ➔ geser ke hari berikutnya
//         if (!assignedRoom) {
//           tanggalLoop.setDate(tanggalLoop.getDate() + 1);
//         }
//       }

//       // Pilih dosen penguji acak:
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       const pengujiDipilih = [];

//       while (pengujiDipilih.length < 4) {
//         const calon = dosen[Math.floor(Math.random() * dosen.length)];
//         const count = pengujiCount[calon.nama] || 0;

//         if (calon.nama !== pembimbing.nama && !pengujiDipilih.includes(calon.nama) && count < 3) {
//           pengujiDipilih.push(calon.nama);
//           pengujiCount[calon.nama] = count + 1;
//         }
//       }

//       // Simpan ke Firestore via batch
//       const newDocRef = doc(collection(db, "jadwal_sidang"));
//       batch.set(newDocRef, {
//         nim: mhs.nim,
//         nama: mhs.nama,
//         judul: mhs.judul,
//         formulir: mhs.formulir,
//         dosen_pembimbing: pembimbing.nama,
//         dosen_penguji: pengujiDipilih[0],
//         dosen_penguji2: pengujiDipilih[1],
//         dosen_penguji3: pengujiDipilih[2],
//         dosen_penguji4: pengujiDipilih[3],
//         tanggal_sidang: tanggalLoop.toISOString().split("T")[0],
//         jam_sidang: `${jamAwal++}:00`,
//         ruangan: assignedRoom,
//         timestamp: new Date().toISOString()
//       });
//     }

//     await batch.commit();
//     res.status(200).json({ message: `✅ Jadwal batch berhasil dibuat.` });
//   } catch (error) {
//     console.error("🔥 ERROR:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }




// import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     // 🔎 Ambil data awal
//     const mahasiswaSnapshot = await getDocs(collection(db, "usersSempro"));
//     const dosenSnapshot = await getDocs(collection(db, "dosen"));
//     const jadwalSnapshot = await getDocs(collection(db, "jadwal_sidang"));

//     const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//     const dosen = dosenSnapshot.docs.map(doc => doc.data());
//     const existingJadwal = jadwalSnapshot.docs.map(doc => doc.data());
//     const existingNIMs = existingJadwal.map(j => j.nim);
//     const mahasiswaBaru = mahasiswa.filter(mhs => !existingNIMs.includes(mhs.nim));

//     if (mahasiswaBaru.length < 10) {
//       return res.status(200).json({ message: "Belum cukup 10 mahasiswa baru untuk generate batch." });
//     }

//     const mahasiswaBatch = mahasiswaBaru.slice(0, 10);

//     // 🔎 Tentukan tanggal sidang berikutnya
//     const existingDates = existingJadwal.map(item => item.tanggal_sidang);
//     let nextTanggalSidang = new Date().toISOString().split("T")[0];
//     if (existingDates.length > 0) {
//       const sorted = existingDates.sort();
//       const lastDate = new Date(sorted[sorted.length - 1]);
//       lastDate.setDate(lastDate.getDate() + 1);
//       nextTanggalSidang = lastDate.toISOString().split("T")[0];
//     }

//     const rooms = [
//       { kode: "Lt 1 - Obeha", kapasitas: 4, terisi: 0 },
//       { kode: "Lt 2 - 205", kapasitas: 3, terisi: 0 },
//       { kode: "Lt 2 - 206", kapasitas: 3, terisi: 0 }
//     ];

//     const pengujiCount = {};
//     let jamAwal = 8;

//     // 🔧 Gunakan batch Firestore (atomic transaction)
//     const batch = writeBatch(db);

//     mahasiswaBatch.forEach((mhs) => {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       const pengujiDipilih = [];

//       while (pengujiDipilih.length < 4) {
//         const calon = dosen[Math.floor(Math.random() * dosen.length)];
//         const count = pengujiCount[calon.nama] || 0;

//         if (calon.nama !== pembimbing.nama && !pengujiDipilih.includes(calon.nama) && count < 3) {
//           pengujiDipilih.push(calon.nama);
//           pengujiCount[calon.nama] = count + 1;
//         }
//       }

//       let assignedRoom = null;
//       for (const room of rooms) {
//         if (room.terisi < room.kapasitas) {
//           assignedRoom = room.kode;
//           room.terisi += 1;
//           break;
//         }
//       }

//       if (!assignedRoom) throw new Error("Ruangan full.");

//       const newDocRef = doc(collection(db, "jadwal_sidang"));
//       batch.set(newDocRef, {
//         nim: mhs.nim,
//         nama: mhs.nama,
//         judul: mhs.judul,
//         formulir: mhs.formulir,
//         dosen_pembimbing: pembimbing.nama,
//         dosen_penguji: pengujiDipilih[0],
//         dosen_penguji2: pengujiDipilih[1],
//         dosen_penguji3: pengujiDipilih[2],
//         dosen_penguji4: pengujiDipilih[3],
//         tanggal_sidang: nextTanggalSidang,
//         jam_sidang: `${jamAwal++}:00`,
//         ruangan: assignedRoom,
//         timestamp: new Date().toISOString()
//       });
//     });

//     await batch.commit();

//     res.status(200).json({ message: `✅ Jadwal batch baru berhasil dibuat untuk tanggal ${nextTanggalSidang}` });

//   } catch (error) {
//     console.error("🔥 ERROR BACKEND:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }
