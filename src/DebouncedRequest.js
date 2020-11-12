import React, { useState } from 'react'
import { debounce } from 'lodash'
import { useFetchData } from './useFetchData'
import { createAsyncApi } from './api'

import './Component.css'

const DEBOUNCE_DELAY = 400
const asyncApi = createAsyncApi()

const debouncedRequest = debounce(asyncApi.fetch, DEBOUNCE_DELAY)

export default () => {
  const [input, setInput] = useState('')
  const handleChange = (event) => setInput(event.target.value)
  const [result, isFetching] = useFetchData(debouncedRequest, 'no data', input)

  return (
    <div className="Component">
      <h4>Debounced Request</h4>
      <input onChange={handleChange} />
      <div>isFetching: {isFetching ? 'true' : 'false'}</div>
      <div>result: {result}</div>
    </div>
  )
}
