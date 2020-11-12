This demo shows different ways of debouncing async functions in React world
* using React Effect debouncing
* using request debouncing

The demo has several sections for each step of the presentation
* No debounce - problem definition, debounce-less behavior
* Debounced Request - first attempt to resolve the problem, failed
* Debounced Effect - successful attemp to resolve the problem using React Effect debouncing
* Debounced Effect Abstraction - some abstractions over the successful implementations
* Deferred Effect - Bonus 2 section, attempt to use useDeferredValue, failed
* Debounced Request (Async) - Bonus 1 section, additional attempt to debounce request itself, successful

You can switch the application sections using navigation in the header.
The routing is defined in the `App.js`

Files description:
* `api.js` - async api mock. It gives reversed input and amount of request calls as output.
* `useFetchData.js` - example of black-box custom React Effect, described in the presentation.
* `Component.js` - initial business logic implementation without any debouncing.
* `DebouncedRequest.js` - wrong request debouncing implementation, doesn't work properly, described in the presentation
* `DebouncedEffect.js` - debounced React Effect implementation, works correctly, described in the presentation
* `DebouncedEffectAbstractionCustom.js` - usage of the custom React Effect debouncing abstraction, works correctly, described in the presentation
* `DebouncedEffectAbstractionLodash.js` - usage of the React Effect debouncing abstraction based on the `lodash.debounce`, works correctly, described in the presentation
* `DebouncedEffectAbstractionRequest.js` - a bit more encapsulated version of the lodash-based abstraction, works correctly, described in the presentation
* `DebouncedRequestAsync.js` - debounced request wrapped in a big promise, works correctly, described in the presentation (Bonus 1 section)
* `DeferredEffect.js` - React Concurrent API useDeferredValue usage attempt, doesn't work properly, described in the presentation (Bonus 2 section)
* `useDebouncedRequestCustom.js` - request abstraction based on the custom Effect debouncing hook `useDebouncedValueCustom` 
* `useDebouncedRequestLodash.js` - request abstraction over the `lodash.debounce`-based Effect debouncing hook `useDebouncedValueLodash` 
* `useDebouncedValueCustom.js` - custom React Effect debouncing abstraction 
* `useDebouncedValueLodash.js` - `lodash.debounce`-based React Effect debouncing abstraction 

Mentioned repos:
* https://github.com/xnimorz/use-debounce

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
