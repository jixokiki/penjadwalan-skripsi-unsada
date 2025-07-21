// pages/api/export-word.js
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType } from "docx";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const grouped = req.body.grouped || {};

  const doc = new Document();

  Object.entries(grouped).forEach(([key, rows]) => {
    const tableRows = [
      new TableRow({
        children: ["Nama", "Jam", "Pembimbing", "Penguji1", "Penguji2", "Penguji3"].map(h =>
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })],
          })
        )
      }),
      ...rows.map(r =>
        new TableRow({
          children: [
            r.namaMahasiswa,
            r.jam,
            r.pembimbing,
            r.penguji1,
            r.penguji2,
            r.penguji3 || "-",
          ].map(text =>
            new TableCell({
              children: [new Paragraph({ children: [new TextRun(text)] })],
            })
          ),
        })
      )
    ];

    doc.addSection({
      children: [
        new Paragraph({
          children: [new TextRun({ text: `Jadwal Sidang - ${key}`, bold: true, size: 28 })],
          spacing: { after: 200 },
        }),
        new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } }),
        new Paragraph(" "),
      ],
    });
  });

  const buffer = await Packer.toBuffer(doc);

  res.setHeader("Content-Disposition", "attachment; filename=Jadwal_Sidang.docx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  res.send(buffer);
}
