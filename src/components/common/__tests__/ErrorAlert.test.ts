import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorAlert from '../ErrorAlert.vue'

describe('ErrorAlert', () => {
  it('should render error message', () => {
    const wrapper = mount(ErrorAlert, {
      props: { message: 'Something went wrong' },
    })

    expect(wrapper.text()).toContain('Something went wrong')
    expect(wrapper.text()).toContain('Error')
  })

  it('should render custom title', () => {
    const wrapper = mount(ErrorAlert, {
      props: {
        message: 'Custom error message',
        title: 'Custom Error',
      },
    })

    expect(wrapper.text()).toContain('Custom Error')
    expect(wrapper.text()).toContain('Custom error message')
  })

  it('should have proper structure', () => {
    const wrapper = mount(ErrorAlert, {
      props: { message: 'Test message' },
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('text-center')
    expect(container.classes()).toContain('py-12')
  })
})
