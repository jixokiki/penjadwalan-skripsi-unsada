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
import Navbar from "../navbar/Navbar";
import styles from "./userList.module.scss";
import { db } from "@/lib/firebase";
import NavbarPenguji from "../navbarpenguji/page";

export default function PengujiList() {
  const [penguji, setPenguji] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPenguji = async () => {
      try {
        const snap = await getDocs(collection(db, "penguji"));
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPenguji(data);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setError("Terjadi kesalahan saat memuat data.");
      }
    };

    fetchPenguji();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "nidn", header: "NIDN" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "jurusan", header: "Jurusan" },
      { accessorKey: "jabatan", header: "Jabatan" },
    ],
    []
  );

  const table = useReactTable({
    data: penguji,
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
        <h1 className={styles.title}>List Penguji</h1>
        {error && <p className={styles.error}>{error}</p>}

        <input
          className={styles.searchInput}
          type="text"
          placeholder="🔍 Cari penguji..."
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
