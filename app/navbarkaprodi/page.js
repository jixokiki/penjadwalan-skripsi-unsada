// Navbar.js
"use client";
import { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { useRouter } from 'next/navigation'; // Import useRouter
import styles from "./navbarkaprodi.module.scss"; // Create this CSS file for styling
// import DosenListKaprodi from "../kaprodilist/page";

import { auth, db } from "@/lib/firebase";



import jsPDF from "jspdf";

export default function NavbarKaprodi({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Create router instance

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Logout failed: ", error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/kaprodi">Kaprodi</Link> {/* Dashboard link */}
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {/* Hamburger Icon */}
        <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
      </div>
      <ul className={`${styles.menu} ${isOpen ? styles.active : ""}`}>
        <li className={styles.menuItem}>
          <Link href="/kaprodi">Home</Link> {/* Home link */}
        </li>
        <li className={styles.menuItem}>
          {/* <Link href="/kaprodilist">Kaprodi List</Link>  */}
          <Link href="/tampilankaprodilist">Kaprodi List</Link> 
          {/* <DosenListKaprodi/> */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/tampilanlistpenguji">Penguji List</Link> {/* Mahasiswa List link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/listmahasiswaaccsempro">Dokumen Mahasiswa Lengkap Sempro</Link> {/* Dosen List link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/listmahasiswaaccskripsi">Dokumen Mahasiswa Lengkap Skripsi</Link> {/* Dosen List link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/contact">Contact</Link> {/* Contact link */}
        </li>
        {/* Show logout option only if logged in */}
        {isLoggedIn && (
          <li className={styles.menuItem}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}



// // components/NavbarKaprodi.js
// "use client";
// import { useState } from "react";
// import Link from "next/link"; // Import Link from Next.js
// import { auth } from "../../firebase"; // Adjust the path as needed
// import { signOut } from "firebase/auth"; // Import signOut from Firebase
// import { useRouter } from 'next/navigation'; // Import useRouter
// import styles from "./navbarkaprodi.module.css"; // Create this CSS file for styling

// export default function NavbarKaprodi({ isLoggedIn, role }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter(); // Create router instance

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // Sign out the user
//       router.push("/"); // Redirect to home page
//     } catch (error) {
//       console.error("Logout failed: ", error.message);
//     }
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <Link href="/dashboard-kaprodi">Kaprodi</Link> {/* Dashboard link */}
//       </div>
//       <div className={styles.hamburger} onClick={toggleMenu}>
//         {/* Hamburger Icon */}
//         <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
//         <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
//         <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
//       </div>
//       <ul className={`${styles.menu} ${isOpen ? styles.active : ""}`}>
//         <li className={styles.menuItem}>
//           <Link href="/dashboard-kaprodi">Home</Link>
//         </li>
//         {role === "kaprodi" && (
//           <>
//             <li className={styles.menuItem}>
//               <Link href="/kaprodilist">Kaprodi List</Link> {/* Kaprodi access */}
//             </li>
//             <li className={styles.menuItem}>
//               <Link href="/pengujilist">Penguji List</Link> {/* Kaprodi access */}
//             </li>
//             <li className={styles.menuItem}>
//               <Link href="/listmahasiswaaccsempro">Dokumen Mahasiswa Lengkap</Link> {/* Kaprodi access */}
//             </li>
//           </>
//         )}
//         {isLoggedIn && (
//           <li className={styles.menuItem}>
//             <button onClick={handleLogout} className={styles.logoutButton}>
//               Logout
//             </button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }
