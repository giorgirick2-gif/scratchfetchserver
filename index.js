import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// This route matches: /fetch/profilepic/[USER_ID]
app.get('/fetch/profilepic/:userId', async (req, res) => {
    const userId = req.params.userId;
    // Automatically appends the required suffix to the user ID
    const url = `https://uploads.scratch.mit.edu/get_image/user/${userId}_60x60.png`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        
        const buffer = await response.buffer();
        
        // Headers to bypass CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        res.status(500).send('Proxy error: ' + err.message);
    }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
