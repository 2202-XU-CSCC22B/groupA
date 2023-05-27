<template>
    <div class="form-submit-container">
      <div class="success-message">Form submitted successfully!</div>

      <div class="button-container">
        <button @click="goBackDashboard" class="back-button">Back to Dashboard</button>
        <button @click="trackForm" class="track-button">Track Form</button>
      </div>
    </div>
  </template>

  <script>
  export default {
    methods: {
      goBackDashboard() {
        this.$router.push({ path: '/dashboard', component: () => import('layouts/MainLayout.vue') });
      },

      trackForm() {
        this.$router.push({path: '/track', component: () => import('components/GetForm.vue')});
      }
    }
  };
  </script>

  <style scoped>
  .form-submit-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  .success-message {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .button-container {
    display: flex;
    gap: 20px;
  }

  .back-button,
  .track-button {
    padding: 10px 20px;
    background-color: #283971;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .back-button:hover,
  .track-button:hover {
    background-color: #4866C9;
  }

  </style>
