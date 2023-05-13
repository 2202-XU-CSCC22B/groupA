<template>
    <head>
        <title>Property Pass Form</title>
    </head>
    <body>
        <div>
            <label>Nature of Transaction:</label>
            <multiselect
            v-model="selectedTransaction"
            :options="nature"
            @input="handleOptionChange"
            ></multiselect>

            <div v-if="selectedTransaction === 'Sales(Scraps, MRF, Vermi, Manresa Farm products, etc.)'">
            <label>Select another option:</label>
            <label>Official Receipt No.:</label>
            <input type="text" v-model="sales_official_receipt" />
            <label>Upload XU Official Receipt:</label>
            <input type="file" @change="handleFileChange" />
            </div>

            <div v-if="selectedTransaction === 'Transfer Location/Property Donation'">
            <label>From:</label>
            <input type="text" v-model="transfer_from" />
            <label>To:</label>
            <input type="text" v-model="transfer_to" />
            <label>Transfer Form No.:</label>
            <input type="text" v-model="transfer_form_number" />
            <label>Upload Accomplished Transfer Form w/ MR:</label>
            <input type="file" @change="handleFileChange" />
            </div>

            <div v-if="selectedTransaction === 'For Repair/Replacement'">
            <label>Warranty availability:</label>
            <multiselect
                v-model="repair_warranty"
                :options="repair_or_replacement"
            ></multiselect>
            <label>Company:</label>
            <input type="text" v-model="repair_company" placeholder="Enter company" />
            <label>Upload Assessment from CISO or PPO:</label>
            <input type="file" @change="handleFileChange" />
            </div>

            <div v-if="selectedTransaction === 'Borrowed items/equipment'">
            <label>Location:</label>
            <input type="text" v-model="borrowed_location" placeholder="Enter full address" />
            <label>Date item returned:</label>
            <date-pick v-model="borrowed_return_date" />
            <label>Upload Request to Borrow Form:</label>
            <input type="file" @change="handleFileChange" />
            </div>

            <div v-if="selectedTransaction === 'Others'">
            <label>Input your nature of transaction:</label>
            <input type="text" v-model="others_description" placeholder="Enter description" />
            </div>
        </div>
    </body>
</template>

<script>
import Multiselect from 'vue-multiselect';
import DatePick from 'vue-date-pick';
import axios from 'axios';

export default {
  components: {
    Multiselect, DatePick, axios
  },
  data() {
    return {
      selectedTransaction: null,
      sales_official_receipt: '',
      transfer_from:'',
      transfer_to:'',
      transfer_form_number:'',
      repair_warranty: null,
      repair_company:'',
      borrowed_location:'',
      borrowed_return_date: null,
      others_description:'',

      
      nature: ['Sales(Scraps, MRF, Vermi, Manresa Farm products, etc.)', 'Transfer Location/Property Donation',
                'For Repair/Replacement', 'Borrowed items/equipment', 'Others'],
      repair_or_replacement: ['With Warranty', 'Without Warranty'],
    };
  },
  methods: {
    handleOptionChange() {
      if (this.selectedTransaction === 'Sales(Scraps, MRF, Vermi, Manresa Farm products, etc.)') {
        this.sales_official_receipt = '';
      }
      else if(this.selectedTransaction === 'Transfer Location/Property Donation') {
        this.transfer_from = '';
        this.transfer_to = '';
        this.transfer_form_number = '';
      }
      else if (this.selectedTransaction === 'For Repair/Replacement') {
        this.repair_warranty = null;
        this.repair_company = '';
      }
      else if(this.selectedTransaction === 'Borrowed items/equipment') {
        this.borrowed_location = '';
        this.borrowed_return_date = null;
      }
      else if(this.selectedTransaction === 'Others') {
        this.others_description = '';
      }
      else{
        console.log("*");
      }
    },

    handleFileChange(event) {
      this.file = event.target.files[0];
    },

    saveData(){
        const data = {
        selectedTransaction: this.selectedTransaction,
        salesOfficialReceipt: this.sales_official_receipt,
        transferFrom: this.transfer_from,
        transferTo: this.transfer_to,
        transferFormNumber: this.transfer_form_number,
        repairWarranty: this.repair_warranty,
        repairCompany: this.repair_company,
        borrowedLocation: this.borrowed_location,
        borrowedReturnDate: this.borrowed_return_date,
        othersDescription: this.others_description,
        file: this.file,
        };

        axios
            .post('/api/save-data', data)
            .then((response) => {
            console.log('Data saved successfully:', response.data);
            // Handle success case
            })
            .catch((error) => {
            console.error('Error saving data:', error);
            // Handle error case
            });
    }
  },
};
</script>

			
