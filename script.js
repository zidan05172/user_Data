async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function displayUsers(users) {
  const usersBody = document.getElementById("usersBody");
  usersBody.innerHTML = ""; // Kosongkan isi tabel sebelum menambahkan data baru

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <button onclick="viewPosts(${user.id})">Detail Posts</button>
                <button onclick="viewAlbums(${user.id})">Lihat Albums</button>
                <button onclick="viewUserDetails(${user.id})">Detail Pengguna</button>
                <button onclick="deleteUser(${user.id})">Hapus</button> <!-- Tombol hapus -->
            </td>
        `;
    usersBody.appendChild(row);
  });
}

// Fungsi untuk menghapus pengguna dari tabel
function deleteUser(userId) {
  const usersBody = document.getElementById("usersBody");
  const rows = usersBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    if (cells.length > 0 && cells[0].textContent == userId) {
      usersBody.deleteRow(i);
      break; // Hentikan setelah menemukan dan menghapus pengguna
    }
  }
}

async function viewPosts(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const posts = await response.json();
    const postsTableBody = document.getElementById("postsTableBody");
    postsTableBody.innerHTML = ""; // Kosongkan isi tabel sebelum menambahkan

    if (posts.length === 0) {
      postsTableBody.innerHTML =
        '<tr><td colspan="2">Tidak ada posts untuk ditampilkan.</td></tr>';
    } else {
      posts.forEach((post) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                `;
        postsTableBody.appendChild(row);
      });
    }

    const postsModal = document.getElementById("postsModal");
    postsModal.style.display = "block"; // Tampilkan modal
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function viewAlbums(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
    );
    const albums = await response.json();
    const albumsList = document.getElementById("albumsList");
    albumsList.innerHTML = ""; // Kosongkan isi list sebelum menambahkan

    if (albums.length === 0) {
      albumsList.innerHTML = "<li>Tidak ada albums untuk ditampilkan.</li>";
    } else {
      albums.forEach((album) => {
        const listItem = document.createElement("li");
        listItem.textContent = album.title; // Hanya judul album
        albumsList.appendChild(listItem);
      });
    }

    const albumsModal = document.getElementById("albumsModal");
    albumsModal.style.display = "block"; // Tampilkan modal
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
}

// Fungsi untuk menampilkan detail pengguna
async function viewUserDetails(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await response.json();

    // Isi data pengguna ke dalam modal
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userPhone").textContent = user.phone;
    document.getElementById(
      "userAddress"
    ).textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`; // Format alamat
    document.getElementById("userCompany").textContent = user.company.name; // Nama perusahaan

    const userDetailModal = document.getElementById("userDetailModal");
    userDetailModal.style.display = "block"; // Tampilkan modal
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none"; // Sembunyikan modal
}

// Panggil fungsi untuk mengambil data pengguna saat halaman dimuat
fetchUsers();
