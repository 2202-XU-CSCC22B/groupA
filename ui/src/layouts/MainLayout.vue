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
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <MenuSide
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
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
    link: ""
  },

  {
    title: 'Profile',
    caption: 'My Profile',
    icon:  "account_circle",
    link: ""
  },

  {
    title: 'Track',
    caption: 'Check my progress',
    icon: 'show_chart',
    link: ''
  },
  {
    title: 'Verify',
    caption: 'Validate my form',
    icon:  'check',
    link: ''
  },
  {
    title: 'Log out',
    caption : '',
    icon : 'logout',


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
