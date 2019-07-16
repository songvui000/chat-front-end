import React from 'react'
import { ActionCable } from 'react-actioncable-provider';
import './assets/ChatBox.scss'

export default class ChatBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      room: {
        name: 'di choi du hi'
      },
      messages: []
    }
    this.handleReceivedMessage = this.handleReceivedMessage.bind(this)
  }

  renderMessage (message) {
    return (
      <p>123</p>
    )
  }

  handleReceivedMessage (response) {
    const { message } = response;
    const messages = this.state.messages;
    const conversation = messages.find(mess => conversation.id === message.conversation_id)
    conversation.messages = [...conversation.messages, message]
    this.setState({ messages })
  }

  render () {
    let { room } = this.state
    return (
      <div className='container'>
        <ActionCable channel={{ channel: 'ChatChannel' }}
          onReceived={this.handleReceivedMessage}
        />
        <div className="box box-primary direct-chat direct-chat-primary">
          <div className="box-header with-border">
            <h3 className="box-title">{ room.name }</h3>
            <div className="box-tools pull-right">
              <span data-toggle="tooltip" title="" className="badge bg-light-blue" data-original-title="3 New Messages">3</span>
              <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
              </button>
              <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                <i className="fa fa-comments" /></button>
              <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
            </div>
          </div>
          <div className="box-body">
            {
              this.renderMessage()
            }
          </div>
          <div className="box-footer">
            <div className="input-group">
              <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary btn-flat">Send</button>
                </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}