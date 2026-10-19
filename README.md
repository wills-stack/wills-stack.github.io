# Portofolio William Kurniawan Tan

Website portofolio statis (HTML, CSS, JavaScript biasa). Tidak perlu install apa pun dan tidak ada proses build.

## Isi folder

```
index.html            kerangka halaman (jarang perlu diubah)
data/content.js       SEMUA ISI WEBSITE: edit file ini saja
css/styles.css        warna, font, dan tampilan (variabel warna ada di bagian paling atas)
js/main.js            logika halaman (tidak perlu diubah)
assets/cv/            file CV (PDF)
assets/fonts/         font Montserrat
assets/img/projects/  gambar project
assets/img/certificates/  taruh gambar sertifikat di sini
```

## Cara mengedit isi

Buka `data/content.js`. Di dalamnya ada komentar yang menjelaskan tiap bagian.

| Mau ubah apa | Ubah di mana |
| --- | --- |
| Foto profil | Pakai foto potongan (background transparan, setengah badan) berformat PNG atau WebP. Taruh di `assets/img/`, lalu isi `hero.photo: "assets/img/foto-saya.webp"` |
| Empat titik di atas hero | Ubah `hero.flow` di `data/content.js` |
| Experience baru | Salin satu blok `{ ... },` di `experience.items`, tempel di bawahnya, lalu edit. Untuk menyembunyikan, ganti `visible: true` jadi `false` |
| Gambar sertifikat | Taruh di `assets/img/certificates/`, isi `image: "assets/img/certificates/nama.webp"` (JPG dan PNG juga bisa) |
| Link Figma Hampiness | Isi `href` di bagian `links` project Hampiness. Selama kosong, tombolnya tersembunyi |
| Link GitHub | Isi `contact.github`. Selama kosong, linknya tersembunyi |
| CV baru | Timpa file `assets/cv/William_Kurniawan_Tan_CV.pdf` dengan nama yang sama |
| Project baru | Salin satu blok `{ ... },` di `projects.items`, tempel di bawahnya, lalu edit |
| Warna atau font | Ubah nilai di blok `:root` paling atas `css/styles.css` |

Setelah mengedit, buka `index.html` di browser untuk melihat hasilnya. Tidak perlu server.

## Cara upload ke GitHub (GitHub Pages, gratis)

### Cara 1: lewat browser (paling mudah)

1. Buka https://github.com dan buat akun (atau login).
2. Klik **+** di kanan atas, lalu **New repository**.
3. Isi **Repository name** dengan `USERNAME.github.io`, dengan USERNAME diganti username GitHub kamu (huruf kecil semua, harus persis). Pilih **Public**, lalu **Create repository**.
4. Di halaman repository, klik **uploading an existing file**.
5. Buka folder `portfolio-site` yang sudah di-unzip, pilih **semua isinya** (`index.html`, folder `css`, `js`, `data`, `assets`, dan file lainnya), lalu seret ke halaman GitHub. Jangan upload folder `portfolio-site` itu sendiri, tapi isinya, supaya `index.html` ada di paling atas repository.
6. Klik **Commit changes**.
7. Buka **Settings**, lalu **Pages**. Pada **Build and deployment**, pilih **Deploy from a branch**, branch **main**, folder **/ (root)**, lalu **Save**.
8. Tunggu 1 sampai 2 menit, lalu buka `https://USERNAME.github.io`. Website kamu sudah online.

Untuk update isi, buka file di GitHub (misalnya `data/content.js`), klik ikon pensil, edit, lalu **Commit changes**. Website ikut berubah dalam beberapa menit. Untuk mengganti foto atau gambar, pakai **Add file**, lalu **Upload files**.

### Cara 2: lewat Git (kalau sudah terpasang di komputer)

```bash
cd portfolio-site
git init
git add .
git commit -m "Portfolio website"
git branch -M main
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
```

Lalu aktifkan Pages seperti langkah 7 di atas.

### Pakai nama repository lain

Kalau repository tidak bernama `USERNAME.github.io` (misalnya `portfolio`), alamat webnya jadi `https://USERNAME.github.io/portfolio/`. Website ini memakai alamat relatif, jadi tetap jalan.

### Domain sendiri (opsional)

Di **Settings**, **Pages**, isi **Custom domain**, lalu atur DNS di tempat kamu membeli domain sesuai petunjuk GitHub.

## Catatan

- Font Montserrat sudah ada di folder `assets/fonts/`, jadi tidak perlu internet untuk memuatnya.
- Gambar project sudah dikecilkan (format WebP). Kalau menambah gambar sendiri, usahakan di bawah 300 KB per gambar supaya website cepat.
