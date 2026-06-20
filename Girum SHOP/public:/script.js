let cart = [];

function addToCart(name, price) {
    cart.push({ name, price, qty: 1 });
    renderCart();
}

function renderCart() {
    let html = "";
    cart.forEach((item, i) => {
        html += `<p>${item.name} - ETB ${item.price}</p>`;
    });
    document.getElementById("cart").innerHTML = html;
}

async function checkout() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    const total = cart.reduce((sum, i) => sum + i.price, 0);

    const res = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            phone,
            items: cart,
            total
        })
    });

    const data = await res.json();

    if (data.success) {
        alert("Order sent to Telegram!");
        cart = [];
        renderCart();
    } else {
        alert("Error sending order");
    }
}