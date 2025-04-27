const backendURL = 'https://campus-hostel-backend-2po4.onrender.com'; // replace if needed

// Load Applications
async function loadApplications() {
  const response = await fetch(`${backendURL}/api/applications`);
  const applications = await response.json();
  const applicationList = document.getElementById('applicationList');
  applicationList.innerHTML = '';

  applications.forEach(app => {
    const div = document.createElement('div');
    div.classList.add('application-card');
    div.innerHTML = `
      <p><b>Student ID:</b> ${app.studentId}</p>
      <p><b>Room Preference:</b> ${app.roomPreference}</p>
      <p><b>Details:</b> ${app.personalDetails}</p>
      <p><b>Status:</b> ${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</p>
      <div class="buttons" id="buttons-${app.id}">
        ${app.status === 'pending' ? `
          <button onclick="decideApplication(${app.id}, 'approved')" class="btn">Approve</button>
          <button onclick="decideApplication(${app.id}, 'rejected')" class="btn">Reject</button>
        ` : `<span class="badge">${app.status.toUpperCase()}</span>`}
      </div>
      <hr>
    `;
    applicationList.appendChild(div);
  });
}

// Decide Approve/Reject
async function decideApplication(id, decision) {
  const response = await fetch(`${backendURL}/api/application/${id}/decision`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ decision })
  });

  if (response.ok) {
    alert(`Application ${decision}!`);
    loadApplications();  // Refresh the applications list
  } else {
    alert('Failed to update application.');
  }
}
