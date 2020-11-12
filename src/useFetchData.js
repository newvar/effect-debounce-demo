import * as React from 'react';

/* Usage example:
*
* const [items, isFetching, error] = useFetchData(fetchFn, [], fetchFnParam1, fetchFnParam2);
*         ^         ^         ^                      ^      ^           ^             ^
*         |         |         |                      |      |           |             |
*   fetched items   |         |            Fetch function   |           |             |
*           fetching status   |                        Default value    |             |
*                  Error instance or undefined                         params for fetchFn
*
* useFetchData hook calls fetch function and updates component local state (with useState) on updating `fetchFn` or `params`
*
* Do NOT set fetchFnParam as new object with {}:
*     const [items, isFetching, error] = useFetchData(fn, [], { param1: 1, param2: 2 }}); - it creates infinity loop of calling fetchFn.
*     use useState, useRef, UseMemo to save link to object and update it when it nessesary.
*
* If you get warning in tests "Warning: An update to %s inside a test was not wrapped in act", check helper skipActWarning(src/test/lib/helpers/skipActWarning.ts)
 */

export function useFetchData(fetchFn, defaultValue, ...params) {
  const [data, setData] = React.useState(defaultValue);
  const [isFetching, setFetching] = React.useState(true);
  const [errorCatched, setErrorCatched] = React.useState();

  React.useEffect(() => {
    let isDestroyed = false;
    const fetchData = async () => {
      setFetching(true);
      try {
        const fetchedData = await fetchFn(...params);
        if (!isDestroyed) {
          setData(fetchedData);
          setFetching(false);
          setErrorCatched(undefined);
        }
      } catch (error) {
        if (!isDestroyed) {
          setData(defaultValue);
          setFetching(false);
          setErrorCatched(error);
        }
      }
    };

    fetchData();

    return () => { isDestroyed = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFn, ...params]);

  return [data, isFetching, errorCatched];
}
