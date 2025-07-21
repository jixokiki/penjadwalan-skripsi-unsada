
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (grouped) => {
  const doc = new jsPDF();

  Object.entries(grouped).forEach(([tanggal, rows], index) => {
    if (index > 0) doc.addPage();

    doc.setFontSize(16);
    doc.text("JADWAL SIDANG", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Tanggal: ${tanggal}`, 105, 25, { align: "center" });

    autoTable(doc, {
      startY: 35,
      head: [["No", "NIM", "Nama", "Judul", "Jam", "Pembimbing", "Penguji", "Zoom"]],
      body: rows.map((row, i) => [
        i + 1,
        row.nim,
        row.nama,
        row.judul,
        row.jam,
        row.pembimbing,
        [row.penguji1, row.penguji2, row.penguji3].filter(Boolean).join(", "),
        row.link_zoom || "-"
      ]),
      styles: { fontSize: 8, cellPadding: 2 },
    });

    doc.text("Bekasi, " + tanggal, 140, doc.lastAutoTable.finalY + 10);
    doc.text("Pembimbing,", 140, doc.lastAutoTable.finalY + 20);
    doc.text("__________________________", 140, doc.lastAutoTable.finalY + 50);
  });

  doc.save("Jadwal_Sidang_Mewah.pdf");
};
