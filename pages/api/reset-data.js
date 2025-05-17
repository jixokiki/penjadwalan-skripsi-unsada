import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const snapshot = await getDocs(collection(db, "jadwal_sidang"));
  snapshot.forEach(async (d) => {
    await deleteDoc(doc(db, "jadwal_sidang", d.id));
  });

  res.status(200).json({ message: "Semua jadwal dihapus." });
}
