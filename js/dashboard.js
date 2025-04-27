const backendURL = 'https://campus-hostel-backend-2po4.onrender.com'; // Update after deployment

// Load Applications
async function loadApplications() {
  const response = await fetch(`${backendURL}/api/applications`);
  const applications = await response.json();
  const applicationList = document.getElementById('applicationList');
  applicationList.innerHTML = '';

  applications.forEach(app => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><b>Student ID:</b> ${app.studentId}</p>
      <p><b>Room Preference:</b> ${app.roomPreference}</p>
      <p><b>Details:</b> ${app.personalDetails}</p>
      <p><b>Status:</b> ${app.status}</p>
      <button onclick="decideApplication(${app.id}, 'approved')" class="btn">Approve</button>
      <button onclick="decideApplication(${app.id}, 'rejected')" class="btn">Reject</button>
      <hr>
    `;
    applicationList.appendChild(div);
  });
}

// Decision on application
async function decideApplication(id, decision) {
  const response = await fetch(`${backendURL}/api/application/${id}/decision`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ decision })
  });

  if (response.ok) {
    alert(`Application ${decision}`);
    loadApplications();
  } else {
    alert('Failed to update application.');
  }
}

// Load immediately
if (document.getElementById('applicationList')) {
  loadApplications();
}

//Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }
  