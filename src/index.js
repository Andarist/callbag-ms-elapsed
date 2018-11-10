import animationFrames from 'callbag-animation-frames'
import defer from 'callbag-defer'
import map from 'callbag-map'

export default defer(() => {
  const start = Date.now()
  return map(() => Date.now() - start)(animationFrames)
})
