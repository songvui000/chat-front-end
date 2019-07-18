import React from 'react'
import cookies from 'browser-cookies'
export default class SignUpForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.submitForm = this.submitForm.bind(this)
    this.saveData = this.saveData.bind(this)
  }
  submitForm (e) {
    e.preventDefault()
    let { email, password } = this.state
    fetch('http://localhost:3300/api/auth', {
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
      // let expiry = response.headers.get('expiry')
      cookies.set('access-token', response.headers.get('access-token'), {expires: 365})
      cookies.set('client', response.headers.get('client'), {expires: 365})
      cookies.set('uid', response.headers.get('uid'), {expires: 365})
    })
  }

  saveData (e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  render () {
    return (
      <div className='container'>
        <h3>Sign up</h3>
        <form>
          <div className='form-group'>
            <label className='label'>email</label>
            <input type='email' name='email' className='form-control' onBlur={this.saveData} />
          </div>
          <div className='form-group'>
            <label className='label'>password</label>
            <input type='password' name='password' className='form-control' onBlur={this.saveData} />
          </div>
          <input type='submit' value='Sign up' className='btn btn-primary' onClick={this.submitForm} />
        </form>
      </div>
    )
  }
}