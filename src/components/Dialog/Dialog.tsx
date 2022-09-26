//@ts-nocheck
import React from 'react'
import { PostsInput } from '../PostsInput/PostsInput'
import { DialogMessage } from '../DialogMessage/DialogMessage'
import { useDispatch, useSelector } from 'react-redux'
import { fethMessages, sendMessage } from '../../redux/dialogs/asyncActions'
import { io, Socket } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { useMatchMedia } from '../../hooks/use-match-media'
import { Link } from 'react-router-dom'

import './Dialog.scss'


const Dialog: React.FC = () => {

  const dispatch = useDispatch()
  const {id} = useParams()
  const { items, messages } = useSelector((state: RootState) => state.dialogs)
  const { data } = useSelector((state: RootState) => state.auth)
  const [inputVal, setInputVal] = React.useState('')
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const [messagesL, setMessagesL] = React.useState([])
  const { isMobile } = useMatchMedia()


  React.useEffect(() => {
    dispatch(fethMessages(id))
  }, [id])

  React.useEffect(() => {
    setMessagesL(messages)
  }, [messages])

  const sendMessageL = () => {
    if ( !inputVal.trim() ) return
    const userId = data.id
    const chatId = id
    const name = data.fullName
    const avatarUrl = data.avatarUrl
    const text = inputVal
    socket?.emit('message', {userId, chatId, name, avatarUrl, text})
    setInputVal('')
    // dispatch(sendMessage([chatId, name, avatarUrl, text]))
  }

  React.useEffect(() => {

    const newSocket = io(`${process.env.REACT_APP_API_URL}`)
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = (mess) => {
    if ( Number(mess.chat.id) !== Number(id) ) return

    setMessagesL([...messagesL, mess])
  }

  React.useEffect(() => {
    socket?.on('message', messageListener)
    return () => {
      socket?.off('message', messageListener)
    }
  }, [messageListener])

  

  const mapedData = messagesL.map((item) => {
    return <DialogMessage name={item.name} message={item.text} src={`${process.env.REACT_APP_API_URL}/${item.avatarUrl}`} id={item.id} key={item.id}/>
  })
  
  return(
    <div className="DialogWrapp">
      {isMobile && <Link className='DialogWrapp__back' to='/message'>🔙</Link>}
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

