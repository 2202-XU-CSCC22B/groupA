const { mount } = require('@vue/test-utils');
const assert = require('assert');
const FormPage = require('@/components/FormPage.vue').default;

describe('FormPage', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(FormPage);
    assert.strictEqual(wrapper.exists(), true);
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

});