import animationFrames from 'callbag-animation-frames'
import defer from 'callbag-defer'
import map from 'callbag-map'
import pipe from 'pipeline.macro'

const msElapsed = defer(() => {
  const start = Date.now()
  return pipe(
    animationFrames,
    map(() => Date.now() - start),
  )
})

export default msElapsed
