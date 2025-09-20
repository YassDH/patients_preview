import { describe, it, expect } from 'vitest'
import { cn, getAllStatusOptions, getStatusText, getStatusVariant } from '../utils'
import { PatientStatus } from '@/types/Patient'

describe('Utils', () => {
  it('should merge class names', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500')
    expect(result).toBe('px-4 py-2 bg-blue-500')
  })

  it('should handle conditional classes', () => {
    const result = cn('base', true && 'active', false && 'inactive')
    expect(result).toBe('base active')
  })

  it('should handle Tailwind conflicts', () => {
    const result = cn('px-4', 'px-6')
    expect(result).toBe('px-6')
  })

  it('should filter out falsy values', () => {
    const result = cn('valid', '', null, undefined, false, 'also-valid')
    expect(result).toBe('valid also-valid')
  })

  it('should return correct status text', () => {
    expect(getStatusText(PatientStatus.NEW)).toBe('New')
    expect(getStatusText(PatientStatus.PENDING)).toBe('Pending')
    expect(getStatusText(PatientStatus.QUALIFIED)).toBe('Qualified')
    expect(getStatusText(PatientStatus.DISQUALIFIED)).toBe('Disqualified')
  })

  it('should return correct badge variants', () => {
    expect(getStatusVariant(PatientStatus.NEW)).toBe('outline')
    expect(getStatusVariant(PatientStatus.PENDING)).toBe('secondary')
    expect(getStatusVariant(PatientStatus.QUALIFIED)).toBe('default')
    expect(getStatusVariant(PatientStatus.DISQUALIFIED)).toBe('destructive')
  })

  it('should return all status options', () => {
    const options = getAllStatusOptions()
    expect(options).toHaveLength(4)
    expect(options[0]).toEqual({ value: PatientStatus.NEW, label: 'New' })
  })

  it('should throw error for invalid status', () => {
    expect(() => getStatusText(999 as PatientStatus)).toThrow('Wrong status: 999')
  })
})
