// import { db } from "@/lib/firebase";
// import { collection, addDoc } from "firebase/firestore";

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const mahasiswa = [
//     { nim: "2021230020", nama: "Muchamad Hifdi" },
//     { nim: "2021230050", nama: "Taufik Sugiarto" },
//     // dst...
//   ];

//   const dosen = [
//     { nama: "Pak Ian", nid: "0018097301" },
//     { nama: "Pak Adam", nid: "0413017903" },
//     // dst...
//   ];

//   let schedule = [];

//   mahasiswa.forEach((mhs, index) => {
//     const pembimbing = dosen[index % dosen.length];
//     const penguji = dosen[(index + 1) % dosen.length];

//     schedule.push({
//       nim: mhs.nim,
//       dosen_pembimbing: pembimbing.nama,
//       dosen_penguji: penguji.nama,
//       tanggal_sidang: `2025-05-${10 + index}`,
//       jam_sidang: `${8 + (index % 5)}:00`
//     });
//   });

//   for (const jadwal of schedule) {
//     await addDoc(collection(db, "jadwal_sidang"), jadwal);
//   }

//   res.status(200).json({ message: "Jadwal berhasil dibuat", schedule });
// }



//NOTED ALGORITMA GENETIKA hanya pakai modulo indexing, hasilnya statis dan tidak memperhatikan kombinasi optimal.
// import { db } from "@/lib/firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const mahasiswaSnapshot = await getDocs(collection(db, "mahasiswa"));
//   const dosenSnapshot = await getDocs(collection(db, "dosen"));

//   const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//   const dosen = dosenSnapshot.docs.map(doc => doc.data());

//   let schedule = mahasiswa.map((mhs, index) => {
//     const pembimbing = dosen[index % dosen.length];
//     const penguji = dosen[(index + 1) % dosen.length];

//     return {
//       nim: mhs.nim,
//       dosen_pembimbing: pembimbing.nama,
//       dosen_penguji: penguji.nama,
//       tanggal_sidang: `2025-05-${10 + (index % 20)}`,
//       jam_sidang: `${8 + (index % 5)}:00`
//     };
//   });

//   for (const jadwal of schedule) {
//     await addDoc(collection(db, "jadwal_sidang"), jadwal);
//   }

//   res.status(200).json({ message: "Jadwal berhasil dibuat", schedule });
// }




// // pages/api/generate-schedule.js NOTED ALGORITMA GENETIKA memperhitungkan keragaman dosen, uniknya pasangan, dan kesesuaian penguji–pembimbing untuk menghindari bentrok atau repetisi.
// import { db } from "@/lib/firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";

// const fitness = (schedule) => {
//   const seen = new Set();
//   let score = 0;
//   schedule.forEach(({ dosen_pembimbing, dosen_penguji }) => {
//     if (dosen_pembimbing !== dosen_penguji) score += 1;
//     const key = `${dosen_pembimbing}-${dosen_penguji}`;
//     if (!seen.has(key)) {
//       score += 1;
//       seen.add(key);
//     }
//   });
//   return score;
// };

// const generateInitialPopulation = (mahasiswa, dosen, size = 10) => {
//   const population = [];
//   for (let i = 0; i < size; i++) {
//     const individual = mahasiswa.map((mhs, index) => {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       let penguji;
//       do {
//         penguji = dosen[Math.floor(Math.random() * dosen.length)];
//       } while (penguji === pembimbing);
//       return {
//         nim: mhs.nim,
//         dosen_pembimbing: pembimbing.nama,
//         dosen_penguji: penguji.nama,
//         tanggal_sidang: `2025-05-${10 + (index % 20)}`,
//         jam_sidang: `${8 + (index % 5)}:00`
//       };
//     });
//     population.push(individual);
//   }
//   return population;
// };

// const crossover = (parent1, parent2) => {
//   const midpoint = Math.floor(parent1.length / 2);
//   return [...parent1.slice(0, midpoint), ...parent2.slice(midpoint)];
// };

// const mutate = (individual, dosen, mutationRate = 0.1) => {
//   return individual.map((item) => {
//     if (Math.random() < mutationRate) {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       let penguji;
//       do {
//         penguji = dosen[Math.floor(Math.random() * dosen.length)];
//       } while (penguji === pembimbing);
//       return { ...item, dosen_pembimbing: pembimbing.nama, dosen_penguji: penguji.nama };
//     }
//     return item;
//   });
// };

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const mahasiswaSnapshot = await getDocs(collection(db, "mahasiswa"));
//   const dosenSnapshot = await getDocs(collection(db, "dosen"));

//   const mahasiswa = mahasiswaSnapshot.docs.map(doc => doc.data());
//   const dosen = dosenSnapshot.docs.map(doc => doc.data());

//   let population = generateInitialPopulation(mahasiswa, dosen);

//   for (let generation = 0; generation < 50; generation++) {
//     population.sort((a, b) => fitness(b) - fitness(a));
//     const [parent1, parent2] = [population[0], population[1]];
//     const child = mutate(crossover(parent1, parent2), dosen);
//     population[population.length - 1] = child;
//   }

//   const bestSchedule = population.sort((a, b) => fitness(b) - fitness(a))[0];

//   for (const jadwal of bestSchedule) {
//     await addDoc(collection(db, "jadwal_sidang"), jadwal);
//   }

//   res.status(200).json({ message: "Jadwal berhasil dibuat (Genetic Algorithm)", schedule: bestSchedule });
// }


//✅ Sekarang mendukung: generations: jumlah generasi GA, populationSize: ukuran populasi awal, mutationRate: rasio mutasi (misal: 0.1), tanggalSidang: fix tanggal awal (misal: 2025-05-12)
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const fitness = (schedule) => {
  const seen = new Set();
  let score = 0;
  schedule.forEach(({ dosen_pembimbing, dosen_penguji }) => {
    if (dosen_pembimbing !== dosen_penguji) score += 1;
    const key = `${dosen_pembimbing}-${dosen_penguji}`;
    if (!seen.has(key)) {
      score += 1;
      seen.add(key);
    }
  });
  return score;
};

// const generateInitialPopulation = (mahasiswa, dosen, size, tanggalBase) => {
//   const population = [];
//   for (let i = 0; i < size; i++) {
//     const individual = mahasiswa.map((mhs, index) => {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       let penguji;
//       do {
//         penguji = dosen[Math.floor(Math.random() * dosen.length)];
//       } while (penguji === pembimbing);

//       const tanggal = new Date(tanggalBase);
//       tanggal.setDate(tanggal.getDate() + (index % 20));
//       const tanggalFormatted = tanggal.toISOString().split("T")[0];

//       return {
//         nim: mhs.nim,
//         dosen_pembimbing: pembimbing.nama,
//         dosen_penguji: penguji.nama,
//         tanggal_sidang: tanggalFormatted,
//         jam_sidang: `${8 + (index % 5)}:00`,
//       };
//     });
//     population.push(individual);
//   }
//   return population;
// };


const generateInitialPopulation = (mahasiswa, dosen, size, tanggalBase) => {
  const population = [];
  for (let i = 0; i < size; i++) {
    const individual = mahasiswa.map((mhs, index) => {
      const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
      const pengujiSet = new Set();

      // Tambahkan 4 dosen penguji yang berbeda dari pembimbing dan satu sama lain
      while (pengujiSet.size < 4) {
        const calon = dosen[Math.floor(Math.random() * dosen.length)];
        if (calon.nama !== pembimbing.nama) pengujiSet.add(calon.nama);
      }

      const [penguji1, penguji2, penguji3, penguji4] = [...pengujiSet];

      const tanggal = new Date(tanggalBase);
      tanggal.setDate(tanggal.getDate() + (index % 20));
      const tanggalFormatted = tanggal.toISOString().split("T")[0];

      return {
        nim: mhs.nim,
        dosen_pembimbing: pembimbing.nama,
        dosen_penguji: penguji1,
        dosen_penguji2: penguji2,
        dosen_penguji3: penguji3,
        dosen_penguji4: penguji4,
        tanggal_sidang: tanggalFormatted,
        jam_sidang: `${8 + (index % 5)}:00`,
      };
    });
    population.push(individual);
  }
  return population;
};


const crossover = (parent1, parent2) => {
  const midpoint = Math.floor(parent1.length / 2);
  return [...parent1.slice(0, midpoint), ...parent2.slice(midpoint)];
};

// const mutate = (individual, dosen, mutationRate) => {
//   return individual.map((item) => {
//     if (Math.random() < mutationRate) {
//       const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
//       let penguji;
//       do {
//         penguji = dosen[Math.floor(Math.random() * dosen.length)];
//       } while (penguji === pembimbing);
//       return {
//         ...item,
//         dosen_pembimbing: pembimbing.nama,
//         dosen_penguji: penguji.nama,
//       };
//     }
//     return item;
//   });
// };

const mutate = (individual, dosen, mutationRate) => {
  return individual.map((item) => {
    if (Math.random() < mutationRate) {
      const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
      const pengujiSet = new Set();

      while (pengujiSet.size < 4) {
        const calon = dosen[Math.floor(Math.random() * dosen.length)];
        if (calon.nama !== pembimbing.nama) pengujiSet.add(calon.nama);
      }

      const [penguji1, penguji2, penguji3, penguji4] = [...pengujiSet];

      return {
        ...item,
        dosen_pembimbing: pembimbing.nama,
        dosen_penguji: penguji1,
        dosen_penguji2: penguji2,
        dosen_penguji3: penguji3,
        dosen_penguji4: penguji4,
      };
    }
    return item;
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Ambil parameter dari UI
  const {
    generations = 50,
    populationSize = 10,
    mutationRate = 0.1,
    tanggalSidang = "2025-05-10",
  } = req.body || {};

  const mahasiswaSnapshot = await getDocs(collection(db, "mahasiswa"));
  const dosenSnapshot = await getDocs(collection(db, "dosen"));

  const mahasiswa = mahasiswaSnapshot.docs.map((doc) => doc.data());
  const dosen = dosenSnapshot.docs.map((doc) => doc.data());

  let population = generateInitialPopulation(mahasiswa, dosen, populationSize, tanggalSidang);

  for (let generation = 0; generation < generations; generation++) {
    population.sort((a, b) => fitness(b) - fitness(a));
    const [parent1, parent2] = [population[0], population[1]];
    const child = mutate(crossover(parent1, parent2), dosen, mutationRate);
    population[population.length - 1] = child;
  }

  const bestSchedule = population.sort((a, b) => fitness(b) - fitness(a))[0];

  for (const jadwal of bestSchedule) {
    await addDoc(collection(db, "jadwal_sidang"), jadwal);
  }

  res.status(200).json({
    message: "Jadwal berhasil dibuat (Genetic Algorithm dengan parameter UI)",
    schedule: bestSchedule,
  });
}
