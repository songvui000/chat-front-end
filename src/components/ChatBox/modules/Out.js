import React from 'react'

export default class Out extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div class="direct-chat-msg right">
        <div class="direct-chat-info clearfix">
          <span class="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
        </div>
        <img class="direct-chat-img" src="https://bootdey.com/img/Content/user_2.jpg" alt="Message User Image" />
        <div class="direct-chat-text">
        </div>
      </div>
    )
  }
}