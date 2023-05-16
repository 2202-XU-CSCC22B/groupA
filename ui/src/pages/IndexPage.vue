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

            <div class="button input-box">
              <i class="fas fa-lock"></i>
              <input type="submit" placeholder="Enter your password" required>
            </div>

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

<style lang="css">

</style>

