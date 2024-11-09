const express = require("express");
const ws = require('ws');
require("dotenv").config();
require("./utils/scheduler.js");
const connectDB = require("./utils/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
   origin: "*",
};

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', message => console.log(message));
});


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

// Connect to MongoDB
connectDB();

// Root endpoint
app.get("/", (req, res) => {
   res.status(200).json({
      status: "success",
      message: "Welcome to DegensWar API!",
   });
});

// API routes
app.use('/activate', require('./utils/cron.js'));                                 
app.use("/tokens", require("./controller/tokens/token.js"));
app.use("/battles", require("./controller/battles/battle.js"));
app.use("/summaries", require("./controller/summarys/summary.js"));
app.use("/transactions", require("./controller/transactions/transaction.js"));

// Start the server
const server = app.listen(port, () => {
   console.log(`DegensWar API is running at http://localhost:${port}`);
});
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
