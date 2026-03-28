// Select DOM Elements
const form = document.getElementById('registrationForm');
const studentDataContainer = document.getElementById('studentData');
const tableWrapper = document.getElementById('tableWrapper');
const submitBtn = document.getElementById('submitBtn');

let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = -1;     // To track if we are editing an existing record

// Initialize page
document.addEventListener('DOMContentLoaded', renderStudents);

// Handle Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('emailID').value.trim();
    const contact = document.getElementById('contactNo').value.trim();

    // Validation Logic
    if (!validateInputs(name, id, email, contact)) return;

    const studentRecord = { name, id, email, contact };

    if (editIndex === -1) {
        // Add new record
        students.push(studentRecord);
    } else {
        // Update existing record
        students[editIndex] = studentRecord;
        editIndex = -1;
        submitBtn.innerText = "Register Student";
    }

    saveAndRender();
    form.reset();
});