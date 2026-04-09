let data = JSON.parse(localStorage.getItem("data")) || [];

const form = document.getElementById("form");
const list = document.getElementById("list");

function tampilData() {
    list.innerHTML = "";

    data.forEach((item, index) => {
        list.innerHTML += `
        <div class="card">
            <h3>${item.nama}</h3>
            <p>${item.deskripsi}</p>
            <button class="edit" onclick="editData(${index})">Edit</button>
            <button onclick="hapusData(${index})">Hapus</button>
        </div>
        `;
    });

    localStorage.setItem("data", JSON.stringify(data));
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const deskripsi = document.getElementById("deskripsi").value;
    const editIndex = document.getElementById("editIndex").value;

    if (editIndex === "") {
        data.push({ nama, deskripsi });
    } else {
        data[editIndex] = { nama, deskripsi };
        document.getElementById("editIndex").value = "";
    }

    form.reset();
    tampilData();
});

function hapusData(index) {
    data.splice(index, 1);
    tampilData();
}

function editData(index) {
    document.getElementById("nama").value = data[index].nama;
    document.getElementById("deskripsi").value = data[index].deskripsi;
    document.getElementById("editIndex").value = index;
}

tampilData();