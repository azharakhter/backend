require('dotenv').config(); // This must be FIRST

const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    console.log(`Environment: ${config.env}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
    process.exit(1);
});