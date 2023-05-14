<template>
    <div>
      <label for="to">To:</label>
      <input type="tel" id="to" v-model="toNumber">
      <br>
      <label for="message">Message:</label>
      <textarea id="message" v-model="message"></textarea>
      <br>
      <button @click="send">Send Message</button>
    </div>
  </template>
  
<script>
import axios from 'axios';
  
  export default {
    name: 'TwillioNotif',
    data() {
      return {
        toNumber: '',
        message: ''
      };
    },
    methods: {
      async send() {
        const accountSid = 'TWILIO_ACCOUNT_SID_HERE';
        const authToken = 'TWILIO_AUTH_TOKEN_HERE';
        const twilioNumber = 'TWILIO_PHONE_NUMBER_HERE';
  
        try {
          const response = await axios.post(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
            To: this.toNumber,
            From: twilioNumber,
            Body: this.message
          }, {
            auth: {
              username: accountSid,
              password: authToken
            }
          });
  
          console.log(response.data);
          alert('Message sent successfully!');
        } catch (error) {
          console.error(error);
          alert('Failed to send message');
        }
      }
    }
  };
</script>
  