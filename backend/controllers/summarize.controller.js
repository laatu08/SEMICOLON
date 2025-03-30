const summerize= async (req, res) => {
    const { prompt } = req.body;

    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "deepseek-r1", prompt }),
    });

    res.setHeader("Content-Type", "text/plain");

    for await (const chunk of ollamaResponse.body) {
        res.write(chunk); // Stream chunks to the frontend
    }
    res.end();
}

module.exports = { summerize };