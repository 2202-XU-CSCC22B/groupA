import { shallowMount } from "@vue/test-utils";
import FormPage from '../components/FormPage';

describe("Property Pass Form", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FormPage, {
      mocks: {
        $refs: {
          backButton: jest.fn(),
          submitButton: jest.fn(),
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should have a back button", () => {
    expect(wrapper.findComponent({ ref: "backButton" }).exists()).toBe(true);
  });

  it("should have a submit button", () => {
    expect(wrapper.findComponent({ ref: "submitButton" }).exists()).toBe(true);
  });

  it("should have a form with the following fields:", () => {
    const form = wrapper.findComponent({ ref: "form" });
    expect(form.vm.$refs.name).toBeDefined();
    expect(form.vm.$refs.curr_date).toBeDefined();
    expect(form.vm.$refs.selectedTransaction).toBeDefined();
    expect(form.vm.$refs.sales_official_receipt).toBeDefined();
    expect(form.vm.$refs.transfer_from).toBeDefined();
    expect(form.vm.$refs.transfer_to).toBeDefined();
    expect(form.vm.$refs.transfer_form_number).toBeDefined();
    expect(form.vm.$refs.repair_company).toBeDefined();
    expect(form.vm.$refs.repair_warranty).toBeDefined();
    expect(form.vm.$refs.borrowed_location).toBeDefined();
    expect(form.vm.$refs.borrowed_return_date).toBeDefined();
    expect(form.vm.$refs.others_description).toBeDefined();
    expect(form.vm.$refs.user_remarks).toBeDefined();
  });

  it("should have a table with the following columns:", () => {
    const table = wrapper.findComponent({ ref: "table" });
    expect(table.props("columns")).toEqual([
      {
        label: "Item No.",
        prop: "itemNo",
      },
      {
        label: "Particulars",
        prop: "particulars",
      },
      {
        label: "Property Tag",
        prop: "propertyTag",
      },
      {
        label: "No. of items",
        prop: "quantity",
      },
      {
        label: "Amount",
        prop: "amount",
      },
      {
        label: "Action",
        prop: "action",
      },
    ]);
  });

  it('adds new items when the "Add Item" button is clicked', async () => {
    const wrapper = mount(FormPage);
    const addItemButton = wrapper.find('.add-button');

    assert.strictEqual(wrapper.findAll('tr').length, 1); 

    await addItemButton.trigger('click'); 

    assert.strictEqual(wrapper.findAll('tr').length, 2); 
  });

  it('removes an item when the "Remove" button is clicked', async () => {
    const wrapper = mount(FormPage);
    const addItemButton = wrapper.find('.add-button');
    const removeButtons = wrapper.findAll('.remove-button');

    assert.strictEqual(wrapper.findAll('tr').length, 1); 

    await addItemButton.trigger('click'); 

    assert.strictEqual(wrapper.findAll('tr').length, 2); 

    await removeButtons[0].trigger('click'); 

    assert.strictEqual(wrapper.findAll('tr').length, 1); 
  });

  it("should submit the form when the submit button is clicked", async () => {
    const form = wrapper.findComponent({ ref: "form" });
    const submitSpy = jest.spyOn(form.vm, "submit");
    await wrapper.findComponent({ ref: "submitButton" }).trigger("click");
    expect(submitSpy).toHaveBeenCalled();
  });
});
