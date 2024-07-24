const cors = require("cors");

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    allowedHeaders: [
        "Origin", 
        "X-Requested-With", 
        "Content-Type", 
        "Accept",
    ],
    methods: ["GET", "POST", "PUT"],
};

module.exports = cors(corsOptions);