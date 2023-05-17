<template>
  <div class="q-pa-q-gutter-md">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Form Submitted"
        icon="adjust"
        done-color="green"
        :done="step > 1"
      >
      <q-chip outline color="secondary" text-color="white" icon="done">
            Approved
      </q-chip>
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="First Approver Status" 
        icon="adjust"
        done-color="green"
        :done="step > 2"
      >
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Second Approver Status" 
        icon="adjust"
        done-color="green"
        :done="step > 3"
      >
        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Continue" />
          <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Out of Campus" 
        icon="adjust"
        done-color="green"
        :done="step > 4"
      >
        <q-stepper-navigation>
          <q-btn @click="step = 5" color="primary" label="Continue" />
          <q-btn flat @click="step = 4" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="5"
        title="Re-entered Campus" 
        icon="adjust"
        :done="step > 5"
      >
      </q-step>

      
      




    </q-stepper>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      step: ref(1)
    }
  }
}
</script>