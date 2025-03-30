require("dotenv").config();

const summerize = async (req, res) => {
    const { prompt } = req.body;

    try {
        const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: process.env.MODEL_NAME, prompt }),
        });

        if (!ollamaResponse.body) {
            return res.status(500).json({ error: "No response from model" });
        }

        let fullResponse = ""; // Store accumulated response
        const reader = ollamaResponse.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            
            // Each line in the response is a JSON object, split and process each one
            const lines = chunk.split("\n").filter(line => line.trim() !== ""); 

            for (const line of lines) {
                try {
                    const jsonChunk = JSON.parse(line); // Parse each JSON object
                    if (jsonChunk.response) {
                        fullResponse += jsonChunk.response + " "; // Append response text
                    }
                } catch (err) {
                    console.error("Error parsing chunk:", err, "Chunk:", line);
                }
            }
        }

        // Send the final accumulated response
        res.json({ success: true, output: fullResponse.trim() });

    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { summerize };
