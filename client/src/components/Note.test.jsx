import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Note } from './Note.jsx'

const note = {
  content: 'Component testing is done with react-testing-library',
  important: true
}
describe('Note component', () => {
  it('renders content', () => {
    render(<Note note={note} />)

    const element = screen.getByText(
      'Component testing is done with react-testing-library'
    )
    expect(element).toBeDefined()
  })

  it('clicking the button calls event handler once', async () => {
    const mockHandler = vi.fn()

    render(
      <Note
        note={note}
        toggleImportance={mockHandler}
      />
    )
    const user = userEvent.setup()
    const button = screen.getByText('Make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
