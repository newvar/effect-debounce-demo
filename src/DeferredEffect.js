import React, { useState, unstable_useDeferredValue } from 'react'
import { useFetchData } from './useFetchData'
import { createAsyncApi } from './api'

import './Component.css'

const DEBOUNCE_DELAY = 400

const asyncApi = createAsyncApi()

export default () => {
  const [input, setInput] = useState('')
  const handleChange = (event) => setInput(event.target.value)
  // actually, the timeoutMs param is no longer supported
  // so it can't be a debounced value replacement
  const deferredInput = unstable_useDeferredValue(input, { timeoutMs: DEBOUNCE_DELAY })
  const [result, isFetching] = useFetchData(asyncApi.fetch, 'no data', deferredInput)

  return (
    <div className="Component">
      <h4>Deferred Effect</h4>
      <input onChange={handleChange} />
      <div>isFetching: {isFetching ? 'true' : 'false'}</div>
      <div>result: {result}</div>
    </div>
  )
}
