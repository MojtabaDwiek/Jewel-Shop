const apiUrl = 'http://192.168.0.113:8000/api'; // Update with your backend URL

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('categoriesTable')) {
        fetchCategories();
        document.getElementById('addCategoryBtn').addEventListener('click', addCategoryPrompt);
    }

    if (document.getElementById('productsTable')) {
        fetchProducts();
        document.getElementById('addProductBtn').addEventListener('click', addProductPrompt);
    }

    if (document.getElementById('ordersTable')) {
        fetchOrders();
    }
});

// Fetch Categories
async function fetchCategories() {
    try {
        const response = await fetch(`${apiUrl}/categories`);
        const categories = await response.json();
        const tableBody = document.querySelector('#categoriesTable tbody');
        tableBody.innerHTML = '';
        categories.forEach(category => {
            tableBody.innerHTML += `
                <tr>
                    <td>${category.id}</td>
                    <td>${category.name}</td>
                    <td>
                        <button onclick="editCategory(${category.id})">Edit</button>
                        <button onclick="deleteCategory(${category.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Add Category
async function addCategory(category) {
    try {
        const response = await fetch(`${apiUrl}/categories/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include your token
            },
            body: JSON.stringify(category),
        });
        if (response.ok) {
            fetchCategories();
        } else {
            console.error('Failed to add category');
        }
    } catch (error) {
        console.error('Error adding category:', error);
    }
}

// Prompt for Adding Category
function addCategoryPrompt() {
    const name = prompt("Enter category name:");
    if (name) {
        addCategory({ name });
    }
}

// Edit Category
async function editCategory(id) {
    const name = prompt("Enter new category name:");
    if (name) {
        try {
            const response = await fetch(`${apiUrl}/categories/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ name }),
            });
            if (response.ok) {
                fetchCategories();
            } else {
                console.error('Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    }
}

// Delete Category
async function deleteCategory(id) {
    try {
        const response = await fetch(`${apiUrl}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        if (response.ok) {
            fetchCategories();
        } else {
            console.error('Failed to delete category');
        }
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}

// Fetch Products
async function fetchProducts() {
    try {
        const response = await fetch(`${apiUrl}/products`);
        const products = await response.json();
        const tableBody = document.querySelector('#productsTable tbody');
        tableBody.innerHTML = '';
        products.forEach(product => {
            tableBody.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>
                        <button onclick="editProduct(${product.id})">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Add Product
async function addProduct(product) {
    try {
        const response = await fetch(`${apiUrl}/products/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(product),
        });
        if (response.ok) {
            fetchProducts();
        } else {
            console.error('Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Prompt for Adding Product
function addProductPrompt() {
    const name = prompt("Enter product name:");
    const price = prompt("Enter product price:");
    if (name && price) {
        addProduct({ name, price });
    }
}

// Edit Product
async function editProduct(id) {
    const name = prompt("Enter new product name:");
    const price = prompt("Enter new product price:");
    if (name && price) {
        try {
            const response = await fetch(`${apiUrl}/products/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ name, price }),
            });
            if (response.ok) {
                fetchProducts();
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }
}

// Delete Product
async function deleteProduct(id) {
    try {
        const response = await fetch(`${apiUrl}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        if (response.ok) {
            fetchProducts();
        } else {
            console.error('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

// Fetch Orders
async function fetchOrders() {
    try {
        const response = await fetch(`${apiUrl}/orders`);
        const orders = await response.json();
        const tableBody = document.querySelector('#ordersTable tbody');
        tableBody.innerHTML = '';
        orders.forEach(order => {
            tableBody.innerHTML += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.total}</td>
                    <td>${order.status}</td>
                    <td>
                        <button onclick="viewOrder(${order.id})">View</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

// View Order
async function viewOrder(id) {
    try {
        const response = await fetch(`${apiUrl}/orders/${id}`);
        const order = await response.json();
        alert(JSON.stringify(order, null, 2)); // Consider using a modal to display order details
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
}
