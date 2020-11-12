import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom"

import Component from './Component'
import DebouncedRequest from './DebouncedRequest'
import DebouncedRequestAsync from './DebouncedRequestAsync'
import DebouncedEffect from './DebouncedEffect'
import DeferredEffect from './DeferredEffect'
import DebouncedEffectAbstractionLodash from './DebouncedEffectAbstractionLodash'
import DebouncedEffectAbstractionCustom from './DebouncedEffectAbstractionCustom'
import DebouncedEffectAbstractionRequest from './DebouncedEffectAbstractionRequest'

import './App.css'

export default () => (
  <Router>
    <div className="App">
      <nav>
        <NavLink activeClassName="active-link" to="/no-debouncing" exact>No debouncing</NavLink>
        <NavLink activeClassName="active-link" to="/debounced-request" exact>Debounced Request</NavLink>
        <NavLink activeClassName="active-link" to="/debounced-effect" exact>Debounced Effect</NavLink>
        <NavLink activeClassName="active-link" to="/debounced-effect-abstraction" exact>Debounced Effect Abstraction</NavLink>
        <NavLink activeClassName="active-link" to="/deferred-effect" exact>Deferred Effect</NavLink>
        <NavLink activeClassName="active-link" to="/debounced-request-async" exact>Debounced Request (Async)</NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          <Redirect to="/no-debouncing" />
        </Route>
        <Route path="/no-debouncing">
          <Component key="no-debouncing"  />
        </Route>
        <Route path="/debounced-request">
          <Component key="no-debouncing"  />
          <DebouncedRequest key="debounced-request" />
        </Route>
        <Route path="/debounced-effect">
          <Component key="no-debouncing" />
          <DebouncedRequest key="debounced-request" />
          <DebouncedEffect key="debounced-effect" />
        </Route>
        <Route path="/debounced-effect-abstraction">
          <DebouncedEffect key="debounced-effect" />
          <DebouncedEffectAbstractionLodash key="debounced-effect-abstraction-lodash"  />
          <DebouncedEffectAbstractionCustom key="debounced-effect-abstraction-custom"  />
          <DebouncedEffectAbstractionRequest key="debounced-effect-abstraction-request"  />
        </Route>
        <Route path="/deferred-effect">
          <Component key="no-debouncing" />
          <DeferredEffect key="deferred-effect" />
        </Route>
        <Route path="/debounced-request-async">
          <Component key="no-debouncing"  />
          <DebouncedRequest key="debounced-request" />
          <DebouncedRequestAsync key="debounced-request-async" />
        </Route>
      </Switch>
    </div>
  </Router>
)
