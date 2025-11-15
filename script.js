function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("visible"));
    document.getElementById(page).classList.add("visible");
}

// Local storage data
let users = JSON.parse(localStorage.getItem("users")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

let loggedInUser = null;

// Registration
function register() {
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPass").value;

    if (name === "" || email === "" || pass === "") {
        document.getElementById("regMsg").innerText = "All fields are required!";
        return;
    }
    if (!email.includes("@")) {
        document.getElementById("regMsg").innerText = "Enter a valid email!";
        return;
    }

    users.push({ name, email, pass });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("regMsg").innerText = "Registration Successful!";
}

// Login
function login() {
    let email = document.getElementById("logEmail").value;
    let pass = document.getElementById("logPass").value;

    let user = users.find(u => u.email === email && u.pass === pass);

    if (user) {
        loggedInUser = user;
        document.getElementById("logMsg").innerText = "Login Successful!";
        showPage("dashboard");
        loadDashboard();
    } else {
        document.getElementById("logMsg").innerText = "Invalid Credentials!";
    }
}

// Add Order
function addOrder(item) {
    if (!loggedInUser) return alert("Login required!");

    orders.push(item);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order added!");
}

// Add Wishlist
function addWishlist(item) {
    if (!loggedInUser) return alert("Login required!");

    wishlist.push(item);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Added to Wishlist!");
}

// Add Review
function addReview() {
    let text = document.getElementById("reviewText").value;

    if (text.trim() === "") return alert("Write something!");

    reviews.push(text);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    loadDashboard();
}

// Load Dashboard Items
function loadDashboard() {
    document.getElementById("orderList").innerHTML =
        orders.map(o => `<li>${o}</li>`).join("");

    document.getElementById("wishlist").innerHTML =
        wishlist.map(w => `<li>${w}</li>`).join("");

    document.getElementById("reviewList").innerHTML =
        reviews.map(r => `<li>${r}</li>`).join("");
}