//@ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { PostsInput } from '../PostsInput/PostsInput'
import { DialogMessage } from '../DialogMessage/DialogMessage'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { fethMessages } from '../../redux/dialogs/asyncActions'
import { io, Socket } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { useMatchMedia } from '../../hooks/use-match-media'
import { Link } from 'react-router-dom'
import { dilogListBGColorDark, dilogListBGColorLite } from '../../libs/styled_variables'
import { selectAuthData } from '../../redux/auth/selectors'
import { selectDialogsData } from '../../redux/dialogs/selectors'
import { Message } from '../../redux/dialogs/types'

import './Dialog.scss'

const Wrapper = styled.div`
background-color: ${({ theme }) => theme.theme === 'light' ? dilogListBGColorLite : dilogListBGColorDark};
color: ${({ theme }) => theme.theme === 'light' ? "#000" : "#fff" }
`

export type socketMessType = {
  id: number | string;
  name: string;
  avatarUrl: string;
  chat: {id: number};
  user: {id: number};
  state: boolean;
  text: string;
  createdAt: string;
  updatedAt: string;
};



const Dialog: React.FC = () => {

  const dispatch = useAppDispatch()
  const {id} = useParams()
  const { items, messages } = useAppSelector(selectDialogsData)
  const { data } = useAppSelector(selectAuthData)
  const [inputVal, setInputVal] = React.useState('')
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const [messagesL, setMessagesL] = React.useState<(Message | socketMessType)[]>([])
  const { isMobile } = useMatchMedia()


  React.useEffect(() => {
    if ( id ) {
      dispatch(fethMessages(id))
    }
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

  const messageListener = (mess: socketMessType) => {
    console.log('mess', mess);
    
    if ( Number(mess.chat.id) !== Number(id) ) return

    setMessagesL( [...messagesL, mess])
  }

  React.useEffect(() => {
    socket?.on('message', messageListener)
    return () => {
      socket?.off('message', messageListener)
    }
  }, [messageListener])

  

  const mapedData = messagesL.map((item) => {
    return (
      <DialogMessage name={item.name} message={item.text} key={item.id}
        src={`${process.env.REACT_APP_API_URL}/${item.avatarUrl}`} 
      />)
  })
  
  return(
    <Wrapper className="DialogWrapp">
      {isMobile && <Link className='DialogWrapp__back' to='/message'>🔙</Link>}
      <div className="main__Dialog">
        {mapedData}
        <PostsInput 
          inputVal={inputVal} setInputVal={setInputVal} fn={sendMessageL}
          placeholder={'your message'} btnValue={'send'}
        />
      </div>
    </Wrapper>
  )
}

export {Dialog}

