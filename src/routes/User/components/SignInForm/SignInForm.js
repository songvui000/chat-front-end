import React from 'react'
import cookies from 'browser-cookies'
export default class SignInForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: null
    }
    this.submitForm = this.submitForm.bind(this)
    this.saveData = this.saveData.bind(this)
  }
  submitForm (e) {
    e.preventDefault()
    let { email, password } = this.state
    fetch('http://localhost:3300/api/auth/sign_in', {
      headers: {
        'Content-Type': 'application/json',
        credentials: 'same-origin'
      },
      method: 'post',
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json().then(
      user => ({ user, response })))
    .then(({user, response}) => {
      if (response.ok) {
        // let expiry = response.headers.get('expiry')
        cookies.set('access-token', response.headers.get('access-token'), {expires: 365})
        cookies.set('client', response.headers.get('client'), {expires: 365})
        cookies.set('uid', response.headers.get('uid'), {expires: 365})
      } else {
        this.setState({ errors: 'user is not found'})
      }
    })
  }

  saveData (e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  render () {
    return (
      <div className='container'>
        <form>
          <div className='form-group'>
            <label className='label'>email</label>
            <input type='email' name='email' className='form-control' onBlur={this.saveData} />
          </div>
          <div className='form-group'>
            <label className='label'>password</label>
            <input type='password' name='password' className='form-control' onBlur={this.saveData} />
          </div>
          <input type='submit' value='Sign in' className='btn btn-primary' onClick={this.submitForm} />
        </form>
        {
          this.state.errors &&
          <span class='has-error'>{this.state.errors}</span>
        }
      </div>
    )
  }
}