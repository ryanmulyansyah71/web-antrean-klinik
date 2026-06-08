# web-antrean-klinik
# Web Antrean Klinik Real Time + Suara Panggilan

Ini adalah proyek website sistem antrean sederhana yang biasa dipakai di klinik atau rumah sakit. Web ini dibuat pakai HTML, CSS, dan JavaScript biasa tanpa framework ribet. 

Sistemnya sudah real time, jadi begitu tombol dipanggil di halaman admin, angka di monitor layar pasien akan langsung berubah otomatis tanpa perlu di refresh. Web ini juga sudah ada fitur suara robot otomatis yang bisa manggil nomor antreannya pakai Bahasa Indonesia.


# Fitur Utama:
- Angka antrean berubah otomatis secara real time (sinkron antar tab browser).
- Ada suara panggilan otomatis berbahasa Indonesia (Contoh: "Nomor antrean 1, silahkan menuju loket").
- Kode script Firebase-nya ditaruh lokal, jadi aman dan anti error meskipun internet lagi lemot atau diblokir provider.
- Ringan banget karena cuma pakai file HTML biasa.


# Isi File di Proyek Ini:
1. admin.html -> Halaman buat staf atau petugas loket (isinya tombol hijau untuk tambah nomor antrean).
2. layar.html -> Halaman monitor buat pasien (isinya angka antrean besar dan yang ngeluarin suara panggilan).
3. firebase-app-compat.js -> File sistem lokal agar kedua halaman di atas bisa saling ngobrol secara real-time.


# Cara Nyobain di Laptop / VS Code:
1. Buka folder proyek ini di Visual Studio Code.
2. Nyalakan ekstensi *Live Server* (klik tombol Go Live di pojok kanan bawah VS Code).
3. Buka browser Google Chrome, lalu buka dua tab ini secara berdampingan:
   - Halaman Admin: http://127.0.0
   - Halaman Layar: http://127.0.0
4. *Catatan Penting*: Begitu halaman layar.html terbuka, klik sembarang tempat kosong di layar itu sekali saja. Ini wajib supaya Google Chrome memberikan izin suaranya bunyi.
5. Tinggal klik tombol di halaman admin, nanti angka di halaman layar bakal naik sendiri dan keluar suaranya.


# Link Demo Web (GitHub Pages):
Kalau mau diakses online lewat HP atau komputer lain, bisa pakai link GitHub Pages ini:
- Link Staf (Admin):  https://ryanmulyansyah71.github.io/web-antrean-klinik/admin.html
- Link Monitor (Layar):  https://ryanmulyansyah71.github.io/web-antrean-klinik/layar.html
