<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
      <q-page>
        <!-- <img
          alt="XU Slogan"
          src="~assets/xu.jpg"
        > -->
        <div class="wrapper">

          <div class="sign-up">

            <form action="" method="post">
              <div class="email">
                <label for="Email">XU Email</label>
                <q-input standout v-model="email" filled type="email" label="XU Email" />
              </div>

              <br>

              <div class="password">
                <label for="Password">Password</label>
                <q-input standout v-model="password" label="Password" filled :type="isPwd ? 'password' : 'text'">
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>

            </form>

          </div>

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default ({
  name: 'IndexPage',

  setup() {
    return{
      password: ref(''),
      isPwd: ref(true),
      email: ref('')
    }
  }
})
</script>

<style>

.wrapper {
  position: absolute;
  /* justify-content: center;
  align-items: center; */
}

.sign-up {
  position: relative;
  background-color: antiquewhite;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10%;

  margin-top: 80%;
  margin-left: 220%;
}

</style>
