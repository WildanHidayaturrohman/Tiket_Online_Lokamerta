const form = document.getElementById("form");
const hasil = document.getElementById("hasil");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const file = formData.get("foto");
  const reader = new FileReader();

  reader.onload = async function () {
    const base64 = reader.result.split(",")[1];

    const data = new URLSearchParams({
      nama: formData.get("nama"),
      whatsapp: formData.get("whatsapp"),
      paket: formData.get("paket"),
      tanggal: formData.get("tanggal"),
      foto: base64
    });

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxGR8iABTh9qs5IlJwYWPkG66T7NHFOo7PiRQ7sP7sBmsC1xtqIsWn6KGoK_R8wluli/exec", {
        method: "POST",
        body: data
      });

      const kode = await response.text();

      hasil.innerHTML = `
        <p style="color: green;">✅ Pemesanan berhasil!</p>
        <p><strong>Kode Pemesanan Anda:</strong><br>
        <span style="font-size: 20px; color: #1E90FF;">${kode}</span></p>
      `;
      form.reset();
    } catch (err) {
      hasil.innerHTML = `<p style="color:red;">❌ Gagal mengirim: ${err.message}</p>`;
    }
  };

  reader.readAsDataURL(file);
});
