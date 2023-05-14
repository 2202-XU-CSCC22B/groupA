const express = require("express");
const SignUp_Login = require("./model");
const app = express();

//stuff!
app.post("/add_signuplogin", async (request, response) => {
    const pass = new SignUp_Login(request.body);

    try {
      await pass.save();
      response.send(pass);
    } catch (error) {
      console.log(error);
      response.status(500).send({error: error.message});
    }
})

module.exports = app;