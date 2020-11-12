//  License: Proprietary
//  Copyright (c) 2020, Appen Limited
//  All rights reserved - Do Not Redistribute

import { useCallback } from 'react'
import useDebouncedValue from './useDebouncedValueCustom'

const useDebouncedRequest = (request, params, delay) => {
  const requestParams = useDebouncedValue(params, delay)
  return useCallback(
    () => request(...Object.values(requestParams)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(requestParams),
  )
}

export default useDebouncedRequest
