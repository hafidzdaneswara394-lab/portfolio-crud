let data = JSON.parse(localStorage.getItem("portfolio")) || [];

const form = document.getElementById("form");
const list = document.getElementById("list");

function tampilData() {
    list.innerHTML = "";

    data.forEach((item, index) => {
        list.innerHTML += `
        <div class="card">
            ${item.gambar ? `<img src="${item.gambar}">` : ""}
            <h3>${item.nama}</h3>
            <p><b>${item.kategori}</b></p>
            <p>${item.deskripsi}</p>
            ${item.link ? `<a href="${item.link}" target="_blank">Lihat Project</a>` : ""}

            <div class="actions">
                <button class="edit" onclick="editData(${index})">Edit</button>
                <button class="delete" onclick="hapusData(${index})">Hapus</button>
            </div>
        </div>
        `;
    });

    localStorage.setItem("portfolio", JSON.stringify(data));
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const kategori = document.getElementById("kategori").value;
    const link = document.getElementById("link").value;
    const deskripsi = document.getElementById("deskripsi").value;
    const editIndex = document.getElementById("editIndex").value;

    const file = document.getElementById("gambar").files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            simpanData(nama, kategori, link, deskripsi, reader.result, editIndex);
        };
        reader.readAsDataURL(file);
    } else {
        let gambar = editIndex !== "" ? data[editIndex].gambar : "";
        simpanData(nama, kategori, link, deskripsi, gambar, editIndex);
    }
});

function simpanData(nama, kategori, link, deskripsi, gambar, editIndex) {
    if (editIndex === "") {
        data.push({ nama, kategori, link, deskripsi, gambar });
    } else {
        data[editIndex] = { nama, kategori, link, deskripsi, gambar };
        document.getElementById("editIndex").value = "";
    }

    form.reset();
    tampilData();
}

function hapusData(index) {
    data.splice(index, 1);
    tampilData();
}

function editData(index) {
    document.getElementById("nama").value = data[index].nama;
    document.getElementById("kategori").value = data[index].kategori;
    document.getElementById("link").value = data[index].link;
    document.getElementById("deskripsi").value = data[index].deskripsi;
    document.getElementById("editIndex").value = index;
}

tampilData();
