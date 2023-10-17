function formatRupiah(input) {
  var value = input.value;
  // Menghapus karakter selain angka
  value = value.replace(/[^\d]/g, '');

  // Menambahkan titik sebagai pemisah ribuan
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Menambahkan "IDR " di depan nilai
  value = "Rp " + value;

  // Mengupdate nilai pada input
  input.value = value;
}

function calculate() {
  var namaBarang = document.getElementById('nama-barang').value;
  var hargaBarang = parseInt(document.getElementById('harga-barang').value.replace(/[^\d]/g, ''));
  var uangMuka = parseInt(document.getElementById('uang-muka').value.replace(/[^\d]/g, ''));
  
  // Validasi nama barang tidak boleh kosong
  if (namaBarang.trim() === '') {
    document.getElementById('result').innerHTML = "Nama Barang tidak boleh kosong.";
    return;
  }

  if (isNaN(uangMuka)) {
    uangMuka = 0;
    document.getElementById('uang-muka').value = "Rp 0";
  }

  if (uangMuka > hargaBarang) {
    document.getElementById('result').innerHTML = "Uang Muka tidak boleh melebihi Harga Barang.";
    return;
  }

  var tenor = parseInt(document.getElementById('tenor').value);

  if (isNaN(tenor)) {
    tenor = 0;
  }

  if (tenor > 36) {
    document.getElementById('result').innerHTML = "Tenor tidak boleh lebih dari 36 bulan.";
    return;
  }

  // Validasi harga barang
  if (hargaBarang == 0) {
    alert('Harga barang tidak boleh nol!'); // Menampilkan pesan kesalahan
    return; // Menghentikan perhitungan
  }

  var angsuranPokok = hargaBarang - uangMuka;
  var pokokBulanan = angsuranPokok / tenor;
  var margin = 0.90 * angsuranPokok * tenor / 36; // 90% pertahun 3 tahun
  var marginBulanan = margin / tenor;
  var angsuranBulanan = pokokBulanan + marginBulanan;
  var jumlahAngsuran = angsuranPokok + margin;

  document.getElementById('result').innerHTML = `
    <p>Angsuran Bulanan: ${formatCurrency(angsuranBulanan)}</p>
    <p>Jumlah Angsuran: ${formatCurrency(jumlahAngsuran)}</p>
  `;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

function sendMessageOnWhatsApp() {
  var namaBarang = document.getElementById('nama-barang').value;
  var hargaBarang = document.getElementById('harga-barang').value;
  var uangMuka = document.getElementById('uang-muka').value;
  var tenor = document.getElementById('tenor').value;

  // Membuat pesan yang berisi data inputan
  var message = `Nama Barang: ${namaBarang}%0AHarga Barang: ${hargaBarang}%0AUang Muka: ${uangMuka}%0ATenor: ${tenor} bulan`;

  // Membuat tautan WhatsApp dengan pesan yang sesuai
  var whatsappLink = `https://wa.me/6282195959512?text=${message}`;

  // Mengarahkan pengguna ke tautan WhatsApp
  window.open(whatsappLink, '_blank');
}
