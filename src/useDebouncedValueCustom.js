//  License: Proprietary
//  Copyright (c) 2020, Appen Limited
//  All rights reserved - Do Not Redistribute

import { useEffect, useState } from 'react'

/**
 * Debouced values are useful to debounce effects that depend on that values
 * We store the old value in the state
 * When the new value is received we update the value in state after a delay
 * If the value is changed again, we reset the timeout
 * Also, we reset the timeout when delay value is changed
 */
const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(timeout)
      }
    },
    [value, delay],
  )

  return debouncedValue
}

export default useDebouncedValue
