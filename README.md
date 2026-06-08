Web Antrean Klinik Real Time

Ini adalah proyek website sistem antrean sederhana yang dirancang untuk kebutuhan klinik atau loket pelayanan umum. Website ini dibuat menggunakan kombinasi HTML5, CSS3, dan JavaScript.

Proyek ini menggunakan metode *Mock Database Architecture* pada file sistem utamanya yang memanfaatkan memori browser lokal (LocalStorage). Dengan struktur ini, pengujian aplikasi dapat berjalan dengan stabil dan lancar di lingkungan lokal tanpa kendala pemblokiran DNS provider internet atau aturan keamanan browser (CORS Policy).

# Fitur Utama Aplikasi
- Real Time Tab Synchronization: Begitu tombol di halaman admin diklik, angka di monitor layar publik akan langsung bergerak naik secara instan saat itu juga tanpa perlu memuat ulang (*refresh*) halaman.
- Suara Panggilan Otomatis: Dilengkapi dengan fitur robot suara bawaan browser (Text-to-Speech) yang otomatis memanggil nomor antrean menggunakan logat Bahasa Indonesia yang jelas.
- Local Architecture: Menggunakan emulator sistem internal yang mensimulasikan fungsi database untuk menyinkronkan data antar tab.

# Struktur File di Repositori
Di dalam folder proyek ini terdapat 3 file utama yang saling bekerja sama:
1. `admin.html` -> Halaman panel kontrol khusus staf atau petugas loket untuk memanggil nomor antrean berikutnya (+1).
2. `layar.html` -> Halaman monitor publik ruang tunggu untuk menampilkan angka besar dan mengeluarkan suara panggilan.
3. `firebase-app-compat.js` -> File inti sistem (emulator) yang mengatur lalu lintas data dan sinkronisasi real-time antar-tab browser.

# Cara Mengubah Firebase Config ke Akun Anda Sendiri

Proyek ini bisa disesuaikan menggunakan akun Firebase Console Anda sendiri. Jika Anda bingung bagaimana cara mendapatkan kodenya, silakan ikuti panduan berikut ini:

# 1. Cara Mendapatkan Kode firebaseConfig di Firebase Console:
1. Buka situs resmi **[Firebase Console](https://google.com)** lalu masuk menggunakan akun Google Anda.
2. Klik tombol **Create a project** (Buat proyek), masukkan nama proyek bebas (contoh: `antrean-klinik-lokal`), lalu klik *Continue*.
3. Pada langkah aktivasi Google Analytics, pilih lokasi **Indonesia** agar zona waktu laporan Anda akurat, lalu klik **Create project**. Tunggu beberapa detik sampai proyek siap.
4. Setelah masuk ke halaman utama dasbor proyek Anda, klik ikon **`</>` (Web)** untuk mendaftarkan aplikasi web baru.
5. Masukkan nama panggilan aplikasi Anda (bebas), lalu klik tombol **Register app** (Pilihan *Firebase Hosting* tidak perlu dicentang, biarkan kosong saja).
6. Setelah diklik, Firebase akan otomatis memunculkan sebuah kotak hitam berisi teks kode petunjuk. 
7. Cari baris teks yang bertuliskan `const firebaseConfig = { ... };`. Salin (*copy*) seluruh isi kode yang berada di dalam kurung kurawal `{ }` tersebut.

# 2. Cara Memasang Kode ke dalam File Proyek:
1. Buka file **`admin.html`** dan **`layar.html`** menggunakan text editor Anda (seperti VS Code).
2. Cari baris kode `const firebaseConfig = { ... }` yang berada di bagian bawah kedua file tersebut.
3. Hapus kode bawaan proyek ini, lalu **ganti dan tempel (paste) kode konfigurasi asli** milik akun Firebase Anda yang sudah disalin tadi. Contoh formatnya akan terlihat seperti ini:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBXh2IAUXicqWAUK9VJqEEH1vR6AE5wqLQ",
    authDomain: "://firebaseapp.com",
    projectId: "proyek-anda",
    storageBucket: "://appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:123456:web:abc123xyz"
};
```
4. Tekan tombol **Ctrl + S** pada keyboard di masing-masing file untuk menyimpan perubahan.

# Cara Menjalankan dan Menguji Aplikasi

Karena sistem ini menggunakan arsitektur sinkronisasi memori browser lokal (LocalStorage), proses pengujian wajib dilakukan pada satu perangkat laptop/komputer yang sama dengan langkah-langkah berikut:

1. Buka folder proyek ini di software Visual Studio Code (VS Code).
2. Jalankan ekstensi Live Server di VS Code dengan cara mengklik tombol **Go Live** yang ada di pojok kanan paling bawah layar komputer Anda.
3. Setelah diklik, browser default komputer otomatis akan terbuka sendiri dan langsung menampilkan halaman **admin.html** (Contoh alamatnya: `http://127.0.0` atau `http://127.0.0`).
4. **Membuka Halaman Monitor (Layar):** 
   - Klik tombol **Tambah Tab Baru (+)** di browser Anda.
   - Salin (*copy*) alamat URL dari halaman admin yang sedang terbuka tadi, lalu tempel (*paste*) ke tab baru tersebut.
   - Hapus kata `admin.html` di paling ujung alamat, lalu ubah dan ketik menjadi **`layar.html`** (Sehingga contoh alamatnya menjadi: `http://127.0.0`).
   - Tekan **Enter** di keyboard untuk memuat halaman.
5. Pisahkan kedua tab browser tersebut secara berdampingan (*Split Screen*), misalnya sisi kiri monitor untuk pasien (`layar.html`) and sisi kanan untuk tombol kontrol staf (`admin.html`).
6. PENTING : Begitu halaman `layar.html` terbuka di Chrome, klik sembarang area kosong di dalam layar tersebut sebanyak satu kali. Ini wajib dilakukan agar browser mengaktifkan izin fitur suara panggilan otomatis (Autoplay Policy).
7. Sekarang coba klik tombol hijau di halaman admin, maka angka di monitor halaman layar di sebelahnya akan langsung melonjak naik secara real time dan mengeluarkan suara panggilan loket.
