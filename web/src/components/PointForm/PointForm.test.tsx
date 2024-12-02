import { render } from '@redwoodjs/testing/web'

import PointForm from './PointForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PointForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PointForm />)
    }).not.toThrow()
  })
})
