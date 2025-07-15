"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { auth, db } from "@/lib/firebase";
import styles from "./jadwalList.module.scss";
import Navbar from "../navbar/Navbar";

export default function JadwalSkripsiList() {
  const [jadwal, setJadwal] = useState([]);
  const [currentUserNim, setCurrentUserNim] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        const email = user?.email;

        // Ambil data jadwal
        const snap = await getDocs(collection(db, "jadwalFixSkripsi"));
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Coba deteksi NIM user dari data yang cocok (by email, jika memungkinkan)
        const match = data.find((item) => item.email === email);
        const nim = match?.nim || ""; // fallback kosong

        setCurrentUserNim(nim);
        setJadwal(data);
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil jadwal:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "nim", header: "NIM" },
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "judul", header: "Judul" },
      { accessorKey: "tanggal_sidang", header: "Tanggal" },
      { accessorKey: "jam_sidang", header: "Jam" },
      { accessorKey: "ruangan", header: "Ruangan" },
      { accessorKey: "dosen_pembimbing", header: "Pembimbing" },
      { accessorKey: "dosen_penguji1", header: "Penguji 1" },
      { accessorKey: "dosen_penguji2", header: "Penguji 2" },
      { accessorKey: "dosen_penguji3", header: "Penguji 3" },
      { accessorKey: "dosen_penguji4", header: "Penguji 4" },
    ],
    []
  );

  const table = useReactTable({
    data: jadwal,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Jadwal Sidang SKRIPSI</h1>
        {loading ? <p>Loading data...</p> : null}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                const isMine = row.original.nim === currentUserNim;
                return (
                  <tr
                    key={row.id}
                    className={isMine ? styles.highlightRow : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
