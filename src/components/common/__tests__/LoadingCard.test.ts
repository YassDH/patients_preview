import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingCard from '../LoadingCard.vue'

describe('LoadingCard', () => {
  it('should render default loading message', () => {
    const wrapper = mount(LoadingCard)
    expect(wrapper.text()).toContain('Loading...')
  })

  it('should render custom message', () => {
    const wrapper = mount(LoadingCard, {
      props: { message: 'Fetching data...' },
    })
    expect(wrapper.text()).toContain('Fetching data...')
  })

  it('should have loading spinner', () => {
    const wrapper = mount(LoadingCard)
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.exists()).toBe(true)
  })
})
