import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PatientSearchFilter from '../PatientSearchFilter.vue'
import { getAllStatusOptions } from '@/lib/utils'

describe('PatientSearchFilter', () => {
  it('should render search input with placeholder', () => {
    const wrapper = mount(PatientSearchFilter, {
      props: {
        searchTerm: '',
        statusFilter: '',
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search patients by name or ID...')
  })

  it('should render status filter dropdown', () => {
    const wrapper = mount(PatientSearchFilter, {
      props: {
        searchTerm: '',
        statusFilter: '',
      },
    })

    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
    expect(wrapper.text()).toContain('All Statuses')
    getAllStatusOptions().map((option) => {
      expect(wrapper.text()).toContain(option.label)
    })
  })

  it('should display current search term', () => {
    const wrapper = mount(PatientSearchFilter, {
      props: {
        searchTerm: 'John Doe',
        statusFilter: '',
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('John Doe')
  })

  it('should display current status filter', () => {
    const wrapper = mount(PatientSearchFilter, {
      props: {
        searchTerm: '',
        statusFilter: '1',
      },
    })

    const select = wrapper.find('select')
    expect(select.element.value).toBe('1')
    expect(select.text()).toContain('New')
  })

  it('should emit update:searchTerm when input changes', async () => {
    const wrapper = mount(PatientSearchFilter, {
      props: {
        searchTerm: '',
        statusFilter: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('Jane')

    expect(wrapper.emitted('update:searchTerm')).toBeTruthy()
    expect(wrapper.emitted('update:searchTerm')![0]).toEqual(['Jane'])
  })

  it('should emit update:statusFilter when select changes', async () => {
    const wrapper = mount(PatientSearchFilter, {
      props: {
        searchTerm: '',
        statusFilter: '',
      },
    })

    const select = wrapper.find('select')
    await select.setValue('2')

    expect(wrapper.emitted('update:statusFilter')).toBeTruthy()
    expect(wrapper.emitted('update:statusFilter')![0]).toEqual(['2'])
  })

  it('should emit clearFilters when clear button is clicked', async () => {
    const wrapper = mount(PatientSearchFilter, {
      props: {
        searchTerm: 'test',
        statusFilter: '1',
      },
    })

    const clearButton = wrapper.find('button')
    await clearButton.trigger('click')

    expect(wrapper.emitted('clearFilters')).toBeTruthy()
  })

  it('should render status options in dropdown', () => {
    const wrapper = mount(PatientSearchFilter, {
      props: {
        searchTerm: '',
        statusFilter: '',
      },
    })

    const options = wrapper.findAll('option')
    expect(options.length).toBeGreaterThan(1)
    expect(options[0].text()).toBe('All Statuses')
  })

  it('should show Clear Filters button with X icon', () => {
    const wrapper = mount(PatientSearchFilter, {
      props: {
        searchTerm: '',
        statusFilter: '',
      },
    })

    const button = wrapper.find('button')
    expect(button.text()).toContain('Clear Filters')
  })
})
