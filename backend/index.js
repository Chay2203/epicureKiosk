// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

// Initialize Express app
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Endpoint to fetch AI insights
app.post('/ai_insights', async (req, res) => {
    const { machines, salesData } = req.body;
  
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{
                role: 'user',
                content: `Given the following machine data: ${JSON.stringify(machines)} and the following sales data: ${JSON.stringify(salesData)}, provide insights in the following format don't include the machineId, recipieId and id field in the answer:
                {
                    "salesTrend": "A brief description of sales trends",
                    "maintenanceInsight": "Maintenance recommendations",
                    "inventoryRecommendation": "Inventory restocking suggestions",
                    "detailedAnalysis": "A more in-depth analysis of the data",
                    "anomalyDetected": true/false,
                    "anomalyDescription": "Description of any detected anomalies",
                    "actionItems": ["Action item 1", "Action item 2", ...]
                }`
            }],
            max_tokens: 500,
            temperature: 0.7,
        });
  
        const insights = JSON.parse(chatCompletion.choices[0].message.content.trim());
        res.json({ insights });
    } catch (error) {
        console.error('Error fetching AI insights:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`AI backend listening at http://localhost:${port}`);
});