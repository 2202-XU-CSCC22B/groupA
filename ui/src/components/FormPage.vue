<template>
    <head>
        <title>Property Pass Form</title>
    </head>
    <body>
        <div class = "slider-container">
          <div class="slider-content" :style="{ left: currentPosition }">
            <div class = "slide">
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

              <button type="next" @click="slideNext">Next</button>
            </div>
            <div class = "slide">
              <label>Number of items to process:</label>
              <input type="number" v-model="number_of_items" />
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
                      <tr v-for="(input, index) in inputFields" :key="index">
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
    </body>
</template>

<script>
import Multiselect from 'vue-multiselect';
import DatePick from 'vue-date-pick';

export default {
  name: 'FormPage',
  components: {
    Multiselect, DatePick
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
      number_of_items: 0,
      item_fields: [],

      
      nature: ['Sales(Scraps, MRF, Vermi, Manresa Farm products, etc.)', 'Transfer Location/Property Donation',
                'For Repair/Replacement', 'Borrowed items/equipment', 'Others'],
      repair_or_replacement: ['With Warranty', 'Without Warranty'],

      currentPosition: "0px",
      slideWidth: 0,
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
      this.item_fields = Array.from({ length: this.number_of_items }, () => ({
        particulars: '',
        propertyTag: '',
        numberOfItems: 0,
        amount: 0,
      }));
    },
  },
};
</script>

<style>
.slider-container {
  width: 400px;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.slider-content {
  width: 400%;
  height: 100%;
  display: flex;
  transition: left 0.5s;
}

.slide {
  width: 25%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}

.slide button {
  margin-top: 10px;
}
</style>		
