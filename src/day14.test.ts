import {
  buildMap,
  getBoundaries,
  getSizeOfBoundaries,
  getStart,
  getWideMap,
  parseRocks,
  parseSegments,
  simulateAndGetLandedCount,
  vec,
} from './day14'

const testInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

describe('parseSegments', () => {
  it('parses segments', () => {
    expect(parseSegments('498,4 -> 498,6 -> 496,6')).toEqual([
      [vec(498, 4), vec(498, 6)],
      [vec(498, 6), vec(496, 6)],
    ])
    expect(parseSegments('503,4 -> 502,4 -> 502,9 -> 494,9')).toEqual([
      [vec(503, 4), vec(502, 4)],
      [vec(502, 4), vec(502, 9)],
      [vec(502, 9), vec(494, 9)],
    ])
  })
})

describe('parseRocks', () => {
  it('parses rocks', () => {
    expect(parseRocks(testInput).length).toBe(20)
  })
})

describe('getBoundaries', () => {
  it('gets bounds', () => {
    const bounds = getBoundaries([...parseRocks(testInput), vec(500, 0)])
    expect(bounds).toEqual({ topLeft: vec(494, 0), bottomRight: vec(503, 9) })
  })
})

describe('getStart', () => {
  it('gets start position from map', () => {
    const rocks = parseRocks(testInput)
    const start = vec(500, 0)
    const bounds = getBoundaries([...rocks, start])
    const size = getSizeOfBoundaries(bounds)
    const map = buildMap(start, rocks, bounds.topLeft, size)

    expect(getStart(map)).toEqual(vec(6, 0))
  })
})

describe('buildMap', () => {
  it('builds the map', () => {
    const rocks = parseRocks(testInput)
    const start = vec(500, 0)
    const bounds = getBoundaries([...rocks, start])
    const size = getSizeOfBoundaries(bounds)
    const map = buildMap(start, rocks, bounds.topLeft, size)

    expect(map).toBeTruthy()
  })
})

describe('simulateAndGetLandedCount', () => {
  it('works with no floor', () => {
    const rocks = parseRocks(testInput)
    const start = vec(500, 0)
    const bounds = getBoundaries([...rocks, start])
    const size = getSizeOfBoundaries(bounds)
    const map = buildMap(start, rocks, bounds.topLeft, size)

    expect(simulateAndGetLandedCount(map)).toBe(24)
  })
})

describe('simulate with floor', () => {
  it('works with floor', () => {
    const rocks = parseRocks(testInput)
    const start = vec(500, 0)
    const bounds = getBoundaries([...rocks, start])
    const size = getSizeOfBoundaries(bounds)
    const map = buildMap(start, rocks, bounds.topLeft, size)

    expect(simulateAndGetLandedCount(getWideMap(map))).toBe(93)
  })
})
