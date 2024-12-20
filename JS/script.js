// Pilih elemen yang diperlukan
const fileUploadInput = document.getElementById('file-upload');
const uploadButton = document.getElementById('upload-btn');
const mediaList = document.getElementById('media-list');

// Fungsi untuk menangani unggahan file
uploadButton.addEventListener('click', () => {
    const files = fileUploadInput.files;

    // Cek apakah ada file yang dipilih
    if (files.length === 0) {
        alert('Pilih file untuk diunggah!');
        return;
    }

    // Iterasi melalui semua file yang diunggah
    Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            // Membaca file sebagai URL data
            reader.onload = (event) => {
                // Buat elemen baru untuk gambar
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = file.name;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Hapus';
                deleteButton.classList.add('delete-btn');

                // Fungsi untuk menghapus gambar
                deleteButton.addEventListener('click', () => {
                    mediaList.removeChild(imageContainer);
                });

                // Tambahkan gambar dan tombol hapus ke container
                imageContainer.appendChild(img);
                imageContainer.appendChild(deleteButton);

                // Tambahkan container ke galeri multimedia
                mediaList.appendChild(imageContainer);
            };

            // Baca file sebagai URL data
            reader.readAsDataURL(file);
        } else {
            alert('Hanya file gambar yang dapat diunggah!');
        }
    });

    // Reset input file setelah proses unggah
    fileUploadInput.value = '';
});

// Ambil elemen-elemen form
const form = document.querySelector('section.contact form');
const nameInput = form.querySelector('input[placeholder="Nama"]');
const emailInput = form.querySelector('input[placeholder="Email"]');
const phoneInput = form.querySelector('input[placeholder="Nomor Handphone"]');
const submitButton = form.querySelector('button[type="submit"]');

// Tambahkan event listener pada form submit
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah halaman melakukan reload saat form dikirim

    // Ambil nilai dari input
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    // Validasi input
    if (!validateName(name)) {
        alert('Nama harus diisi dengan benar.');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Email tidak valid.');
        return;
    }
    
    if (!validatePhone(phone)) {
        alert('Nomor Handphone tidak valid. Harus berupa angka dan memiliki panjang 10-15 digit.');
        return;
    }

    // Jika semua validasi lulus, kirim data form
    sendData({ name, email, phone });
});

// Fungsi validasi nama (tidak boleh kosong dan harus berupa huruf)
function validateName(name) {
    return name.length > 0 && /^[a-zA-Z ]+$/.test(name);
}

// Fungsi validasi email menggunakan regex sederhana
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Fungsi validasi nomor telepon (hanya angka dan panjang 10-15 digit)
function validatePhone(phone) {
    const phonePattern = /^[0-9]{10,15}$/;
    return phonePattern.test(phone);
}

// Fungsi untuk mengirim data (simulasi pengiriman data ke server)
function sendData(data) {
    // Simulasi pengiriman data dengan fetch API (sesuaikan URL endpoint di sini)
    fetch('https://example.com/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        alert('Form berhasil dikirim! Terima kasih telah menghubungi kami.');
        // Bersihkan form setelah pengiriman
        form.reset();
    })
    .catch(error => {
        alert('Terjadi kesalahan saat mengirim form. Silakan coba lagi nanti.');
        console.error('Error:', error);
    });
}

