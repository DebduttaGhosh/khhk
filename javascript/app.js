var students = [
    {
        name: 'Debdutta',
        rollNumber: 1,
        sem: 8,
        s1: 9.10,
        s2: 9.23,
        s3: 9.09,
        s4: 0,
        s5: 0,
        b: 0,
    },
    // Other student data for the first table...
];

var otherStudents = [
    {
        name: 'Student1',
        rollNumber: 101,
        sem: 7,
        s1: 8.5,
        s2: 7.9,
        s3: 8.3,
        s4: 7.0,
        s5: 0,
        s6: 0,
        b: 0,
    },
    // Other student data for the second table...
];

var main = document.getElementById('main');
var otherTableBody = document.getElementById("otherTableBody");

function addStudentsToTable(students, tableBody, divideBy, includeSGPA6) {
    // Sort students by average SGPA in decreasing order
    students.sort((a, b) => {
        const averageA = calculateAverage(a, includeSGPA6);
        const averageB = calculateAverage(b, includeSGPA6);
        return averageB - averageA;
    });

    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const totalSGPA = student.s1 + student.s2 + student.s3 + student.s4 + student.s5 + (includeSGPA6 ? student.s6 : 0); // Sum of SGPA
        const average = (totalSGPA / (includeSGPA6 ? 6 : 5)).toFixed(2); // Calculate average
        const percentage = ((totalSGPA / divideBy) * 100).toFixed(2); // Calculate percentage
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.rollNumber}</td>
                <td>${student.sem}</td>
                <td>${student.s1}</td>
                <td>${student.s2}</td>
                <td>${student.s3}</td>
                <td>${student.s4}</td>
                <td>${student.s5}</td>
                ${includeSGPA6 ? `<td>${student.s6}</td>` : ''}
                <td>${student.b}</td>
                <td>${average}</td>
                <td>${percentage}%</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle btn-small" type="button" id="dropdownMenuButton${index}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton${index}">
                        
                            <a class="dropdown-item" href="#" onclick="selectSubject('Subject 1', this.parentNode.parentNode.querySelector('.dropdown-toggle'))">Subject 1</a>
                            <a class="dropdown-item" href="#" onclick="selectSubject('Subject 2', this.parentNode.parentNode.querySelector('.dropdown-toggle'))">Subject 2</a>
                        </div>
                         <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle btn-small" type="button" id="dropdownMenuButton${index}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton${index}">
                        
                            <a class="dropdown-item" href="#" onclick="selectSubject('Subject 1', this.parentNode.parentNode.querySelector('.dropdown-toggle'))">Subject 1</a>
                            <a class="dropdown-item" href="#" onclick="selectSubject('Subject 2', this.parentNode.parentNode.querySelector('.dropdown-toggle'))">Subject 2</a>
                        </div>
                         <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle btn-small" type="button" id="dropdownMenuButton${index}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton${index}">
                        
                            <a class="dropdown-item" href="#" onclick="selectSubject('Subject 1', this.parentNode.parentNode.querySelector('.dropdown-toggle'))">Subject 1</a>
                            <a class="dropdown-item" href="#" onclick="selectSubject('Subject 2', this.parentNode.parentNode.querySelector('.dropdown-toggle'))">Subject 2</a>
                        </div>
                         <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle btn-small" type="button" id="dropdownMenuButton${index}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton${index}">
                        
                            <a class="dropdown-item" href="#" onclick="selectSubject('Subject 1', this.parentNode.parentNode.querySelector('.dropdown-toggle'))">Subject 1</a>
                            <a class="dropdown-item" href="#" onclick="selectSubject('Subject 2', this.parentNode.parentNode.querySelector('.dropdown-toggle'))">Subject 2</a>
                        </div>
                    </div>
                </td>
                
                <td>
                    <button class="btn btn-danger btn-small" onclick="deleteRow(this)">Delete</button>
                </td>
            </tr>`;
    });
}

// Helper function to calculate average SGPA
function calculateAverage(student, includeSGPA6) {
    const totalSGPA = student.s1 + student.s2 + student.s3 + student.s4 + student.s5 + (includeSGPA6 ? student.s6 : 0);
    return totalSGPA / (includeSGPA6 ? 6 : 5);
}

function add() {
    addStudentsToTable(students, main, 50, false); // SGPA 6 is excluded from the first table
    addStudentsToTable(otherStudents, otherTableBody, 60, true); // SGPA 6 is included in the second table
}

function newStudent(tableId) {
    Swal.fire({
        title: 'Enter Student Details',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Roll Number">' +
            '<input id="swal-input3" class="swal2-input" placeholder="Semester">' +
            '<input id="swal-input4" class="swal2-input" placeholder="SGPA 1">' +
            '<input id="swal-input5" class="swal2-input" placeholder="SGPA 2">' +
            '<input id="swal-input6" class="swal2-input" placeholder="SGPA 3">' +
            '<input id="swal-input7" class="swal2-input" placeholder="SGPA 4">' +
            '<input id="swal-input8" class="swal2-input" placeholder="SGPA 5">' +
            (tableId === 'otherTable' ? '<input id="swal-input9" class="swal2-input" placeholder="SGPA 6">' : '') +
            '<input id="swal-input12" class="swal2-input" placeholder="Active Backlog">',
        focusConfirm: false,
        preConfirm: () => {
            const name = document.getElementById('swal-input1').value;
            const rollNumber = document.getElementById('swal-input2').value;
            const sem = document.getElementById('swal-input3').value;
            const s1 = parseFloat(document.getElementById('swal-input4').value);
            const s2 = parseFloat(document.getElementById('swal-input5').value);
            const s3 = parseFloat(document.getElementById('swal-input6').value);
            const s4 = parseFloat(document.getElementById('swal-input7').value);
            const s5 = parseFloat(document.getElementById('swal-input8').value);
            const s6 = parseFloat(document.getElementById('swal-input9') ? document.getElementById('swal-input9').value : 0);
            const b = parseFloat(document.getElementById('swal-input12').value);
            if (isNaN(s1) || isNaN(s2) || isNaN(s3) || isNaN(s4) || isNaN(s5) || isNaN(s6)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter numeric values for SGPA 1 to SGPA 6.'
                });
                return false; // Prevent closing the alert
            }
            return [name, rollNumber, sem, s1, s2, s3, s4, s5, s6, b];
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const formValues = result.value;
            const student = {
                name: formValues[0],
                rollNumber: parseFloat(formValues[1]),
                sem: parseFloat(formValues[2]),
                s1: formValues[3],
                s2: formValues[4],
                s3: formValues[5],
                s4: formValues[6],
                s5: formValues[7],
                s6: formValues[8],
                b: formValues[9],
            };
            if (tableId === 'main') {
                students.push(student);
                addStudentsToTable(students, main, 50, false); // Exclude SGPA 6
            } else if (tableId === 'otherTable') {
                otherStudents.push(student);
                addStudentsToTable(otherStudents, otherTableBody, 60, true); // Include SGPA 6
            }
        }
    });
}

function deleteRow(r) {
    if (confirm('Are you sure to delete this record ?')) {
        var i = r.parentNode.parentNode.rowIndex;
        r.parentNode.parentNode.parentNode.removeChild(r.parentNode.parentNode);
    }
}

function selectSubject(subject, dropdownButton) {
    dropdownButton.textContent = subject;
}

// Initial setup
add();

var searched = document.getElementById("search");

function search() {
    var found = false;
    for (i = 0; i < students.length; i++) {
        if (searched.value.toLowerCase() == students[i].name.toLowerCase()) {
            found = true;
            Swal.fire({
                title: `Name: ${students[i].name}`,
                text: `S1: ${students[i].s1} | S2: ${students[i].s2} | S3: ${students[i].s3}| S4: ${students[i].s4}| S5: ${students[i].s5}| Total: ${students[i].s1 + students[i].s2 + students[i].s3 + students[i].s4 + students[i].s5} | Percentage: ${((students[i].s1 + students[i].s2 + students[i].s3 + students[i].s4 + students[i].s5) * 100 / 50).toFixed(2)}%`,
                icon: 'success',
                confirmButtonText: 'Done'
            });
            searched.value = ""
        }
    }
    if (!found) {
        Swal.fire({
            icon: 'error',
            title: 'Error Finding Student',
            text: searched.value + ' Is Not In This List',
        });
        searched.value = ""
    }
}