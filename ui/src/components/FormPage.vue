<template>
  <div class = "back-button">
      <q-btn  flat dense icon="arrow_back" @click="backDashboard" color = "#283971"/>
  </div>

  <div class="form-container">

    <div class = "title">
      Property Pass Form
    </div>

    <div class="part0">
      <div class="input-wrapper">
        <label class="form-label">Name:</label>
        <input type="text" v-model="name" class="form-input" />
      </div>

      <div class="input-wrapper">
        <label class="form-label">Date:</label>
        <input type="date" v-model="curr_date" class="form-input" />
      </div>
    </div>

    <div class="part1">

      <div class="transaction-container">
        <label class="form-label">Nature of Transaction:</label>
        <q-select
          v-model="selectedTransaction"
          :options="nature"
          emit-value
          map-options
          class="form-select"
        />
      </div>

      <div v-if="selectedTransaction.includes('sales')" class="transaction-details">
        <label class="form-label">Official Receipt No:</label><br>
        <input type="text" v-model="sales_official_receipt" class="form-input"/>

        <label class="form-label">XU Official Receipt:</label><br>
        <q-file v-model="file" @change="handleFileChange" label="Drop file here" class="form-input" />
      </div>

      <div v-if="selectedTransaction.includes('transfer_loc')" class="transaction-details">
        <label class="form-label">From:</label><br>
        <input type="text" v-model="transfer_from" class="form-input" />

        <label class="form-label">To:</label><br>
        <input type="text" v-model="transfer_to" class="form-input" />

        <label class="form-label">Transfer Form No:</label><br>
        <input type="text" v-model="transfer_form_number" class="form-input" />

        <label class="form-label">Accomplished Transfer Form w/ MR:</label><br>
        <q-file v-model="file" @change="handleFileChange" label="Drop file here" class="form-input" />
      </div>

      <div v-if="selectedTransaction.includes('repair_replacement')" class="transaction-details">
        <div class="transaction-container">
          <label class="form-label">Warranty availability:</label>
          <q-select v-model="repair_warranty" 
          :options="repair_or_replacement" 
          emit-value
          map-options 
          class="form-select" />
        </div>
        <br>
        <label class="form-label">Company:</label><br>
        <input type="text" v-model="repair_company" placeholder="Enter company" class="form-input" />

        <label class="form-label">Assessment from CISO or PPO:</label><br>
        <q-file v-model="file" @change="handleFileChange" label="Drop file here" class="form-input" />
      </div>

      <div v-if="selectedTransaction.includes('borrowed')" class="transaction-details">
        <label class="form-label">Location:</label><br>
        <input type="text" v-model="borrowed_location" placeholder="Enter full address" class="form-input" />

        <label class="form-label">Date item returned:</label><br>
        <input type="date" v-model="borrowed_return_date" class="form-input" />

        <label class="form-label">Request to Borrow Form:</label><br>
        <q-file v-model="file" @change="handleFileChange" label="Drop file here" class="form-input" />
      </div>

      <div v-if="selectedTransaction.includes('others')" class="transaction-details">
        <label class="form-label">Input your nature of transaction:</label><br>
        <textarea v-model="others_description" placeholder="Enter description" class="form-input" />
        <label class="form-label">(Optional)Upload relevant file:</label><br>
        <q-file v-model="file" @change="handleFileChange" label="Drop file here" class="form-input" />
      </div>

      <div class = "user-remarks">
        <label class="form-label">Remarks:</label><br>
        <textarea v-model="user_remarks" placeholder="Enter remarks" class="form-input" />
      </div>

    </div>

    <div class="part2">
      <div class="table-container">
        <table class="item-table">
        <thead>
          <tr>
            <th>Item No.</th>
            <th>Particulars</th>
            <th>Property Tag</th>
            <th>No. of items</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in item_fields" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <input type="text" v-model="item.particulars" class="form-input" />
            </td>
            <td>
              <input type="text" v-model="item.propertyTag" class="form-input" />
            </td>
            <td>
              <input type="number" v-model="item.quantity" class="form-input" />
            </td>
            <td>
              <input type="number" v-model="item.amount" class="form-input" />
            </td>
            <td>
              <button @click="removeItem(index)" class="remove-button">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>


      </div>
      <button @click="addItem" class="add-button">Add Item</button>
    </div>

    <div class="submit">
      <button @click="submitForm" class="submit-button">Submit</button>
    </div>
  </div>
</template>

<script>
import { QSelect } from "quasar";
import { QFile } from "quasar";
import { QBtn } from 'quasar';
import { api } from 'boot/axios-config.js';



