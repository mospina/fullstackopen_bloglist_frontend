import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('calls event handler with right details', () => {
    const blog = {
      title: 'test blog',
      author: 'author name',
      url: 'http://www.example.com',
    }

    const mockHandler = jest.fn()

    const component = render(<BlogForm handleSubmit={mockHandler} />)

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: blog.title },
    })
    fireEvent.change(author, {
      target: { value: blog.author },
    })
    fireEvent.change(url, {
      target: { value: blog.url },
    })

    fireEvent.submit(form)

    const result = mockHandler.mock.calls[0][0]
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(result.title).toBe(blog.title)
    expect(result.author).toBe(blog.author)
    expect(result.url).toBe(blog.url)
  })
})
