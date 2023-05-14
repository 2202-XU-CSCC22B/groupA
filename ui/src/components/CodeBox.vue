<template>
    <div>
      <label for="input-box">Enter a value:</label>
      <input id="input-box" type="text" v-model="inputValue">
      <button @click="submitInput">Submit</button>
    </div>
  </template>
  
<script>
  export default {
    name: 'CodeBox',
    data() {
      return {
        inputValue: ''
      };
    },
    methods: {
      submitInput() {
        console.log(this.inputValue); //  send the value to a server, db etc.
      }
    }
  };
</script>
  