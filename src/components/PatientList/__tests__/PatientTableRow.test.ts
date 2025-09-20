import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PatientTableRow from '../PatientTableRow.vue'
import { mockPatient } from '@/test-utils/mockData'

describe('PatientTableRow', () => {
  it('should render patient information', () => {
    const wrapper = mount(PatientTableRow, {
      props: { patient: mockPatient },
    })

    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('ID: 1')
    expect(wrapper.text()).toContain('New')
  })

  it('should format join date correctly', () => {
    const wrapper = mount(PatientTableRow, {
      props: { patient: mockPatient },
    })

    expect(wrapper.text()).toContain('Jan 15, 2023')
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(PatientTableRow, {
      props: { patient: mockPatient },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should emit click when button is clicked', async () => {
    const wrapper = mount(PatientTableRow, {
      props: { patient: mockPatient },
    })

    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
