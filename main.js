// Mobile Menu Toggle
const header = document.querySelector("header");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener("click", () => {
    header.classList.toggle('show-mobile-menu');
});

closeBtn.addEventListener("click", () => {
    menuBtn.click();
});

// Interactive Button
const mainBtn = document.querySelector("#main-btn");
let clickCount = 0;

mainBtn.addEventListener("click", () => {
    clickCount++;
    
    // Change button color randomly
    const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    mainBtn.style.backgroundColor = randomColor;
    
    // Change button text after 3 clicks
    if (clickCount === 3) {
        mainBtn.textContent = "Keep Clicking!";
    } else if (clickCount === 6) {
        mainBtn.textContent = "Almost There!";
    } else if (clickCount === 9) {
        mainBtn.textContent = "One More Time!";
    } else if (clickCount === 10) {
        mainBtn.textContent = "Surprise! Check Console!";
        console.log("%c☕ Secret Coffee Recipe: 1. Love 2. Passion 3. Beans", 
                    "color: #C06B3E; font-size: 18px; font-weight: bold;");
    }
});

// Double click/long press secret
const secretMessage = document.querySelector("#secret-message");
let pressTimer;

mainBtn.addEventListener("dblclick", () => {
    secretMessage.textContent = "☕ Double click detected! You're a coffee pro!";
    secretMessage.style.display = "block";
    setTimeout(() => {
        secretMessage.style.display = "none";
    }, 3000);
});

mainBtn.addEventListener("mousedown", (e) => {
    pressTimer = setTimeout(() => {
        secretMessage.textContent = "⏳ Long press detected! Secret discount code: COFFEE20";
        secretMessage.style.display = "block";
        setTimeout(() => {
            secretMessage.style.display = "none";
        }, 5000);
    }, 1000);
});

mainBtn.addEventListener("mouseup", () => {
    clearTimeout(pressTimer);
});

mainBtn.addEventListener("mouseleave", () => {
    clearTimeout(pressTimer);
});

// Keypress Detection
document.addEventListener("keydown", (e) => {
    const keypressIndicator = document.createElement("div");
    keypressIndicator.className = "keypress-indicator";
    keypressIndicator.textContent = `You pressed: ${e.key}`;
    document.body.appendChild(keypressIndicator);
    
    keypressIndicator.style.display = "block";
    setTimeout(() => {
        keypressIndicator.style.opacity = "0";
        setTimeout(() => {
            keypressIndicator.remove();
        }, 500);
    }, 1000);
});

// Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }
    
    slides[slideIndex].classList.add("active");
}

prevBtn.addEventListener("click", () => {
    showSlide(slideIndex - 1);
});

nextBtn.addEventListener("click", () => {
    showSlide(slideIndex + 1);
});

// Auto slide change every 5 seconds
setInterval(() => {
    showSlide(slideIndex + 1);
}, 5000);

// Tabs
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));
        
        btn.classList.add("active");
        tabContents[index].classList.add("active");
    });
});

// Form Validation
const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const messageInput = document.querySelector("#message");
const formStatus = document.querySelector("#form-status");

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    input.style.borderColor = "#e74c3c";
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
    input.style.borderColor = "#2ecc71";
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Real-time validation
nameInput.addEventListener("input", () => {
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required");
    } else {
        showSuccess(nameInput);
    }
});

emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required");
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email");
    } else {
        showSuccess(emailInput);
    }
});

passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length < 8) {
        showError(passwordInput, "Password must be at least 8 characters");
    } else {
        showSuccess(passwordInput);
    }
});

messageInput.addEventListener("input", () => {
    if (messageInput.value.trim() === "") {
        showError(messageInput, "Message is required");
    } else {
        showSuccess(messageInput);
    }
});

// Form submission
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate all fields
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required");
        isValid = false;
    }
    
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required");
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email");
        isValid = false;
    }
    
    if (passwordInput.value.length < 8) {
        showError(passwordInput, "Password must be at least 8 characters");
        isValid = false;
    }
    
    if (messageInput.value.trim() === "") {
        showError(messageInput, "Message is required");
        isValid = false;
    }
    
    if (isValid) {
        formStatus.textContent = "Form submitted successfully!";
        formStatus.className = "success";
        formStatus.style.display = "block";
        
        // Reset form
        contactForm.reset();
        
        // Hide status after 3 seconds
        setTimeout(() => {
            formStatus.style.display = "none";
        }, 3000);
    } else {
        formStatus.textContent = "Please fix the errors above";
        formStatus.className = "error";
        formStatus.style.display = "block";
    }
});

// Initialize first slide and tab
showSlide(0);