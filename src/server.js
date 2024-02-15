const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Route for handling data deletion requests
app.post('/delete-data', (req, res) => {
    // Logic to delete user data
    // This is a placeholder for actual deletion logic
    console.log('Received data deletion request:', req.body);

    // Respond with a success message
    res.status(200).json({ message: 'Data deletion request processed successfully.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});