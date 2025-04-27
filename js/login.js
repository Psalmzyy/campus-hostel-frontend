const backendURL = 'https://campus-hostel-backend-2po4.onrender.com'; // Update after deployment

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${backendURL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.user.role === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'dashboard.html';
      }
    } else {
      alert(data.message);
    }
  });
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }
  

