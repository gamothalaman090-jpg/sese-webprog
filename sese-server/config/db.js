const mongoose = require('mongoose');
const dns = require('dns');

// Override local DNS to fix querySrv ECONNREFUSED error in Node.js
if (!process.env.VERCEL) {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const connectDB = async () => {
    // Connect MongoDB at default port 27017.
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        throw new Error(`Database connection failed: ${error.message}`);
    }
};

module.exports = connectDB;