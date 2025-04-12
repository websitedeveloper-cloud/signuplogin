const card = document.getElementById('card');
const toSignup = document.getElementById('toSignup');
const toLogin = document.getElementById('toLogin');
const toast = document.getElementById('toast');

toSignup.addEventListener('click', () => card.classList.add('flipped'));
toLogin.addEventListener('click', () => card.classList.remove('flipped'));

function showToast(message, success = false) {
  toast.textContent = message;
  toast.style.background = success ? '#4caf50' : '#e53935';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(inputs) {
  return Array.from(inputs).every(input => input.value.trim());
}

document.querySelectorAll('.form-panel form').forEach(form => {
  const btn = form.querySelector('.btn');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input');
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');

    if (!validateForm(inputs)) return showToast('Please fill in all fields.');
    if (!isValidEmail(email.value)) return showToast('Invalid email format.');
    if (password && password.value.length < 6) return showToast('Password too short.');

    btn.classList.add('loading');
    setTimeout(() => {
      btn.classList.remove('loading');
      showToast('Success!', true);
      form.reset();
      if (form.id === 'signupForm') updateStrength(0);
    }, 2000);
  });
});

// Password strength
const passwordInput = document.getElementById('signupPassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

function updateStrength(strength) {
  let width = 0, color = 'red', text = 'Weak';
  switch (strength) {
    case 0:
    case 1: width = 25; color = '#e53935'; text = 'Weak'; break;
    case 2: width = 50; color = '#fb8c00'; text = 'Medium'; break;
    case 3: width = 75; color = '#fdd835'; text = 'Good'; break;
    case 4: width = 100; color = '#43a047'; text = 'Strong'; break;
  }
  strengthBar.style.width = `${width}%`;
  strengthBar.style.background = color;
  strengthText.textContent = text;
}

passwordInput?.addEventListener('input', () => {
  const val = passwordInput.value;
  let strength = 0;
  if (val.length >= 6) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;
  updateStrength(strength);
});

// OAuth stub
document.querySelectorAll('.oauth.google').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('Google OAuth not yet implemented.');
  });
});

document.addEventListener("DOMContentLoaded", function() {
    // Get the toast element
    const toast = document.getElementById("toast");
    
    // Get the Google OAuth buttons
    const googleOAuthButtons = document.querySelectorAll('.oauth.google');
  
    // Function to show toast with a message
    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("show");
  
      // Hide the toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
  
    // Add event listeners to Google OAuth buttons
    googleOAuthButtons.forEach(button => {
      button.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent the default action
        showToast("Google OAuth is not yet enabled.");
      });
    });
  });
  

  document.getElementById('email').addEventListener('input', validateEmail);

function validateEmail() {
  const email = document.getElementById('email').value;
  const errorMessage = document.getElementById('email-error');
  const emailInput = document.getElementById('email');

  // Regular expression for basic email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    errorMessage.style.display = 'none';
    emailInput.classList.remove('invalid');
    return;
  }

  // Test email against regex
  if (!emailPattern.test(email)) {
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Please enter a valid email address.';
    emailInput.classList.add('invalid');
  } else {
    errorMessage.style.display = 'none';
    emailInput.classList.remove('invalid');
  }
}
