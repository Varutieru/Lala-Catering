# 🍽️ Lala-Catering

## 📖 Deskripsi Aplikasi

**Lala Catering** adalah aplikasi berbasis web yang memiliki fungsi utama sebagai migrasi dari sistem pemesanan katering manual.

* **Pelanggan**: menelusuri menu, memesan dan berlangganan katering, melakukan pembayaran, dan mengecek status pesanan.
* **Administrator (Bu Lala)**: memonitor pemesanan, mengatur konfirmasi pembayaran, mengelola pesanan, serta menutup layanan aplikasi.

---

## 👥 Nama Kelompok & Anggota

**Nama Kelompok:** `Katering LaBuBu`

| Nama Anggota                      | NIM                |
| --------------------------------- | ------------------ |
| Bisuk Artahsasta Waradana Siahaan | 23/522507/TK/57686 |
| Faiz Arsyi Pragata                | 23/518958/TK/57199 |
| Haidar Faruqi Al Ghifari          | 23/518252/TK/57023 |
| Maritza Vania Adelia              | 23/517643/TK/56944 |
| Taufiqurrahman                    | 23/517921/TK/56978 |

---

## 📂 Struktur Folder & File

```bash
Lala-Catering/
│── BE/                         # Source code utama backend
│   ├── controllers/
│   │   ├── jadwalController.js
│   │   ├── menuItemController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/
│   │   ├── jadwalRoutes.js
│   │   ├── menuItemRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   └── emailService.js
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── test.html               # test page untuk API external
│── README.md
```

---

## 🛠️ Teknologi yang Digunakan

| Kategori     | Teknologi           | Deskripsi                                                                  |
| ------------ | ------------------- | -------------------------------------------------------------------------- |
| Backend Core | Node.js, Express.js | Lingkungan runtime dan kerangka kerja API                                  |
| Database     | MongoDB Atlas       | Database NoSQL cloud untuk penyimpanan data                                |
| Otentikasi   | JWT & Google OAuth  | Token sesi dan verifikasi login Google yang aman                           |
| File Storage | Multer & Cloudinary | Memproses unggahan foto menu dan menyimpan URL-nya di cloud                |
| Notifikasi   | Nodemailer (Gmail)  | Mengirim notifikasi konfirmasi dan status pesanan via Email                |
| Pembayaran   | Midtrans Sandbox    | Integrasi payment gateway (simulasi pembayaran & webhook status transaksi) |

---

## 📎 Link GDrive

🔗 [Laporan Back End](https://drive.google.com/drive/folders/1RHci2y8BorgqR4ryJykzJW85flObGJpu?usp=sharing)
