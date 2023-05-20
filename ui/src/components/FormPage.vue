template>
  <div class="part1">
    <label>Nature of Transaction:</label>
    <q-select
      v-model="selectedTransaction"
      :options="nature"
      emit-value
      map-options />

    <div v-if="selectedTransaction.includes('sales')">
      <p>Selected Transaction: {{ selectedTransaction }}</p><br>
      <label>Official Receipt No:</label><br>
      <input type="text" v-model="sales_official_receipt" /><br>

      <label>Upload XU Official Receipt:</label><br>
      <input type="file" @change="handleFileChange" />
    </div>

    <div v-if="selectedTransaction.includes('transfer_loc')">
      <p>Selected Transaction: {{ selectedTransaction }}</p><br>
      <label>From:</label><br>
      <input type="text" v-model="transfer_from" /><br>

      <label>To:</label><br>
      <input type="text" v-model="transfer_to" /><br>

      <label>Transfer Form No:</label><br>
      <input type="text" v-model="transfer_form_number" /><br>

      <label>Upload Accomplished Transfer Form w/ MR:</label><br>
      <input type="file" @change="handleFileChange" />
    </div>

    <div v-if="selectedTransaction.includes('repair_replacement')">
      <p>Selected Transaction: {{ selectedTransaction }}</p><br>

      <label>Warranty availability:</label>
      <q-select v-model="repair_warranty" :options="repair_or_replacement"></q-select>
      <br>

      <label>Company:</label><br>
      <input type="text" v-model="repair_company" placeholder="Enter company" /><br>

      <label>Upload Assessment from CISO or PPO:</label><br>
      <input type="file" @change="handleFileChange" />
    </div>

    <div v-if="selectedTransaction.includes('borrowed')">
      <p>Selected Transaction: {{ selectedTransaction }}</p><br>

      <label>Location:</label><br>
      <input type="text" v-model="borrowed_location" placeholder="Enter full address" /><br>

      <label>Date item returned:</label>
      <input type="text" v-model="borrowed_return_date" placeholder="Enter full address" /><br>

      <label>Upload Request to Borrow Form:</label><br>
      <input type="file" @change="handleFileChange" />
    </div>

    <div v-if="selectedTransaction.includes('others')">
      <p>Selected Transaction: {{ selectedTransaction }}</p><br>

      <label>Input your nature of transaction:</label><br>
      <input type="text" v-model="others_description" placeholder="Enter description" />
    </div>

    <button type="next" @click="slideNext">Next</button>
  </div>

  <div class="part2">
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
      <tr v-for="(item, index) in item_fields" :key="index">
        <td>{{ index + 1 }}</td>

        <td>
          <input type="text" v-model="item.particulars" />
        </td>

        <td>
          <input type="text" v-model="item.propertyTag" />
        </td>

        <td>
          <input type="number" v-model="item.quantity" />
        </td>

        <td>
          <input type="number" v-model="item.amount" />
        </td>

        <td>
          <button @click="removeItem(index)">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>

    <button @click="addItem">Add Item</button>
  </div>

  <div class="submit">
    <button type="submit" @click="slideNext">Submit</button>
  </div>
</template>

<script>
import { QSelect } from "quasar";

export default {
  name: "FormPage",
  components: {
    QSelect
  },
  data() {
    return {
      selectedTransaction: "",
      sales_official_receipt: "",
      transfer_from: "",
      transfer_to: "",
      transfer_form_number: "",
      repair_warranty: null,
      repair_company: "",
      borrowed_location: "",
      borrowed_return_date: "",
      others_description: "",
      number_of_items: 0,
      item_fields: [],
      currentPosition: "0px",
      slideWidth: 0,
      nature: [
        { label: "Sales (Scraps, MRF, Vermi, Manresa Farm products, etc.)", value: "sales" },
        { label: "Transfer Location / Property Donation", value: "transfer_loc" },
        { label: "For Repair / Replacement", value: "repair_replacement" },
        { label: "Borrowed items/equipments", value: "borrowed" },
        { label: "Others", value: "others" }
      ],
      repair_or_replacement: [
        { label: "With Warranty", value: "w_warranty" },
        { label: "Without Warranty", value: "wo_warranty" }
      ]
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
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
    }
  }
};
</script>
