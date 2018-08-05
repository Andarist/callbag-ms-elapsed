# callbag-ms-elapsed

Callbag listenable source which emits milliseconds elapsed since the subscription (using requestAnimationFrame) - useful for animations.

## Example

```js
import msElapsed from 'callbag-ms-elapsed'
import forEach from 'callbag-for-each'
import map from 'callbag-map'
import pipe from 'callbag-pipe'
import takeWhile from 'callbag-take-while'

const duration = ms =>
  pipe(
    msElapsed,
    map(elapsed => elapsed / ms),
    takeWhile(factor => factor <= 1),
  )

const distance = d => t => t * d

const moveBall = (ball, easing) => {
  pipe(
    duration(1000),
    map(easing),
    map(distance(400)),
    forEach(y => {
      ball.style.transform = `translate3d(0, ${y}px, 0)`
    }),
  )
}

const easeOut = p => 1 - (1 - p) * (1 - p)

moveBall(document.getElementById('ball'), easeOut)
```
