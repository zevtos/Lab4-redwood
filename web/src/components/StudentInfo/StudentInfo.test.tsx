import { render } from '@redwoodjs/testing/web'

import StudentInfo from './StudentInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StudentInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StudentInfo />)
    }).not.toThrow()
  })
})
