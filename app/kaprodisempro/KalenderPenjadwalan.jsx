// // // KalenderPenjadwalan.jsx
// // import { useState } from "react";
// // import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// // import { format, parse, startOfWeek, getDay } from "date-fns";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import id from "date-fns/locale/id"; // Lokal Indonesia

// // const locales = {
// //   id: id,
// // };

// // const localizer = dateFnsLocalizer({
// //   format,
// //   parse,
// //   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
// //   getDay,
// //   locales,
// // });

// // export default function KalenderPenjadwalan({ jadwalFix, setJadwalFix }) {
// //   const [selectedDate, setSelectedDate] = useState(null);
// //   const [step, setStep] = useState(1);
// //   const [startTime, setStartTime] = useState("08:00");
// //   const [endTime, setEndTime] = useState("16:00");
// //   const [durasiHari, setDurasiHari] = useState(1);
// //   const [selectedIds, setSelectedIds] = useState([]);

// //   const toggleMahasiswaSelection = (id) => {
// //     setSelectedIds((prev) =>
// //       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
// //     );
// //   };

// //   const handleSelectSlot = ({ start }) => {
// //     setSelectedDate(start);
// //     setStep(1);
// //   };

// //   const handleTerapkan = () => {
// //     const jamMulai = parseInt(startTime.split(":" )[0]);
// //     const jamSelesai = parseInt(endTime.split(":" )[0]);
// //     const slotPerHari = jamSelesai - jamMulai;

// //     const updated = [...jadwalFix];
// //     selectedIds.forEach((id, idx) => {
// //       const hariKe = Math.floor(idx / slotPerHari);
// //       const jamKe = idx % slotPerHari;
// //       const tanggal = new Date(selectedDate);
// //       tanggal.setDate(tanggal.getDate() + hariKe);
// //       const jam = `${jamMulai + jamKe}:00`;
// //       const index = updated.findIndex((item) => item.id === id);
// //       if (index !== -1) {
// //         updated[index].tanggal_sidang = tanggal.toISOString().split("T")[0];
// //         updated[index].jam_sidang = jam;
// //       }
// //     });

// //     setJadwalFix(updated);
// //     setSelectedDate(null);
// //     setSelectedIds([]);
// //   };

// //   const events = jadwalFix.map((item) => ({
// //     title: `${item.nama} - ${item.judul}`,
// //     start: new Date(`${item.tanggal_sidang}T${item.jam_sidang}`),
// //     end: new Date(`${item.tanggal_sidang}T${item.jam_sidang}`),
// //   }));

// //   return (
// //     <div style={{ height: 600, position: "relative" }}>
// //       <Calendar
// //         localizer={localizer}
// //         events={events}
// //         startAccessor="start"
// //         endAccessor="end"
// //         selectable
// //         onSelectSlot={handleSelectSlot}
// //         views={["month"]}
// //         popup
// //         style={{ height: 500 }}
// //       />

// //       {selectedDate && (
// //         <div className="modal">
// //           {step === 1 && (
// //             <>
// //               <h3>Pilih Jam Sidang</h3>
// //               <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
// //               <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
// //               <button onClick={() => setStep(2)}>Next</button>
// //             </>
// //           )}

// //           {step === 2 && (
// //             <>
// //               <h3>Pilih Mahasiswa</h3>
// //               <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
// //                 {jadwalFix.map((item) => (
// //                   <div key={item.id}>
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedIds.includes(item.id)}
// //                       onChange={() => toggleMahasiswaSelection(item.id)}
// //                     />
// //                     <span>{item.nama} - {item.nim}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //               <button onClick={() => setStep(3)}>Next</button>
// //             </>
// //           )}

// //           {step === 3 && (
// //             <>
// //               <h3>Target Hari Selesai:</h3>
// //               <input
// //                 type="number"
// //                 value={durasiHari}
// //                 onChange={(e) => setDurasiHari(Number(e.target.value))}
// //               />
// //               <button onClick={handleTerapkan}>Terapkan Jadwal</button>
// //             </>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// // KalenderPenjadwalanFull.jsx
// import React, { useState, useRef, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// import '@fullcalendar/common/main.css';        // Wajib untuk styling dasar
// import '@fullcalendar/daygrid/main.css';       // Untuk tampilan day grid
// import '@fullcalendar/timegrid/main.css';      // Jika pakai time-based



