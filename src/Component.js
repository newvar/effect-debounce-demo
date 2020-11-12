import React, { useState } from 'react'
import { useFetchData } from './useFetchData'
import { createAsyncApi } from './api'

import './Component.css'

const asyncApi = createAsyncApi()

export default () => {
  const [input, setInput] = useState('')
  const handleChange = (event) => setInput(event.target.value)
  const [result, isFetching] = useFetchData(asyncApi.fetch, 'no data', input)

  return (
    <div className="Component">
      <h4>No debouncing</h4>
      <input onChange={handleChange} />
      <div>isFetching: {isFetching ? 'true' : 'false'}</div>
      <div>result: {result}</div>
    </div>
  )
}
