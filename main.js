const express = require("express");
const path = require("path")
const UB = require("./UB_workers.json");
const DR = require("./DR_workers.json");

const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})