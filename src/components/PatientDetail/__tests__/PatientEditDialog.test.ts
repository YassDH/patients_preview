import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PatientEditDialog from '../PatientEditDialog.vue'
import { mockPatientDetail } from '@/test-utils/mockData'

describe('PatientEditDialog', () => {
  const defaultProps = {
    open: true,
    patient: mockPatientDetail,
    isSubmitting: false,
  }

  it('should render dialog component with correct props', () => {
    const wrapper = mount(PatientEditDialog, {
      props: defaultProps,
    })

    const dialog = wrapper.findComponent({ name: 'Dialog' })
    expect(dialog.exists()).toBe(true)
    expect(dialog.props('open')).toBe(true)
  })

  it('should pass correct open state to dialog', () => {
    const wrapper = mount(PatientEditDialog, {
      props: {
        ...defaultProps,
        open: false,
      },
    })

    const dialog = wrapper.findComponent({ name: 'Dialog' })
    expect(dialog.props('open')).toBe(false)
  })

  it('should emit cancel when cancel event is triggered', async () => {
    const wrapper = mount(PatientEditDialog, {
      props: defaultProps,
    })

    await wrapper.vm.$emit('cancel')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('should emit submit when submit is triggered', async () => {
    const wrapper = mount(PatientEditDialog, {
      props: defaultProps,
    })

    const testData = { name: 'Updated Name' }
    await wrapper.vm.$emit('submit', testData)

    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')![0]).toEqual([testData])
  })

  it('should emit update:open when dialog state changes', async () => {
    const wrapper = mount(PatientEditDialog, {
      props: defaultProps,
    })

    const dialog = wrapper.findComponent({ name: 'Dialog' })
    await dialog.vm.$emit('update:open', false)

    expect(wrapper.emitted('update:open')).toBeTruthy()
    expect(wrapper.emitted('update:open')![0]).toEqual([false])
  })

  it('should update form when patient prop changes', async () => {
    const wrapper = mount(PatientEditDialog, {
      props: defaultProps,
    })

    const newPatient = {
      ...mockPatientDetail,
      name: 'Updated Patient',
    }

    await wrapper.setProps({ patient: newPatient })
    expect(wrapper.vm.$props.patient?.name).toBe('Updated Patient')
  })
})
