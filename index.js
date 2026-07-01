import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Now you only need to send the user ID, e.g., /fetch-profile/123456
app.get('/fetch-profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const url = `https://uploads.scratch.mit.edu/get_image/user/${userId}_60x60.png`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Could not find image');
        
        const buffer = await response.buffer();
        
        // This header allows your TurboWarp project to read the image data
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        res.status(500).send('Proxy error: ' + err.message);
    }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
