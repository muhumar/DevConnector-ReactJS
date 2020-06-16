const express = require("express");
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
  
//   next();
// })

app.use(express.json({
  extended: false
}));

app.get("/", (req, res) => {
  res.send("Server Running.");
});

//Define Routes
app.options('*', cors());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on " + PORT));