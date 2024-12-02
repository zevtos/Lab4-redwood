import { render } from '@redwoodjs/testing/web'

import Canvas from './Canvas'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Canvas', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Canvas />)
    }).not.toThrow()
  })
})
