<template>
  <q-item
   clickable
   :to="to">
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" color = '#0c0615'/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuSide',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    to: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>

.q-item{
color: #08081a
}

.q-icon{
  color : #08081a

}
</style>
