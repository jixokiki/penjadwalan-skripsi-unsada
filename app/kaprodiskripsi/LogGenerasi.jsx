"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./LogGenerasi.module.scss";

export default function LogGenerasi({ logGenerasi, processSteps, chartData }) {
  const [activeTab, setActiveTab] = useState("log");
  const [showCrossover, setShowCrossover] = useState(true);
  const [showMutasi, setShowMutasi] = useState(true);

  const maxFitness = Math.max(...chartData.map((d) => d.fitness));

  const filteredLog = logGenerasi.filter((log) => {
    if (log.includes("Crossover") && !showCrossover) return false;
    if (log.includes("Mutasi") && !showMutasi) return false;
    return true;
  });

  const exportLogToTxt = (logData) => {
    const blob = new Blob([logData.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "log_generasi.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {logGenerasi.length > 0 && (
        <motion.div
          className={styles.logBox}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.header}>
            <h3>🧠 Proses Genetic Algorithm</h3>
            <div className={styles.badge}>🔥 Fitness Terbaik: {maxFitness}</div>
          </div>

          <div className={styles.tabs}>
            <button
              className={activeTab === "log" ? styles.active : ""}
              onClick={() => setActiveTab("log")}
            >
              Log
            </button>
            <button
              className={activeTab === "detail" ? styles.active : ""}
              onClick={() => setActiveTab("detail")}
            >
              Detail
            </button>
            <button
              className={activeTab === "chart" ? styles.active : ""}
              onClick={() => setActiveTab("chart")}
            >
              Grafik
            </button>
          </div>

          {activeTab === "log" && (
            <div className={styles.section}>
              <div className={styles.exportButtonWrap}>
                <button
                  className={styles.exportButton}
                  onClick={() => exportLogToTxt(filteredLog)}
                >
                  📁 Export Log
                </button>
              </div>

              <div className={styles.filterBox}>
                <label>
                  <input
                    type="checkbox"
                    checked={showCrossover}
                    onChange={() => setShowCrossover(!showCrossover)}
                  />
                  Crossover
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showMutasi}
                    onChange={() => setShowMutasi(!showMutasi)}
                  />
                  Mutasi
                </label>
              </div>

              <ul className={styles.scrollArea}>
                {filteredLog.map((log, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {log}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "detail" && (
            <div className={styles.section}>
              <ul className={styles.scrollArea}>
                {processSteps.map((step, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {step}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "chart" && (
            <div className={styles.section}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="fitness"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="generasi" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
