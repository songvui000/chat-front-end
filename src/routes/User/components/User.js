import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default class User extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <React.Fragment>
        <Route path='/users/sign_in' component={SignInForm} />
        <Route path='/users/sign_up' component={SignUpForm} />
      </React.Fragment>
    )
  }
}