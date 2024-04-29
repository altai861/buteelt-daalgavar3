const express = require("express");
const path = require("path")
const UB = require("./data/UB_workers.json");
const DR = require("./data//DR_workers.json");
const { logger, logEvents } = require("./middleware/logger.js");
const transferWorkers = require("./middleware/transferWorkers.js")

const app = express();

app.use(express.json());
app.use(logger)
app.use("/", express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "static","index.html"))
});

app.get("/UB", (req, res) => {
    res.json(UB);
})
app.get("/DR", (req, res) => {
    res.json(DR);
})

app.post("/transUB", async (req, res) => {
    const { checkedWorkerIds } = req.body;
    console.log(checkedWorkerIds)
    await transferWorkers("UB_workers.json", "DR_workers.json", checkedWorkerIds);
    res.json({ "message": "Success" });
})

app.post("/transDR", async (req, res) => {
    const { checkedWorkerIds } = req.body;
    console.log(checkedWorkerIds)
    await transferWorkers("DR_workers.json", "UB_workers.json", checkedWorkerIds);
    res.json({ "message": "Success" });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})