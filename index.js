const createProductBtn = document.getElementById("createProductBtn");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBtn = document.getElementById("modalBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

createProductBtn.addEventListener("click", function () {
    productModal.style.display = "flex";
});

const fetchItems = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    const items = await response.json();

        if (response.ok) {
            items.forEach(item => {
                const div = document.createElement("div");

                div.className = "Product-list";

                div.innerHTML = ` <img src="${item.image}" alt="Product Image">
                <h2>${item.name}</h2>
                <span class="Price">${item.price}</span>
                <span class="Description">${item.description}</span>
            <div class="btns">
                <button id="editBtn">Edit</button>
                <button id="deleteBtn">Delete</button>
            </div>`;
                document.getElementById("productList").appendChild(div);

            });
        }
};

fetchItems();

// editBtn.addEventListener("click", function () {
//     productModal.style.display = "flex";
//     fetch
// });

// deleteBtn.addEventListener("click", function () {
 
// });

modalBtn.addEventListener("click", async function () {
    const div = document.createElement("div");

    div.className = "Product-list";

    div.innerHTML = `
    <img src="${document.getElementById("productImage").value}" alt="Product Image">
    <h2>${document.getElementById("productName").value}</h2>
    <span class="Price">$${document.getElementById("productPrice").value}</span>
    <span class="Description">${document.getElementById("productDescription").value}</span>
    <div class="btns">
        <button id="editBtn">Edit</button>
        <button id="deleteBtn">Delete</button>
    </div>`;

    document.getElementById("productList").appendChild(div);

    productModal.style.display = "none";

    const dataToSend = {
        image: document.getElementById("productImage").value,
        name: document.getElementById("productName").value,
        price: document.getElementById("productPrice").value,
        description: document.getElementById("productDescription").value
    };

    document.getElementById("productImage").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";

    const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        productModal.style.display = "none";
        document.getElementById("productList").innerHTML = "";
        fetchItems();
    } else {
        console.error("Error creating product:", response.statusText);
    }
});

closeModalBtn.addEventListener("click", function () {
    productModal.style.display = "none";
});