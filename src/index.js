import flatten from 'callbag-flatten'
import lazy from 'callbag-lazy'
import map from 'callbag-map'
import share from 'callbag-share'

// should be replaced with callbag-animation-frames later
const raf = share((start, sink) => {
  if (start !== 0) return
  let id

  const nextCb = ms => {
    sink(1, ms)
    next()
  }

  const next = () => {
    id = requestAnimationFrame(nextCb)
  }

  next()

  sink(0, t => {
    if (t === 2) cancelAnimationFrame(id)
  })
})

export default flatten(
  lazy(() => {
    const start = Date.now()
    return map(() => Date.now() - start)(raf)
  }),
)
