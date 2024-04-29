const fs = require('fs');
const path = require('path');

async function transferWorkers(sourceJsonFile, destinationJsonFile, idsToTransfer) {
    // Resolve the absolute paths of source and destination JSON files
    const sourceFilePath = path.resolve(__dirname, '..', 'data', sourceJsonFile);
    const destinationFilePath = path.resolve(__dirname, '..', 'data', destinationJsonFile);

    // Read the source JSON file
    fs.readFile(sourceFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading source JSON file:', err);
            return;
        }

        try {
            // Parse the JSON data
            let sourceWorkers = JSON.parse(data);

            // Filter workers to transfer and remove them from source workers
            const transferredWorkers = [];
            sourceWorkers = sourceWorkers.filter(worker => {
                if (idsToTransfer.includes(worker.id.toString())) {
                    transferredWorkers.push(worker);
                    return false; // Exclude transferred worker from source workers
                }
                return true; // Include worker in source workers
            });

            // Read the destination JSON file
            fs.readFile(destinationFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading destination JSON file:', err);
                    return;
                }

                try {
                    // Parse the JSON data
                    let destinationWorkers = JSON.parse(data);

                    // Concatenate transferred workers to destination workers
                    destinationWorkers = destinationWorkers.concat(transferredWorkers);

                    // Write the updated destination workers to the destination JSON file
                    fs.writeFile(destinationFilePath, JSON.stringify(destinationWorkers, null, 2), err => {
                        if (err) {
                            console.error('Error writing to destination JSON file:', err);
                            return;
                        }
                        console.log('Workers transferred successfully.');
                    });

                    // Write the updated source workers (excluding transferred workers) to the source JSON file
                    fs.writeFile(sourceFilePath, JSON.stringify(sourceWorkers, null, 2), err => {
                        if (err) {
                            console.error('Error writing to source JSON file:', err);
                            return;
                        }
                        console.log('Source JSON file updated successfully.');
                    });
                } catch (error) {
                    console.error('Error parsing destination JSON data:', error);
                }
            });
        } catch (error) {
            console.error('Error parsing source JSON data:', error);
        }
    });
}

module.exports = transferWorkers
