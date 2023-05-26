<template>
  <div class="container">
    <h4>HRSI Form Progress</h4>
    <p></p>
    <q-table
      :rows="Form"
      :columns="columns"
      row-key="_id"
      class="table table-striped table-borders"
    >
      <template v-slot:header>
        <q-tr>
          <q-th key="approverTitle" align="left">Approver Title</q-th>
          <q-th key="approverName" align="left">Approver Name</q-th>
          <q-th key="status" align="left">Status</q-th>
        </q-tr>
      </template>

      <template v-slot:body="{ row }">
        <q-tr>
          <q-td>{{ row.title }}</q-td>
          <q-td>{{ row.name }}</q-td>
          <q-td :style="{ color: row.approved ? 'green' : 'orange' }">{{ row.approved ? 'COMPLETED' : 'PENDING' }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <p></p>
    <q-btn flat @click="sendSMS" color="primary" label="Remind the current Approver" class="q-ml-sm" />
  </div>
</template>

<script>
import axios from 'axios';
import { QTable, QTr, QTh, QTd } from 'quasar';

export default {
  name: 'GetForm',

  components: {
    QTable,
    QTr,
    QTh,
    QTd,
  },

  data() {
    return {
      Form: [],
      columns: [
        { name: 'approverTitle', required: true, label: 'Approver Title', align: 'center', field: 'title', sortable: true },
        { name: 'approverName', required: true, label: 'Approver Name', align: 'center', field: 'name', sortable: true },
        { name: 'status', required: true, label: 'Status', align: 'center', field: 'approved', sortable: true },
      ],
    };
  },

  mounted() {
    axios
      .get('http://localhost:3000/track')
      .then((response) => {
        console.log(response.data);
        this.Form = response.data.appr;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
      sendSMS() {
      const phoneNumber = '+639358403712'
      const message = 'Good day! There is a pending HRSI form that needs your attention.'
      const accountSid = 'ACc482a44e914ba27f3af09bab31fc6e4c'
      const authToken = 'f95b99ed53499e65ef6b21297cdeff70'

      fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(`${accountSid}:${authToken}`),
        },
        body: new URLSearchParams({
          To: phoneNumber,
          From: '+12544420867',
          Body: message,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('SMS sent successfully!')
          } else {
            console.error('Failed to send SMS:', response.statusText)
          }
        })
        .catch((error) => {
          console.error('Error sending SMS:', error)
        })
    }
  }

};
</script>


