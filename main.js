const express = require("express");
const path = require("path")
const { returnDataUB, returnDataDR } = require("./middleware/returnData.js")
const { logger, logEvents } = require("./middleware/logger.js");
const transferWorkers = require("./middleware/transferWorkers.js")

const app = express();

app.use(express.json());
app.use(logger)
app.use("/", express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "static","index.html"))
});

app.get("/UB", async (req, res) => {
    let UB = await returnDataUB();
    return res.json(UB);
})
app.get("/DR", async (req, res) => {
    let DR = await returnDataDR();
    return res.json(DR)
})

app.post("/transUB", async (req, res) => {
    const { checkedWorkerIds } = req.body;
    console.log(checkedWorkerIds)
    await transferWorkers("UB_workers.json", "DR_workers.json", checkedWorkerIds);
    return res.json({ "message": "Success" });
})

app.post("/transDR", async (req, res) => {
    const { checkedWorkerIds } = req.body;
    console.log(checkedWorkerIds)
    await transferWorkers("DR_workers.json", "UB_workers.json", checkedWorkerIds);
    return res.json({ "message": "Success" });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})