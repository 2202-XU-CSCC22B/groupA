<template>

  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body>
    <div class="container">
      <form action="#">
        <div class="login-form">
          <div class="title">Login</div>

          <div class="input-boxes">

            <div class="input-box">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Enter your email" required>
            </div>

            <div class="input-box">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Enter your password" required>
            </div>

            <div class="text"><a href="#">Forgot password?</a></div>

            <div class="button input-box">
              <i class="fas fa-lock"></i>
              <input type="submit" value="Submit">
            </div>

            <div class="text">Don't have an account? <label for="">Register Now</label></div>

          </div>
        </div>

        <div class="register-form">
          <div class="title">Register</div>

          <div class="input-boxes">

            <div class="input-box">
              <i class="fas fa-user"></i>
              <input type="email" placeholder="Enter your name" required>
            </div>
            
            <div class="input-box">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Enter your email" required>
            </div>

            <div class="input-box">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Enter your password" required>
            </div>

            <div class="button input-box">
              <i class="fas fa-lock"></i>
              <input type="submit" value="Submit">
            </div>

            <div class="text">Already have an account? <label for="">Log In Now</label></div>

          </div>
        </div>
      </form>
    </div>
  </body>


</template>

<script>

import { ref } from 'vue'

export default ({
  name: 'IndexPage'
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}


</style>

