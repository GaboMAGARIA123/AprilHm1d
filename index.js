const createProductBtn = document.getElementById("createProductBtn");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBtn = document.getElementById("modalBtn");

createProductBtn.addEventListener("click", function () {
    productModal.style.display = "flex";
});

modalBtn.addEventListener("click", async function () {
    const div = document.createElement("div");

    div.className = "Product-list";

    div.innerHTML = `
    <img src="${document.getElementById("productImage").value}" alt="Product Image">
    <h2>${document.getElementById("productName").value}</h2>
    <span class="Price">${document.getElementById("productPrice").value}</span>
    <span class="Description">${document.getElementById("productDescription").value}</span>`;

    document.getElementById("productList").appendChild(div);

    productModal.style.display = "none";

    const dataToSend = {
        image: document.getElementById("productImage").value,
        name: document.getElementById("productName").value,
        price: document.getElementById("productPrice").value,
        description: document.getElementById("productDescription").value
    };

    const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        fetchItems();
    }

    document.getElementById("productImage").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";
});

closeModalBtn.addEventListener("click", function () {
    productModal.style.display = "none";
});