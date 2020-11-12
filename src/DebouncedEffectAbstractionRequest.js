import React, { useCallback, useState } from 'react'
import { useFetchData } from './useFetchData'
import useDebouncedValue from './useDebouncedValueLodash'
import { createAsyncApi } from './api'

import './Component.css'

const DEBOUNCE_DELAY = 400
const DEBOUNCE_OPTIONS = { maxWait: 2000 }
const asyncApi = createAsyncApi()

const useDebouncedRequest = (request, params, delay, options) => {
  const requestParams = useDebouncedValue(params, delay, options)
  return useCallback(
    () => request(...Object.values(requestParams)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(requestParams),
  )
}

export default () => {
  const [input, setInput] = useState('')
  const handleChange = (event) => setInput(event.target.value)
  const request = useDebouncedRequest(
    asyncApi.fetch, [ input ], DEBOUNCE_DELAY, DEBOUNCE_OPTIONS
  )
  const [result, isFetching] = useFetchData(request, 'no data')

  return (
    <div className="Component">
      <h4>Debounced Effect Abstraction (Request)</h4>
      <input onChange={handleChange} />
      <div>isFetching: {isFetching ? 'true' : 'false'}</div>
      <div>result: {result}</div>
    </div>
  )
}
