import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  test('renders title', () => {
    const blog = {
      title: 'test blog',
      author: 'author name',
      url: 'http://www.example.com',
      likes: 0,
    }

    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).not.toHaveTextContent(blog.name)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('renders all blog when view is clicked', () => {
    const user = {
      username: 'tester',
    }

    const blog = {
      title: 'test blog',
      author: 'author name',
      url: 'http://www.example.com',
      likes: 0,
      user,
    }

    const component = render(<Blog blog={blog} user={user} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent('likes')
  })

  test('clicking likes calls event handler', () => {
    const user = {
      username: 'tester',
    }

    const blog = {
      title: 'test blog',
      author: 'author name',
      url: 'http://www.example.com',
      likes: 0,
      user,
    }

    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} user={user} onUpdate={mockHandler} />)

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
