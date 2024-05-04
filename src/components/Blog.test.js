import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {

const user ={username:"user"}
const blog = {
    title: "this is my blog",
    author: "blogger",
    user: user
  }


const { container } = render(<Blog blog={blog} user={user}/>)

const div = container.querySelector('.blog')
expect(div).toHaveTextContent("this is my blog")

})

test('renders author', () => {

    const user ={username:"user"}
    const blog = {
        title: "this is my blog",
        author: "blogger",
        user: user
      }
    
    
    const { container } = render(<Blog blog={blog} user={user}/>)
    
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent("blogger")
    
    })

test('clicking the button twice calls event handler twice', async () => {
    const bloguser ={username:"user"}
    const blog = {
        title: "this is my blog",
        author: "blogger",
        user: bloguser
      }
    
    const mockHandler = jest.fn()
    
    render(
        <Blog blog={blog} user={bloguser} handleLike={mockHandler}/>
    )
    
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
    })