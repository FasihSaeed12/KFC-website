
// Shopping cart using localStorage
let cart = JSON.parse(localStorage.getItem("kfcCart")) || [];

function saveCart() {
    localStorage.setItem("kfcCart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    alert(name + " added to your cart!");
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    renderCart();
}

function renderCart() {
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!container || !totalElement) return;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.textContent = "Rs. 0";
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center border-bottom py-3">
            <div>
                <strong>${item.name}</strong>
                <p class="mb-0">Rs. ${item.price} × ${item.quantity}</p>
            </div>
            <button class="btn btn-sm btn-danger"
                onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')">
                Remove
            </button>
        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    totalElement.textContent = "Rs. " + total.toLocaleString();
}

// Scroll reveal animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});

// Contact form
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();

    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            document.getElementById("formMessage").textContent =
                "Thank you! Your message has been received.";

            form.reset();
        });
    }
});
