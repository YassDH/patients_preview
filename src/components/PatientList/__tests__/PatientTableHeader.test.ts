import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PatientTableHeader from '../PatientTableHeader.vue'

describe('PatientTableHeader', () => {
  it('should render patient count in title', () => {
    const wrapper = mount(PatientTableHeader, {
      props: {
        patientCount: 5,
      },
    })

    expect(wrapper.text()).toContain('Patients (5)')
  })

  it('should handle zero patient count', () => {
    const wrapper = mount(PatientTableHeader, {
      props: {
        patientCount: 0,
      },
    })

    expect(wrapper.text()).toContain('Patients (0)')
  })

  it('should handle large patient count', () => {
    const wrapper = mount(PatientTableHeader, {
      props: {
        patientCount: 1234,
      },
    })

    expect(wrapper.text()).toContain('Patients (1234)')
  })

  it('should have proper structure with card and header', () => {
    const wrapper = mount(PatientTableHeader, {
      props: {
        patientCount: 1,
      },
    })

    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'CardHeader' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'CardTitle' }).exists()).toBe(true)
  })
})
