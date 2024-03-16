require("dotenv").config();

const express = require ('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Use text router
const textRoutes = require('./routes/text.routes');
app.use('/sms', textRoutes);

// Use call router
const callRoutes = require('./routes/call.routes');
app.use('/voice', callRoutes);

// app.use("/", (req,res)=>{
//     res.send("Hello world!");
// })

app.listen(PORT, () => {
    console.log("Express server started on PORT ", PORT);
})