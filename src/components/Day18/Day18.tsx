import styled from 'styled-components'
import { useMemo, useState } from 'react'

import Controls from '../Controls'
import View from './View'
import { getBoundaries, parseVoxels } from './solution18'

interface Props {
  input: string
}

function Day18({ input }: Props) {
  const { size, voxels, center } = useMemo(() => {
    const voxelsSet = parseVoxels(input)
    const voxels = [...voxelsSet].map(s => s.split(',').map(Number))

    const bounds = getBoundaries(voxelsSet)
    // console.group(bounds)
    const center = [
      (bounds.x[1] - bounds.x[0]) / 2 + 0,
      (bounds.y[1] - bounds.y[0]) / 2 + 0,
      (bounds.z[1] - bounds.y[0]) / 2 + 0,
    ]

    return { size: voxels.length, voxels, center }
  }, [input])

  const [show, setShow] = useState(size)

  return (
    <>
      <Controls
        current={show}
        setCurrent={setShow}
        max={size}
        fastSpeed={100}
        slowSpeed={500}
      />
      <View
        voxels={voxels.slice(0, show) as [number, number, number][]}
        center={center as [number, number, number]}
      />
    </>
  )
}

const Container = styled.div``

export default Day18
