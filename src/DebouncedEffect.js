import React, { useEffect, useState, useCallback } from 'react'
import { debounce } from 'lodash'
import { useFetchData } from './useFetchData'
import { createAsyncApi } from './api'

import './Component.css'

const DEBOUNCE_DELAY = 400

const INITIAL_REQUEST_PARAMS = {
  input: '',
}

const asyncApi = createAsyncApi()

export default () => {
  const [input, setInput] = useState(INITIAL_REQUEST_PARAMS.input)
  const handleChange = (event) => setInput(event.target.value)

  // we debounce the values changes to make the request effect debounced
  // we do that in 3 steps:
  // 1. we put the values in an object to provide and debounce them together
  // 2. we store the values object in state to prevent object creation at each render
  const [requestParams, setRequestParams] = useState(INITIAL_REQUEST_PARAMS)
  // 3. we debounce the stored object changes
  const debouncedSetter = useCallback(
    debounce((value) => setRequestParams(value), DEBOUNCE_DELAY),
    [setRequestParams]
  )
  useEffect(
    () => {
      debouncedSetter({ input })
    },
    [debouncedSetter, input],
  )
  const [result, isFetching] = useFetchData(asyncApi.fetch, 'no data', requestParams.input)

  return (
    <div className="Component">
      <h4>Debounced Effect</h4>
      <input onChange={handleChange} />
      <div>isFetching: {isFetching ? 'true' : 'false'}</div>
      <div>result: {result}</div>
    </div>
  )
}
