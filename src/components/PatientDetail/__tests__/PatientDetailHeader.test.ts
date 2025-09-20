import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PatientDetailHeader from '../PatientDetailHeader.vue'

describe('PatientDetailHeader', () => {
  it('should render page title', () => {
    const wrapper = mount(PatientDetailHeader)

    expect(wrapper.text()).toContain('Patient Details')
  })

  it('should render back button with correct text', () => {
    const wrapper = mount(PatientDetailHeader)

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Back to Patient List')
  })

  it('should emit back event when back button is clicked', async () => {
    const wrapper = mount(PatientDetailHeader)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('back')).toBeTruthy()
    expect(wrapper.emitted('back')).toHaveLength(1)
  })
})
