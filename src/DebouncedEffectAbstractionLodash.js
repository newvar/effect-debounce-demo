import React, { useState } from 'react'
import { useFetchData } from './useFetchData'
import useDebouncedValue from './useDebouncedValueLodash'
import { createAsyncApi } from './api'

import './Component.css'

const DEBOUNCE_DELAY = 400
const DEBOUNCE_OPTIONS = { maxWait: 2000 }
const asyncApi = createAsyncApi()

export default () => {
  const [input, setInput] = useState('')
  const handleChange = (event) => setInput(event.target.value)
  const requestParams = useDebouncedValue({ input }, DEBOUNCE_DELAY, DEBOUNCE_OPTIONS)
  const [result, isFetching] = useFetchData(asyncApi.fetch, 'no data', ...Object.values(requestParams))

  return (
    <div className="Component">
      <h4>Debounced Effect Abstraction (Lodash)</h4>
      <input onChange={handleChange} />
      <div>isFetching: {isFetching ? 'true' : 'false'}</div>
      <div>result: {result}</div>
    </div>
  )
}
