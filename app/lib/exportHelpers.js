
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Logo institusi (gunakan logo base64 asli jika perlu)
const logoBase64 = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAZlBMVEX///8AAAD09PT5+fn7+/v6+vr29vYfHx/8/PzT09NfX1/x8fHz8/O5ubmAgIDZ2dkYGBhKSkqXl5dfX1+GhoYLCwsZGRkjIyPExMShoaHk5OTMzMxhYWGmpqaQkJCeFVRtAAABAklEQVR4nO3a0Q3CMBAEQW+LEP//Nds2KWizHY+8JW+HX1gAh2GoAAAAAAAAAAAAAAAAAAD8Nm6++Pt5OcVdJrLTbxnfB67i88b2rXYJL2n0t3uSwnmY1O/NMJpm3K0CyzrGvSR6SW+Ylo2u19k8pPBK+99r0p5OH2x59Uoy9NyU/pW5enW/9fMkrrKPt4qcZd7dkAAAAAAAAAAAAAAAAAADwa/gJp9zGdKrMVIAAAAASUVORK5CYII=";


// Export to Excel
// export const exportToExcel = (grouped) => {
//   const wb = XLSX.utils.book_new();

//   Object.entries(grouped).forEach(([tanggal, rows]) => {
//     const wsData = [
//       ["No", "NIM", "Nama", "Judul", "Jam", "Pembimbing", "Penguji", "Zoom", "Tanda Tangan Pembimbing"],
//       ...rows.map((row, i) => [
//         i + 1,
//         row.nim,
//         row.nama,
//         row.judul,
//         row.jam,
//         row.pembimbing,
//         [row.penguji1, row.penguji2, row.penguji3].filter(Boolean).join(", "),
//         row.link_zoom || "-",
//         ""
//       ])
//     ];
//     const ws = XLSX.utils.aoa_to_sheet(wsData);
//     XLSX.utils.book_append_sheet(wb, ws, `Tanggal_${tanggal}`);
//   });

//   const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Jadwal_Sidang_Mewah.xlsx");
// };



