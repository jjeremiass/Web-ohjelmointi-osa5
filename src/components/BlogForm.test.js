import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(inputs[0], 'Test Title')
  await user.type(inputs[1], 'Test Author')
  await user.type(inputs[2], 'www.testisivu.fi')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testisivu.fi')

})