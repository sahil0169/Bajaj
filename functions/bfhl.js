const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

app.post("/bfhl", (req, res) => {
    try {
        const data = req.body.data || [];
        const user_id = "john_doe_17091999";  // Replace with dynamic logic
        const email = "john@xyz.com";
        const roll_number = "ABCD123";
        
        const numbers = data.filter(x => !isNaN(x));
        const alphabets = data.filter(x => isNaN(x));
        const highest_lowercase = alphabets.filter(x => x === x.toLowerCase()).sort().pop() || "";

        res.json({
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highest_lowercase ? [highest_lowercase] : [],
        });
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

module.exports.handler = serverless(app);
