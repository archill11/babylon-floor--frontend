//@ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { Link, useParams } from 'react-router-dom'
import { fethMyDialogs } from '../../redux/dialogs/asyncActions'
import { io, Socket } from 'socket.io-client'
import { black, dilogsListBGColorDark, dilogsListBGColorLite, white } from '../../libs/styled_variables'
import { selectAuthData } from '../../redux/auth/selectors'
import { selectDialogsData } from '../../redux/dialogs/selectors'
import { Dialog } from '../../redux/dialogs/types'

import './DialogsList.scss'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.theme === 'light' ? dilogsListBGColorLite : dilogsListBGColorDark };
  color: ${({ theme }) => theme.theme === 'light' ? black : white }
`

const StyledLink = styled(Link)`
 > * {
  color: ${({ theme }) => theme.theme === 'light' ? black : white }
}
`


export type socketChatType = {
  id: number | string;
  users: [{id: number}];
  createdAt: string;
  updatedAt: string;
};


const DialogsList: React.FC = () => {

  const dispatch = useAppDispatch()
  const {id} = useParams()
  const { items } = useAppSelector(selectDialogsData)
  const { data } = useAppSelector(selectAuthData)
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const [chatsList, setChatsList] = React.useState<Dialog[]>([])

  React.useEffect(() => {
    dispatch(fethMyDialogs())
  }, [])

  React.useEffect(() => {
    setChatsList(items)
  }, [items])

  React.useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_API_URL}`)
    setSocket(newSocket)
  }, [setSocket])

  const chatListener = (chat: socketChatType) => {
    console.log('chat',chat);
    if ( !chat.users.find(item => item.id === data.id) ) return
    
    // setChatsList([...chatsList, chat])
    dispatch(fethMyDialogs())
  }

  React.useEffect(() => {
    socket?.on('chat', chatListener)
    return () => {
      socket?.off('chat', chatListener)
    }
  }, [chatListener])

  
  const mapedData = items.map((item) => {
    
    const active = ( id && id === String(item.id)) ? 'dialogs__item--active' : ''
    return (
      <div className="dialog-item-wrappr" key={item.id}>
        <img className="dialogs__item-avatar" src={`${process.env.REACT_APP_API_URL}/${item.users[0].avatarUrl}`} alt="ava" />
        <StyledLink to={`/message/${item.id}`} className={'linkBtn dialogs__item ' + active}><span>{item.users[0].fullName}</span></StyledLink>
      </div>
    )
  })


  return(
    <Wrapper className="main__dialogs">
      {mapedData}
    </Wrapper>
  )
}

export {DialogsList}