// Import the component
import IndexPage from '@/components/IndexPage.vue';
import axios from 'axios';

jest.mock('axios');

describe('IndexPage', () => {
  it('should login successfully', async () => {
    const email = 'test@example.com';
    const password = 'password';

    // Mock the axios get method to return a successful response
    axios.get.mockResolvedValue({
      status: 200,
      data: { message: 'Login successful' }
    });

    // Create a new instance of the component
    const wrapper = mount(IndexPage);

    // Set the email and password data properties
    wrapper.setData({ email, password });

    // Call the login method
    await wrapper.vm.login();

    // Assert that the login was successful
    expect(wrapper.vm.$data.email).toBe('');
    expect(wrapper.vm.$data.password).toBe('');
    expect(console.log).toHaveBeenCalledWith('Login successful');
  });

  it('should handle incorrect email or password', async () => {
    const email = 'test@example.com';
    const password = 'password';

    // Mock the axios get method to return a 401 status response
    axios.get.mockResolvedValue({
      status: 401,
      data: { message: 'Email or password incorrect' }
    });

    // Create a new instance of the component
    const wrapper = mount(IndexPage);

    // Set the email and password data properties
    wrapper.setData({ email, password });

    // Call the login method
    await wrapper.vm.login();

    // Assert that the error message is logged
    expect(console.log).toHaveBeenCalledWith('Email or password incorrect');
  });

  it('should handle email not found', async () => {
    const email = 'test@example.com';
    const password = 'password';

    // Mock the axios get method to return a 404 status response
    axios.get.mockResolvedValue({
      status: 404,
      data: { message: 'Email not found' }
    });

    // Create a new instance of the component
    const wrapper = mount(IndexPage);

    // Set the email and password data properties
    wrapper.setData({ email, password });

    // Call the login method
    await wrapper.vm.login();

    // Assert that the error message is logged
    expect(console.log).toHaveBeenCalledWith('Email not found');
  });

  it('should handle error', async () => {
    const email = 'test@example.com';
    const password = 'password';

    // Mock the axios get method to throw an error
    axios.get.mockRejectedValue(new Error('Network error'));

    // Create a new instance of the component
    const wrapper = mount(IndexPage);

    // Set the email and password data properties
    wrapper.setData({ email, password });

    // Call the login method
    await wrapper.vm.login();

    // Assert that the error is logged
    expect(console.error).toHaveBeenCalledWith(new Error('Network error'));
  });
});