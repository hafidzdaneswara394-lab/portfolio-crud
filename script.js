let data = JSON.parse(localStorage.getItem("data")) || [];

const form = document.getElementById("form");
const list = document.getElementById("list");

function tampilData() {
    list.innerHTML = "";

    data.forEach((item, index) => {
        list.innerHTML += `
        <div class="card">
            <h3>${item.judul}</h3>
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

    const judul = document.getElementById("judul").value;
    const deskripsi = document.getElementById("deskripsi").value;
    const editIndex = document.getElementById("editIndex").value;

    if (editIndex === "") {
        data.push({ judul, deskripsi });
    } else {
        data[editIndex] = { judul, deskripsi };
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
    document.getElementById("judul").value = data[index].judul;
    document.getElementById("deskripsi").value = data[index].deskripsi;
    document.getElementById("editIndex").value = index;
}

tampilData();
