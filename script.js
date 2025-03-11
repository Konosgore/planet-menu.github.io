// Map category names to their respective lists from category files
const categoryMap = {
    "Gin": window.ginList || [],
    "Tequila": window.tequilaList || [],
    "Rum": window.rumList || [],
    "Brandy": window.brandyList || [],
    "Whiskey": window.whiskeyList || [],
    "Vodka": window.vodkaList || [],
    "Wines": window.wineList || [],
    "Refreshment": window.refreshmentList || [],
    "Others": window.othersList || [],
    "ALC FREE": window.alcfreeList || []
};

// DOM elements
const popup = document.getElementById("popup");
const popupContent = document.querySelector(".popup-content");
const popupTitle = document.getElementById("popup-title");
const popupList = document.getElementById("popup-list");
const nestedPopup = document.getElementById("nested-popup");
const nestedPopupContent = document.querySelector(".nested-popup-content");
const nestedTitle = document.getElementById("nested-title");
const nestedOrigin = document.getElementById("nested-origin");
const nestedType = document.getElementById("nested-type");
const nestedDescription = document.getElementById("nested-description");
const backButton = document.querySelector(".back-button");
const nestedBackButton = document.querySelector(".nested-back-button");

// Debug: Log category availability
console.log("Gin List:", window.ginList);
console.log("Whiskey List:", window.whiskeyList);
console.log("Category Map:", categoryMap);

// Event listeners for category buttons
document.querySelectorAll(".menu-button").forEach(button => {
    button.addEventListener("click", (event) => {
        event.stopPropagation(); // Stop event propagation
        const category = button.getAttribute("data-category");
        const items = categoryMap[category];
        console.log(`Clicked ${category}, Items:`, items);
        if (items && items.length > 0) {
            showPopup(category, items);
        } else {
            console.error(`No items found for category: ${category}`);
        }
    });
});

// Show main popup with item list
function showPopup(category, items) {
    console.log(`Showing popup for category: ${category}`);
    popupTitle.textContent = category;
    popupList.innerHTML = ""; // Clear previous list

    items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="name">${item.name}</span><span class="price">${item.price}</span>`;
        li.addEventListener("click", (event) => {
            event.stopPropagation(); // Stop event propagation
            showNestedPopup(item);
        });
        popupList.appendChild(li);
    });

    popup.classList.add("active");
    nestedPopup.classList.remove("active"); // Ensure nested popup is closed
    console.log("Popup is now active");
}

// Show nested popup with item details
function showNestedPopup(item) {
    console.log(`Showing nested popup for item: ${item.name}`);
    nestedTitle.textContent = item.name;
    nestedOrigin.textContent = `Origin: ${item.origin}`;
    nestedType.textContent = `Type: ${item.type}`;
    nestedDescription.textContent = `Description: ${item.description}`;
    nestedPopup.classList.add("active");
    popup.classList.remove("active");
    console.log("Nested popup is now active");
}

// Close popups when clicking outside
document.addEventListener("click", (event) => {
    console.log("Document click event");
    if (popup.classList.contains("active") && !popupContent.contains(event.target)) {
        popup.classList.remove("active");
        console.log("Popup closed");
    }
    if (nestedPopup.classList.contains("active") && !nestedPopupContent.contains(event.target)) {
        nestedPopup.classList.remove("active");
        console.log("Nested popup closed");
    }
});

// Prevent closing popup when clicking inside popup content
popupContent.addEventListener("click", (event) => {
    event.stopPropagation();
});

// Prevent closing nested popup when clicking inside nested popup content
nestedPopupContent.addEventListener("click", (event) => {
    event.stopPropagation();
});

// Back button functionality
backButton.addEventListener("click", (event) => {
    event.stopPropagation();
    popup.classList.remove("active");
    console.log("Popup closed via back button");
});

nestedBackButton.addEventListener("click", (event) => {
    event.stopPropagation();
    nestedPopup.classList.remove("active");
    popup.classList.add("active");
    console.log("Nested popup closed via back button, main popup reopened");
});