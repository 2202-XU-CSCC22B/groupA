<template>
    <q-page>
      <q-container class="q-pa-md">
        <q-input
          outlined
          v-model="inputValue"
          label="Enter your reference code"
          @keyup.enter="submitInput"
        ></q-input>
        <q-btn label="Submit" color="primary" @click="submitInput" class="q-mt-md"></q-btn>
      </q-container>
    </q-page>
  </template>
  
<script>
  export default {
    name: 'VerifyBox',
    data() {
      return {
        inputValue: ''
      };
    },
    methods: {
      submitInput() {
        console.log(this.inputValue); // send the value to a server, db, etc.
      }
    }
  };
</script>
  