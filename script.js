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

// Validation Function
function validateInputs(name, id, email, contact) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const idRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10,}$/;

    if (!name || !id || !email || !contact) {
        alert("All fields are required!");
        return false;
    }
    if (!nameRegex.test(name)) {
        alert("Student Name should only contain characters.");
        return false;
    }
    if (!idRegex.test(id)) {
        alert("Student ID should only contain numbers.");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!contactRegex.test(contact)) {
        alert("Contact Number must be at least 10 digits and only numbers.");
        return false;
    }
    return true;
}

// Render Table Rows
function renderStudents() {
    studentDataContainer.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="action-btns">
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentDataContainer.appendChild(row);
    });

    handleDynamicScrollbar();
}

// Edit functionality
window.editStudent = function(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('emailID').value = student.email;
    document.getElementById('contactNo').value = student.contact;

    editIndex = index;
    submitBtn.innerText = "Update Record";
};

// Delete functionality
window.deleteStudent = function(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        saveAndRender();
    }
};

// Data Persistence
function saveAndRender() {
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}

// Dynamic Scrollbar logic
function handleDynamicScrollbar() {
    // If table rows exceed 5, enable vertical scrollbar
    if (students.length > 5) {
        tableWrapper.classList.add('scroll-enabled');
    } else {
        tableWrapper.classList.remove('scroll-enabled');
    }
}

