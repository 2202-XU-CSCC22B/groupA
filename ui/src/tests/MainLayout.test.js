const { mount } = require('@vue/test-utils');
const MainLayout = require('../layouts/MainLayout.vue');

describe('MainLayout', () => {
  it('renders the correct number of menu items', () => {
    const wrapper = mount(MainLayout)
    const menuItems = wrapper.findAll('.menu-side-item')
    expect(menuItems.length).toBe(6) // Update the expected count if the linksList changes
  }),

  it('toggles the left drawer when menu button is clicked', async () => {
    const wrapper = mount(MainLayout)
    const menuButton = wrapper.find('.menu-button')
    expect(wrapper.leftDrawerOpen).toBe(false)

    await menuButton.trigger('click')
    expect(wrapper.leftDrawerOpen).toBe(true)

    await menuButton.trigger('click')
    expect(wrapper.leftDrawerOpen).toBe(false)
  }),

  it('has the correct styling for image container and header', () => {
    const wrapper = mount(MainLayout)
    const imageContainer = wrapper.find('.image-container')
    const header = wrapper.find('.q-header')

    expect(imageContainer.attributes('style')).toContain('background-image: url(\'assets/back.jpg\')')
    expect(header.attributes('style')).toContain('background-color: #283971')
  })
})
