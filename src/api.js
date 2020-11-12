export const ASYNC_DELAY = 1000

export const asyncTimeout = (fn, delay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fn())
      } catch (e) {
        reject(e)
      }
    }, delay)
  })

const logic = (str) => str.split('').reverse().join('') 

export const createAsyncApi = () => {
  let requestsAmount = 0
  return {
    fetch: (params) => asyncTimeout(
      () => `data: ${JSON.stringify(logic(params), [], 2)}, requests: ${requestsAmount++}`,
      ASYNC_DELAY,
    )
  }
}
