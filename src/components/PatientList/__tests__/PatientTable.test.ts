import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PatientTable from '../PatientTable.vue'
import { mockPatients } from '@/test-utils/mockData'

describe('PatientTable', () => {
  it('should render empty state when no patients', () => {
    const wrapper = mount(PatientTable, {
      props: { patients: [] },
    })

    expect(wrapper.text()).toContain('No patients found')
    expect(wrapper.text()).toContain('Try adjusting your search')
  })

  it('should render patients when provided', () => {
    const wrapper = mount(PatientTable, {
      props: { patients: mockPatients },
    })

    expect(wrapper.text()).not.toContain('No patients found')

    expect(wrapper.text()).toContain('Patient')
    expect(wrapper.text()).toContain('Join Date')
    expect(wrapper.text()).toContain('Status')
    expect(wrapper.text()).toContain('Actions')
  })

  it('should emit patientClick when row is clicked', async () => {
    const wrapper = mount(PatientTable, {
      props: { patients: [mockPatients[0]] },
    })

    const patientRow = wrapper.findComponent({ name: 'PatientTableRow' })
    await patientRow.vm.$emit('click')

    expect(wrapper.emitted('patientClick')).toBeTruthy()
    expect(wrapper.emitted('patientClick')![0]).toEqual([mockPatients[0].id])
  })

  it('should handle single patient correctly', () => {
    const singlePatient = [mockPatients[0]]
    const wrapper = mount(PatientTable, {
      props: { patients: singlePatient },
    })

    const rows = wrapper.findAllComponents({ name: 'PatientTableRow' })
    expect(rows).toHaveLength(1)
  })
})
