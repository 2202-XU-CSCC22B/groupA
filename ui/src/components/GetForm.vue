<template>
  <div>
    <h1>HRSI Form</h1>
    <ul>
      <li v-for="user in users" :key="user._id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name : GetForm,
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/api/login');
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
