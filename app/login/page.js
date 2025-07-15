// 'use client';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "@/lib/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

// export default function LoginPage() {
//   const [nim, setNim] = useState("");
//   const [password, setPassword] = useState(""); // Password dummy
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, `${nim}@email.com`, password);
//       router.push('/dashboard');
//     } catch (error) {
//       alert('Login gagal! Pastikan NIM benar.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <form className="p-6 bg-white rounded shadow-md" onSubmit={handleLogin}>
//         <h1 className="mb-4 text-xl font-bold">Login Mahasiswa</h1>
//         <input
//           type="text"
//           placeholder="NIM"
//           value={nim}
//           onChange={(e) => setNim(e.target.value)}
//           className="block w-full p-2 mb-4 border"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full p-2 mb-4 border"
//           required
//         />
//         <button type="submit" className="w-full p-2 text-white bg-blue-500">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }



'use client';
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from './login.module.scss';

export default function LoginPage() {
  const [nimOrEmail, setNimOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const email = nimOrEmail.includes('@') ? nimOrEmail : `${nimOrEmail}@email.com`;
//       await signInWithEmailAndPassword(auth, email, password);

//       const userDoc = doc(db, "users", email);
//       const userSnap = await getDoc(userDoc);

//       if (userSnap.exists()) {
//         const role = userSnap.data().role;
//         if (role === "admin") {
//           router.push('/admin');
//         } else {
//           router.push('/dashboard');
//         }
//       } else {
//         alert('Role tidak ditemukan!');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Login gagal! Pastikan NIM atau Email dan Password benar.');
//     }
//   };

//INIIIIII JANGAN DIHAPUS YAA ANAK PUKIII
// const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const email = nimOrEmail.includes('@') ? nimOrEmail : `${nimOrEmail}@email.com`;
//       await signInWithEmailAndPassword(auth, email, password);
  
//       // Cek role di Firestore
//       const userQuery = query(collection(db, "users"), where("email", "==", email));
//       const querySnapshot = await getDocs(userQuery);
  
//       if (!querySnapshot.empty) {
//         const userData = querySnapshot.docs[0].data();
//         const role = userData.role;
//         if (role === "admin") {
//           router.push('/admin');
//         } else if(role === "kaprodi"){
//           router.push('/kaprodi');
//         } else if(role === "mahasiswa"){
//           router.push('/dashboardmahasiswa');
//         }
//         else if(role === "penguji"){
//           router.push('/penguji');
//         }
//         else {
//           router.push('/dashboard');
//         }
//       } else {
//         alert('Role tidak ditemukan di database!');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Login gagal! Pastikan NIM atau Email dan Password benar.');
//     }
//   };
  


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const email = nimOrEmail.includes('@') ? nimOrEmail : `${nimOrEmail}@gmail.com`;

    // Login ke Firebase Authentication
    await signInWithEmailAndPassword(auth, email, password);

    // Ambil data user berdasarkan email
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const role = userData.role;

      // Routing berdasarkan role
      if (role === "admin") {
        router.push('/admin');
      } else if (role === "kaprodi") {
        router.push('/kaprodi');
      } else if (role === "mahasiswa") {
        router.push('/dashboardmahasiswa');
      } else if (role === "penguji") {
        router.push('/penguji');
      } else {
        router.push('/dashboard');
      }
    } else {
      alert('Akun ditemukan, tapi role belum ditentukan di Firestore.');
    }

  } catch (error) {
    console.error(error);
    alert('Login gagal! Pastikan NIM atau Email dan Password benar.');
  }
};


  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    //   <motion.div
    //     initial={{ opacity: 0, y: -20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     className="p-8 bg-white rounded-lg shadow-md w-80"
    //   >


    <div className={styles.wrapper}>
      <motion.div className={styles.card}>

        {/* <h1 className="text-2xl font-bold text-center mb-6">Selamat Datang di E-Skripsi Scheduler</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="NIM Mahasiswa atau Email Admin"
            value={nimOrEmail}
            onChange={(e) => setNimOrEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form> */}
        <h1 className={styles.title}>Selamat Datang di E-Skripsi Scheduler</h1>
    <form onSubmit={handleLogin} className={styles.form}>
      <input
        type="text"
        placeholder="NIM Mahasiswa atau Email Admin"
        value={nimOrEmail}
        onChange={(e) => setNimOrEmail(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
      </motion.div>
    </div>
  );
}
