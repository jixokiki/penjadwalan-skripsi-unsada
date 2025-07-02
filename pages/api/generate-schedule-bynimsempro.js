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

const generateInitialPopulation = (mahasiswa, dosen, size, tanggalBase, formulir) => {
  const population = [];
  for (let i = 0; i < size; i++) {
    const individual = mahasiswa.map((mhs, index) => {
      const pembimbing = dosen[Math.floor(Math.random() * dosen.length)];
      const pengujiSet = new Set();

      while (pengujiSet.size < 4) {
        const calon = dosen[Math.floor(Math.random() * dosen.length)];
        if (calon.nama !== pembimbing.nama) pengujiSet.add(calon.nama);
      }

      const [penguji1, penguji2, penguji3, penguji4] = [...pengujiSet];

    //   const tanggal = new Date(tanggalBase);
    //   tanggal.setDate(tanggal.getDate() + (index % 20));
    //   const tanggalFormatted = tanggal.toISOString().split("T")[0];

    //   return {
    //     nim: mhs.nim,
    //     dosen_pembimbing: pembimbing.nama,
    //     dosen_penguji: penguji1,
    //     dosen_penguji2: penguji2,
    //     dosen_penguji3: penguji3,
    //     dosen_penguji4: penguji4,
    //     tanggal_sidang: tanggalFormatted,
    //     jam_sidang: `${8 + (index % 5)}:00`,
    //   };
    const tanggalOffset = Math.floor(Math.random() * 10); // misal: 0–9 hari dari tanggal base
const jamSidang = 8 + Math.floor(Math.random() * 10); // 8–12 siang

const tanggal = new Date(tanggalBase);
tanggal.setDate(tanggal.getDate() + tanggalOffset);
const tanggalFormatted = tanggal.toISOString().split("T")[0];

return {
  nim: mhs.nim,
  formulir: formulir || mhs.formulir,
  dosen_pembimbing: pembimbing.nama,
  dosen_penguji: penguji1,
  dosen_penguji2: penguji2,
  dosen_penguji3: penguji3,
  dosen_penguji4: penguji4,
  tanggal_sidang: tanggalFormatted,
  jam_sidang: `${jamSidang}:00`,
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

  const {
    generations = 50,
    populationSize = 10,
    mutationRate = 0.1,
    tanggalSidang = new Date().toISOString().split("T")[0],
    targetNIM = null,
    formulir = null,
  } = req.body || {};

  const mahasiswaSnapshot = await getDocs(collection(db, "mahasiswa"));
  const dosenSnapshot = await getDocs(collection(db, "dosen"));

  let mahasiswa = mahasiswaSnapshot.docs.map((doc) => doc.data());
  const dosen = dosenSnapshot.docs.map((doc) => doc.data());

  if (targetNIM) {
    mahasiswa = mahasiswa.filter((mhs) => mhs.nim === targetNIM);
  }

  if (mahasiswa.length === 0) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan." });
  }

  let population = generateInitialPopulation(mahasiswa, dosen, populationSize, tanggalSidang, formulir);

  for (let generation = 0; generation < generations; generation++) {
    population.sort((a, b) => fitness(b) - fitness(a));
    const [parent1, parent2] = [population[0], population[1]];
    const child = mutate(crossover(parent1, parent2), dosen, mutationRate);
    population[population.length - 1] = child;
  }

  const bestSchedule = population.sort((a, b) => fitness(b) - fitness(a))[0][0]; // hanya ambil 1 jadwal

  await addDoc(collection(db, "jadwal_sidang"), bestSchedule);

  res.status(200).json({
    message: `✅ Jadwal berhasil dibuat untuk NIM ${targetNIM}`,
    schedule: bestSchedule,
  });
}
