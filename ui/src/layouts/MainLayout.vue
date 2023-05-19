<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MenuSide from 'components/MenuSide.vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    to : '/',
  },

  {
    title: 'Profile',
    caption: 'My Profile',
    icon:  "account_circle",
    to : '/profile',
  },
  {
    title: 'Form',
    caption:'Create Form',
    to:'/form',
  },

  {
    title: 'Track',
    caption: 'Check my progress',
    icon: 'show_chart',
    to : '/track',
  },
  {
    title: 'Verify',
    caption: 'Validate my form',
    icon:  'check',
    to : '/verify',
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
