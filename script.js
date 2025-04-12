// Select DOM elements
const card = document.getElementById('card');
const toSignup = document.getElementById('toSignup');
const toLogin = document.getElementById('toLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toast = document.getElementById('toast');

// Switch between signup and login forms
toSignup.addEventListener('click', () => card.classList.add('flipped'));
toLogin.addEventListener('click', () => card.classList.remove('flipped'));

// Function to show toast messages
function showToast(message, success = false) {
  toast.textContent = message;
  toast.style.background = success ? '#4caf50' : '#e53935'; // Green for success, red for error
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Email validation function
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Signup form submission handler
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  if (!username || !email || !password) {
    return showToast('Please fill in all fields.');
  }
  
  if (!isValidEmail(email)) {
    return showToast('Invalid email format.');
  }

  // Store user data in localStorage
  const userData = { username, email, password };
  localStorage.setItem('userData', JSON.stringify(userData));

  showToast('Account created successfully!', true);
  signupForm.reset();

  // After success, switch to login screen after a brief delay
  setTimeout(() => card.classList.remove('flipped'), 2000);
});

// Login form submission handler
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Retrieve stored user data from localStorage
  const storedData = JSON.parse(localStorage.getItem('userData'));

  if (!storedData) {
    return showToast('No account found. Please sign up.');
  }

  if (storedData.email === email && storedData.password === password) {
    showToast('Login successful!', true);

    // Store the username in localStorage (for session)
    localStorage.setItem('username', storedData.username);

    // Redirect to Website B (Dashboard)
    setTimeout(() => {
      window.location.href = 'https://rhyscustomsdashboard.netlify.app'; // Change this to your actual Website B URL
    }, 2000);
  } else {
    showToast('Incorrect email or password.');
  }
});
