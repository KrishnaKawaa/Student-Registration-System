// on load storing the form and table to the const variable 
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const table = document.querySelector(".table");

    // Function to save data to local storage
    const saveDataToLocalStorage = (data) => {
        localStorage.setItem("students", JSON.stringify(data));
    };

    // Function to get data from local storage
    const getDataFromLocalStorage = () => {
        const data = localStorage.getItem("students");
        return data ? JSON.parse(data) : [];
    };

    // Function to render the table rows
    const renderTable = () => {
        const students = getDataFromLocalStorage();
        table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Email</th>
                <th>Number</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        `; // Reset table with headers
        students.forEach((student, index) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td><button class="edit-btn" data-index="${index}">Edit</button></td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            table.appendChild(newRow);
        });
    };

    // Add event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("studentName").value;
        const id = document.getElementById("studentId").value;
        const email = document.getElementById("email").value;
        const contact = document.getElementById("contact").value;

        // Validate form input
        if (!name || !id || !email || !contact) {
            alert("Please fill in all fields!");
            return;
        }

        // Get existing data and add new entry
        const students = getDataFromLocalStorage();
        students.push({ name, id, email, contact });
        saveDataToLocalStorage(students);

        // Re-render the table
        renderTable();

        // Reset the form
        form.reset();
    });

    // Add event listener for table actions
    table.addEventListener("click", (event) => {
        const target = event.target;
        const index = target.getAttribute("data-index");
        const students = getDataFromLocalStorage();

        if (target.classList.contains("delete-btn")) {
            // Delete functionality
            students.splice(index, 1); // Remove student from the array
            saveDataToLocalStorage(students); // Update local storage
            renderTable(); // Re-render table
        } else if (target.classList.contains("edit-btn")) {
            // Edit functionality
            const student = students[index];
            document.getElementById("studentName").value = student.name;
            document.getElementById("studentId").value = student.id;
            document.getElementById("email").value = student.email;
            document.getElementById("contact").value = student.contact;

            // Remove the entry from the array to update it after editing
            students.splice(index, 1);
            saveDataToLocalStorage(students);
            renderTable();
        }
    });

    // Initial render of the table
    renderTable();
});
