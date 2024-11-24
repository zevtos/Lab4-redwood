import type { Coordinate } from '@prisma/client'

import {
  coordinates,
  coordinate,
  createCoordinate,
  updateCoordinate,
  deleteCoordinate,
} from './coordinates'
import type { StandardScenario } from './coordinates.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('coordinates', () => {
  scenario('returns all coordinates', async (scenario: StandardScenario) => {
    const result = await coordinates()

    expect(result.length).toEqual(Object.keys(scenario.coordinate).length)
  })

  scenario(
    'returns a single coordinate',
    async (scenario: StandardScenario) => {
      const result = await coordinate({ id: scenario.coordinate.one.id })

      expect(result).toEqual(scenario.coordinate.one)
    }
  )

  scenario('creates a coordinate', async (scenario: StandardScenario) => {
    const result = await createCoordinate({
      input: {
        x: 3534983.093063622,
        y: 5089272.101771591,
        r: 5314353.636409237,
        hit: true,
        userId: scenario.coordinate.two.userId,
      },
    })

    expect(result.x).toEqual(3534983.093063622)
    expect(result.y).toEqual(5089272.101771591)
    expect(result.r).toEqual(5314353.636409237)
    expect(result.hit).toEqual(true)
    expect(result.userId).toEqual(scenario.coordinate.two.userId)
  })

  scenario('updates a coordinate', async (scenario: StandardScenario) => {
    const original = (await coordinate({
      id: scenario.coordinate.one.id,
    })) as Coordinate
    const result = await updateCoordinate({
      id: original.id,
      input: { x: 5813407.904296022 },
    })

    expect(result.x).toEqual(5813407.904296022)
  })

  scenario('deletes a coordinate', async (scenario: StandardScenario) => {
    const original = (await deleteCoordinate({
      id: scenario.coordinate.one.id,
    })) as Coordinate
    const result = await coordinate({ id: original.id })

    expect(result).toEqual(null)
  })
})
