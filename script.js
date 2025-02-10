const express = require("express");
const app = express();
const cors = require('cors')

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAY1rU58nxvKQhVBvn4XMUxRoWZsouTpHw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.post("/response", async (req, res) => {

    let { prompt } = req.body;  

    const result = await model.generateContent(prompt);

    let textResponse = result.response.text()


    res.json({
        message: "Content generated successfully",
        generatedText: textResponse,
      });
    
});

app.listen(3030,()=>{
    console.log("server is working")
})
