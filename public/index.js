function fetchData() {
    fetch("/UB")
        .then(response => response.json())
        .then(data => {
            renderData("ub", data);
        })
        .catch(error => console.error("Error fetching JSON for UB: ", error));

    fetch("/DR")
        .then(response => response.json())
        .then(data => {
            renderData("dr", data);
        })
        .catch(error => console.error("Error fetching JSON for DR: ", error));
}

function renderData(id, data) {
    const element = document.getElementById(id);
    if (data.length > 0) {
        const table = `
            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Salary</th>
                </tr>
                ${data.map(worker => `
                    <tr>
                        <td>${worker.name}</td>
                        <td>${worker.age}</td>
                        <td>${worker.position}</td>
                        <td>${worker.department}</td>
                        <td>${worker.salary}</td>
                    </tr>
                `).join('')}
            </table>
        `;
        element.innerHTML = table;
    } else {
        element.innerText = "No data available";
    }
}

// Fetch data initially and then fetch every 10 seconds
fetchData();
setInterval(fetchData, 10000);