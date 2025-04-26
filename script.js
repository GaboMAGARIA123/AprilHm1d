const createProductBtn = document.getElementById("createProductBtn");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBtn = document.getElementById("modalBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

let editproductid = null;

createProductBtn.addEventListener("click", function () {
    productModal.style.display = "flex";
    const modaltitle = document.getElementById("modalTitle");
    modaltitle.textContent = "Create Product";
    modalBtn.textContent = "Create Product";

    document.getElementById("productImage").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";
});

const fetchItems = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    const items = await response.json();

        if (response.ok) {
            productList.innerHTML = "";
            items.forEach(item => {
                const div = document.createElement("div");

                div.className = "Product-list";

            div.dataset.id = item.id; 
            div.innerHTML = ` <img src="${item.image}" alt="Product Image">
            <h2>${item.name}</h2>
            <span class="Price">$${item.price}</span>
            <span class="Description">${item.description}</span>
            <div class="btns">
                <button id="editBtn">Edit</button>
                <button id="deleteBtn">Delete</button>
            </div>`;
                document.getElementById("productList").appendChild(div);

            });
        }
};


document.getElementById("productList").addEventListener("click", async function (event) {
    if (event.target && event.target.tagName === "BUTTON" && event.target.textContent === "Delete") {
        const id = event.target.closest(".Product-list").dataset.id;
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            productList.innerHTML = "";
            fetchItems();
        } else {
            console.error('Failed to delete item:', response.statusText);
        }
    }
});

fetchItems();

document.getElementById("productList").addEventListener("click", async function (event) {
    if (event.target && event.target.tagName === "BUTTON" && event.target.textContent === "Edit") {
        const id = event.target.closest(".Product-list").dataset.id;
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (response.ok) {
            const product = await response.json();

            document.getElementById("productImage").value = product.image;
            document.getElementById("productName").value = product.name;
            document.getElementById("productPrice").value = product.price;
            document.getElementById("productDescription").value = product.description;

            editproductid = product.id;

            productModal.style.display = "flex";
            const modaltitle = document.getElementById("modalTitle");
            modaltitle.textContent = "Edit Product";
            modalBtn.textContent = "Edit Product";
        } else {
            console.error('Failed to fetch product details:', response.statusText);
        }
    }
});

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
    }
});

closeModalBtn.addEventListener("click", function () {
    productModal.style.display = "none";
});