// Select DOM Elements
const form = document.getElementById('registrationForm');
const studentDataContainer = document.getElementById('studentData');
const tableWrapper = document.getElementById('tableWrapper');
const submitBtn = document.getElementById('submitBtn');

let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = -1;     // To track if we are editing an existing record

// Initialize page
document.addEventListener('DOMContentLoaded', renderStudents);