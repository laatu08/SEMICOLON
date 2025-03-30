require("dotenv").config();
const pdf = require('pdf-parse');
const axios = require('axios');
// const fetch = require('node-fetch');

const summarize = async (req, res) => {
    const { pdfUrl } = req.body;

    try {
        // Step 1: Fetch PDF content
        const pdfResponse = await axios.get(`http://localhost:5000`+pdfUrl, { responseType: 'arraybuffer' });
        const pdfBuffer = Buffer.from(pdfResponse.data);

        // Step 2: Extract text from PDF
        const pdfData = await pdf(pdfBuffer);
        const extractedText = pdfData.text;

        if (!extractedText) {
            return res.status(400).json({ error: "Failed to extract text from PDF" });
        }

        // Step 3: Send extracted text to Ollama for summarization
        const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: process.env.MODEL_NAME, prompt: `Summarize the following content:\n\n${extractedText}` }),
        });

        if (!ollamaResponse.body) {
            return res.status(500).json({ error: "No response from model" });
        }

        let fullResponse = "";
        const reader = ollamaResponse.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter(line => line.trim() !== "");

            for (const line of lines) {
                try {
                    const jsonChunk = JSON.parse(line);
                    if (jsonChunk.response) {
                        fullResponse += jsonChunk.response + " ";
                    }
                } catch (err) {
                    console.error("Error parsing chunk:", err, "Chunk:", line);
                }
            }
        }

        res.json({ success: true, output: fullResponse.trim() });

    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { summarize };
