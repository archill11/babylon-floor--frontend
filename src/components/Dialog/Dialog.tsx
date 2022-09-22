//@ts-nocheck
import React from 'react'
import { PostsInput } from '../PostsInput/PostsInput'
import { DialogMessage } from '../DialogMessage/DialogMessage'
import { useDispatch, useSelector } from 'react-redux'
import { fethMessages, sendMessage } from '../../redux/dialogs/asyncActions'
import { io, Socket } from 'socket.io-client'

import './Dialog.scss'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'



const Dialog: React.FC = () => {

  const dispatch = useDispatch()
  const {id} = useParams()
  const { items, messages } = useSelector((state: RootState) => state.dialogs)
  const { data } = useSelector((state: RootState) => state.auth)
  const [inputVal, setInputVal] = React.useState('')
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const [messagesL, setMessagesL] = React.useState([])
  
  // console.log(messages);

  React.useEffect(() => {
    dispatch(fethMessages(id))
  }, [id])

  React.useEffect(() => {
    setMessagesL(messages)
  }, [messages])

  const sendMessageL = () => {
    const userId = data.id
    const chatId = id
    const name = data.fullName
    const avatarUrl = data.avatarUrl
    const text = inputVal
    console.log(id);
    socket?.emit('message', {userId, chatId, name, avatarUrl, text})
    // dispatch(sendMessage([chatId, name, avatarUrl, text]))
  }

  React.useEffect(() => {
    const newSocket = io('http://localhost:8001')
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = (mess) => {
    setMessagesL([...messagesL, mess])
  }

  React.useEffect(() => {
    socket?.on('message', messageListener)
    return () => {
      socket?.off('message', messageListener)
    }
  }, [messageListener])

  
  const mapedData = messagesL.map((item) => {
    console.log(item.id);
    return <DialogMessage name={item.name} message={item.text} src={item.avatarUrl} id={item.id} key={item.id}/>
  })
  
  return(
    <div className="DialogWrapp">
      <div className="main__Dialog">
        {mapedData}
        <PostsInput 
          inputVal={inputVal} setInputVal={setInputVal} fn={sendMessageL}
          className={'posts__input--sticky'} placeholder={'your message'} btnValue={'send'}
        />
      </div>
    </div>
  )
}

export {Dialog}

