import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders time in HH:MM:SS format', () => {
    render(<App />)
    expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeTruthy()
  })

  it('renders date in Turkish', () => {
    render(<App />)
    expect(screen.getByText(/Pazartesi|Salı|Çarşamba|Perşembe|Cuma|Cumartesi|Pazar/)).toBeTruthy()
  })
})
