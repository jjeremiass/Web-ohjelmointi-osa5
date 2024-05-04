import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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