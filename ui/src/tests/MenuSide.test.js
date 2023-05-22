import { shallowMount } from '@vue/test-utils';
import MenuSide from '@/components/MenuSide.vue';

describe('MenuSide', () => {
  it('renders the component correctly with provided props', () => {
    const title = 'Menu Title';
    const caption = 'Menu Caption';
    const to = '/menu';
    const icon = 'menu-icon';

    const wrapper = shallowMount(MenuSide, {
      props: {
        title,
        caption,
        to,
        icon,
      },
    });

    // Assert the rendered component structure
    expect(wrapper.find('q-item').exists()).toBe(true);
    expect(wrapper.find('q-item-section').exists()).toBe(true);
    expect(wrapper.find('q-icon').exists()).toBe(true);
    expect(wrapper.find('q-item-label').text()).toBe(title);
    expect(wrapper.find('q-item-label.caption').text()).toBe(caption);

    // Assert the component props
    expect(wrapper.props().title).toBe(title);
    expect(wrapper.props().caption).toBe(caption);
    expect(wrapper.props().to).toBe(to);
    expect(wrapper.props().icon).toBe(icon);
  });

  it('renders the component with default props when not provided', () => {
    const wrapper = shallowMount(MenuSide);

    // Assert the rendered component structure
    expect(wrapper.find('q-item').exists()).toBe(true);
    expect(wrapper.find('q-item-section').exists()).toBe(false);
    expect(wrapper.find('q-icon').exists()).toBe(false);
    expect(wrapper.find('q-item-label').exists()).toBe(true);
    expect(wrapper.find('q-item-label.caption').exists()).toBe(true);

    // Assert the component props
    expect(wrapper.props().title).toBe('');
    expect(wrapper.props().caption).toBe('');
    expect(wrapper.props().to).toBe('#');
    expect(wrapper.props().icon).toBe('');
  });
});
