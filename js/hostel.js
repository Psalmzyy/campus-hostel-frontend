const backendURL = 'https://campus-hostel-backend-2po4.onrender.com'; // Update after deployment

// Fetch Hostels
async function loadHostels() {
  const response = await fetch(`${backendURL}/api/hostels`);
  const hostels = await response.json();
  const hostelList = document.getElementById('hostelList');
  hostelList.innerHTML = '';

  hostels.forEach(hostel => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h4>${hostel.name}</h4>
      <img src="${hostel.photo}" alt="${hostel.name}" width="150" height="150"><br>
      <p>${hostel.description}</p>
      <p>Occupancy Limit: ${hostel.occupancyLimit}</p>
      <p>Available Rooms: ${hostel.availableRooms}</p>
      <hr>
    `;
    hostelList.appendChild(div);
  });
}

// Load hostels immediately when on dashboard
if (document.getElementById('hostelList')) {
  loadHostels();
}

// Apply for Hostel
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
  applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login first!');
      return;
    }
    const roomPreference = document.getElementById('roomPreference').value;
    const personalDetails = document.getElementById('personalDetails').value;

    const response = await fetch(`${backendURL}/api/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: user.id,
        roomPreference,
        personalDetails
      })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Application submitted successfully!');
      window.location.reload();
    } else {
      alert('Failed to apply.');
    }
  });
}
