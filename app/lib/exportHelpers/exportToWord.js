
import { saveAs } from "file-saver";

export const exportToWord = (grouped) => {
  let html = "";

  Object.entries(grouped).forEach(([tanggal, rows], index) => {
    html += `
      <div style='page-break-after: always; font-family: Arial;'>
        <h2 style='text-align: center;'>JADWAL SIDANG</h2>
        <h3 style='text-align: center;'>Tanggal: ${tanggal}</h3>
        <table border='1' cellspacing='0' cellpadding='5' style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
          <thead>
            <tr>
              <th>No</th><th>NIM</th><th>Nama</th><th>Judul</th><th>Jam</th><th>Pembimbing</th><th>Penguji</th><th>Zoom</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${row.nim}</td>
                <td>${row.nama}</td>
                <td>${row.judul}</td>
                <td>${row.jam}</td>
                <td>${row.pembimbing}</td>
                <td>${[row.penguji1, row.penguji2, row.penguji3].filter(Boolean).join(", ")}</td>
                <td>${row.link_zoom || "-"}</td>
              </tr>`).join("")}
          </tbody>
        </table>
        <br><br>
        <div style='text-align: right;'>
          <p>Bekasi, ${tanggal}</p>
          <p>Pembimbing,</p>
          <br><br><br>
          <p style='margin-top: 50px;'>__________________________</p>
        </div>
      </div>
    `;
  });

  const blob = new Blob(["\ufeff" + html], { type: "application/msword" });
  saveAs(blob, "Jadwal_Sidang_Mewah.doc");
};
