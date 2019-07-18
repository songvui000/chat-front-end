import React from 'react'
import _ from 'lodash'
import uuid from 'uuid'

export default class Room extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      room: props.room,
      messages: [],
      message: '',
    }
    this.saveMessage = this.saveMessage.bind(this)
    this.sendMesasge = this.sendMesasge.bind(this)
    // this.disconnect = this.disconnect.bind(this)
    this.pushMessage = this.pushMessage.bind(this)
  }

  componentWillMount () {
    let subscription = this.createRoomConnection(this.state.room.code)
    this.setState({ subscription })
  }

  createRoomConnection (roomCode) {
    let scope = this
    return this.props.connection.subscriptions.create({
      channel: `ChatChannel`,
      code: roomCode
    }, {
      connected: function() {
        console.log('connected to RoomChannel. Room code: ' + roomCode + '.')
      },
      disconnected: function() {},
      received: function(data) {
        scope.pushMessage(data)
      },
      speak: function(message) {
        return this.perform('speak', {
          code: roomCode,
          message: message,
          guid: uuid.v4()
        })
      }
    })
  }

  pushMessage (data) {
    let { messages } = _.cloneDeep(this.state)

    messages.push(data.message)
    this.setState({ messages })
  }

  // disconnect () {
  //   let { room } = this.state
  //   rooms.forEach( c => c.conn.consumer.connection.close())
  // }

  saveMessage (e) {
    this.setState({ message: e.target.value })
  }

  sendMesasge () {
    let { message, subscription } = this.state
    subscription.speak(message)
    this.setState({ message: '' })
  }

  render () {
    const { room, message, messages } = this.state
    return (
      <div className='container'>
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
            _.map(messages, message =>
              <p key={message.guid}>{message.content}</p>
            )
          }
        </div>
        <div className="box-footer">
          <div className="input-group">
            <input type="text" name="message" placeholder="Type Message ..." className="form-control" onChange={this.saveMessage} value={message} />
              <span className="input-group-btn">
                <button type="button" className="btn btn-primary btn-flat" onClick={this.sendMesasge}>Send</button>
              </span>
          </div>
        </div>
      </div>
    </div>
    )
  }
}