export default {
  name: "FormPage",
  components: {
    QSelect,
    QFile,
    QBtn
  },
  data() {
    return {

      name: "",
      curr_date: "",
      selectedTransaction: "",

      file: null,
      fileKey: "",
      

      sales_official_receipt: "",
      
      transfer_from: "",
      transfer_to: "",
      transfer_form_number: "",
      
      repair_company: "",
      repair_warranty: null,

      borrowed_location: "",
      borrowed_return_date: "",
    
      others_description: "",

      user_remarks: "",
      number_of_items: 0,
      item_fields: [],

      nature: [
        { label: "Sales (Scraps, MRF, Vermi, Manresa Farm products, etc.)", value: "sales" },
        { label: "Transfer Location / Property Donation", value: "transfer_loc" },
        { label: "For Repair / Replacement", value: "repair_replacement" },
        { label: "Borrowed items/equipments", value: "borrowed" },
        { label: "Others", value: "others" }
      ],
      repair_or_replacement: [
        { label: "With Warranty", value: true },
        { label: "Without Warranty", value: false }
      ],
      repair_selected: false,
    };
  },
  watch: {
    selectedRepairWarranty(value) {
      this.repair_selected = value === true;
    },
  },
  methods: {
    backDashboard(){
      this.$router.push({ path: '/dashboard', component: () => import('layouts/MainLayout.vue') });
    },

    addItem() {
      this.item_fields.push({
        particulars: "",
        propertyTag: "",
        quantity: 0,
        amount: 0
      });
    },

    removeItem(index) {
      this.item_fields.splice(index, 1);
    },

    handleFileChange(event) {
      this.file = event.target.files[0];

      const fileName = this.file.name;
      const fileKey = fileName.split('.')[0];

      this.fileKey = fileKey;
    },

    isFieldRequired(field) {
      return field === '';
    },

    async submitForm() {

      const emptyFields = [];

      if (this.isFieldRequired(this.name) && this.name.trim() === '') {
        emptyFields.push('Name');
      }

      if (this.isFieldRequired(this.curr_date) && this.curr_date.trim() === '') {
        emptyFields.push('Date');
      }

      if (this.isFieldRequired(this.selectedTransaction) && this.selectedTransaction.trim() === '') {
        emptyFields.push('Nature of Transaction');
      }


      if (this.selectedTransaction.includes('sales')) {
        if (this.isFieldRequired(this.sales_official_receipt) && this.sales_official_receipt.trim() === '') {
          emptyFields.push('Official Receipt No');
        }
        if (this.isFieldRequired(this.file) && this.fileKey.trim() === '') {
          emptyFields.push('XU Official Receipt');
        }
        
      }

      if (this.selectedTransaction.includes('transfer_loc')) {
        if (this.isFieldRequired(this.transfer_from) && this.transfer_from.trim() === '') {
          emptyFields.push('Transfer From');
        }
        if (this.isFieldRequired(this.transfer_to) && this.transfer_to.trim() === '') {
          emptyFields.push('Transfer To');
        }
        if (this.isFieldRequired(this.transfer_form_number) && this.transfer_form_number.trim() === ''){
          emptyFields.push('Transfer Form No')
        }
        if (this.isFieldRequired(this.file) && this.fileKey.trim() === '') {
          emptyFields.push('Accomplished Transfer Form w/ MR');
        }
      }

      if (this.selectedTransaction.includes('borrowed')) {
        if (this.isFieldRequired(this.borrowed_location) && this.borrowed_location.trim() === '') {
          emptyFields.push('Location');
        }
        if (this.isFieldRequired(this.borrowed_return_date) && this.borrowed_return_date.trim() === '') {
          emptyFields.push('Date item returned');
        }
        if (this.isFieldRequired(this.file) && this.fileKey.trim() === '') {
          emptyFields.push('Request to Borrow Form');
        }
      }

      if (this.selectedTransaction.includes('repair_replacement')) {
        if (this.isFieldRequired(this.repair_warranty) && this.repair_warranty.trim() === '') {
          emptyFields.push('Warranty Availability');
        }
        if (this.isFieldRequired(this.repair_company) && this.repair_company.trim() === '') {
          emptyFields.push('Company');
        }
        if (this.isFieldRequired(this.file) && this.fileKey.trim() === '') {
          emptyFields.push('Assessment from CISO or PPO');
        }
      }

      // Display error message if there are empty required fields
      if (emptyFields.length > 0) {
        const errorMessage = `Please fill in the following required fields: ${emptyFields.join(', ')}`;
        alert(errorMessage);
        return;
      }
      
      const formData = {
        name: this.name,
          curr_date: this.curr_date,
          selectedTransaction: this.selectedTransaction,
          sales_official_receipt: this.sales_official_receipt,
          
          transfer_from: this.transfer_from,
          transfer_to: this.transfer_to,
          transfer_form_number: this.transfer_form_number,
          
          repair_company: this.repair_company,
          repair_warranty: this.repair_warranty,
          
          borrowed_location: this.borrowed_location,
          borrowed_return_date: this.borrowed_return_date,
          
          others_description: this.others_description,

          file: this.fileKey,

          user_remarks: this.user_remarks,
          item_fields: this.item_fields,
        };

        try {
          const response = await api.post('/submit-form', formData);

          if (response.status === 201) {
            console.log('Form created:', response.data);
            this.$router.push({ path: '/formSubmitted', component: () => import('pages/FormSubmit.vue') });
          } else {
            console.log('Failed to send form to the database.');
          }
        } catch (error) {
          console.error('Error sending form:', error);
        }
    }

  }
}
</script>
<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  overflow-y: auto;
}

.part0 {
  display: flex;
  justify-content: space-between;
}

.input-wrapper {
  width: 48%; 
  
}

.title{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.transaction-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-select {
  width: 300px;
}

.form-input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.transaction-details {
  margin-top: 20px;
}

.part2{
  width:100%;
  display: block;
  overflow-y: auto;
}

.table-container{
  max-height: 300px;
  overflow-y: auto;
}
.item-table {
  width: 100%;
  border-collapse: collapse;
  overflow-y: auto;
}

.item-table th,
.item-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.back-button {
  margin-right: 10px;
  margin-left: 0;
}

.remove-button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.remove-button:hover {
  background-color: #c0392b; 
}

.add-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #27ae60; 
}

.submit-button {
  padding: 10px 20px;
  background-color: #283971;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #4866C9;; 
}


</style>
