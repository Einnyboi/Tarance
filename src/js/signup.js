// signup.ks
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Ambil data pengguna dari localStorage, atau buat array kosong jika belum ada
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Cek apakah email sudah terdaftar
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        errorMessage.textContent = 'Email sudah terdaftar. Silakan gunakan email lain.';
        errorMessage.style.display = 'block';
    } else {
        // Tambahkan pengguna baru ke array
        users.push({ fullName, email, password });
        
        // Simpan array yang sudah diperbarui ke localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Beri notifikasi dan arahkan ke halaman login
        alert('Pendaftaran berhasil! Silakan login.');
        window.location.href = 'login.html';
    }
});