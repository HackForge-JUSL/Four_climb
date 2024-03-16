const express = require ('express');
const app = express ();

const PORT = process.env.PORT || 8000;

app.use("/", (req,res)=>{
    res.send("Hello world!");
})

app.listen(PORT, () => {
    console.log("Server started on PORT ", PORT);
})