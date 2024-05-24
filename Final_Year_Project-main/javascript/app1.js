var students = [
    {
        name: 'Debdutta',
        rollNumber: 1,
        sem: 8,
        s1: 9.10,
        s2: 9.23,
        b: 0,
    },
    {
        name: 'Deeptarshi',
        rollNumber: 211,
        sem: 8,
        s1: 9.5,
        s2: 7.9,
        b: 0,
    },
    {
        name: 'Shamantia',
        rollNumber: 113,
        sem: 8,
        s1: 8.8,
        s2: 8.0,
        b: 0,
    }
];

var main = document.getElementById('main');
var searched = document.getElementById("search");

function add() {
    for (var i = 0; i < students.length; i++) {
        main.innerHTML += `
            <tr>
                <td>${[i + 1]}</td>
                <td>${students[i].name}</td>
                <td>${students[i].rollNumber}</td>
                <td>${students[i].sem}</td>
                <td>${students[i].s1}</td>
                <td>${students[i].s2}</td>
                <td>${students[i].b}</td>
                <td>${((students[i].s1 + students[i].s2) / 2).toFixed(2)}</td>
                <td>${((students[i].s1 + students[i].s2) * 100 / 20).toFixed(2)}%</td>
                <td><input type="button" value="Delete" class="delBtn" onclick="deleteRow(this)"></td>
            </tr>`;
    }
}

add();

function search() {
    var found = false;
    for (i = 0; i < students.length; i++) {
        if (searched.value.toLowerCase() == students[i].name.toLowerCase()) {
            found = true;
            Swal.fire({
                title: `Name: ${students[i].name}`,
                text: `S1: ${students[i].s1} | S2: ${students[i].s2} | Total: ${students[i].s1 + students[i].s2} | Percentage: ${((students[i].s1 + students[i].s2) * 100 / 20).toFixed(2)}%`,
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

function newStudent() {
    Swal.fire({
        title: 'Enter Student Details',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
            '<input id="swal-input2" class="swal2-input" placeholder="RollNumber">' +
            '<input id="swal-input3" class="swal2-input" placeholder="Semester">' +
            '<input id="swal-input4" class="swal2-input" placeholder="s1">' +
            '<input id="swal-input5" class="swal2-input" placeholder="s2">' +
            '<input id="swal-input6" class="swal2-input" placeholder="Active Backlog">',
        focusConfirm: false,
        preConfirm: () => {
            const name = document.getElementById('swal-input1').value;
            const rollNumber = document.getElementById('swal-input2').value;
            const sem = document.getElementById('swal-input3').value;
            const s1 = parseFloat(document.getElementById('swal-input4').value);
            const s2 = parseFloat(document.getElementById('swal-input5').value);
            const b = parseFloat(document.getElementById('swal-input6').value);
            if (isNaN(s1) || isNaN(s2) || isNaN(b)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter numeric values for s1, s2, and active backlog.',
                });
                return false; // Prevent closing the alert
            }
            return [name, rollNumber, sem, s1, s2, b];
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const formValues = result.value;
            const student = {
                name: formValues[0],
                rollNumber: parseFloat(formValues[1]),
                sem: parseFloat(formValues[2]),
                s1: parseFloat(formValues[3]),
                s2: parseFloat(formValues[4]),
                b: parseFloat(formValues[5]),
            };

            students.push(student);
            const index = students.length - 1;
            main.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.rollNumber}</td>
                    <td>${student.sem}</td>
                    <td>${student.s1}</td>
                    <td>${student.s2}</td>
                    <td>${student.b}</td>
                    <td>${((student.s1 + student.s2) / 2).toFixed(2)}</td>
                    <td>${((student.s1 + student.s2) * 100 / 20).toFixed(2)}%</td>
                    <td><input type="button" class="delBtn" value="Delete" onclick="deleteRow(this)"></td>
                </tr>`;
        }
    });
}

// Delete Function
function deleteRow(r) {
    if (confirm('Are you sure to delete this record ?')) {
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("table").deleteRow(i);
    }
}

