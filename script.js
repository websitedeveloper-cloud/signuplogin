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

function updateStrength(value) {
  const strength = ['Weak', 'Fair', 'Good', 'Strong'];
  let index = Math.floor(value / 25);
  strengthText.textContent = strength[index];
  strengthBar.style.width = `${value}%`;
}

passwordInput.addEventListener('input', e => {
  const value = e.target.value.length;
  if (value < 6) updateStrength(25);
  else if (value < 12) updateStrength(50);
  else if (value < 18) updateStrength(75);
  else updateStrength(100);
});
