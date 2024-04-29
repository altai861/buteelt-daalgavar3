const ubTransButton = document.getElementById("ub-trans");
const drTransButton = document.getElementById("dr-trans");

ubTransButton.addEventListener("click", async () => {
    const checkedWorkerIds = [];

    // Get all checkboxes with the class "transfer-checkbox"
    const checkboxes = document.querySelectorAll(".transfer-checkbox-ub");

    // Iterate over all checkboxes
    checkboxes.forEach(function(checkbox) {
        // Check if the checkbox is checked
        if (checkbox.checked) {
            // Get the worker ID from the data-worker-id attribute
            const workerId = checkbox.getAttribute("data-worker-id");
            // Add the worker ID to the array
            checkedWorkerIds.push(workerId);
        }
    });

    await fetch("/transUB", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({checkedWorkerIds})
    })
    .then(response => {
        if (response.ok) {
            console.log("Checked worker IDs sent to the server successfully");
        } else {
            console.error("Failed to send checked worker IDs to the server");
        }
    })
    .catch(error => {
        console.error("Error sending checked worker IDs: ", error);
    })
    fetchData();
    // Log the array of checked worker IDs
    console.log("Checked Worker IDs:", checkedWorkerIds);

})
drTransButton.addEventListener("click", async () => {
    const checkedWorkerIds = [];

    // Get all checkboxes with the class "transfer-checkbox"
    const checkboxes = document.querySelectorAll(".transfer-checkbox-dr");

    // Iterate over all checkboxes
    checkboxes.forEach(function(checkbox) {
        // Check if the checkbox is checked
        if (checkbox.checked) {
            // Get the worker ID from the data-worker-id attribute
            const workerId = checkbox.getAttribute("data-worker-id");
            // Add the worker ID to the array
            checkedWorkerIds.push(workerId);
        }
    });

    await fetch("/transDR", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({checkedWorkerIds})
    })
    .then(response => {
        if (response.ok) {
            console.log("Checked worker IDs sent to the server successfully");
        } else {
            console.error("Failed to send checked worker IDs to the server");
        }
    })
    .catch(error => {
        console.error("Error sending checked worker IDs: ", error);
    })
    fetchData();
    // Log the array of checked worker IDs
    console.log("Checked Worker IDs:", checkedWorkerIds);
})

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
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Transfer</th>
                </tr>
                ${data.map((worker, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${worker.name}</td>
                        <td>${worker.age}</td>
                        <td>${worker.position}</td>
                        <td>${worker.department}</td>
                        <td>${worker.salary}</td>
                        <td><input type="checkbox" data-worker-id="${worker.id}" class="transfer-checkbox-${id}"></td>
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
