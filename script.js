let data = JSON.parse(localStorage.getItem("portfolio")) || [];

const list = document.getElementById("list");

function tampilData() {
    const search = document.getElementById("search").value.toLowerCase();
    const filter = document.getElementById("filter").value;

    list.innerHTML = "";

    data.forEach((item, index) => {

        if (
            item.nama.toLowerCase().includes(search) &&
            (filter === "" || item.kategori === filter)
        ) {
            list.innerHTML += `
            <div class="card" data-aos="zoom-in">
                ${item.gambar ? `<img src="${item.gambar}">` : ""}
                <h3>${item.nama}</h3>
                <p>${item.kategori}</p>
                <p>${item.deskripsi}</p>
                ${item.link ? `<a href="${item.link}" target="_blank">🔗 Link</a>` : ""}

                <div>
                    <button class="edit" onclick="editData(${index})">Edit</button>
                    <button class="delete" onclick="hapusData(${index})">Hapus</button>
                </div>
            </div>
            `;
        }

    });

    localStorage.setItem("portfolio", JSON.stringify(data));
}

document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const kategori = document.getElementById("kategori").value;
    const link = document.getElementById("link").value;
    const deskripsi = document.getElementById("deskripsi").value;
    const editIndex = document.getElementById("editIndex").value;

    const file = document.getElementById("gambar").files[0];

    if(file){
        const reader = new FileReader();
        reader.onload = function(){
            simpan(nama,kategori,link,deskripsi,reader.result,editIndex);
        }
        reader.readAsDataURL(file);
    } else {
        let gambar = editIndex !== "" ? data[editIndex].gambar : "";
        simpan(nama,kategori,link,deskripsi,gambar,editIndex);
    }
});

function simpan(nama,kategori,link,deskripsi,gambar,editIndex){
    if(editIndex===""){
        data.push({nama,kategori,link,deskripsi,gambar});
    } else {
        data[editIndex]={nama,kategori,link,deskripsi,gambar};
        document.getElementById("editIndex").value="";
    }
    tampilData();
}

function hapusData(i){
    data.splice(i,1);
    tampilData();
}

function editData(i){
    document.getElementById("nama").value=data[i].nama;
    document.getElementById("kategori").value=data[i].kategori;
    document.getElementById("link").value=data[i].link;
    document.getElementById("deskripsi").value=data[i].deskripsi;
    document.getElementById("editIndex").value=i;
}

/* SEARCH & FILTER */
document.getElementById("search").addEventListener("input", tampilData);
document.getElementById("filter").addEventListener("change", tampilData);

/* DARK MODE */
function toggleMode(){
    document.body.classList.toggle("light");
}

tampilData();
