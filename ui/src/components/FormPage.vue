<template>
    <div class="slider-container">
      <div class="slider-content" :style="{ left: currentPosition }">
        <div class="slide">
          <label>Nature of Transaction:</label>
          <q-select v-model="selectedTransaction" :options="nature"></q-select>
  
          <div v-if="selectedTransaction.includes('sales')">
            <label>Official Receipt No.:</label>
            <input type="text" v-model="sales_official_receipt" />
            <label>Upload XU Official Receipt:</label>
            <input type="file" @change="handleFileChange" />
          </div>
  
          <div v-if="selectedTransaction.includes('transfer_loc')">
            <label>From:</label>
            <input type="text" v-model="transfer_from" />
            <label>To:</label>
            <input type="text" v-model="transfer_to" />
            <label>Transfer Form No.:</label>
            <input type="text" v-model="transfer_form_number" />
            <label>Upload Accomplished Transfer Form w/ MR:</label>
            <input type="file" @change="handleFileChange" />
          </div>
  
          <div v-if="selectedTransaction.includes('repair_replacement')">
            <label>Warranty availability:</label>
            <q-select v-model="repair_warranty" :options="repair_or_replacement"></q-select>
            <label>Company:</label>
            <input type="text" v-model="repair_company" placeholder="Enter company" />
            <label>Upload Assessment from CISO or PPO:</label>
            <input type="file" @change="handleFileChange" />
          </div>
  
          <div v-if="selectedTransaction.includes('borrowed')">
            <label>Location:</label>
            <input type="text" v-model="borrowed_location" placeholder="Enter full address" />
            <label>Date item returned:</label>
            <date-pick v-model="borrowed_return_date" />
            <label>Upload Request to Borrow Form:</label>
            <input type="file" @change="handleFileChange" />
          </div>
  
          <div v-if="selectedTransaction.includes('others')">
            <label>Input your nature of transaction:</label>
            <input type="text" v-model="others_description" placeholder="Enter description" />
          </div>
  
          <button type="next" @click="slideNext">Next</button>
        </div>
        <div class="slide">
          <label>Number of items to process:</label>
          <input type="number" v-model="number_of_items" />
          <button type="button" @click="generateInputs">Generate</button>
          <table>
            <thead>
              <tr>
                <th>Item No.</th>
                <th>Particulars</th>
                <th>Property Tag</th>
                <th>No. of items</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(input, index) in item_fields" :key="index">
                <td>{{ index + 1 }}</td>
                <td><input type="text" v-model="input.particulars" /></td>
                <td><input type="text" v-model="input.propertyTag" /></td>
                <td><input type="number" v-model="input.numberOfItems" /></td>
                <td><input type="number" v-model="input.amount" /></td>
              </tr>
            </tbody>
        </table>
        
        <button @click="slideBack">Back</button>
        <button type="submit" @click="saveData">Submit</button>
    </div>
    </div>
  </div>
</template>

<script>

import DatePick from 'vue-date-pick';

export default {
  name: 'FormPage',
  components: {
    DatePick
  },
  data() {
    return {
      selectedTransaction: [],
      sales_official_receipt: '',
      transfer_from: '',
      transfer_to: '',
      transfer_form_number: '',
      repair_warranty: null,
      repair_company: '',
      borrowed_location: '',
      borrowed_return_date: null,
      others_description: '',
      number_of_items: 0,
      item_fields: [],

      nature: [
        { label: 'Sales (Scraps, MRF, Vermi, Manresa Farm products, etc.)', value: 'sales' },
        { label: 'Transfer Location / Property Donation', value: 'transfer_loc' },
        { label: 'For Repair / Replacement', value: 'repair_replacement' },
        { label: 'Borrowed items/equipments', value: 'borrowed' },
        { label: 'Others', value: 'others' }
      ],
      repair_or_replacement: [
        { label: 'With Warranty', value: 'w_warranty' },
        { label: 'Without Warranty', value: 'wo_warranty' }
      ],

      currentPosition: "0px",
      slideWidth: 0
    };
  },
  methods: {
    handleOptionChange() {
      if (this.selectedTransaction.includes('sales')) {
        this.sales_official_receipt = '';
      } else if (this.selectedTransaction.includes('transfer_loc')) {
        this.transfer_from = '';
        this.transfer_to = '';
        this.transfer_form_number = '';
      } else if (this.selectedTransaction.includes('repair_replacement')) {
        this.repair_warranty = null;
        this.repair_company = '';
      } else if (this.selectedTransaction.includes('borrowed')) {
        this.borrowed_location = '';
        this.borrowed_return_date = null;
      } else if (this.selectedTransaction.includes('others')) {
        this.others_description = '';
      } else {
        console.log("*");
      }
    },

    handleFileChange(event) {
      this.file = event.target.files[0];
    },

    slideNext() {
      const numSlides = document.querySelectorAll(".slide").length;
      const maxWidth = this.slideWidth * (numSlides - 1);
      const currentPositionValue = parseInt(this.currentPosition, 10);

      if (currentPositionValue > -maxWidth) {
        this.currentPosition = `${currentPositionValue - this.slideWidth}px`;
      }
    },

    slideBack() {
      const currentPositionValue = parseInt(this.currentPosition, 10);

      if (currentPositionValue < 0) {
        this.currentPosition = `${currentPositionValue + this.slideWidth}px`;
      }
    },

    generateInputs() {
      const numberOfInputs = parseInt(this.number_of_items);
      this.item_fields = Array.from({ length: numberOfInputs }, () => ({
        particulars: '',
        propertyTag: '',
        numberOfItems: 0,
        amount: 0
      }));
    },
}
};
</script>
