// MELLOW_FLUFF SHOPPING CART

let cart = JSON.parse(localStorage.getItem("mellowCart")) || [];

function saveCart() {
    localStorage.setItem("mellowCart", JSON.stringify(cart));
}

function addToCart(name) {
    let product = cart.find(item => item.name === name);

    if (product) {
        product.quantity++;
    } else {
        cart.push({
            name: name,
            quantity: 1
        });
    }

    saveCart();
    alert(name + " berhasil ditambahkan ke keranjang!");
}

function displayCart() {
    const container = document.getElementById("cart-items");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Keranjang kamu masih kosong ♡</p>";
    }

    let totalItems = 0;

    cart.forEach((item, index) => {
        totalItems += item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>Jumlah: ${item.quantity}</p>
                    <p>Harga dikonfirmasi melalui chat</p>
                </div>
                <div>
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button class="remove-btn"
                    onclick="removeItem(${index})">Hapus</button>
                </div>
            </div>
        `;
    });

    document.getElementById("total-items").textContent = totalItems;
    document.getElementById("cart-total").textContent =
        "Konfirmasi melalui WhatsApp";
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let message = "Halo Mellow_Fluff! Saya ingin memesan:\n\n";

    cart.forEach(item => {
        message += item.name + " x " + item.quantity + "\n";
    });

    message += "\nMohon konfirmasi ketersediaan dan total harga. Terima kasih!";

    const phone = "+6281262635953";

    window.open(
        "https://wa.me/" + phone + "?text=" +
        encodeURIComponent(message),
        "_blank"
    );
}

displayCart();document.getElementById("customForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value;
    const type = document.getElementById("productType").value;
    const description = document.getElementById("description").value;

    const message =
        "Halo Mellow_Fluff! Saya ingin custom order.\n\n" +
        "Nama: " + name + "\n" +
        "Produk: " + type + "\n" +
        "Deskripsi: " + description +
        "\n\nSaya akan mengirim foto referensi melalui chat.";

    const phone = "+6281262635953";

    window.open(
        "https://wa.me/" + phone + "?text=" +
        encodeURIComponent(message),
        "_blank"
    );
});