export const exportToExcel = (grouped) => {
  const wb = XLSX.utils.book_new();

  Object.entries(grouped).forEach(([tanggal, rows]) => {
    const wsData = [
      ["No", "NIM", "Nama", "Judul", "Jam", "Pembimbing", "Penguji", "Zoom", "Tanda Tangan"],
      ...rows.map((row, i) => [
        i + 1,
        row.nim ?? "-",
        row.namaMahasiswa ?? "-",
        row.judul ?? "-",
        row.jam ?? "-",
        row.pembimbing ?? "-",
        [row.penguji1, row.penguji2, row.penguji3].filter(Boolean).join(", "),
        row.link_zoom ?? "-",
        ""
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, `Tanggal_${tanggal}`);
  });

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Jadwal_Sidang_Mewah.xlsx");
};

// Export to PDF
// export const exportToPDF = (grouped) => {
//   const doc = new jsPDF();

//   Object.entries(grouped).forEach(([tanggal, rows], index) => {
//     if (index > 0) doc.addPage();

//     doc.addImage(logoBase64, 'PNG', 90, 5, 30, 30);
//     doc.setFontSize(16);
//     doc.text("JADWAL SIDANG", 105, 40, { align: "center" });
//     doc.setFontSize(12);
//     doc.text(`Tanggal: ${tanggal}`, 105, 50, { align: "center" });

//     autoTable(doc, {
//       startY: 60,
//       head: [["No", "NIM", "Nama", "Judul", "Jam", "Pembimbing", "Penguji", "Zoom", "Tanda Tangan"]],
//       body: rows.map((row, i) => [
//         i + 1,
//         row.nim,
//         row.nama,
//         row.judul,
//         row.jam,
//         row.pembimbing,
//         [row.penguji1, row.penguji2, row.penguji3].filter(Boolean).join(", "),
//         row.link_zoom || "-",
//         ""
//       ]),
//       styles: { fontSize: 8, cellPadding: 2 },
//     });

//     doc.text("Bekasi, " + tanggal, 140, doc.lastAutoTable.finalY + 10);
//     doc.text("Pembimbing,", 140, doc.lastAutoTable.finalY + 20);
//     doc.text("__________________________", 140, doc.lastAutoTable.finalY + 50);
//   });

//   doc.save("Jadwal_Sidang_Mewah.pdf");
// };



export const exportToPDF = async (grouped) => {
  const doc = new jsPDF();

  for (const [tanggal, rows] of Object.entries(grouped)) {
    if (doc.getNumberOfPages() > 0) doc.addPage();

    const img = new Image();
    img.src = "https://i.imgur.com/3eTKJe2.png";
    await new Promise((resolve) => { img.onload = resolve; });

    doc.addImage(img, 'PNG', 90, 5, 30, 30);
    doc.setFontSize(16);
    doc.text("JADWAL SIDANG", 105, 40, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Tanggal: ${tanggal}`, 105, 50, { align: "center" });

    autoTable(doc, {
      startY: 60,
      head: [["No", "NIM", "Nama", "Judul", "Jam", "Pembimbing", "Penguji", "Zoom", "Tanda Tangan"]],
      body: rows.map((row, i) => [
        i + 1,
        row.nim ?? "-",
        row.namaMahasiswa ?? "-",
        row.judul ?? "-",
        row.jam ?? "-",
        row.pembimbing ?? "-",
        [row.penguji1, row.penguji2, row.penguji3].filter(Boolean).join(", "),
        row.link_zoom ?? "-",
        ""
      ]),
      styles: { fontSize: 8, cellPadding: 2 },
    });

    const y = doc.lastAutoTable.finalY + 10;
    doc.text("Bekasi, " + tanggal, 140, y);
    doc.text("Pembimbing,", 140, y + 10);
    doc.text("__________________________", 140, y + 30);
  }

  doc.save("Jadwal_Sidang_Mewah.pdf");
};




export const exportToWord = (grouped) => {
  const logoUrl = "https://i.imgur.com/3eTKJe2.png"; // ← URL LOGO FINAL

  const html = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office'
        xmlns:w='urn:schemas-microsoft-com:office:word'
        xmlns:v='urn:schemas-microsoft-com:vml'
        xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>Jadwal Sidang</title>
    <style>
      body {
        font-family: "Calibri", sans-serif;
        font-size: 12pt;
        margin: 40px;
      }
      .page-break {
        page-break-after: always;
      }
      h2 {
        text-align: center;
        color: #2F5496;
        margin-bottom: 5px;
      }
      .logo {
        text-align: center;
        margin-bottom: 10px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      th {
        background-color: #2F5496;
        color: white;
        padding: 8px;
        text-align: center;
        border: 1px solid #999;
      }
      td {
        padding: 8px;
        border: 1px solid #999;
        text-align: center;
        vertical-align: middle;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    </style>
    <xml>
      <o:shapelayout v:ext="edit">
        <o:idmap v:ext="edit" data="1"/>
      </o:shapelayout>
      <v:shapetype id="_x0000_t75" coordsize="21600,21600"
        o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe"
        filled="f" stroked="f">
        <v:stroke joinstyle="miter"/>
        <v:formulas>
          <v:f eqn="if lineDrawn pixelLineWidth 0"/>
          <v:f eqn="sum @0 1 0"/>
          <v:f eqn="sum 0 0 @1"/>
          <v:f eqn="prod @2 1 2"/>
          <v:f eqn="prod @3 21600 pixelWidth"/>
          <v:f eqn="prod @3 21600 pixelHeight"/>
          <v:f eqn="sum @0 0 1"/>
          <v:f eqn="prod @6 1 2"/>
          <v:f eqn="prod @7 21600 pixelWidth"/>
          <v:f eqn="sum @8 21600 0"/>
          <v:f eqn="prod @7 21600 pixelHeight"/>
          <v:f eqn="sum @10 21600 0"/>
        </v:formulas>
        <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
        <o:lock v:ext="edit" aspectratio="t"/>
      </v:shapetype>
    </xml>
  </head>
  <body>`;

  let content = "";

  Object.entries(grouped).forEach(([tanggal, rows], idx, arr) => {
    content += `
    <div class="section">
      <div class="logo">
        <v:shape id="Picture" o:spid="_x0000_i1025" type="#_x0000_t75"
          style='width:100pt;height:100pt' stroked="f" filled="t">
          <v:imagedata src="${logoUrl}" o:title="logo" />
        </v:shape>
      </div>
      <h2>JADWAL SIDANG MAHASISWA</h2>
      <p style="text-align:center; margin-bottom: 20px;"><strong>Tanggal:</strong> ${tanggal}</p>
      <table>
        <tr>
          <th>No</th>
          <th>NIM</th>
          <th>Nama</th>
          <th>Judul</th>
          <th>Jam</th>
          <th>Pembimbing</th>
          <th>Penguji</th>
          <th>Zoom</th>
          <th>Tanda Tangan Pembimbing</th>
        </tr>`;

    rows.forEach((item, i) => {
      content += `
        <tr>
          <td>${i + 1}</td>
          <td>${item.nim ?? "-"}</td>
          <td>${item.namaMahasiswa ?? "-"}</td>
          <td>${item.judul ?? "-"}</td>
          <td>${item.jam ?? "-"}</td>
          <td>${item.pembimbing ?? "-"}</td>
          <td>${[item.penguji1, item.penguji2, item.penguji3].filter(Boolean).join(", ") || "-"}</td>
          <td>${item.link_zoom ?? "-"}</td>
          <td style="height: 50px;"></td>
        </tr>`;
    });

    content += `</table></div>`;

    if (idx < arr.length - 1) content += `<div class="page-break"></div>`;
  });

  const fullHTML = html + content + `</body></html>`;
  const blob = new Blob(["﻿" + fullHTML], { type: "application/msword" });
  saveAs(blob, "Jadwal_Sidang_Mewah.doc");
};
