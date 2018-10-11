import animationFrames from 'callbag-animation-frames'
import flatten from 'callbag-flatten'
import lazy from 'callbag-lazy'
import map from 'callbag-map'

export default flatten(
  lazy(() => {
    const start = Date.now()
    return map(() => Date.now() - start)(animationFrames)
  }),
)
