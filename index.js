import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Route for Profile Pictures: /fetch/profilepic/[ID]
app.get('/fetch/profilepic/:userId', async (req, res) => {
    const userId = req.params.userId;
    const url = `https://uploads.scratch.mit.edu/get_image/user/${userId}_60x60.png`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Profile image not found');
        
        const buffer = await response.buffer();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        res.status(500).send('Proxy error: ' + err.message);
    }
});

// Route for Project Pictures: /fetch/projectpic/[ID]_282x210.png
app.get('/fetch/projectpic/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    // This perfectly matches your intended target URL
    const url = `https://uploads.scratch.mit.edu/get_image/project/${projectId}_282x210.png`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Project image not found');
        
        const buffer = await response.buffer();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        res.status(500).send('Proxy error: ' + err.message);
    }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
