//  License: Proprietary
//  Copyright (c) 2020, Appen Limited
//  All rights reserved - Do Not Redistribute

import { useEffect, useState, useCallback } from 'react'
import { debounce } from 'lodash'

/**
 * Debouced values are useful to debounce effects that depend on that values
 * We store the old value in the state
 * When the new value is received we update the value in state after a delay
 * If the value is changed again, we reset the timeout
 * Also, we reset the timeout when delay value is changed
 */
const useDebouncedValue = (value, delay, options = {}) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const { maxWait, leading, trailing } = options

  const debouncedSetter = useCallback(
    debounce((value) => setDebouncedValue(value), delay, options),
    [setDebouncedValue, delay, maxWait, leading, trailing],
  )

  useEffect(
    () => {
      debouncedSetter(value)
    },
    [debouncedSetter, value],
  )

  return debouncedValue
}

export default useDebouncedValue
