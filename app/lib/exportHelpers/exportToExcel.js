
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (grouped) => {
  const wb = XLSX.utils.book_new();

  Object.entries(grouped).forEach(([tanggal, rows]) => {
    const wsData = [
      ["No", "NIM", "Nama", "Judul", "Jam", "Pembimbing", "Penguji", "Zoom"],
      ...rows.map((row, i) => [
        i + 1,
        row.nim,
        row.nama,
        row.judul,
        row.jam,
        row.pembimbing,
        [row.penguji1, row.penguji2, row.penguji3].filter(Boolean).join(", "),
        row.link_zoom || "-"
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, `Tanggal_${tanggal}`);
  });

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Jadwal_Sidang_Mewah.xlsx");
};
