import empty from 'callbag-empty'
import forEach from 'callbag-for-each'
import fromIter from 'callbag-from-iter'
import pipe from 'callbag-pipe'
import tap from 'callbag-tap'
import tapUp from 'callbag-tap-up'
import throwError from 'callbag-throw-error'

import defaultIfEmpty from '../src'

const noop = () => {}
const autoPull = noop

function callAll(...fns) {
  return (...args) => {
    fns.forEach(fn => {
      fn(...args)
    })
  }
}

test('emits default if empty', () => {
  const actual = []

  pipe(
    empty,
    defaultIfEmpty('default'),
    forEach(value => {
      actual.push(value)
    }),
  )

  expect(actual).toEqual(['default'])
})

test('does not emit default if not empty', () => {
  const actual = []

  pipe(
    fromIter([1, 2, 3]),
    defaultIfEmpty('default'),
    forEach(value => {
      actual.push(value)
    }),
  )

  expect(actual).toEqual([1, 2, 3])
})

test('does not emit default if source errors', () => {
  const actual = []

  const push = value => {
    actual.push(value)
  }

  pipe(
    throwError('err'),
    defaultIfEmpty('default'),
    tap(push, push, push),
    forEach(autoPull),
  )

  expect(actual).toEqual(['err'])
})

test('should stop passing emits up after source completes', done => {
  let completed = false
  let requests = 0

  const failAfterCompletion = () => {
    if (!completed) return
    done.fail('Nothing should be sent up after source completes.')
  }

  pipe(
    empty,
    tap(noop, noop, () => {
      completed = true
    }),
    tapUp(
      callAll(() => {
        requests++
      }, failAfterCompletion),
      failAfterCompletion,
      failAfterCompletion,
    ),
    defaultIfEmpty('default'),
    forEach(autoPull),
  )

  expect(requests).toBe(1)
  done()
})
