import React from 'react'

export default class Comming extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div class="direct-chat-msg">
        <div class="direct-chat-info clearfix">
          <span class="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
        </div>
        <img class="direct-chat-img" src="https://bootdey.com/img/Content/user_1.jpg" alt="Message User Image" />
        <div class="direct-chat-text">
        </div>
      </div>
    )
  }
}