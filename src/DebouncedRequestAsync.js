import React, { useState } from 'react'
import { debounce } from 'lodash'
import { useFetchData } from './useFetchData'
import { createAsyncApi } from './api'

import './Component.css'

const DEBOUNCE_DELAY = 400
const asyncApi = createAsyncApi()

/* We wrap debounced request into a promise, that resolves when the debounced
 * request finishes.
 * If there is another overlapping request, we resolve the initial promise
 * with the new request results, so we keep the same promise instance
 * until it resolves by the final request.
 * The promise lifecycle starts with the first call in the debouced calls chain
 * and ends when the last request finishes.
 *
 * - debounced calls chain - a set of the debounced function calls that are
 *   deffered until the debounce delay has passed
 * - debounce period - the time interval between the debounced function call
 *   and its actual invocation
 */
const debounceRequest = (request, delay) => {
  /* Explained in the usage. We use Symbol here to make sure that the
   * initial value is not equal to any next value. We could use {} instead,
   * but it is not so semantic
   */
  let previousWrappedRequestPromise = Symbol(`empty output`)
  let currentRequestPromise = null
  // The promise and its resolution functions
  let currentPromise = null
  let currentResolve = null
  let currentReject = null
  let inDebouncePeriod = false
  const resetCurrentPromise = () => {
    currentResolve = null
    currentPromise = null
    currentReject = null
  }
  /* As far as we use lodash.debounce, we have to wrap initial request function
   * to get access to the request lifecycle. We need to bind the whole debounced
   * request promise to the request promise behavior.
  */
  const wrappedRequest = async (...params) => {
    // This function is called right after the debounce period
    inDebouncePeriod = false
    let requestPromise
    try {
      requestPromise = request(...params)
      currentRequestPromise = requestPromise
      const output = await requestPromise
      /* It may happen that some new request can be made while this request
       * is in progress. We need to show only the latest request results, so we
       * skip previous request promise resolution or rejection in this case.
       *
       * Also, if we are in the new debounced period at the same time as the
       * current request finished, we consider this case as a new request, so we
       * skip previous request as well.
       */
      if (requestPromise === currentRequestPromise && currentPromise && !inDebouncePeriod) {
        currentResolve(output)
        resetCurrentPromise()
      }
      return output
    } catch (e) {
      if (requestPromise === currentRequestPromise && currentPromise && !inDebouncePeriod) {
        console.error(e)
        currentReject(e)
        resetCurrentPromise()
      }
    }
  }
  const debouncedRequest = debounce(wrappedRequest, delay)
  return (...params) => {
    // We start new debounce period at this point
    inDebouncePeriod = true
    const wrappedRequestPromise = debouncedRequest(...params)
    /* lodash.debounce returns the result of the last accomplished call
     * that means that we can detect whether we are still in the same debounced
     * calls chain
     */
    if (wrappedRequestPromise !== previousWrappedRequestPromise) {
      /* If previous request is not finished, we use the same promise.
       * It helps us to keep the chain of the events consistent until
       * everything is complete
      */
      if (!currentPromise) {
        currentPromise = new Promise((resolve, reject) => {
          currentResolve = resolve
          currentReject = reject
        })
      }
    }
    previousWrappedRequestPromise = wrappedRequestPromise
    return currentPromise
  }
}

const debouncedRequest = debounceRequest(asyncApi.fetch, DEBOUNCE_DELAY)

export default () => {
  const [input, setInput] = useState('')
  const handleChange = (event) => setInput(event.target.value)
  const [result, isFetching] = useFetchData(debouncedRequest, 'no data', input)

  return (
    <div className="Component">
      <h4>Debounced Request (Async)</h4>
      <input onChange={handleChange} />
      <div>isFetching: {isFetching ? 'true' : 'false'}</div>
      <div>result: {result}</div>
    </div>
  )
}
