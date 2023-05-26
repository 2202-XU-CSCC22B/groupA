<template>
<div class="image-container"></div>
  <q-layout view="lHh Lpr lFf" class = rounded-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class = "q-header"
        />

        <q-toolbar-title>
          My Dashboard
        </q-toolbar-title>

        <div>HRSI Form</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      no-swipe-open
      bordered
    >
      <q-list>
        <menu-header>
        <q-item-label
          header
        >
          Menu
        </q-item-label>
      </menu-header>

        <MenuSide
          v-for="to in essentialLinks"
          :key="to.title"
          v-bind="to"
        />
      </q-list>
    </q-drawer>
  <GetForm/>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MenuSide from 'components/MenuSide.vue'
import GetForm from 'components/GetForm.vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    to : '/dashboard',
  },
  {
    title: 'Form',
    caption:'Create Form',
    icon : 'description',
    to:'/form',
  },

  {
    title: 'Log out',
    caption : '',
    icon : 'logout',
    to : '/logout',

  }

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuSide,
    GetForm
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style scoped>
 .image-container {
    background-image: url('assets/back.jpg');
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .q-header {
    background-color: #283971;
  }



  .rounded-layout {
  border-radius: 10px;
  overflow: hidden;
  }


*{
  margin: 20;
  padding: 20;
  box-sizing: border-box;
  font-family: "Poppins" , sans-serif;
}

body{
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #283971;
  padding: 30px;
}

.container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-width: 850px;
  max-height: 700px;
  width: 100%;
  background: #fff;
  padding: 40px 30px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  perspective: 2700px;
  border-radius: 10px;
}

.cover{
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 50%;
  z-index: 900;
  transition: all 1s ease;
  transform-origin: left;
  transform-style: preserve-3d;

}



</style>


