import { render } from '@redwoodjs/testing/web'

import DeleteAllButton from './DeleteAllButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DeleteAllButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteAllButton />)
    }).not.toThrow()
  })
})
