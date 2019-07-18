import React from 'react'
import ActionCable from 'actioncable'
import Room from './modules/Room'
import _ from 'lodash'

import './assets/ChatBox.scss'
import { API_WS_ROOT } from '../../constant'
import uuid from 'uuid'
import { callAPIget } from '../../vendor/callAPI'

export default class ChatBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rooms: [],
      connection: ActionCable.createConsumer(API_WS_ROOT)
    }
    this.senderId = 1
    this.openNewRoom = this.openNewRoom.bind(this)
  }

  componentWillMount () {
    callAPIget('api/v1/chat')
    .then(response => {
      this.setState({ rooms: response.rooms })
    })
  }

  openNewRoom (roomCode) {
    if (roomCode !== undefined) {
      let rooms = _.clone(this.state.rooms)
      rooms.push({
        code: roomCode,
        name: 'di choi du hi',
        messages: []
      })
      this.setState({ rooms })
    }
  }

  render () {
    let { rooms, connection } = this.state
    return (
      <React.Fragment>
        <button className='btn btn-primary' onClick={() => this.openNewRoom(uuid.v4())}>Thêm chát</button>
        {
          rooms.map ((room, index) => <Room key={room.code} room={room} connection={connection} />)
        }
      </React.Fragment>
    )
  }
}