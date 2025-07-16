"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import Navbar from "../navbar/Navbar";
import styles from "./userList.module.scss";
import NavbarPenguji from "../navbarpenguji/page";

export default function MahasiswaList() {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [error, setError] = useState(null);
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
  const fetchDataForPenguji = async (email) => {
    try {
      // Cari nama penguji berdasarkan email
      const pengujiSnap = await getDocs(collection(db, "penguji"));
      const matched = pengujiSnap.docs.find((doc) => doc.data().email === email);
      const pengujiName = matched?.data()?.nama || "Tanpa Nama";
      setCurrentName(pengujiName);

      // Ambil jadwal sidang yang cocok
      const semproSnap = await getDocs(collection(db, "jadwal_sidang_sempro"));
      const filtered = semproSnap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) =>
          [item.penguji1, item.penguji2, item.penguji3]
            .map((p) => p?.toLowerCase())
            .includes(pengujiName.toLowerCase())
        );

      setData(filtered);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setError("Terjadi kesalahan saat memuat data.");
    }
  };

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchDataForPenguji(user.email);
    }
  });

  return () => unsubscribe();
}, []);


  const handleLulus = (id) => {
    alert(`Mahasiswa dengan ID ${id} dinyatakan Lulus`);
    // Tambahkan logika update status ke Firestore jika dibutuhkan
  };

  const columns = useMemo(
    () => [
      { accessorKey: "namaMahasiswa", header: "Nama Mahasiswa" },
      { accessorKey: "mahasiswaId", header: "NIM" },
      { accessorKey: "pembimbing", header: "Pembimbing" },
      { accessorKey: "penguji1", header: "Penguji 1" },
      { accessorKey: "penguji2", header: "Penguji 2" },
      { accessorKey: "penguji3", header: "Penguji 3" },
      { accessorKey: "tanggal", header: "Tanggal" },
      { accessorKey: "jam", header: "Jam" },
      { accessorKey: "ruangan", header: "Ruangan" },
      {
        header: "Aksi",
        cell: ({ row }) => (
          <button
            className={styles.lulusButton}
            onClick={() => handleLulus(row.original.id)}
          >
            ✅ Lulus
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className={styles.pageWrapper}>
      <NavbarPenguji />
      <div className={styles.container}>
        <h1 className={styles.title}>List Sidang Sempro - Penguji: {currentName}</h1>
        {error && <p className={styles.error}>{error}</p>}

        <input
          className={styles.searchInput}
          type="text"
          placeholder="🔍 Cari mahasiswa..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ⬅ Prev
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next ➡
          </button>
        </div>
      </div>
    </section>
  );
}
