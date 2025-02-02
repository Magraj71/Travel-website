require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing request body and handling sessions
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
const apiKey = process.env.GOOGLE_API_KEY;

// Function to test Google Maps API
async function testGoogleMapsAPI() {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                query: 'Chennai',
                key: process.env.GOOGLE_API_KEY // Ensure this is set correctly in your .env file
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Call the function to test the API
testGoogleMapsAPI();

// Dummy user data (for demonstration purposes)
const users = {
    "testuser": "testpassword"
};

// Serve Login Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/register.html'));
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        req.session.user = username; // Save user session
        res.redirect('/index');  // Redirect to home.html after successful login
    } else {
        res.send('Invalid username or password. Please try again.');
    }
});

// Handle registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        res.send('User already exists.');
    } else {
        users[username] = password; // Add user
        res.send('Registration successful! You can now log in.');
    }
});

// Home page (protected route)
app.get('/index', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    } else {
        res.redirect('/login');
    }
});

// Logout
app.get('/logout', (req, res) => {
    console.log('Logout route accessed'); // Debug log
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err); // Debug log
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        console.log('User logged out and session destroyed'); // Debug log
        res.redirect('/login');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