// export default function KalenderPenjadwalanFull({ jadwalFix = [], setJadwalFix }) {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [step, setStep] = useState(1);
//   const [startTime, setStartTime] = useState("08:00");
//   const [endTime, setEndTime] = useState("16:00");
//   const [durasiHari, setDurasiHari] = useState(1);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [panelPosition, setPanelPosition] = useState({ top: 0, left: 0 });
//   const panelRef = useRef(null);
//   const [lastClickPos, setLastClickPos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateMousePosition = (e) => {
//       setLastClickPos({ x: e.clientX + window.scrollX, y: e.clientY + window.scrollY });
//     };
//     window.addEventListener("click", updateMousePosition);
//     return () => window.removeEventListener("click", updateMousePosition);
//   }, []);

//   const toggleMahasiswaSelection = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const handleDateClick = (arg) => {
//     setSelectedDate(arg.date);
//     setStep(1);
//     setPanelPosition({ top: lastClickPos.y, left: lastClickPos.x });
//   };

//   const handleTerapkan = () => {
//     const jamMulai = parseInt(startTime.split(":" )[0]);
//     const jamSelesai = parseInt(endTime.split(":" )[0]);
//     const slotPerHari = jamSelesai - jamMulai;
//     const maxSlot = durasiHari * slotPerHari;

//     const updated = [...jadwalFix];
//     selectedIds.slice(0, maxSlot).forEach((id, idx) => {
//       const hariKe = Math.floor(idx / slotPerHari);
//       const jamKe = idx % slotPerHari;
//       const tanggal = new Date(selectedDate);
//       tanggal.setDate(tanggal.getDate() + hariKe);
//       const jam = `${jamMulai + jamKe}:00`;
//       const index = updated.findIndex((item) => item.id === id);
//       if (index !== -1) {
//         updated[index].tanggal_sidang = tanggal.toISOString().split("T")[0];
//         updated[index].jam_sidang = jam;
//       }
//     });

//     setJadwalFix(updated);
//     setSelectedDate(null);
//     setSelectedIds([]);
//     setStep(1);
//   };

//   useEffect(() => {
//     const handler = (e) => {
//       if (panelRef.current && !panelRef.current.contains(e.target)) {
//         setSelectedDate(null);
//         setSelectedIds([]);
//         setStep(1);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const events = jadwalFix.map((item) => ({
//     title: `${item.nama}`,
//     date: item.tanggal_sidang,
//   }));

//   return (
//     <div style={{ position: "relative" }}>
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         dateClick={handleDateClick}
//         events={events}
//         height="auto"
//       />

//       {selectedDate && (
//         <div
//           ref={panelRef}
//           className="calendar-panel"
//           style={{
//             position: "absolute",
//             top: panelPosition.top,
//             left: panelPosition.left,
//             background: "#fff",
//             padding: "1rem",
//             borderRadius: "10px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             width: "320px",
//             zIndex: 9999,
//             transition: "opacity 0.3s ease",
//           }}
//         >
//           {step === 1 && (
//             <>
//               <h4>⏰ Pilih Jam Sidang</h4>
//               <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
//               <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
//               <button onClick={() => setStep(2)} style={{ marginTop: 10 }}>Next</button>
//             </>
//           )}
//           {step === 2 && (
//             <>
//               <h4>👩‍🎓 Pilih Mahasiswa</h4>
//               <div style={{ maxHeight: 100, overflowY: "scroll", border: "1px solid #ccc", padding: "5px" }}>
//                 {jadwalFix.map((item) => (
//                   <div key={item.id}>
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.includes(item.id)}
//                       onChange={() => toggleMahasiswaSelection(item.id)}
//                     />
//                     <span>{item.nama}</span>
//                   </div>
//                 ))}
//               </div>
//               <button onClick={() => setStep(3)} style={{ marginTop: 10 }}>Next</button>
//             </>
//           )}
//           {step === 3 && (
//             <>
//               <h4>📆 Durasi Sidang (Hari)</h4>
//               <input
//                 type="number"
//                 value={durasiHari}
//                 onChange={(e) => setDurasiHari(Number(e.target.value))}
//               />
//               <button onClick={handleTerapkan} style={{ marginTop: 10 }}>Terapkan Jadwal</button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
