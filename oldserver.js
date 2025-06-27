// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
// const app = express();
// const PORT = process.env.PORT || 5000;
// const NASA_API_KEY = process.env.NASA_API_KEY;
// const moment = require('moment'); // Use moment.js for date handling

// // Validate NASA API key on startup
// if (!NASA_API_KEY) {
//     console.error('NASA_API_KEY is missing from environment variables');
//     process.exit(1);
// }

// // Rate limiting to prevent abuse
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
// });

// app.use(limiter);
// app.use(cors({
//     origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
//     methods: ['GET']
// }));
// app.use(helmet());
// app.use(express.json());

// // API endpoints
// app.get('/apod', async (req, res) => {
//     try {
//         const { date } = req.query;

//         // Validate date format if provided
//         if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
//             return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
//         }

//         const response = await axios.get(
//             `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date || ''}`
//         );
//         res.json(response.data);
//     } catch (error) {
//         console.error('APOD Error:', error.message);
//         if (error.response) {
//             // Forward NASA API error message
//             res.status(error.response.status).json({ error: error.response.data.msg || 'Failed to fetch APOD' });
//         } else {
//             res.status(500).json({ error: 'Failed to fetch APOD' });
//         }
//     }
// });

// app.get('/mars-photos', async (req, res) => {
//     try {
//         const { rover = 'curiosity', camera = '', earth_date } = req.query;

//         if (!earth_date) {
//             return res.status(400).json({ error: 'earth_date parameter is required' });
//         }

//         const response = await axios.get(
//             `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${NASA_API_KEY}&earth_date=${earth_date}${camera ? `&camera=${camera}` : ''}`
//         );
//         res.json(response.data.photos);
//     } catch (error) {
//         console.error('Mars Photos Error:', error.message);
//         res.status(500).json({ error: 'Failed to fetch Mars photos' });
//     }
// });

// app.get('/neo', async (req, res) => {
//     try {
//         const { start_date, end_date } = req.query;

//         if (!start_date || !end_date) {
//             return res.status(400).json({ error: 'Both start_date and end_date parameters are required' });
//         }

//         const start = moment(start_date, 'YYYY-MM-DD', true);
//         const end = moment(end_date, 'YYYY-MM-DD', true);

//         if (!start.isValid() || !end.isValid()) {
//             return res.status(400).json({ error: 'Invalid date format. Expected YYYY-MM-DD' });
//         }

//         if (end.diff(start, 'days') > 7) {
//             return res.status(400).json({ error: 'Date range must not exceed 7 days' });
//         }

//         const response = await axios.get(
//             `https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}&start_date=${start_date}&end_date=${end_date}`
//         );
//         res.json(response.data.near_earth_objects);
//     } catch (error) {
//         console.error('NEO Error:', error.message);
//         res.status(500).json({ error: 'Failed to fetch NEO data' });
//     }
// });


// // Health check endpoint
// app.get('/health', (req, res) => {
//     res.status(200).json({ status: 'OK' });
// });

// // 404 handler
// app.use((req, res) => {
//     res.status(404).json({ error: 'Endpoint not found' });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });