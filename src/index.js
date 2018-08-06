import animationFrames from 'callbag-animation-frames'
import flatten from 'callbag-flatten'
import lazy from 'callbag-lazy'
import map from 'callbag-map'
import share from 'callbag-share'

export default flatten(
  lazy(() => {
    const start = Date.now()
    return map(() => Date.now() - start)(animationFrames)
  }),
)
