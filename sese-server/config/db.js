const mongoose = require('mongoose');
const dns = require('dns');

// Override local DNS to fix querySrv ECONNREFUSED error in Node.js
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    // Connect MongoDB at default port 27017.
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            family: 4 // Force IPv4, helps with DNS SRV lookup issues on Windows/Node18+
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;