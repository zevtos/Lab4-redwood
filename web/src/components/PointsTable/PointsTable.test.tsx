import { render } from '@redwoodjs/testing/web'

import PointsTable from './PointsTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PointsTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PointsTable />)
    }).not.toThrow()
  })
})
